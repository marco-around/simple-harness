import type { ChatEntry } from "../components/message-list.js"

export function getEntryStyles(role: ChatEntry["role"]) {
	if (role === "user") {
		return { label: "You >", color: "gray" }
	}

	if (role === "assistant") {
		return { label: "Agent >", color: "#8e51ff" }
	}

	if (role === "thought") {
		return { label: "*", color: "gray" }
	}

	return { label: "■", color: "#ffd460ff" }
}
