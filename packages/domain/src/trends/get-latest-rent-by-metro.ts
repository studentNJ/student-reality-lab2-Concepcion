import { getMetroTrend } from "./get-metro-trend.js";
import type { MetroMetric } from "../types/metrics.js";

export function getLatestRentByMetro(metroId: string, rows?: MetroMetric[]): number | null {
  const trend = getMetroTrend(metroId, undefined, undefined, rows);

  if (trend.length === 0) {
    return null;
  }

  return trend[trend.length - 1].median_gross_rent;
}