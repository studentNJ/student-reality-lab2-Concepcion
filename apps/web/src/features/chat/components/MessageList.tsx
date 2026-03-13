import type { ChatMessage } from "@web/lib/chat-types";
import { ChartResultCard } from "./ChartResultCard";
import { MessageBubble } from "./MessageBubble";
import { ToolCallCard } from "./ToolCallCard";

interface MessageListProps {
  messages: ChatMessage[];
}

export function MessageList({ messages }: MessageListProps) {
  const showToolCards = process.env.NODE_ENV !== "production";

  if (messages.length === 0) {
    return (
      <section className="message-list" aria-label="Conversation">
        <div className="empty-state">
          <p className="empty-state-eyebrow">Conversation</p>
          <h2>Start with a metro, a scenario, or a chart request.</h2>
          <p>The Phase 5 interface is ready to display assistant text, tool results, and chart specs in one stream.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="message-list" aria-label="Conversation">
      {messages.map((message) => (
        <div className="message-stack" key={message.id}>
          <MessageBubble message={message} />
          {showToolCards
            ? (message.toolCalls ?? (message.toolCall ? [message.toolCall] : [])).map((toolCall, index) => (
                <ToolCallCard key={`${message.id}-${toolCall.toolName}-${index}`} toolCall={toolCall} />
              ))
            : null}
          {(message.chartSpecs ?? (message.chartSpec ? [message.chartSpec] : [])).map((chartSpec, index) => (
            <ChartResultCard chartSpec={chartSpec} key={`${message.id}-chart-${chartSpec.title}-${index}`} />
          ))}
        </div>
      ))}
    </section>
  );
}