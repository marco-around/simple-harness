import fs from "node:fs/promises"
import { tool } from "ai"
import z from "zod"

export const listFiles = tool({
	description: "Lists the files in the current directory",
	inputSchema: z.object({
		path: z.string(),
	}),
	execute: async ({ path }) => {
		try {
			const files = await fs.readdir(path)
			return { files }
		} catch (error) {
			return { error: error instanceof Error ? error.message : String(error) }
		}
	},
})
