import type { ModelMessage, ToolApprovalResponse } from "ai"
import { useState } from "react"
import { agent } from "../../runtime/agent.js"
import type { ChatMessage } from "../components/message-list.js"
import { formatToolCall } from "../utils/describe-tool-call.js"
import { formatError } from "../utils/format-error.js"

export type ApprovalItem = {
	approvalId: string
	toolName: string
	toolInput: Record<string, unknown>
}

export type PendingApproval = {
	current: ApprovalItem
	remaining: ApprovalItem[]
	history: ModelMessage[]
	responses: ToolApprovalResponse[]
}

const RESET_COMMANDS = new Set(["/clear", "/reset"])

function toApprovalItem(request: {
	approvalId: string
	toolCall: { toolName: string; input: unknown }
}): ApprovalItem {
	return {
		approvalId: request.approvalId,
		toolName: request.toolCall.toolName,
		toolInput: request.toolCall.input as Record<string, unknown>,
	}
}

export function useAgent() {
	const [history, setHistory] = useState<ModelMessage[]>([])
	const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
	const [mode, setMode] = useState<"plan" | "build">("build")
	const [plan, setPlan] = useState<string | null>(null)
	const [agentStatusText, setAgentStatusText] = useState("Thinking...")
	const [isLoading, setIsLoading] = useState(false)
	const [isApproved, setIsApproved] = useState<PendingApproval | null>(null)

	function resetConversation() {
		setHistory([])
		setChatMessages([])
		setPlan(null)
	}

	function appendChat(msg: ChatMessage) {
		setChatMessages((prev) => [...prev, msg])
	}

	async function runAgent(
		messages: ModelMessage[],
		agentMode: "plan" | "build" = mode
	) {
		setIsLoading(true)
		setAgentStatusText("Thinking...")

		try {
			const result = await agent(messages, agentMode, {
				onStatus: setAgentStatusText,
				onStepContent: (part) => {
					if (part.type !== "text" && part.type !== "reasoning") return
					appendChat({
						role: part.type === "reasoning" ? "thought" : "assistant",
						content: part.text,
					})
				},
			})

			const approvals = result.content.filter(
				(part) => part.type === "tool-approval-request"
			)

			if (approvals.length > 0) {
				const [first, ...rest] = approvals
				setIsApproved({
					current: toApprovalItem(first),
					remaining: rest.map(toApprovalItem),
					history: [...messages, ...result.response.messages],
					responses: [],
				})
				setIsLoading(false)
				return
			}

			setHistory([...messages, ...result.response.messages])

			if (agentMode === "plan" && result.text) {
				setPlan(result.text)
			}
		} catch (error) {
			appendChat({ role: "assistant", content: formatError(error) })
		} finally {
			setIsLoading(false)
		}
	}

	async function handlePromptSubmit(
		prompt: string,
		submitMode?: "plan" | "build"
	) {
		if (!prompt) return

		if (RESET_COMMANDS.has(prompt.trim())) {
			resetConversation()
			return
		}

		appendChat({ role: "user", content: prompt })

		const userMessage: ModelMessage = { role: "user", content: prompt }
		await runAgent([...history, userMessage], submitMode ?? mode)
	}

	async function handleApprovalResolve(approved: boolean) {
		if (!isApproved) return

		const { current, remaining, history: savedHistory, responses } = isApproved

		const allResponses: ToolApprovalResponse[] = [
			...responses,
			{
				type: "tool-approval-response",
				approvalId: current.approvalId,
				approved,
			},
		]

		appendChat({
			role: "tool-status",
			content: `${formatToolCall(current.toolName, current.toolInput)} — ${approved ? "approved" : "denied"}`,
		})

		if (remaining.length > 0) {
			const [next, ...rest] = remaining
			setIsApproved({
				current: next,
				remaining: rest,
				history: savedHistory,
				responses: allResponses,
			})
			return
		}

		setIsApproved(null)
		await runAgent([...savedHistory, { role: "tool", content: allResponses }])
	}

	return {
		states: {
			history,
			chatMessages,
			mode,
			plan,
			agentStatusText,
			isLoading,
			isApproved,
		},
		actions: {
			setMode,
			setPlan,
			handlePromptSubmit,
			handleApprovalResolve,
		},
	}
}
