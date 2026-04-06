"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@web/lib/chat-types";
import { ChartResultCard } from "./ChartResultCard";
import { EmptyState } from "./EmptyState";
import { MessageBubble } from "./MessageBubble";
import { SourceCard } from "./SourceCard";
import { ToolCallCard } from "./ToolCallCard";

interface MessageListProps {
  messages: ChatMessage[];
}

const autoFollowThreshold = 180;

function isNearBottom(): boolean {
  const documentElement = document.documentElement;
  const remainingDistance = documentElement.scrollHeight - (window.scrollY + window.innerHeight);

  return remainingDistance <= autoFollowThreshold;
}

export function MessageList({ messages }: MessageListProps) {
  const showToolCards = process.env.NODE_ENV !== "production";
  const endRef = useRef<HTMLDivElement | null>(null);
  const shouldAutoFollowRef = useRef(true);
  const previousMessageCountRef = useRef(messages.length);
  const [showJumpToLatest, setShowJumpToLatest] = useState(false);
  const [showJumpToPrompt, setShowJumpToPrompt] = useState(false);

  function scrollToLatest(behavior: ScrollBehavior) {
    endRef.current?.scrollIntoView({
      block: "end",
      behavior,
    });
  }

  function scrollToPrompt(behavior: ScrollBehavior) {
    document.querySelector(".prompt-box-shell")?.scrollIntoView({
      block: "start",
      behavior,
    });
  }

  useEffect(() => {
    const updateAutoFollow = () => {
      const nearBottom = isNearBottom();
      const promptBox = document.querySelector(".prompt-box-shell");
      const promptRect = promptBox?.getBoundingClientRect();
      const promptVisible = promptRect
        ? promptRect.top < window.innerHeight && promptRect.bottom > 0
        : true;

      shouldAutoFollowRef.current = nearBottom;
      setShowJumpToPrompt(!promptVisible);

      if (nearBottom) {
        setShowJumpToLatest(false);
      }
    };

    updateAutoFollow();
    window.addEventListener("scroll", updateAutoFollow, { passive: true });
    window.addEventListener("resize", updateAutoFollow);

    return () => {
      window.removeEventListener("scroll", updateAutoFollow);
      window.removeEventListener("resize", updateAutoFollow);
    };
  }, []);

  useEffect(() => {
    if (messages.length === 0) {
      previousMessageCountRef.current = messages.length;
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!shouldAutoFollowRef.current) {
      if (messages.length > previousMessageCountRef.current) {
        setShowJumpToLatest(true);
      }

      previousMessageCountRef.current = messages.length;
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      scrollToLatest(prefersReducedMotion ? "auto" : "smooth");
    });

    previousMessageCountRef.current = messages.length;

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [messages]);

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
      {showJumpToLatest || showJumpToPrompt ? (
        <div className="thread-jump-controls">
          {showJumpToLatest ? (
            <button
              className="jump-control jump-to-latest"
              onClick={() => {
                const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

                shouldAutoFollowRef.current = true;
                setShowJumpToLatest(false);
                scrollToLatest(prefersReducedMotion ? "auto" : "smooth");
              }}
              type="button"
            >
              Jump to latest
            </button>
          ) : null}
          {showJumpToPrompt ? (
            <button
              className="jump-control jump-to-prompt"
              onClick={() => {
                const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

                scrollToPrompt(prefersReducedMotion ? "auto" : "smooth");
              }}
              type="button"
            >
              Jump to prompt
            </button>
          ) : null}
        </div>
      ) : null}
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
      <div aria-hidden="true" ref={endRef} />
    </section>
  );
}