"use client";

import { startTransition, useState } from "react";
import type { ChartSpec } from "@student-reality-lab/shared";
import type { ChatMessage } from "@web/lib/chat-types";
import { MessageList } from "./MessageList";
import { PromptBox } from "./PromptBox";

const starterPrompts = [
  "Show a rent burden trend chart for Chicago.",
  "Compare metro affordability for 2024.",
  "Estimate whether a $72,000 salary can afford rent.",
];

function createDemoChartSpec(): ChartSpec {
  return {
    chartType: "metro_trend_line",
    title: "Chicago Rent Burden Trend",
    subtitle: "Demo chart spec returned by create_graph",
    description: "The chart card now reflects chart type, multiple series, narrative metadata, and annotations from the canonical graph contract.",
    axes: {
      x: { label: "Year", field: "year", type: "time", formatter: "integer" },
      y: { label: "Rent Burden (%)", field: "value", type: "number", formatter: "percent" },
    },
    series: [
      {
        id: "chicago",
        label: "Chicago",
        points: [
          { year: 2020, value: 28.54 },
          { year: 2021, value: 28.77 },
          { year: 2022, value: 29.0 },
          { year: 2023, value: 29.22 },
          { year: 2024, value: 29.43 },
        ],
      },
      {
        id: "national",
        label: "National",
        points: [
          { year: 2020, value: 29.12 },
          { year: 2021, value: 29.48 },
          { year: 2022, value: 29.79 },
          { year: 2023, value: 30.08 },
          { year: 2024, value: 30.36 },
        ],
      },
    ],
    annotations: [
      {
        type: "threshold",
        label: "30% affordability threshold",
        value: 30,
        field: "value",
      },
      {
        type: "callout",
        label: "Chicago remains below the threshold",
        seriesId: "chicago",
        pointIndex: 4,
      },
    ],
    formattingHints: {
      showLegend: true,
      showGrid: true,
      legendPosition: "bottom",
    },
    narrativeMeta: {
      summary: "Rent burden stays below 30%, but trends upward.",
      highestValue: { label: "2024", value: 29.43 },
      lowestValue: { label: "2020", value: 28.54 },
      thresholdNotes: ["Chicago stays below 30% across the period.", "National burden crosses 30% by 2023."],
    },
  };
}

function buildAssistantMessage(prompt: string): ChatMessage {
  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes("error") || lowerPrompt.includes("fail")) {
    return {
      id: `assistant-${crypto.randomUUID()}`,
      role: "assistant",
      state: "error",
      content: "I could not complete that demo request. This error state is part of the Phase 5 UI polish and will later be driven by real tool failures.",
      toolCall: {
        toolName: "get_metrics_snapshot",
        status: "error",
        summary: "The simulated tool response failed validation for this request.",
        input: { prompt },
      },
    };
  }

  if (lowerPrompt.includes("graph") || lowerPrompt.includes("chart") || lowerPrompt.includes("trend")) {
    return {
      id: `assistant-${crypto.randomUUID()}`,
      role: "assistant",
      state: "complete",
      content: "I can render tool outputs and chart specs in the chat stream. This demo shows the intended Phase 5 presentation layer before Phase 6 wiring.",
      toolCall: {
        toolName: "create_graph",
        status: "success",
        summary: "Graph helper input was normalized into a chart spec for display.",
        input: {
          inputMode: "helper",
          graphType: "metro_trend_line",
          sourceTool: "get_metro_trend",
        },
      },
      chartSpec: createDemoChartSpec(),
    };
  }

  if (lowerPrompt.includes("afford") || lowerPrompt.includes("rent") || lowerPrompt.includes("metro")) {
    return {
      id: `assistant-${crypto.randomUUID()}`,
      role: "assistant",
      state: "complete",
      content: "The chat shell can already display structured tool results. Phase 6 will replace this demo response with real orchestration and MCP tool execution.",
      toolCall: {
        toolName: "get_metrics_snapshot",
        status: "success",
        summary: "Fetched a snapshot payload suitable for a metro ranking or graph request.",
        input: { year: 2024 },
      },
    };
  }

  return {
    id: `assistant-${crypto.randomUUID()}`,
    role: "assistant",
    state: "complete",
    content: "This is the Phase 5 chat interface scaffold. It renders assistant messages, tool cards, and chart cards, and is ready for Phase 6 API wiring.",
  };
}

const initialMessages: ChatMessage[] = [
  {
    id: "assistant-intro",
    role: "assistant",
    state: "complete",
    content: "Ask for a metro snapshot, an affordability scenario, or a chart. The current UI is demo-backed but already shaped around tool results.",
  },
];

export function ChatShell() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isPending, setIsPending] = useState(false);
  const pendingMessage: ChatMessage = {
    id: "assistant-pending",
    role: "assistant",
    state: "loading",
    content: "",
  };

  const visibleMessages = isPending ? [...messages, pendingMessage] : messages;

  const successfulToolCalls = messages.filter((message) => message.toolCall?.status === "success").length;
  const chartCount = messages.filter((message) => message.chartSpec).length;
  const hasErrors = messages.some((message) => message.state === "error" || message.toolCall?.status === "error");

  function handleSubmit(prompt: string) {
    const userMessage: ChatMessage = {
      id: `user-${crypto.randomUUID()}`,
      role: "user",
      state: "complete",
      content: prompt,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setIsPending(true);

    startTransition(() => {
      const assistantMessage = buildAssistantMessage(prompt);
      setMessages((currentMessages) => [...currentMessages, assistantMessage]);
      setIsPending(false);
    });
  }

  return (
    <main className="chat-shell">
      <section className="hero-panel">
        <p className="eyebrow">Student Reality Lab v2</p>
        <h1>Chat-first housing analysis with tool and chart results inline.</h1>
        <p className="hero-copy">
          The UI is now structured around assistant messages, MCP tool cards, and graph specs so Phase 6 can plug in orchestration without changing the presentation contract.
        </p>
        <div className="system-strip" aria-label="Conversation status">
          <div className="system-stat">
            <span>Mode</span>
            <strong>Demo UI</strong>
          </div>
          <div className="system-stat">
            <span>Tool cards</span>
            <strong>{successfulToolCalls}</strong>
          </div>
          <div className="system-stat">
            <span>Charts</span>
            <strong>{chartCount}</strong>
          </div>
          <div className={`system-stat ${hasErrors ? "system-stat-warning" : "system-stat-ok"}`}>
            <span>Status</span>
            <strong>{hasErrors ? "Needs review" : isPending ? "Working" : "Ready"}</strong>
          </div>
        </div>
      </section>
      <section className="workspace-panel">
        <MessageList messages={visibleMessages} />
        <PromptBox disabled={isPending} onSubmit={handleSubmit} suggestions={starterPrompts} />
      </section>
    </main>
  );
}