import { z } from "zod"

const envSchema = z.object({
	NIM_API_KEY: z.string(),
	NIM_BASE_URL: z.string(),
})

export const env = envSchema.parse(process.env)
