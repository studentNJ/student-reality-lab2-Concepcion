import { loadMetricsDataset } from "../data/load-metrics-dataset.js";
import type { MetroMetric } from "../types/metrics.js";
import { assertValidYear } from "../validation/assert-valid-year-query.js";

export function getMetricsSnapshotByYear(year: number, rows: MetroMetric[] = loadMetricsDataset()): MetroMetric[] {
  assertValidYear(year, "year");
  return rows.filter((row) => row.year === year);
}

export function getMetricsByYear(year: number, rows: MetroMetric[] = loadMetricsDataset()): MetroMetric[] {
  return getMetricsSnapshotByYear(year, rows);
}