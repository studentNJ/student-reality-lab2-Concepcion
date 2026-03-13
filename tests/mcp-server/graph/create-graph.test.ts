import { describe, expect, it } from "vitest";
import { createGraphTool } from "../../../packages/mcp-server/src/index.js";

function buildBaseRequest(graphType: "metro_snapshot_bar" | "metro_trend_line" | "metro_compare_line" | "affordability_scenario_bar") {
  return {
    graphType,
    title: "Test graph",
    axes: {
      x: { label: "Year", field: "year", type: "time", formatter: "integer" },
      y: { label: "Value", field: "value", type: "number", formatter: "percent" },
    },
    series: [
      {
        id: "series-1",
        label: "Series 1",
        points: [
          { year: 2020, value: 28.5 },
          { year: 2021, value: 29.1 },
        ],
      },
    ],
  };
}

describe("create_graph tool", () => {
  it("builds each supported graph type", () => {
    const graphTypes = [
      "metro_snapshot_bar",
      "metro_trend_line",
      "metro_compare_line",
      "affordability_scenario_bar",
    ] as const;

    for (const graphType of graphTypes) {
      const result = createGraphTool(buildBaseRequest(graphType));
      expect(result.ok).toBe(true);

      if (result.ok) {
        expect(result.data.chartType).toBe(graphType);
        expect(result.meta?.builder).toBe(graphType);
      }
    }
  });

  it("rejects invalid graph payloads", () => {
    const result = createGraphTool({
      graphType: "metro_trend_line",
      title: "Broken graph",
      axes: {
        x: { label: "Year", field: "year", type: "time" },
        y: { label: "Value", field: "value", type: "number" },
      },
      series: [],
    });

    expect(result.ok).toBe(false);
  });

  it("accepts helper-mode metro snapshot requests", () => {
    const result = createGraphTool({
      inputMode: "helper",
      graphType: "metro_snapshot_bar",
      sourceTool: "get_metrics_snapshot",
      data: {
        year: 2024,
        rows: [
          {
            metro_id: "35620",
            metro_name: "New York-Newark-Jersey City",
            year: 2024,
            median_annual_income: 72600,
            median_monthly_income: 6050,
            median_gross_rent: 2280,
            rent_burden_percent: 37.69,
          },
          {
            metro_id: "16980",
            metro_name: "Chicago-Naperville-Elgin",
            year: 2024,
            median_annual_income: 63900,
            median_monthly_income: 5325,
            median_gross_rent: 1567,
            rent_burden_percent: 29.43,
          },
        ],
      },
      metric: "rent_burden_percent",
      topN: 1,
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.chartType).toBe("metro_snapshot_bar");
      expect(result.data.series[0].points).toHaveLength(1);
      expect(result.meta?.inputMode).toBe("helper");
    }
  });

  it("accepts helper-mode affordability scenario requests", () => {
    const result = createGraphTool({
      inputMode: "helper",
      graphType: "affordability_scenario_bar",
      sourceTool: "calculate_affordability",
      scenarios: [
        {
          label: "Solo",
          data: {
            inputs: { annualIncome: 72000 },
            results: {
              maxAffordableMonthlyHousing: 1800,
              affordabilityRatio: 0.3,
              summary: "Solo scenario",
            },
          },
        },
        {
          label: "Roommate",
          data: {
            inputs: { annualIncome: 72000, roommates: 1 },
            results: {
              maxAffordableMonthlyHousing: 1800,
              affordabilityRatio: 0.2,
              summary: "Roommate scenario",
            },
          },
        },
      ],
      metric: "affordabilityRatio",
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.chartType).toBe("affordability_scenario_bar");
      expect(result.data.series[0].points).toHaveLength(2);
      expect(result.meta?.inputMode).toBe("helper");
    }
  });
});