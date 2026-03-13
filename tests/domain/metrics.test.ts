import { describe, expect, it } from "vitest";
import {
  getAvailableYears,
  getDataSourceStatus,
  getLatestRentByMetro,
  getMetricsByYear,
  getMetricsByRange,
  getMetricsSnapshotByYear,
  getMetroTrend,
  getMetros,
  getTrendByMetro,
} from "../../packages/domain/src/index.js";

describe("metrics domain", () => {
  it("returns metros from processed data", () => {
    const metros = getMetros();

    expect(metros.length).toBeGreaterThanOrEqual(10);
    expect(metros.some((metro) => metro.id === "35620")).toBe(true);
  });

  it("returns yearly metrics for a valid year", () => {
    const rows = getMetricsSnapshotByYear(2015);
    const aliasRows = getMetricsByYear(2015);

    expect(rows.length).toBeGreaterThan(0);
    expect(rows.every((row) => row.year === 2015)).toBe(true);
    expect(aliasRows).toEqual(rows);
  });

  it("aggregates metrics across a selected timeframe", () => {
    const rows = getMetricsByRange(2018, 2022);

    expect(rows.length).toBeGreaterThanOrEqual(10);
    expect(rows.every((row) => row.start_year === 2018)).toBe(true);
    expect(rows.every((row) => row.end_year === 2022)).toBe(true);
    expect(rows.every((row) => row.sample_size === 5)).toBe(true);
  });

  it("supports injected rows and same-year aggregation", () => {
    const rows = getMetricsByRange(2022, 2022, [
      {
        metro_id: "11111",
        metro_name: "Alpha Metro",
        year: 2022,
        median_annual_income: 60000,
        median_monthly_income: 5000,
        median_gross_rent: 1500,
        rent_burden_percent: 30,
      },
      {
        metro_id: "11111",
        metro_name: "Alpha Metro",
        year: 2021,
        median_annual_income: 57600,
        median_monthly_income: 4800,
        median_gross_rent: 1400,
        rent_burden_percent: 29,
      },
    ]);

    expect(rows).toEqual([
      {
        metro_id: "11111",
        metro_name: "Alpha Metro",
        start_year: 2022,
        end_year: 2022,
        sample_size: 1,
        median_monthly_income: 5000,
        median_gross_rent: 1500,
        rent_burden_percent: 30,
      },
    ]);
  });

  it("returns sorted trend for metro, supports year filters, and empty for missing metro", () => {
    const trend = getMetroTrend("35620");
    const years = trend.map((item) => item.year);
    const sortedYears = [...years].sort((left, right) => left - right);

    expect(trend.length).toBeGreaterThan(0);
    expect(years).toEqual(sortedYears);

    const filteredTrend = getMetroTrend("35620", 2018, 2020);
    expect(filteredTrend.map((item) => item.year)).toEqual([2018, 2019, 2020]);

    const aliasTrend = getTrendByMetro("35620", 2018, 2020);
    expect(aliasTrend).toEqual(filteredTrend);

    const missing = getMetroTrend("00000");
    expect(missing).toEqual([]);
  });

  it("rejects invalid year queries", () => {
    expect(() => getMetricsSnapshotByYear(2015.5)).toThrow("year must be a whole number");
    expect(() => getMetricsByRange(2022, 2018)).toThrow("startYear must be less than or equal to endYear");
    expect(() => getMetroTrend("35620", 2020)).toThrow(
      "startYear and endYear must both be provided when filtering a trend",
    );
  });

  it("returns the latest rent for a metro", () => {
    expect(getLatestRentByMetro("35620")).toBe(2350);
    expect(getLatestRentByMetro("00000")).toBeNull();
  });

  it("has available years and a source summary", () => {
    const years = getAvailableYears();
    const status = getDataSourceStatus();

    expect(years[0]).toBe(2015);
    expect(years[years.length - 1]).toBe(2025);
    expect(status.datasetType).toBe("sample");
    expect(status.metroCount).toBe(10);
  });

  it("filters custom trend rows by metro and year range", () => {
    const trend = getMetroTrend("11111", 2021, 2022, [
      {
        metro_id: "11111",
        metro_name: "Alpha Metro",
        year: 2020,
        median_annual_income: 58800,
        median_monthly_income: 4900,
        median_gross_rent: 1450,
        rent_burden_percent: 29.6,
      },
      {
        metro_id: "11111",
        metro_name: "Alpha Metro",
        year: 2021,
        median_annual_income: 60000,
        median_monthly_income: 5000,
        median_gross_rent: 1500,
        rent_burden_percent: 30,
      },
      {
        metro_id: "11111",
        metro_name: "Alpha Metro",
        year: 2022,
        median_annual_income: 61200,
        median_monthly_income: 5100,
        median_gross_rent: 1550,
        rent_burden_percent: 30.39,
      },
      {
        metro_id: "22222",
        metro_name: "Beta Metro",
        year: 2022,
        median_annual_income: 84000,
        median_monthly_income: 7000,
        median_gross_rent: 1900,
        rent_burden_percent: 27.14,
      },
    ]);

    expect(trend).toEqual([
      {
        year: 2021,
        median_monthly_income: 5000,
        median_gross_rent: 1500,
        rent_burden_percent: 30,
      },
      {
        year: 2022,
        median_monthly_income: 5100,
        median_gross_rent: 1550,
        rent_burden_percent: 30.39,
      },
    ]);
  });
});