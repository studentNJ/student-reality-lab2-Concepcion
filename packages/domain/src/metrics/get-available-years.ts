import { loadMetricsDataset } from "../data/load-metrics-dataset.js";
import type { MetroMetric } from "../types/metrics.js";

export function getAvailableYears(rows: MetroMetric[] = loadMetricsDataset()): number[] {
  return Array.from(new Set(rows.map((row) => row.year))).sort((left, right) => left - right);
}