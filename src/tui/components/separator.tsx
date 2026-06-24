import "react"
import { Box, type BoxProps, Text, type TextProps } from "ink"

type SeparatorProps = {
	char?: string
	charColor?: TextProps["color"]
	width?: "auto" | number
	title?: string
	titlePadding?: number
	padding?: number
	titleColor?: BoxProps["borderColor"]
}

function BaseSeparator({
	width = "auto",
	charColor = "gray",
	char = "─",
}: SeparatorProps) {
	return (
		<Box
			width={width}
			borderColor={charColor}
			flexGrow={1}
			borderStyle={{
				topLeft: "",
				top: "",
				topRight: "",
				left: "",
				bottomLeft: "",
				bottom: char,
				bottomRight: "",
				right: "",
			}}
			borderBottom
			borderTop={false}
			borderRight={false}
			borderLeft={false}
		/>
	)
}

export function Separator({
	char = "─",
	charColor = "gray",
	title,
	titleColor,
	padding = 1,
	width = "auto",
	titlePadding = 1,
}: SeparatorProps) {
	if (!title)
		return (
			<Box paddingLeft={padding} paddingRight={padding}>
				<BaseSeparator width={width} charColor={charColor} char={char} />
			</Box>
		)

	return (
		<Box
			width={width}
			paddingLeft={padding}
			paddingRight={padding}
			gap={titlePadding}
		>
			<BaseSeparator width={width} charColor={charColor} char={char} />

			<Box>
				<Text dimColor color={titleColor}>
					{title}
				</Text>
			</Box>

			<BaseSeparator width={width} charColor={charColor} char={char} />
		</Box>
	)
}
