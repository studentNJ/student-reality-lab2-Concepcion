import { randomUUID } from "node:crypto";
import type { Prisma } from "@prisma/client";
import { getPrismaClient } from "../client.js";

interface PersistedToolCall {
  toolName: string;
  status: "success" | "error" | "pending";
  summary: string;
  input?: Record<string, unknown>;
}

interface PersistedAssistantMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  state?: "complete" | "loading" | "error";
  chartSpec?: unknown;
  toolCall?: PersistedToolCall;
  toolCalls?: PersistedToolCall[];
}

export interface SaveChatTurnInput {
  conversationId?: string;
  userPrompt: string;
  assistantMessage: PersistedAssistantMessage;
  planner: "model" | "fallback";
  intent: string;
}

export interface SaveChatTurnResult {
  conversationId: string;
}

function serializeToolInput(input: PersistedToolCall["input"]): string | null {
  return input ? JSON.stringify(input) : null;
}

function serializeChartSpec(message: PersistedAssistantMessage): string | null {
  return message.chartSpec ? JSON.stringify(message.chartSpec) : null;
}

export async function saveChatTurn(input: SaveChatTurnInput): Promise<SaveChatTurnResult> {
  const prisma = getPrismaClient();
  const conversationId = input.conversationId ?? randomUUID();

  await prisma.$transaction(async (transaction: Prisma.TransactionClient) => {
    const existingConversation = await transaction.conversation.findUnique({
      where: { id: conversationId },
      select: { id: true },
    });

    if (!existingConversation) {
      await transaction.conversation.create({
        data: { id: conversationId },
      });
    }

    const messageCount = await transaction.message.count({
      where: { conversationId },
    });

    const userMessageId = randomUUID();
    const assistantMessageId = input.assistantMessage.id || randomUUID();

    await transaction.message.create({
      data: {
        id: userMessageId,
        conversationId,
        role: "user",
        state: "complete",
        content: input.userPrompt,
        sequence: messageCount,
      },
    });

    await transaction.message.create({
      data: {
        id: assistantMessageId,
        conversationId,
        role: input.assistantMessage.role,
        state: input.assistantMessage.state ?? "complete",
        content: input.assistantMessage.content,
        planner: input.planner,
        intent: input.intent,
        chartSpec: serializeChartSpec(input.assistantMessage),
        sequence: messageCount + 1,
      },
    });

    const toolCalls = input.assistantMessage.toolCalls ?? (input.assistantMessage.toolCall ? [input.assistantMessage.toolCall] : []);

    if (toolCalls.length > 0) {
      await transaction.toolCall.createMany({
        data: toolCalls.map((toolCall, index) => ({
          id: randomUUID(),
          messageId: assistantMessageId,
          toolName: toolCall.toolName,
          status: toolCall.status,
          summary: toolCall.summary,
          input: serializeToolInput(toolCall.input),
          sequence: index,
        })),
      });
    }
  });

  return { conversationId };
}