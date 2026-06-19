import "react"
import { Box, Text, useInput } from "ink"
import { useEffect, useRef, useState } from "react"

type InputProps = {
	placeholder?: string
	isFocused?: boolean
	onSubmit?: (value: string) => void
	onChange?: (value: string) => void
}

export function Input({
	placeholder,
	isFocused = true,
	onSubmit,
	onChange,
}: InputProps) {
	const [value, setValue] = useState("")
	const [cursor, setCursor] = useState(0)

	const [cursorVisible, setCursorVisible] = useState(true)

	const valueRef = useRef(value)
	valueRef.current = value
	const cursorRef = useRef(cursor)
	cursorRef.current = cursor

	useEffect(() => {
		setCursorVisible(true)
	}, [])

	useEffect(() => {
		if (!isFocused) return
		const id = setInterval(() => {
			setCursorVisible((prev) => !prev)
		}, 500)
		return () => clearInterval(id)
	}, [isFocused])

	useInput(
		(input, key) => {
			const val = valueRef.current
			const cur = cursorRef.current

			if (key.return) {
				onSubmit?.(val)
				return
			}

			if (key.escape) {
				setValue("")
				setCursor(0)
				onChange?.("")
				return
			}

			if (key.ctrl && input === "u") {
				setValue("")
				setCursor(0)
				onChange?.("")
				return
			}

			if (key.leftArrow) {
				setCursor(Math.max(0, cur - 1))
				return
			}

			if (key.rightArrow) {
				setCursor(Math.min(val.length, cur + 1))
				return
			}

			if (key.backspace || key.delete) {
				if (cur > 0) {
					const next = val.slice(0, cur - 1) + val.slice(cur)
					setValue(next)
					setCursor(cur - 1)
					onChange?.(next)
				}
				return
			}

			if (input) {
				const next = val.slice(0, cur) + input + val.slice(cur)
				setValue(next)
				setCursor(cur + input.length)
				onChange?.(next)
			}
		},
		{ isActive: isFocused }
	)

	const isEmpty = value.length === 0

	return (
		<Box flexDirection="row" width={process.stdout.columns}>
			<Text bold color={isFocused ? "cyan" : undefined}>
				{"> "}
			</Text>

			{isEmpty &&
				(isFocused ? (
					<>
						<Text inverse={cursorVisible}>{placeholder?.[0] ?? " "}</Text>
						<Text dimColor>{placeholder?.slice(1)}</Text>
					</>
				) : (
					<Text dimColor>{placeholder}</Text>
				))}

			{!isEmpty && (
				<>
					<Text>{value.slice(0, cursor)}</Text>
					{isFocused && (
						<Text inverse={cursorVisible}>{value[cursor] ?? " "}</Text>
					)}
					<Text>{value.slice(cursor + (isFocused ? 1 : 0))}</Text>
				</>
			)}
		</Box>
	)
}
