import type { ChatMessage } from "@web/lib/chat-types";
import type { ReactNode } from "react";

interface MessageBubbleProps {
  message: ChatMessage;
}

function renderMessageContent(content: string): ReactNode {
  const sections = content
    .split(/\n\s*\n/)
    .map((section) => section.trim())
    .filter(Boolean);

  return sections.map((section, index) => {
    const lines = section.split("\n").map((line) => line.trim()).filter(Boolean);
    const isList = lines.length > 1 && lines.every((line) => line.startsWith("- "));

    if (isList) {
      return (
        <ul className="message-list-block" key={`${section}-${index}`}>
          {lines.map((line) => (
            <li key={line}>{line.slice(2)}</li>
          ))}
        </ul>
      );
    }

    return <p className="message-content" key={`${section}-${index}`}>{section}</p>;
  });
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isLoading = message.state === "loading";
  const isError = message.state === "error";

  return (
    <article
      className={
        message.role === "user"
          ? "message message-user"
          : `message message-assistant${isLoading ? " message-loading" : ""}${isError ? " message-error" : ""}`
      }
    >
      <div className="message-meta">
        {message.role === "user" ? "You" : "Assistant"}
        {isLoading ? " • Working" : null}
        {isError ? " • Needs attention" : null}
      </div>
      {isLoading ? (
        <div className="loading-block">
          {message.content ? <p className="message-content loading-copy">{message.content}</p> : null}
          <div className="typing-indicator" aria-label="Assistant is responding">
            <span />
            <span />
            <span />
          </div>
        </div>
      ) : (
        <div className="message-body">{renderMessageContent(message.content)}</div>
      )}
    </article>
  );
}