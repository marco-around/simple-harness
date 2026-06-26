export function formatToolCall(
	toolName: string,
	input: Record<string, unknown>
) {
	if (toolName === "writeFile") return `Write to ${input.path}`
	if (toolName === "runCommand") return `Execute: ${input.command}`
	return `Use ${toolName}`
}
