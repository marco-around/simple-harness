import { exec } from "node:child_process"
import { promisify } from "node:util"
import { tool } from "ai"
import z from "zod"

const execAsync = promisify(exec)

export const runCommand = tool({
	description: "Runs a command in the terminal",
	needsApproval: true,
	inputSchema: z.object({
		command: z.string(),
	}),
	execute: async ({ command }) => {
		try {
			const { stdout, stderr } = await execAsync(command)

			return {
				stdout,
				stderr,
			}
		} catch (error) {
			return { error: error instanceof Error ? error.message : String(error) }
		}
	},
})
