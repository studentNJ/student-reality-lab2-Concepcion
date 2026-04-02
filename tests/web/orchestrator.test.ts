import { randomUUID } from "node:crypto";
import { saveChatTurn } from "@student-reality-lab/db";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { orchestrateChat } from "../../apps/web/src/lib/ai/orchestrator.js";

const originalOpenAiApiKey = process.env.OPENAI_API_KEY;
const originalFetch = global.fetch;

describe("orchestrateChat", () => {
  beforeEach(() => {
    delete process.env.OPENAI_API_KEY;
  });

  afterEach(() => {
    if (originalOpenAiApiKey === undefined) {
      delete process.env.OPENAI_API_KEY;
      return;
    }

    process.env.OPENAI_API_KEY = originalOpenAiApiKey;
    global.fetch = originalFetch;
  });

  it("creates multiple metro trend charts in prompt order", async () => {
    const response = await orchestrateChat({
      prompt: "I want the rent burden charts for Chicago, Washington and Newark.",
    });

    expect(response.meta.intent).toBe("metro_trend_chart");
    expect(response.message.state).toBe("complete");
    expect(response.message.chartSpecs).toHaveLength(3);
    expect(response.message.chartSpecs?.map((chartSpec) => chartSpec.title)).toEqual([
      expect.stringContaining("Chicago"),
      expect.stringContaining("Washington"),
      expect.stringContaining("Newark"),
    ]);
  });

  it("keeps single-metro trend requests on the single-chart path", async () => {
    const response = await orchestrateChat({
      prompt: "Show a rent burden trend chart for Chicago.",
    });

    expect(response.meta.intent).toBe("metro_trend_chart");
    expect(response.message.chartSpec?.title).toContain("Chicago");
    expect(response.message.chartSpecs).toHaveLength(1);
  });

  it("normalizes legacy model metric aliases before building snapshot charts", async () => {
    process.env.OPENAI_API_KEY = "test-key";
    global.fetch = async () => {
      return new Response(JSON.stringify({
        choices: [
          {
            message: {
              content: JSON.stringify({
                intent: "metrics_snapshot",
                year: 2015,
                metric: "rent_burden",
                wantsChart: true,
              }),
            },
          },
        ],
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };

    const response = await orchestrateChat({
      prompt: "Rent Burden by Metro for the year 2015 chart",
    });

    expect(response.meta.intent).toBe("metrics_snapshot");
    expect(response.message.state).toBe("complete");
    expect(response.message.chartSpec?.chartType).toBe("metro_snapshot_bar");
    expect(response.message.content).toContain("2015");
    expect(response.message.toolCalls?.some((toolCall) => toolCall.toolName === "create_graph" && toolCall.status === "success")).toBe(true);
  });

  it("reuses persisted trend context for repeat prompts", async () => {
    const conversationId = randomUUID();

    await saveChatTurn({
      conversationId,
      userPrompt: "Show a rent burden trend chart for Chicago.",
      assistantMessage: {
        id: `assistant-${conversationId}`,
        role: "assistant",
        state: "complete",
        content: "Here is the rent burden trend for Chicago.",
        toolCalls: [
          {
            toolName: "get_metro_trend",
            status: "success",
            summary: "Loaded 5 trend points for Chicago.",
            input: { metro: "Chicago", startYear: 2020, endYear: 2024 },
          },
          {
            toolName: "create_graph",
            status: "success",
            summary: "Created a line chart.",
            input: { graphType: "metro_trend_line" },
          },
        ],
      },
      planner: "fallback",
      intent: "metro_trend_chart",
    });

    const response = await orchestrateChat({
      prompt: "show that again",
      conversationId,
    });

    expect(response.meta.intent).toBe("metro_trend_chart");
    expect(response.message.chartSpec?.title).toContain("Chicago");
  });

  it("uses persisted trend context for comparison follow-ups", async () => {
    const conversationId = randomUUID();

    await saveChatTurn({
      conversationId,
      userPrompt: "Show a rent burden trend chart for Chicago.",
      assistantMessage: {
        id: `assistant-compare-${conversationId}`,
        role: "assistant",
        state: "complete",
        content: "Here is the rent burden trend for Chicago.",
        toolCalls: [
          {
            toolName: "get_metro_trend",
            status: "success",
            summary: "Loaded 5 trend points for Chicago.",
            input: { metro: "Chicago", startYear: 2020, endYear: 2024 },
          },
          {
            toolName: "create_graph",
            status: "success",
            summary: "Created a line chart.",
            input: { graphType: "metro_trend_line" },
          },
        ],
      },
      planner: "fallback",
      intent: "metro_trend_chart",
    });

    const response = await orchestrateChat({
      prompt: "compare to Washington",
      conversationId,
    });

    expect(response.meta.intent).toBe("metro_trend_chart");
    expect(response.message.chartSpecs).toHaveLength(2);
    expect(response.message.chartSpecs?.map((chartSpec) => chartSpec.title)).toEqual([
      expect.stringContaining("Chicago"),
      expect.stringContaining("Washington"),
    ]);
  });

  it("uses persisted affordability context for metro-only follow-ups", async () => {
    const conversationId = randomUUID();

    await saveChatTurn({
      conversationId,
      userPrompt: "Can a $72,000 salary afford rent?",
      assistantMessage: {
        id: `assistant-affordability-${conversationId}`,
        role: "assistant",
        state: "complete",
        content: "At 30% of monthly income, the maximum affordable monthly housing cost is $1800.",
        toolCalls: [
          {
            toolName: "calculate_affordability",
            status: "success",
            summary: "Calculated affordability metrics.",
            input: { annualIncome: 72000 },
          },
        ],
      },
      planner: "fallback",
      intent: "affordability",
    });

    const response = await orchestrateChat({
      prompt: "what about Chicago?",
      conversationId,
    });

    expect(response.meta.intent).toBe("affordability");
    expect(response.message.state).toBe("complete");
    expect(response.message.content).toContain("Chicago-Naperville-Elgin");
    expect(response.message.toolCalls?.[0]?.toolName).toBe("calculate_affordability");
  });

  it("routes explicit metro comparison prompts to compare_metros", async () => {
    const response = await orchestrateChat({
      prompt: "Compare Chicago and Washington over the last 5 years and chart both.",
    });

    expect(response.meta.intent).toBe("compare_metros");
    expect(response.message.state).toBe("complete");
    expect(response.message.chartSpec?.chartType).toBe("metro_compare_line");
    expect(response.message.toolCalls?.some((toolCall) => toolCall.toolName === "compare_metros")).toBe(true);
  });

  it("routes year-range summary prompts to get_metrics_by_range", async () => {
    const response = await orchestrateChat({
      prompt: "Show average rent burden from 2020 to 2024.",
    });

    expect(response.meta.intent).toBe("metrics_range");
    expect(response.message.state).toBe("complete");
    expect(response.message.content).toContain("2020-2024");
    expect(response.message.toolCalls?.some((toolCall) => toolCall.toolName === "get_metrics_by_range")).toBe(true);
  });

  it("routes roommate scenario prompts to compare_affordability_scenarios", async () => {
    const response = await orchestrateChat({
      prompt: "Compare solo vs roommate affordability in Chicago on $72k.",
    });

    expect(response.meta.intent).toBe("compare_affordability_scenarios");
    expect(response.message.state).toBe("complete");
    expect(response.message.chartSpec?.chartType).toBe("affordability_scenario_bar");
    expect(response.message.toolCalls?.some((toolCall) => toolCall.toolName === "compare_affordability_scenarios")).toBe(true);
  });

  it("asks for clarification when a comparison prompt omits the year range", async () => {
    const response = await orchestrateChat({
      prompt: "Compare Chicago and Washington.",
    });

    expect(response.meta.intent).toBe("clarification");
    expect(response.message.content).toContain("need a year range");
  });

  it("asks for clarification when a range summary prompt omits the range", async () => {
    const response = await orchestrateChat({
      prompt: "Show average rent burden over time.",
    });

    expect(response.meta.intent).toBe("clarification");
    expect(response.message.content).toContain("need a year range");
  });

  it("asks for clarification when a scenario comparison prompt omits income", async () => {
    const response = await orchestrateChat({
      prompt: "Compare solo vs roommate affordability in Chicago.",
    });

    expect(response.meta.intent).toBe("clarification");
    expect(response.message.content).toContain("need an annual income");
  });
});