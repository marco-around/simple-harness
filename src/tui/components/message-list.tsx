import "react"
import { Box, Text } from "ink"
export type ChatMessage = {
	role: "user" | "assistant" | "thought" | "tool-status"
	content: string
}

import { getEntryStyles } from "../utils/get-entry-styles.js"

type MessageListProps = {
	entries: ChatMessage[]
}

export function MessageList({ entries }: MessageListProps) {
	if (entries.length === 0) return null

	return (
		<Box flexDirection="column" gap={1}>
			{entries.map((entry, index) => {
				const style = getEntryStyles(entry.role)
				const key = entry.role + String(index)

				return (
					<Box key={key} gap={1}>
						<Text color={style.color} bold>
							{style.label}
						</Text>
						<Text
							dimColor={
								entry.role === "tool-status" || entry.role === "thought"
							}
							color={entry.role === "tool-status" ? "#ffd460ff" : undefined}
						>
							{entry.content}
						</Text>
					</Box>
				)
			})}
		</Box>
	)
}
