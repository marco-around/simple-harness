import { stdin, stdout } from "node:process"
import readline from "node:readline/promises"
import "dotenv/config"

import { agent, type Mode } from "./runtime/agent.js"

const MODE: Mode = "plan"

const rl = readline.createInterface({
	input: stdin,
	output: stdout,
})

const prompt = await rl.question("> ")

const result = await agent(prompt, MODE)

console.log("\n")
console.log(result.text)

rl.close()
