import "react"
import { Box, Text, useInput } from "ink"

type ApprovalPromptProps = {
	description: string
	onApprove: (approved: boolean) => void
}

export function ApprovalPrompt({
	description,
	onApprove,
}: ApprovalPromptProps) {
	useInput((input) => {
		if (input === "y") onApprove(true)
		if (input === "n") onApprove(false)
	})

	return (
		<Box flexDirection="column" gap={1}>
			<Box gap={1}>
				<Text color="yellow" bold>
					{"Permission requested:"}
				</Text>
				<Text>{description}</Text>
			</Box>

			<Box gap={1}>
				<Text color="green" bold>
					[y]
				</Text>
				<Text dimColor>Approve</Text>
				<Text color="red" bold>
					[n]
				</Text>
				<Text dimColor>Deny</Text>
			</Box>
		</Box>
	)
}
