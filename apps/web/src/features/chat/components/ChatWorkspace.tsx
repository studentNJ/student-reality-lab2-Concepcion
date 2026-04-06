import type { ReactNode } from "react";

interface ChatWorkspaceProps {
  conversation: ReactNode;
  composer: ReactNode;
  context: ReactNode;
}

export function ChatWorkspace({ conversation, composer, context }: ChatWorkspaceProps) {
  return (
    <section className="workspace-shell" aria-label="Analysis workspace">
      <div className="workspace-main-panel">
        <div className="workspace-heading">
          <p className="workspace-eyebrow">Research thread</p>
          <h2>Conversation-linked analysis</h2>
          <p className="workspace-copy">Answers, tool traces, and chart outputs stay grouped under the question that produced them.</p>
        </div>
        <div className="workspace-thread">{conversation}</div>
        {composer}
      </div>
      <aside className="workspace-context-panel" aria-label="Workspace context">
        {context}
      </aside>
    </section>
  );
}