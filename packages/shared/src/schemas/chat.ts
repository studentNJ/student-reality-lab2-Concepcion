import { z } from "zod";

export const persistedToolCallSchema = z.object({
  toolName: z.string().min(1),
  status: z.enum(["success", "error", "pending"]),
  summary: z.string().min(1),
  input: z.record(z.string(), z.unknown()).optional(),
});

export const conversationHistoryRequestSchema = z.object({
  conversationId: z.string().min(1),
  limit: z.number().int().positive().optional(),
  includeToolCalls: z.boolean().optional(),
});

export const persistedChatMessageSchema = z.object({
  id: z.string().min(1),
  role: z.enum(["user", "assistant"]),
  state: z.string().optional(),
  content: z.string(),
  planner: z.string().optional(),
  intent: z.string().optional(),
  hasChartSpec: z.boolean(),
  createdAt: z.string().min(1),
  toolCalls: z.array(persistedToolCallSchema).optional(),
});

export const conversationHistoryResponseDataSchema = z.object({
  conversationId: z.string().min(1),
  totalMessages: z.number().int().nonnegative(),
  messages: z.array(persistedChatMessageSchema),
});

export type PersistedToolCall = z.infer<typeof persistedToolCallSchema>;
export type ConversationHistoryRequest = z.infer<typeof conversationHistoryRequestSchema>;
export type PersistedChatMessage = z.infer<typeof persistedChatMessageSchema>;
export type ConversationHistoryResponseData = z.infer<typeof conversationHistoryResponseDataSchema>;