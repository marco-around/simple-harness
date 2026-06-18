import fs from "node:fs/promises"
import { tool } from "ai"
import z from "zod"

export const listFiles = tool({
	description: "Lists the files in the current directory",
	inputSchema: z.object({}),
	execute: async () => {
		try {
			const files = await fs.readdir(".")
			return { files }
		} catch (error) {
			return { error }
		}
	},
})
