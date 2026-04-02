import { getPrismaClient } from "../client.js";

export interface RetrieveConversationHistoryInput {
  conversationId: string;
  limit?: number;
  includeToolCalls?: boolean;
}

export interface RetrievedToolCall {
  toolName: string;
  status: "success" | "error" | "pending";
  summary: string;
  input?: Record<string, unknown>;
}

export interface RetrievedMessage {
  id: string;
  role: "user" | "assistant";
  state?: string;
  content: string;
  planner?: string;
  intent?: string;
  hasChartSpec: boolean;
  createdAt: string;
  toolCalls?: RetrievedToolCall[];
}

export interface RetrieveConversationHistoryResult {
  conversationId: string;
  totalMessages: number;
  messages: RetrievedMessage[];
}

function parseToolInput(input: string | null): Record<string, unknown> | undefined {
  if (!input) {
    return undefined;
  }

  try {
    const parsed = JSON.parse(input) as unknown;
    return typeof parsed === "object" && parsed !== null ? parsed as Record<string, unknown> : undefined;
  } catch {
    return undefined;
  }
}

export async function retrieveConversationHistory(
  input: RetrieveConversationHistoryInput,
): Promise<RetrieveConversationHistoryResult | null> {
  const prisma = getPrismaClient();
  const conversation = await prisma.conversation.findUnique({
    where: { id: input.conversationId },
    select: { id: true },
  });

  if (!conversation) {
    return null;
  }

  const records = await prisma.message.findMany({
    where: { conversationId: input.conversationId },
    orderBy: { sequence: "asc" },
    include: {
      toolCalls: {
        orderBy: { sequence: "asc" },
      },
    },
  });

  const slicedRecords = input.limit ? records.slice(-input.limit) : records;

  return {
    conversationId: input.conversationId,
    totalMessages: records.length,
    messages: slicedRecords.map((record) => ({
      id: record.id,
      role: record.role === "assistant" ? "assistant" : "user",
      state: record.state ?? undefined,
      content: record.content,
      planner: record.planner ?? undefined,
      intent: record.intent ?? undefined,
      hasChartSpec: record.chartSpec !== null,
      createdAt: record.createdAt.toISOString(),
      toolCalls: input.includeToolCalls
        ? record.toolCalls.map((toolCall) => ({
            toolName: toolCall.toolName,
            status: toolCall.status === "error"
              ? "error"
              : toolCall.status === "pending"
                ? "pending"
                : "success",
            summary: toolCall.summary,
            input: parseToolInput(toolCall.input),
          }))
        : undefined,
    })),
  };
}