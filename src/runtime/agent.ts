import {
	type ContentPart,
	generateText,
	type ModelMessage,
	stepCountIs,
	type ToolSet,
} from "ai"
import { nim } from "../llm/provider.js"
import { BUILD_SYSTEM_PROMPT, PLAN_SYSTEM_PROMPT } from "../prompts/system.js"
import { allTools, readOnlyTools } from "../tools/index.js"

const INTERACTIONS_LIMIT = 25

export type Mode = "plan" | "build"

export type AgentCallbacks = {
	onStatus?: (status: string) => void
	onStepContent?: (part: ContentPart<ToolSet>) => void
}

export async function agent(
	messages: ModelMessage[],
	mode: Mode,
	callbacks: AgentCallbacks
) {
	const tools = mode === "plan" ? readOnlyTools : allTools
	const system = mode === "plan" ? PLAN_SYSTEM_PROMPT : BUILD_SYSTEM_PROMPT

	const result = await generateText({
		model: nim.chatModel("stepfun-ai/step-3.7-flash"),
		tools,
		system,
		messages,
		stopWhen: stepCountIs(INTERACTIONS_LIMIT),
		experimental_onToolCallStart: ({ toolCall }) => {
			callbacks.onStatus?.(`Running tool: ${toolCall.toolName}...`)
		},
		experimental_onToolCallFinish: () => {
			callbacks.onStatus?.("Thinking...")
		},
		onStepFinish: ({ content }) => {
			for (const part of content) {
				callbacks.onStepContent?.(part)
			}
		},
	})

	return result
}
