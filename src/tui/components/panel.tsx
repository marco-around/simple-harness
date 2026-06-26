import { Box, Text } from "ink"

const asciiArt = `
▀▄   ▄▀
 ▄█▀███▀█▄
█▀███████▀█
█ █▀▀▀▀▀█ █
  ▀▀   ▀▀`

export function Panel() {
	return (
		<Box borderStyle="round" borderColor="#8e51ff" alignSelf="flex-start">
			<Box flexDirection="column" alignItems="center" padding={1}>
				<Text bold>Welcome to Simple Harness!</Text>

				<Text color="#8e51ff" dimColor>
					{asciiArt}
				</Text>

				<Text color="gray">Step-3.7-flash</Text>
				<Text color="gray">Agent based Harness</Text>
			</Box>
		</Box>
	)
}
