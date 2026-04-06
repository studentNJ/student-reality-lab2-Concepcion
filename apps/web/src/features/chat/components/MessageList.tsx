import type { ChatMessage } from "@web/lib/chat-types";
import { ChartResultCard } from "./ChartResultCard";
import { EmptyState } from "./EmptyState";
import { MessageBubble } from "./MessageBubble";
import { SourceCard } from "./SourceCard";
import { ToolCallCard } from "./ToolCallCard";

interface MessageListProps {
  messages: ChatMessage[];
}

export function MessageList({ messages }: MessageListProps) {
  const showToolCards = process.env.NODE_ENV !== "production";

  if (messages.length === 0) {
    return (
      <section className="message-list" aria-label="Conversation">
        <EmptyState
          description="Ask for a metro trend, a yearly comparison, an affordability estimate, or the current data source status. Charts and tool output will appear inline with the response."
          title="Start with a metro, a scenario, or a chart request."
        />
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
          {(message.sources ?? []).map((source, index) => (
            <SourceCard key={`${message.id}-source-${source.title}-${index}`} source={source} />
          ))}
          {(message.chartSpecs ?? (message.chartSpec ? [message.chartSpec] : [])).map((chartSpec, index) => (
            <ChartResultCard chartSpec={chartSpec} key={`${message.id}-chart-${chartSpec.title}-${index}`} />
          ))}
        </div>
      ))}
    </section>
  );
}