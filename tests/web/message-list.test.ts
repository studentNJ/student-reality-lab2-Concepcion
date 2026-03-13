import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { MessageList } from "../../apps/web/src/features/chat/components/MessageList.js";
import type { ChatMessage } from "../../apps/web/src/lib/chat-types.js";
import type { ChartSpec } from "../../packages/shared/src/index.js";

const chartSpec: ChartSpec = {
  chartType: "metro_trend_line",
  title: "Chicago Rent Burden (%) trend",
  subtitle: "2020-2024",
  axes: {
    x: { label: "Year", field: "year", type: "time", formatter: "integer" },
    y: { label: "Rent Burden (%)", field: "value", type: "number", formatter: "percent" },
  },
  series: [
    {
      id: "chicago",
      label: "Chicago",
      points: [
        { year: 2020, value: 28.8 },
        { year: 2021, value: 29.1 },
        { year: 2022, value: 29.4 },
      ],
    },
  ],
};

const message: ChatMessage = {
  id: "assistant-1",
  role: "assistant",
  state: "complete",
  content: "Here is the requested chart.",
  toolCalls: [
    {
      toolName: "create_graph",
      status: "success",
      summary: "Created a metro_trend_line chart specification.",
      input: { graphType: "metro_trend_line" },
    },
  ],
  chartSpec,
};

describe("MessageList", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("shows tool cards outside production mode", () => {
    vi.stubEnv("NODE_ENV", "test");

    const markup = renderToStaticMarkup(React.createElement(MessageList, { messages: [message] }));

    expect(markup).toContain("tool-card");
    expect(markup).toContain("chart-card");
  });

  it("hides tool cards in production mode while keeping chart cards", () => {
    vi.stubEnv("NODE_ENV", "production");

    const markup = renderToStaticMarkup(React.createElement(MessageList, { messages: [message] }));

    expect(markup).not.toContain("tool-card");
    expect(markup).toContain("chart-card");
  });
});