import { loadMetricsDataset } from "../data/load-metrics-dataset.js";
import { isYearInRange } from "../metrics/summarize-metrics.js";
import type { MetroMetric, TrendPoint } from "../types/metrics.js";
import { assertValidYearRange } from "../validation/assert-valid-year-query.js";

export function getMetroTrend(
  metroId: string,
  startYear?: number,
  endYear?: number,
  rows: MetroMetric[] = loadMetricsDataset(),
): TrendPoint[] {
  if (startYear !== undefined || endYear !== undefined) {
    if (startYear === undefined || endYear === undefined) {
      throw new Error("startYear and endYear must both be provided when filtering a trend");
    }

    assertValidYearRange(startYear, endYear);
  }

  return rows
    .filter((row) => {
      if (row.metro_id !== metroId) {
        return false;
      }

      if (startYear === undefined || endYear === undefined) {
        return true;
      }

      return isYearInRange(row.year, startYear, endYear);
    })
    .sort((left, right) => left.year - right.year)
    .map((row) => ({
      year: row.year,
      median_monthly_income: row.median_monthly_income,
      median_gross_rent: row.median_gross_rent,
      rent_burden_percent: row.rent_burden_percent,
    }));
}

export function getTrendByMetro(
  metroId: string,
  startYear?: number,
  endYear?: number,
  rows: MetroMetric[] = loadMetricsDataset(),
): TrendPoint[] {
  return getMetroTrend(metroId, startYear, endYear, rows);
}