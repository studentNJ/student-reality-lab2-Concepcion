import { z } from "zod";

export const yearSchema = z.number().int();

export const metroMetricSchema = z.object({
  metro_id: z.string().min(1),
  metro_name: z.string().min(1),
  year: yearSchema,
  median_annual_income: z.number(),
  median_monthly_income: z.number(),
  median_gross_rent: z.number(),
  rent_burden_percent: z.number(),
});

export const dashboardMetricSchema = z.object({
  metro_id: z.string().min(1),
  metro_name: z.string().min(1),
  start_year: yearSchema,
  end_year: yearSchema,
  median_monthly_income: z.number(),
  median_gross_rent: z.number(),
  rent_burden_percent: z.number(),
  sample_size: z.number().int().nonnegative(),
});

export const getAvailableYearsRequestSchema = z.object({}).strict();

export const getAvailableYearsResponseDataSchema = z.object({
  years: z.array(yearSchema),
});

export const metricsSnapshotRequestSchema = z.object({
  year: yearSchema,
});

export const metricsSnapshotResponseDataSchema = z.object({
  year: yearSchema,
  rows: z.array(metroMetricSchema),
});

export const metricsRangeRequestSchema = z.object({
  startYear: yearSchema,
  endYear: yearSchema,
}).refine((input) => input.startYear <= input.endYear, {
  message: "startYear must be less than or equal to endYear",
  path: ["endYear"],
});

export const metricsRangeResponseDataSchema = z.object({
  startYear: yearSchema,
  endYear: yearSchema,
  rows: z.array(dashboardMetricSchema),
});

export const domainDataSourceStatusSchema = z.object({
  configuredMode: z.enum(["database", "csv"]),
  activeSource: z.enum(["database", "csv_fallback"]),
  datasetType: z.enum(["sample", "production"]),
  datasetLabel: z.string().min(1),
  sourceDescription: z.string().nullable(),
  metroCount: z.number().int().nonnegative(),
  startYear: yearSchema.nullable(),
  endYear: yearSchema.nullable(),
  lastRefreshed: z.string().nullable(),
});

export const getDataSourceStatusRequestSchema = z.object({}).strict();

export const getDataSourceStatusResponseDataSchema = z.object({
  sourceMode: z.enum(["database", "csv", "mixed"]),
  details: z.array(z.record(z.string(), z.unknown())).optional(),
});

export type Year = z.infer<typeof yearSchema>;
export type MetroMetric = z.infer<typeof metroMetricSchema>;
export type DashboardMetric = z.infer<typeof dashboardMetricSchema>;
export type GetAvailableYearsRequest = z.infer<typeof getAvailableYearsRequestSchema>;
export type GetAvailableYearsResponseData = z.infer<typeof getAvailableYearsResponseDataSchema>;
export type MetricsSnapshotRequest = z.infer<typeof metricsSnapshotRequestSchema>;
export type MetricsSnapshotResponseData = z.infer<typeof metricsSnapshotResponseDataSchema>;
export type MetricsRangeRequest = z.infer<typeof metricsRangeRequestSchema>;
export type MetricsRangeResponseData = z.infer<typeof metricsRangeResponseDataSchema>;
export type DomainDataSourceStatus = z.infer<typeof domainDataSourceStatusSchema>;
export type GetDataSourceStatusRequest = z.infer<typeof getDataSourceStatusRequestSchema>;
export type GetDataSourceStatusResponseData = z.infer<typeof getDataSourceStatusResponseDataSchema>;