import { createOpenAICompatible } from "@ai-sdk/openai-compatible"
import { env } from "../env.js"

export const nim = createOpenAICompatible({
	name: "nim",
	baseURL: env.NIM_BASE_URL,
	apiKey: env.NIM_API_KEY,
})
