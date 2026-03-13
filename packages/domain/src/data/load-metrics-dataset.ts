import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { MetroMetric, SourceMetadata } from "../types/metrics.js";

const moduleDirectory = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(moduleDirectory, "../../../../");
const defaultMetricsPath = path.resolve(workspaceRoot, "data", "processed", "metro_metrics.csv");
const defaultMetadataPath = path.resolve(workspaceRoot, "data", "processed", "source-metadata.json");

let cachedMetricsPath: string | null = null;
let cachedMetrics: MetroMetric[] | null = null;

function parseNumber(value: string): number {
  const parsed = Number.parseFloat(value);

  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid numeric value: ${value}`);
  }

  return parsed;
}

export function getMetricsDatasetPath(): string {
  return process.env.SRL_METRICS_CSV_PATH ?? defaultMetricsPath;
}

export function getSourceMetadataPath(): string {
  return process.env.SRL_SOURCE_METADATA_PATH ?? defaultMetadataPath;
}

export function loadMetricsDataset(forceReload = false): MetroMetric[] {
  const metricsPath = getMetricsDatasetPath();

  if (!forceReload && cachedMetrics && cachedMetricsPath === metricsPath) {
    return cachedMetrics;
  }

  if (!fs.existsSync(metricsPath)) {
    throw new Error(`Could not locate metrics dataset at ${metricsPath}`);
  }

  const raw = fs.readFileSync(metricsPath, "utf8").trim();
  const [header, ...lines] = raw.split(/\r?\n/);

  if (!header || lines.length === 0) {
    cachedMetricsPath = metricsPath;
    cachedMetrics = [];
    return cachedMetrics;
  }

  cachedMetrics = lines.map((line) => {
    const [metro_id, metro_name, year, annual, monthly, rent, burden] = line.split(",");

    return {
      metro_id,
      metro_name,
      year: parseNumber(year),
      median_annual_income: parseNumber(annual),
      median_monthly_income: parseNumber(monthly),
      median_gross_rent: parseNumber(rent),
      rent_burden_percent: parseNumber(burden),
    };
  });

  cachedMetricsPath = metricsPath;
  return cachedMetrics;
}

export function loadSourceMetadata(): SourceMetadata | null {
  const metadataPath = getSourceMetadataPath();

  if (!fs.existsSync(metadataPath)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(metadataPath, "utf8")) as SourceMetadata;
  } catch {
    return null;
  }
}

export function getMetricsDatasetLastModified(): string | null {
  const metricsPath = getMetricsDatasetPath();

  if (!fs.existsSync(metricsPath)) {
    return null;
  }

  return fs.statSync(metricsPath).mtime.toISOString().slice(0, 10);
}