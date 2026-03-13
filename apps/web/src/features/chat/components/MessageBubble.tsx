import type { ChatMessage } from "@web/lib/chat-types";

interface MessageBubbleProps {
  message: ChatMessage;
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
        <p className="message-content">{message.content}</p>
      )}
    </article>
  );
}