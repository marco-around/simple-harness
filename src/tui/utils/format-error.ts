export function formatError(error: unknown): string {
	const message = error instanceof Error ? error.message : "Unknown error"
	const cause = error instanceof Error ? error.cause : undefined
	const details = cause ? `\nDetails: ${JSON.stringify(cause, null, 2)}` : ""
	return `Error: ${message}${details}`
}
