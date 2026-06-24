import "react"
import { Box, Text, useInput } from "ink"
import Spinner from "ink-spinner"

import { useState } from "react"

import { agent } from "../runtime/agent.js"
import { PromptInput } from "./components/prompt-input.js"
import { Separator } from "./components/separator.js"

export function App() {
	const [output, setOutput] = useState("")
	const [mode, setMode] = useState<"plan" | "build">("build")
	const [isLoading, setIsLoading] = useState(false)

	const colorMode = mode === "build" ? "#8e51ff" : "#efb100"
	const textMode = mode === "build" ? "Build" : "Plan"

	async function handlePromptSubmit(prompt: string) {
		if (!prompt) return

		setIsLoading(true)

		const result = await agent(prompt, mode)

		setOutput(result.text)
		setIsLoading(false)
	}

	useInput((_, key) => {
		if (key.tab) {
			setMode((prev) => (prev === "plan" ? "build" : "plan"))
		}
	})

	return (
		<Box flexDirection="column" gap={1}>
			<Box borderStyle="round" borderColor="#8e51ff" alignSelf="flex-start">
				<Box flexDirection="column" alignItems="center" padding={1}>
					<Text bold>Welcome to Simple Harness!</Text>

					<Text color="#8e51ff" dimColor>{`
▀▄   ▄▀
 ▄█▀███▀█▄
█▀███████▀█
█ █▀▀▀▀▀█ █
  ▀▀   ▀▀`}</Text>

					<Text color="gray">Step-3.7-flash</Text>
					<Text color="gray">Agent based Harness</Text>
				</Box>
			</Box>

			<Separator title="Make your tests here!" char="=" padding={0} />

			<Box flexDirection="column">
				<Box borderStyle="round" borderColor="gray" paddingX={1}>
					<PromptInput onSubmit={handlePromptSubmit} />
				</Box>

				<Box gap={1}>
					<Text color="gray">Mode:</Text>
					<Text color={colorMode}>{textMode}</Text>
					<Text color="gray">(tab for change mode)</Text>
				</Box>
			</Box>

			{isLoading && <Spinner />}

			<Text dimColor>{output}</Text>
		</Box>
	)
}
