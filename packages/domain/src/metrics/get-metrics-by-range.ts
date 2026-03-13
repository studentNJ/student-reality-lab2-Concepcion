import { loadMetricsDataset } from "../data/load-metrics-dataset.js";
import { isYearInRange, summarizeMetrics } from "./summarize-metrics.js";
import type { DashboardMetric, MetroMetric } from "../types/metrics.js";
import { assertValidYearRange } from "../validation/assert-valid-year-query.js";

export function getMetricsByRange(
  startYear: number,
  endYear: number,
  rows: MetroMetric[] = loadMetricsDataset(),
): DashboardMetric[] {
  assertValidYearRange(startYear, endYear);
  return summarizeMetrics(rows.filter((row) => isYearInRange(row.year, startYear, endYear)));
}