import { loadMetricsDataset } from "../data/load-metrics-dataset.js";
import type { MetroMetric, MetroRecord } from "../types/metrics.js";

export function getMetros(rows: MetroMetric[] = loadMetricsDataset()): MetroRecord[] {
  const metros = new Map<string, string>();

  for (const row of rows) {
    metros.set(row.metro_id, row.metro_name);
  }

  return Array.from(metros.entries())
    .map(([id, name]) => ({ id, name }))
    .sort((left, right) => left.name.localeCompare(right.name));
}