"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatStreamEvent } from "@web/lib/chat-stream-types";
import type { ChatMessage } from "@web/lib/chat-types";
import { AppShell } from "./AppShell";
import { ChatWorkspace } from "./ChatWorkspace";
import { HeaderBar } from "./HeaderBar";
import { HeroIntro } from "./HeroIntro";
import { MessageList } from "./MessageList";
import { PromptBox } from "./PromptBox";

const starterPrompts = [
  "Show a rent burden trend chart for Chicago.",
  "Compare metro affordability for 2024.",
  "Estimate whether a $72,000 salary can afford rent.",
  "What context are you using right now?",
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

  if (normalizedPrompt.includes("context") || normalizedPrompt.includes("transparency") || normalizedPrompt.includes("session state")) {
    return "Summarizing the saved conversation context and packaging the supporting notes in chat.";
  }

  return "Planning the request and gathering the tool output needed for the answer.";
}

export function ChatShell() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isPending, setIsPending] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState<ChatMessage | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [plannerMode, setPlannerMode] = useState<"live-api" | "model" | "fallback">("live-api");
  const streamAbortRef = useRef<AbortController | null>(null);
  const activeStreamRequestIdRef = useRef(0);
  const visibleMessages = isPending && streamingMessage ? [...messages, streamingMessage] : messages;

  function createPendingMessage(prompt: string): ChatMessage {
    return {
      id: "assistant-pending",
      role: "assistant",
      state: "loading",
      content: buildPendingContent(prompt),
      toolCalls: [],
      chartSpecs: [],
      sources: [],
    };
  }

  useEffect(() => {
    return () => {
      streamAbortRef.current?.abort();
    };
  }, []);

  async function consumeEventStream(response: Response, onEvent: (event: ChatStreamEvent) => void | Promise<void>) {
    if (!response.body) {
      throw new Error("Streaming response body is unavailable.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      buffer += decoder.decode(value, { stream: true });

      while (buffer.includes("\n\n")) {
        const boundary = buffer.indexOf("\n\n");
        const frame = buffer.slice(0, boundary);
        buffer = buffer.slice(boundary + 2);

        const data = frame
          .split("\n")
          .filter((line) => line.startsWith("data: "))
          .map((line) => line.slice(6))
          .join("\n");

        if (!data) {
          continue;
        }

        await onEvent(JSON.parse(data) as ChatStreamEvent);
      }
    }
  }

  async function requestJsonFallback(prompt: string, nextMessages: ChatMessage[]) {
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
  }

  async function handleSubmit(prompt: string) {
    streamAbortRef.current?.abort();
    const abortController = new AbortController();
    streamAbortRef.current = abortController;
    activeStreamRequestIdRef.current += 1;
    const requestId = activeStreamRequestIdRef.current;

    const userMessage: ChatMessage = {
      id: `user-${crypto.randomUUID()}`,
      role: "user",
      state: "complete",
      content: prompt,
    };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setIsPending(true);
    setStreamingMessage(createPendingMessage(prompt));

    try {
      let receivedFinalEvent = false;
      let receivedErrorEvent = false;

      const response = await fetch("/api/chat/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId,
          prompt,
          history: nextMessages.map((message) => ({ role: message.role, content: message.content })),
        }),
        signal: abortController.signal,
      });

      if (!response.ok || !response.headers.get("content-type")?.includes("text/event-stream")) {
        setStreamingMessage(null);
        await requestJsonFallback(prompt, nextMessages);
        return;
      }

      await consumeEventStream(response, async (event) => {
        if (requestId !== activeStreamRequestIdRef.current) {
          return;
        }

        switch (event.type) {
          case "meta":
            setConversationId((currentConversationId) => event.meta.conversationId ?? currentConversationId);
            setPlannerMode(event.meta.planner);
            break;
          case "status":
            setStreamingMessage((currentMessage) => currentMessage
              ? {
                  ...currentMessage,
                  content: event.content,
                }
              : currentMessage);
            break;
          case "tool-start":
            setStreamingMessage((currentMessage) => currentMessage
              ? {
                  ...currentMessage,
                  toolCalls: [
                    ...(currentMessage.toolCalls ?? []),
                    {
                      toolName: event.toolName,
                      status: "pending",
                      summary: `Running ${event.toolName}.`,
                      input: event.input,
                    },
                  ],
                }
              : currentMessage);
            break;
          case "tool-complete":
            setStreamingMessage((currentMessage) => currentMessage
              ? {
                  ...currentMessage,
                  toolCalls: (() => {
                    const existingToolCalls = currentMessage.toolCalls ?? [];
                    const pendingIndex = existingToolCalls.findIndex((toolCall) => {
                      if (toolCall.status !== "pending" || toolCall.toolName !== event.toolCall.toolName) {
                        return false;
                      }

                      return JSON.stringify(toolCall.input ?? null) === JSON.stringify(event.toolCall.input ?? null);
                    });

                    if (pendingIndex === -1) {
                      return [...existingToolCalls, event.toolCall];
                    }

                    return existingToolCalls.map((toolCall, index) => index === pendingIndex ? event.toolCall : toolCall);
                  })(),
                }
              : currentMessage);
            break;
          case "artifact":
            setStreamingMessage((currentMessage) => currentMessage
              ? {
                  ...currentMessage,
                  chartSpecs: event.chartSpec ? [...(currentMessage.chartSpecs ?? []), event.chartSpec] : currentMessage.chartSpecs,
                  sources: event.sources ? [...(currentMessage.sources ?? []), ...event.sources] : currentMessage.sources,
                }
              : currentMessage);
            break;
          case "final":
            receivedFinalEvent = true;
            setMessages((currentMessages) => [...currentMessages, event.message]);
            setConversationId((currentConversationId) => event.meta.conversationId ?? currentConversationId);
            setPlannerMode(event.meta.planner);
            setStreamingMessage(null);
            break;
          case "error":
            receivedErrorEvent = true;
            setMessages((currentMessages) => [
              ...currentMessages,
              {
                id: `assistant-${crypto.randomUUID()}`,
                role: "assistant",
                state: "error",
                content: event.content,
              },
            ]);
            setStreamingMessage(null);
            if (event.meta?.planner) {
              setPlannerMode(event.meta.planner);
            }
            if (event.meta?.conversationId) {
              setConversationId(event.meta.conversationId);
            }
            break;
        }
      });

      if (!receivedFinalEvent && !receivedErrorEvent) {
        throw new Error("Streaming response ended before the final event.");
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: `assistant-${crypto.randomUUID()}`,
          role: "assistant",
          state: "error",
          content: "The chat request failed before a response was returned.",
        },
      ]);
      setStreamingMessage(null);
      setPlannerMode("fallback");
    } finally {
      if (requestId === activeStreamRequestIdRef.current) {
        setIsPending(false);
        setStreamingMessage(null);
        if (streamAbortRef.current === abortController) {
          streamAbortRef.current = null;
        }
      }
    }
  }

  return (
    <AppShell
      header={<HeaderBar />}
      hero={<HeroIntro onPromptSelect={handleSubmit} suggestions={starterPrompts} />}
    >
      <ChatWorkspace
        composer={<PromptBox disabled={isPending} onSubmit={handleSubmit} />}
        conversation={<MessageList messages={visibleMessages} />}
      />
    </AppShell>
  );
}