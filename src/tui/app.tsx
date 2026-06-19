import "react"
import { Box, Text } from "ink"
import { useState } from "react"
import { agent } from "../runtime/agent.js"
import { Input } from "./components/input.js"
import { Separator } from "./components/separator.js"
import { Spinner } from "./components/spinner.js"

export function App() {
	const [output, setOutput] = useState("")
	const [isFocused, setIsFocused] = useState(true)
	const [isLoading, setIsLoading] = useState(false)

	return (
		<Box flexDirection="column" gap={1}>
			<Text bold backgroundColor="#7f22fe">
				Simple Harness
			</Text>

			<Separator />

			<Input
				isFocused={isFocused}
				placeholder="Type something..."
				onSubmit={async (value) => {
					setIsLoading(true)
					setIsFocused(false)

					const result = await agent(value, "plan")

					setOutput(result.text)

					setIsLoading(false)
				}}
			/>

			{!isFocused && <Separator char="─" />}

			{isLoading && <Spinner />}

			<Text dimColor>{output}</Text>
		</Box>
	)
}
