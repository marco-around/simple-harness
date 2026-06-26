import type { ApprovalItem } from "../hooks/use-agent.js"

export function toApprovalItem(request: {
	approvalId: string
	toolCall: { toolName: string; input: unknown }
}): ApprovalItem {
	return {
		approvalId: request.approvalId,
		toolName: request.toolCall.toolName,
		toolInput: request.toolCall.input as Record<string, unknown>,
	}
}
