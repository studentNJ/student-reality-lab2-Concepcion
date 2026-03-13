import type { ToolCallSummary } from "@web/lib/chat-types";

interface ToolCallCardProps {
  toolCall: ToolCallSummary;
}

export function ToolCallCard({ toolCall }: ToolCallCardProps) {
  return (
    <section className="artifact-card tool-card">
      <div className="artifact-header">
        <span className="artifact-label">Tool</span>
        <span className={`status-chip status-${toolCall.status}`}>{toolCall.status}</span>
      </div>
      <h3>{toolCall.toolName}</h3>
      <p>{toolCall.summary}</p>
      {toolCall.input ? (
        <pre className="artifact-pre">{JSON.stringify(toolCall.input, null, 2)}</pre>
      ) : null}
    </section>
  );
}