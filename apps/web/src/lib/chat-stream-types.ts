import type { ChartSpec } from "@student-reality-lab/shared";
import type { ChatMessage, SourceNote, ToolCallSummary } from "@web/lib/chat-types";
import type { SupportedToolName } from "@web/lib/ai/tool-runner";

export interface ChatStreamMeta {
  conversationId?: string;
  planner: "model" | "fallback";
  intent: string;
}

export type ChatStreamEvent =
  | { type: "meta"; meta: ChatStreamMeta }
  | { type: "status"; content: string }
  | { type: "tool-start"; toolName: SupportedToolName; input?: Record<string, unknown> }
  | { type: "tool-complete"; toolCall: ToolCallSummary }
  | { type: "artifact"; chartSpec?: ChartSpec; sources?: SourceNote[] }
  | { type: "final"; message: ChatMessage; meta: ChatStreamMeta }
  | { type: "error"; content: string; meta?: Partial<ChatStreamMeta> };