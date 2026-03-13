import { describe, expect, it } from "vitest";
import {
  affordabilityScenarioGraphHelperInputSchema,
  calculateAffordabilityRequestSchema,
  chartSpecSchema,
  createGraphHelperInputSchema,
  domainDataSourceStatusSchema,
  getMetrosResponseDataSchema,
  graphTypeSchema,
  metricsRangeRequestSchema,
  metricsSnapshotRequestSchema,
  metroCompareGraphHelperInputSchema,
  metroSnapshotGraphHelperInputSchema,
  metroTrendRequestSchema,
  metroTrendGraphHelperInputSchema,
} from "../../packages/shared/src/index.js";

describe("shared schemas", () => {
  it("accepts valid metrics and metro payloads", () => {
    const metricsSnapshot = metricsSnapshotRequestSchema.parse({ year: 2024 });
    const metricsRange = metricsRangeRequestSchema.parse({ startYear: 2020, endYear: 2024 });
    const metros = getMetrosResponseDataSchema.parse({
      metros: [{ id: "35620", name: "New York-Newark-Jersey City" }],
    });

    expect(metricsSnapshot.year).toBe(2024);
    expect(metricsRange.startYear).toBe(2020);
    expect(metros.metros).toHaveLength(1);
  });

  it("rejects invalid year and range inputs", () => {
    expect(() => metricsSnapshotRequestSchema.parse({ year: 2024.5 })).toThrow();
    expect(() => metricsRangeRequestSchema.parse({ startYear: 2025, endYear: 2024 })).toThrow(
      "startYear must be less than or equal to endYear",
    );
  });

  it("accepts valid trend and affordability inputs", () => {
    const trendRequest = metroTrendRequestSchema.parse({
      metro: "Chicago",
      startYear: 2019,
      endYear: 2024,
    });
    const affordabilityRequest = calculateAffordabilityRequestSchema.parse({
      annualIncome: 72000,
      monthlyDebt: 250,
      roommates: 1,
      householdSize: 2,
      targetMetro: "Chicago",
    });

    expect(trendRequest.metro).toBe("Chicago");
    expect(affordabilityRequest.householdSize).toBe(2);
  });

  it("rejects inconsistent affordability payloads", () => {
    expect(() =>
      calculateAffordabilityRequestSchema.parse({
        annualIncome: 72000,
        roommates: 1,
        householdSize: 3,
      }),
    ).toThrow("householdSize must equal roommates plus one when both are provided");
  });

  it("accepts graph specs and rejects unsupported graph types", () => {
    const graphType = graphTypeSchema.parse("metro_trend_line");
    const chartSpec = chartSpecSchema.parse({
      chartType: graphType,
      title: "Chicago rent burden trend",
      axes: {
        x: { label: "Year", field: "year", type: "time", formatter: "integer" },
        y: { label: "Rent Burden", field: "value", type: "number", formatter: "percent" },
      },
      series: [
        {
          id: "chicago",
          label: "Chicago",
          points: [{ year: 2020, value: 28.54 }],
        },
      ],
    });

    expect(chartSpec.series).toHaveLength(1);
    expect(() => graphTypeSchema.parse("scatterplot")).toThrow();
  });

  it("accepts helper graph inputs for the supported derived-data modes", () => {
    const snapshotHelper = metroSnapshotGraphHelperInputSchema.parse({
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
        ],
      },
      metric: "rent_burden_percent",
    });

    const trendHelper = metroTrendGraphHelperInputSchema.parse({
      inputMode: "helper",
      graphType: "metro_trend_line",
      sourceTool: "get_metro_trend",
      data: {
        metro: "Chicago",
        startYear: 2020,
        endYear: 2024,
        series: [
          { year: 2020, value: 28.54 },
          { year: 2021, value: 28.77 },
        ],
      },
    });

    const affordabilityHelper = affordabilityScenarioGraphHelperInputSchema.parse({
      inputMode: "helper",
      graphType: "affordability_scenario_bar",
      sourceTool: "calculate_affordability",
      scenarios: [
        {
          label: "Solo in Chicago",
          data: {
            inputs: { annualIncome: 72000, targetMetro: "Chicago" },
            results: {
              maxAffordableMonthlyHousing: 1800,
              affordabilityRatio: 0.3,
              summary: "At 30% of monthly income, the maximum affordable monthly housing cost is $1800.",
            },
          },
        },
      ],
    });

    const helperUnion = createGraphHelperInputSchema.parse(snapshotHelper);

    expect(snapshotHelper.graphType).toBe("metro_snapshot_bar");
    expect(trendHelper.graphType).toBe("metro_trend_line");
    expect(affordabilityHelper.graphType).toBe("affordability_scenario_bar");
    expect(helperUnion.inputMode).toBe("helper");
  });

  it("rejects invalid helper comparison payloads", () => {
    expect(() =>
      metroCompareGraphHelperInputSchema.parse({
        inputMode: "helper",
        graphType: "metro_compare_line",
        sourceTool: "get_metro_trend",
        data: [
          {
            metro: "Chicago",
            startYear: 2020,
            endYear: 2024,
            series: [{ year: 2020, value: 28.54 }],
          },
          {
            metro: "Miami",
            startYear: 2021,
            endYear: 2024,
            series: [{ year: 2021, value: 38.83 }],
          },
        ],
      }),
    ).toThrow("all comparison trend inputs must share the same year range");
  });

  it("validates the domain data source status shape", () => {
    const status = domainDataSourceStatusSchema.parse({
      configuredMode: "csv",
      activeSource: "csv_fallback",
      datasetType: "sample",
      datasetLabel: "Sample Dataset",
      sourceDescription: "Bundled placeholder data",
      metroCount: 10,
      startYear: 2015,
      endYear: 2025,
      lastRefreshed: "2026-03-09",
    });

    expect(status.metroCount).toBe(10);
  });
});