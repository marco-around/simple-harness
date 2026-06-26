import fs from "node:fs/promises"
import { tool } from "ai"
import z from "zod"

export const writeFile = tool({
	description: "Writes a file at the given path",
	needsApproval: true,
	inputSchema: z.object({
		path: z.string(),
		content: z.string(),
	}),

	execute: async ({ path, content }) => {
		try {
			await fs.writeFile(path, content)

			return {
				path,
				message: "file written successfully",
			}
		} catch (error) {
			return { error: error instanceof Error ? error.message : String(error) }
		}
	},
})
