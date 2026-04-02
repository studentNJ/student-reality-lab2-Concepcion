import { retrieveConversationHistory } from "@student-reality-lab/db";
import {
  conversationHistoryRequestSchema,
  conversationHistoryResponseDataSchema,
} from "@student-reality-lab/shared";
import {
  createToolFailure,
  createToolSuccess,
  normalizeErrorMessage,
  type ToolResult,
} from "./tool-result.js";

const toolName = "retrieve_conversation_history";

export async function retrieveConversationHistoryTool(input: unknown): Promise<ToolResult<{
  conversationId: string;
  totalMessages: number;
  messages: Array<{
    id: string;
    role: "user" | "assistant";
    state?: string;
    content: string;
    planner?: string;
    intent?: string;
    hasChartSpec: boolean;
    createdAt: string;
    toolCalls?: Array<{
      toolName: string;
      status: "success" | "error" | "pending";
      summary: string;
      input?: Record<string, unknown>;
    }>;
  }>;
}>> {
  try {
    const validated = conversationHistoryRequestSchema.parse(input);
    const conversation = await retrieveConversationHistory(validated);

    if (!conversation) {
      return createToolFailure(
        toolName,
        "CONVERSATION_NOT_FOUND",
        `Conversation ${validated.conversationId} was not found.`,
      );
    }

    const data = conversationHistoryResponseDataSchema.parse(conversation);
    return createToolSuccess(toolName, data);
  } catch (error) {
    return createToolFailure(toolName, "RETRIEVE_CONVERSATION_HISTORY_FAILED", normalizeErrorMessage(error));
  }
}