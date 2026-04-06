"use client";

import { useState } from "react";
import type { ChatMessage } from "@web/lib/chat-types";
import { AppShell } from "./AppShell";
import { ChatWorkspace } from "./ChatWorkspace";
import { HeaderBar } from "./HeaderBar";
import { HeroIntro } from "./HeroIntro";
import { InsightBadge } from "./InsightBadge";
import { MessageList } from "./MessageList";
import { PromptBox } from "./PromptBox";
import { WorkspaceContext } from "./WorkspaceContext";

const starterPrompts = [
  "Show a rent burden trend chart for Chicago.",
  "Compare metro affordability for 2024.",
  "Estimate whether a $72,000 salary can afford rent.",
  "What data source is the app using right now?",
];

const initialMessages: ChatMessage[] = [];

function buildPendingContent(prompt: string): string {
  const normalizedPrompt = prompt.toLowerCase();

  if (normalizedPrompt.includes("chart") || normalizedPrompt.includes("trend") || normalizedPrompt.includes("graph")) {
    return "Building the chart request, running the needed tools, and formatting the result.";
  }

  if (normalizedPrompt.includes("afford") || normalizedPrompt.includes("salary") || normalizedPrompt.includes("income")) {
    return "Calculating the affordability scenario and checking the requested metro context.";
  }

  if (normalizedPrompt.includes("source") || normalizedPrompt.includes("dataset") || normalizedPrompt.includes("status")) {
    return "Checking the current data source status and packaging the response.";
  }

  return "Planning the request and gathering the tool output needed for the answer.";
}

export function ChatShell() {
  const showToolCards = process.env.NODE_ENV !== "production";
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isPending, setIsPending] = useState(false);
  const [pendingContent, setPendingContent] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [plannerMode, setPlannerMode] = useState<"live-api" | "model" | "fallback">("live-api");
  const pendingMessage: ChatMessage = {
    id: "assistant-pending",
    role: "assistant",
    state: "loading",
    content: pendingContent,
  };

  const visibleMessages = isPending ? [...messages, pendingMessage] : messages;

  const successfulToolCalls = messages.reduce((count, message) => {
    const toolCalls = message.toolCalls ?? (message.toolCall ? [message.toolCall] : []);
    return count + toolCalls.filter((toolCall) => toolCall.status === "success").length;
  }, 0);
  const chartCount = messages.reduce((count, message) => {
    return count + (message.chartSpecs?.length ?? (message.chartSpec ? 1 : 0));
  }, 0);
  const hasErrors = messages.some((message) => {
    const toolCalls = message.toolCalls ?? (message.toolCall ? [message.toolCall] : []);
    return message.state === "error" || toolCalls.some((toolCall) => toolCall.status === "error");
  });
  const modeLabel = plannerMode === "live-api" ? "Live API" : plannerMode === "model" ? "Model plan" : "Fallback plan";
  const statusLabel = hasErrors ? "Needs review" : isPending ? "Working" : "Ready";

  async function handleSubmit(prompt: string) {
    const userMessage: ChatMessage = {
      id: `user-${crypto.randomUUID()}`,
      role: "user",
      state: "complete",
      content: prompt,
    };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setIsPending(true);
    setPendingContent(buildPendingContent(prompt));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId,
          prompt,
          history: nextMessages.map((message) => ({ role: message.role, content: message.content })),
        }),
      });

      const payload = await response.json() as {
        message?: ChatMessage;
        meta?: { conversationId?: string; planner?: "model" | "fallback"; intent?: string };
      };

      const assistantMessage = payload.message ?? {
        id: `assistant-${crypto.randomUUID()}`,
        role: "assistant",
        state: "error",
        content: "The chat API returned an unexpected response.",
      };

      if (!response.ok && assistantMessage.state !== "error") {
        assistantMessage.state = "error";
      }

      setMessages((currentMessages) => [...currentMessages, assistantMessage]);
      setConversationId((currentConversationId) => payload.meta?.conversationId ?? currentConversationId);
      setPlannerMode(payload.meta?.planner ?? "fallback");
    } catch {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: `assistant-${crypto.randomUUID()}`,
          role: "assistant",
          state: "error",
          content: "The chat request failed before a response was returned.",
        },
      ]);
      setPlannerMode("fallback");
    } finally {
      setIsPending(false);
      setPendingContent("");
    }
  }

  return (
    <AppShell
      header={
        <HeaderBar
          chartCount={chartCount}
          hasErrors={hasErrors}
          modeLabel={modeLabel}
          showToolCards={showToolCards}
          statusLabel={statusLabel}
          toolCount={successfulToolCalls}
        />
      }
      hero={<HeroIntro onPromptSelect={handleSubmit} suggestions={starterPrompts} />}
    >
      <ChatWorkspace
        composer={<PromptBox disabled={isPending} onSubmit={handleSubmit} />}
        context={<WorkspaceContext chartCount={chartCount} hasErrors={hasErrors} isPending={isPending} messages={messages} modeLabel={modeLabel} statusLabel={statusLabel} />}
        conversation={<MessageList messages={visibleMessages} />}
      />
    </AppShell>
  );
}