import { generateText, type ModelMessage, stepCountIs } from "ai"
import { nim } from "../llm/provider.js"
import { BUILD_SYSTEM_PROMPT, PLAN_SYSTEM_PROMPT } from "../prompts/system.js"
import { allTools, readOnlyTools } from "../tools/index.js"

const INTERACTIONS_LIMIT = 25

export type Mode = "plan" | "build"

export async function agent(prompt: string, mode: Mode) {
	const tools = mode === "plan" ? readOnlyTools : allTools
	const system = mode === "plan" ? PLAN_SYSTEM_PROMPT : BUILD_SYSTEM_PROMPT

	const messages: ModelMessage[] = [
		{
			role: "user",
			content: prompt,
		},
	]

	const result = await generateText({
		model: nim.chatModel("stepfun-ai/step-3.7-flash"),
		tools,
		system,
		messages,
		stopWhen: stepCountIs(INTERACTIONS_LIMIT),
	})

	return result
}
