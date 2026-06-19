import "react"
import { Text } from "ink"

type SeparatorProps = {
	char?: string
}

export function Separator({ char = "─" }: SeparatorProps) {
	const width = process.stdout.columns

	return <Text color="gray">{char.repeat(width)}</Text>
}
