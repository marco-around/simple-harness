import { listFiles } from "./list-files.js"
import { readFile } from "./read-file.js"
import { runCommand } from "./run-command.js"
import { writeFile } from "./write-file.js"

export const readOnlyTools = {
	readFile,
	listFiles,
}

export const allTools = {
	readFile,
	listFiles,
	writeFile,
	runCommand,
}
