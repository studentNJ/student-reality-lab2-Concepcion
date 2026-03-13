import { describe, expect, it } from "vitest";
import {
  calculateAffordability,
  getDataSourceStatus,
  getMetricsByRange,
  getMetricsSnapshotByYear,
  getMetroTrend,
  getMetros,
} from "../../packages/domain/src/index.js";
import {
  affordabilityResultSchema,
  createGraphHelperInputSchema,
  domainDataSourceStatusSchema,
  getMetrosResponseDataSchema,
  metricsSnapshotResponseDataSchema,
  trendPointSchema,
  dashboardMetricSchema,
} from "../../packages/shared/src/index.js";

describe("shared schema compatibility with domain outputs", () => {
  it("accepts domain affordability results", () => {
    const result = calculateAffordability(72000, 1800, { monthlyDebt: 200, roommates: 1 });

    expect(() => affordabilityResultSchema.parse(result)).not.toThrow();
  });

  it("accepts domain metro and metrics outputs", () => {
    const metros = getMetros();
    const snapshot = getMetricsSnapshotByYear(2024);
    const range = getMetricsByRange(2020, 2024);

    expect(() => getMetrosResponseDataSchema.parse({ metros })).not.toThrow();
    expect(() => metricsSnapshotResponseDataSchema.parse({ year: 2024, rows: snapshot })).not.toThrow();
    expect(range.every((row) => dashboardMetricSchema.safeParse(row).success)).toBe(true);
  });

  it("accepts domain trend and data source outputs", () => {
    const trend = getMetroTrend("35620", 2020, 2024);
    const status = getDataSourceStatus();

    expect(trend.every((point) => trendPointSchema.safeParse(point).success)).toBe(true);
    expect(() => domainDataSourceStatusSchema.parse(status)).not.toThrow();
  });

  it("accepts helper graph inputs built from current domain outputs", () => {
    const snapshot = getMetricsSnapshotByYear(2024);
    const trend = getMetroTrend("35620", 2020, 2024);

    const snapshotHelper = {
      inputMode: "helper",
      graphType: "metro_snapshot_bar",
      sourceTool: "get_metrics_snapshot",
      data: {
        year: 2024,
        rows: snapshot,
      },
    };

    const trendHelper = {
      inputMode: "helper",
      graphType: "metro_trend_line",
      sourceTool: "get_metro_trend",
      data: {
        metro: "35620",
        startYear: 2020,
        endYear: 2024,
        series: trend.map((point) => ({ year: point.year, value: point.rent_burden_percent })),
      },
    };

    expect(() => createGraphHelperInputSchema.parse(snapshotHelper)).not.toThrow();
    expect(() => createGraphHelperInputSchema.parse(trendHelper)).not.toThrow();
  });
});