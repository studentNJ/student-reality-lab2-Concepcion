import { randomUUID } from "node:crypto";
import { saveChatTurn } from "@student-reality-lab/db";
import { describe, expect, it } from "vitest";
import {
  calculateAffordabilityTool,
  compareAffordabilityScenariosTool,
  compareMetrosTool,
  getAvailableYearsTool,
  getDataSourceStatusTool,
  getMetricsByRangeTool,
  getMetricsSnapshotTool,
  getMetrosTool,
  getMetroTrendTool,
  retrieveConversationHistoryTool,
} from "../../packages/mcp-server/src/index.js";

describe("mcp tools", () => {
  it("returns supported years", () => {
    const result = getAvailableYearsTool();

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.years[0]).toBe(2015);
    }
  });

  it("returns metros", () => {
    const result = getMetrosTool();

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.metros.some((metro) => metro.id === "35620")).toBe(true);
    }
  });

  it("returns a metrics snapshot for a year", () => {
    const result = getMetricsSnapshotTool({ year: 2024 });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.year).toBe(2024);
      expect(result.data.rows.length).toBeGreaterThan(0);
    }
  });

  it("returns aggregated metrics for a year range", () => {
    const result = getMetricsByRangeTool({ startYear: 2020, endYear: 2024 });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.startYear).toBe(2020);
      expect(result.data.endYear).toBe(2024);
      expect(result.data.rows.length).toBeGreaterThan(0);
      expect(result.data.rows[0]).toMatchObject({
        start_year: 2020,
        end_year: 2024,
      });
    }
  });

  it("returns a metro trend series", () => {
    const result = getMetroTrendTool({ metro: "35620", startYear: 2020, endYear: 2024 });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.series).toHaveLength(5);
      expect(result.meta?.metric).toBe("rent_burden_percent");
    }
  });

  it("returns comparable metro trend series", () => {
    const result = compareMetrosTool({ metros: ["Chicago", "Washington"], startYear: 2020, endYear: 2024 });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.trends).toHaveLength(2);
      expect(result.data.trends[0]?.series).toHaveLength(5);
      expect(result.data.metros).toEqual([
        "Chicago-Naperville-Elgin",
        "Washington-Arlington-Alexandria",
      ]);
    }
  });

  it("calculates affordability and handles a metro target", () => {
    const result = calculateAffordabilityTool({
      annualIncome: 72000,
      monthlyDebt: 200,
      targetMetro: "35620",
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.results.maxAffordableMonthlyHousing).toBe(1800);
      expect(typeof result.data.results.summary).toBe("string");
    }
  });

  it("resolves metro names in affordability requests", () => {
    const result = calculateAffordabilityTool({
      annualIncome: 72000,
      monthlyDebt: 200,
      targetMetro: "Chicago",
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.results.summary).toContain("Chicago-Naperville-Elgin");
    }
  });

  it("returns affordability scenario comparisons", () => {
    const result = compareAffordabilityScenariosTool({
      annualIncome: 72000,
      targetMetro: "Chicago",
      scenarios: [
        { label: "Solo", monthlyDebt: 200 },
        { label: "Roommate", roommates: 1, householdSize: 2 },
      ],
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.scenarios).toHaveLength(2);
      expect(result.data.scenarios[0]?.data.results.summary).toContain("Chicago-Naperville-Elgin");
    }
  });

  it("returns data source status", () => {
    const result = getDataSourceStatusTool();

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.sourceMode).toBe("csv");
      expect(result.data.details?.[0]).toMatchObject({ datasetType: "sample" });
    }
  });

  it("returns predictable failures for invalid payloads", () => {
    const trendResult = getMetroTrendTool({ metro: "35620", startYear: 2024, endYear: 2020 });
    const snapshotResult = getMetricsSnapshotTool({ year: 2024.5 });
    const rangeResult = getMetricsByRangeTool({ startYear: 2025, endYear: 2024 });
    const compareResult = compareMetrosTool({ metros: ["Chicago", "Chicago"], startYear: 2020, endYear: 2024 });
    const scenarioResult = compareAffordabilityScenariosTool({ annualIncome: 72000, scenarios: [{ label: "Solo" }] });

    expect(trendResult.ok).toBe(false);
    expect(snapshotResult.ok).toBe(false);
    expect(rangeResult.ok).toBe(false);
    expect(compareResult.ok).toBe(false);
    expect(scenarioResult.ok).toBe(false);
  });

  it("returns persisted conversation history", async () => {
    const conversationId = randomUUID();

    await saveChatTurn({
      conversationId,
      userPrompt: "Show me a trend for Chicago.",
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
        ],
      },
      planner: "fallback",
      intent: "metro_trend_chart",
    });

    const result = await retrieveConversationHistoryTool({
      conversationId,
      includeToolCalls: true,
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.conversationId).toBe(conversationId);
      expect(result.data.totalMessages).toBe(2);
      expect(result.data.messages).toHaveLength(2);
      expect(result.data.messages[1]?.toolCalls?.[0]?.toolName).toBe("get_metro_trend");
    }
  }, 10000);

  it("returns a predictable failure when the conversation is missing", async () => {
    const result = await retrieveConversationHistoryTool({
      conversationId: `missing-${randomUUID()}`,
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe("CONVERSATION_NOT_FOUND");
    }
  });
});