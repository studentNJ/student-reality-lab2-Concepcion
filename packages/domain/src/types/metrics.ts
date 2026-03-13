export type DataSource = "database" | "csv_fallback";
export type DatasetType = "sample" | "production";

export interface MetroRecord {
  id: string;
  name: string;
}

export interface MetroMetric {
  metro_id: string;
  metro_name: string;
  year: number;
  median_annual_income: number;
  median_monthly_income: number;
  median_gross_rent: number;
  rent_burden_percent: number;
}

export interface TrendPoint {
  year: number;
  median_monthly_income: number;
  median_gross_rent: number;
  rent_burden_percent: number;
}

export interface DashboardMetric {
  metro_id: string;
  metro_name: string;
  start_year: number;
  end_year: number;
  median_monthly_income: number;
  median_gross_rent: number;
  rent_burden_percent: number;
  sample_size: number;
}

export interface DataSourceStatus {
  configuredMode: "database" | "csv";
  activeSource: DataSource;
  datasetType: DatasetType;
  datasetLabel: string;
  sourceDescription: string | null;
  metroCount: number;
  startYear: number | null;
  endYear: number | null;
  lastRefreshed: string | null;
}

export interface SourceMetadata {
  datasetType?: DatasetType;
  displayName?: string;
  source?: string;
  metroCount?: number;
  startYear?: number;
  endYear?: number;
  lastRefreshed?: string;
}