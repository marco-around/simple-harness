import fs from "node:fs/promises"
import { tool } from "ai"
import z from "zod"

export const readFile = tool({
	description: "Reads the content of a file at the given path",
	inputSchema: z.object({
		path: z.string(),
	}),

	execute: async ({ path }) => {
		try {
			const content = await fs.readFile(path, "utf-8")
			return { content }
		} catch (error) {
			return { error }
		}
	},
})
