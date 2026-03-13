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
});