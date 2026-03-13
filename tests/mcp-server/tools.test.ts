import { describe, expect, it } from "vitest";
import {
  calculateAffordabilityTool,
  getAvailableYearsTool,
  getDataSourceStatusTool,
  getMetricsSnapshotTool,
  getMetrosTool,
  getMetroTrendTool,
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

  it("returns a metro trend series", () => {
    const result = getMetroTrendTool({ metro: "35620", startYear: 2020, endYear: 2024 });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.series).toHaveLength(5);
      expect(result.meta?.metric).toBe("rent_burden_percent");
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

    expect(trendResult.ok).toBe(false);
    expect(snapshotResult.ok).toBe(false);
  });
});