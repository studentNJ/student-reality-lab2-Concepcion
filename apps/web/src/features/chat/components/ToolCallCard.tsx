import type { ToolCallSummary } from "@web/lib/chat-types";
import { AnalysisCard } from "./AnalysisCard";

interface ToolCallCardProps {
  toolCall: ToolCallSummary;
}

export function ToolCallCard({ toolCall }: ToolCallCardProps) {
  return (
    <AnalysisCard className="tool-card" label="Tool trace" status={toolCall.status}>
      <h3>{toolCall.toolName}</h3>
      <p>{toolCall.summary}</p>
      <p className="artifact-description">This execution record stays attached to the assistant answer so the analysis remains inspectable.</p>
      {toolCall.input ? (
        <pre className="artifact-pre">{JSON.stringify(toolCall.input, null, 2)}</pre>
      ) : null}
    </AnalysisCard>
  );
}