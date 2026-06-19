import "react"
import { Text } from "ink"
import { useEffect, useState } from "react"

const spinners = {
	dots: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
	line: ["─", "\\", "│", "/"],
	arc: ["◜", "◠", "◝", "◞", "◡", "◟"],
	bounce: ["⠁", "⠂", "⠄", "⡀", "⢀", "⠠", "⠐", "⠈"],
} as const

type SpinnerType = keyof typeof spinners

type SpinnerProps = {
	type?: SpinnerType
	label?: string
	interval?: number
	color?: string
}

export function Spinner({
	type = "dots",
	label,
	interval = 80,
	color = "cyan",
}: SpinnerProps) {
	const frames = spinners[type]
	const [frame, setFrame] = useState(0)

	useEffect(() => {
		const id = setInterval(() => {
			setFrame((prev) => (prev + 1) % frames.length)
		}, interval)
		return () => clearInterval(id)
	}, [frames.length, interval])

	return (
		<Text>
			<Text color={color}>{frames[frame]}</Text>
			{label && <Text> {label}</Text>}
		</Text>
	)
}
