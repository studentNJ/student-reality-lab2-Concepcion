import {
  getMetricsDatasetLastModified,
  loadMetricsDataset,
  loadSourceMetadata,
} from "../data/load-metrics-dataset.js";
import { getAvailableYears } from "./get-available-years.js";
import { getMetros } from "./get-metros.js";
import type { DataSourceStatus, DatasetType, MetroMetric } from "../types/metrics.js";

function formatDateString(value: string | undefined): string | null {
  if (!value) {
    return null;
  }

  return value.slice(0, 10);
}

function getDerivedDataStatus(rows: MetroMetric[]) {
  const years = getAvailableYears(rows);

  return {
    datasetType: "sample" as DatasetType,
    datasetLabel: "Sample Dataset",
    sourceDescription: "Bundled placeholder data stored in data/processed/metro_metrics.csv",
    metroCount: getMetros(rows).length,
    startYear: years[0] ?? null,
    endYear: years[years.length - 1] ?? null,
    lastRefreshed: getMetricsDatasetLastModified(),
  };
}

export function getDataSourceStatus(rows: MetroMetric[] = loadMetricsDataset()): DataSourceStatus {
  const metadata = loadSourceMetadata();
  const configuredMode = process.env.USE_DATABASE === "true" && Boolean(process.env.DATABASE_URL) ? "database" : "csv";
  const derived = getDerivedDataStatus(rows);

  return {
    configuredMode,
    activeSource: "csv_fallback",
    datasetType: metadata?.datasetType ?? derived.datasetType,
    datasetLabel:
      metadata?.displayName ??
      (metadata?.datasetType === "production" ? "Production Dataset" : derived.datasetLabel),
    sourceDescription: metadata?.source ?? derived.sourceDescription,
    metroCount: metadata?.metroCount ?? derived.metroCount,
    startYear: metadata?.startYear ?? derived.startYear,
    endYear: metadata?.endYear ?? derived.endYear,
    lastRefreshed: formatDateString(metadata?.lastRefreshed) ?? derived.lastRefreshed,
  };
}