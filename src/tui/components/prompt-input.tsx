import { Box, Text } from "ink"
import TextInput from "ink-text-input"
import { useState } from "react"

type PromptInputProps = {
	onSubmit(value: string): void | Promise<void>
}

export function PromptInput({ onSubmit }: PromptInputProps) {
	const [prompt, setPrompt] = useState("")

	return (
		<Box gap={1}>
			<Text dimColor>{">"}</Text>

			<TextInput
				showCursor
				placeholder="Type something..."
				value={prompt}
				onChange={setPrompt}
				onSubmit={(value) => {
					if (!value) return
					onSubmit(value)
					setPrompt("")
				}}
			/>
		</Box>
	)
}
