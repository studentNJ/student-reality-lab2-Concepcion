import type { ChartSpec } from "@student-reality-lab/shared";

export interface ToolCallSummary {
  toolName: string;
  status: "success" | "error" | "pending";
  summary: string;
  input?: Record<string, unknown>;
}

export interface SourceNote {
  kind: "source" | "method" | "scope";
  title: string;
  detail: string;
  cue?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  state?: "complete" | "loading" | "error";
  toolCall?: ToolCallSummary;
  toolCalls?: ToolCallSummary[];
  chartSpec?: ChartSpec;
  chartSpecs?: ChartSpec[];
  sources?: SourceNote[];
}