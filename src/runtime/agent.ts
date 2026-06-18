import { generateText, type ModelMessage, stepCountIs } from "ai"
import { nim } from "../llm/provider.js"
import { tools } from "../tools/index.js"

const INTERACTIONS_LIMIT = 25

const SYSTEM_PROMPT = `
You are a software engineer agent.

Rules:

- Read files before editing them
- Prefer minimal changes
- Run tests when possible
- Never assume file contents
`

export async function agent(prompt: string) {
	const messages: ModelMessage[] = [
		{
			role: "user",
			content: prompt,
		},
	]

	const result = await generateText({
		model: nim.chatModel("stepfun-ai/step-3.7-flash"),
		tools,
		system: SYSTEM_PROMPT,
		messages,
		stopWhen: stepCountIs(INTERACTIONS_LIMIT),
	})

	return result
}
