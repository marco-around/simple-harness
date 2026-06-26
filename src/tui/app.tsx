import "react"
import { Box, Text, useInput } from "ink"
import Spinner from "ink-spinner"
import { ApprovalPrompt } from "./components/approval-prompt.js"
import { MessageList } from "./components/message-list.js"
import { Panel } from "./components/panel.js"
import { PromptInput } from "./components/prompt-input.js"
import { Separator } from "./components/separator.js"
import { useAgent } from "./hooks/use-agent.js"
import { formatToolCall } from "./utils/describe-tool-call.js"

export function App() {
	const { states, actions } = useAgent()
	const { chatMessages, mode, plan, agentStatusText, isLoading, isApproved } =
		states

	const colorMode = mode === "build" ? "#8e51ff" : "#efb100"
	const textMode = mode === "build" ? "Build" : "Plan"

	useInput((input, key) => {
		if (key.tab && !isLoading && !isApproved) {
			actions.setMode((prev) => (prev === "plan" ? "build" : "plan"))
		}

		if (key.ctrl && input === "p") {
			if (plan && !isLoading && !isApproved) {
				actions.setMode("build")
				actions.handlePromptSubmit("Execute the proposed plan.", "build")
			}
		}
	})

	const showInput = !isLoading && !isApproved

	return (
		<Box flexDirection="column" gap={1}>
			<Panel />

			<Separator title="Make your tests here!" char="=" padding={0} />

			<MessageList entries={chatMessages} />

			{isLoading && (
				<Box gap={1}>
					<Spinner />
					<Text dimColor>{agentStatusText}</Text>
				</Box>
			)}

			{isApproved && (
				<ApprovalPrompt
					description={formatToolCall(
						isApproved.current.toolName,
						isApproved.current.toolInput
					)}
					onApprove={actions.handleApprovalResolve}
				/>
			)}

			{showInput && (
				<Box flexDirection="column">
					<Box borderStyle="round" borderColor="gray" paddingX={1}>
						<PromptInput onSubmit={actions.handlePromptSubmit} />
					</Box>

					<Box gap={1}>
						<Text color="gray">Mode:</Text>
						<Text color={colorMode}>{textMode}</Text>
						<Text color="gray">(tab for change mode)</Text>
						{plan && (
							<Text color="green"> [Plan Active: ctrl+p to proceed]</Text>
						)}
					</Box>
				</Box>
			)}
		</Box>
	)
}
