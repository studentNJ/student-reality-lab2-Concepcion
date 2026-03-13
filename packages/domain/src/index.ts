export { calculateAffordability } from "./affordability/calculate-affordability.js";
export { classifyRisk } from "./affordability/classify-risk.js";
export {
  annualIncomeToMonthlyIncome,
  getEstimatedMonthlyIncome,
} from "./affordability/income.js";
export {
  calculateSalaryNeededForThirtyPercent,
  getRoommateAdjustedRent,
} from "./affordability/rent.js";
export { getDataSourceStatus } from "./metrics/get-data-source-status.js";
export { getAvailableYears } from "./metrics/get-available-years.js";
export { getMetricsByRange } from "./metrics/get-metrics-by-range.js";
export { getMetricsByYear, getMetricsSnapshotByYear } from "./metrics/get-metrics-snapshot-by-year.js";
export { getMetros } from "./metrics/get-metros.js";
export { isYearInRange, summarizeMetrics } from "./metrics/summarize-metrics.js";
export { loadMetricsDataset, loadSourceMetadata } from "./data/load-metrics-dataset.js";
export { getLatestRentByMetro } from "./trends/get-latest-rent-by-metro.js";
export { getMetroTrend, getTrendByMetro } from "./trends/get-metro-trend.js";
export {
  assertValidYear,
  assertValidYearRange,
} from "./validation/assert-valid-year-query.js";
export { assertValidAffordabilityInput } from "./validation/assert-valid-affordability-input.js";

export type {
  AffordabilityOptions,
  AffordabilityResult,
  NormalizedAffordabilityOptions,
  Risk,
} from "./types/affordability.js";
export type {
  DashboardMetric,
  DataSource,
  DataSourceStatus,
  DatasetType,
  MetroMetric,
  MetroRecord,
  SourceMetadata,
  TrendPoint,
} from "./types/metrics.js";