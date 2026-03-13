import { z } from "zod";
import { yearSchema } from "./metrics.js";

export const trendPointSchema = z.object({
  year: yearSchema,
  median_monthly_income: z.number(),
  median_gross_rent: z.number(),
  rent_burden_percent: z.number(),
});

export const trendSeriesPointSchema = z.object({
  year: yearSchema,
  value: z.number(),
});

export const metroTrendRequestSchema = z.object({
  metro: z.string().min(1),
  startYear: yearSchema,
  endYear: yearSchema,
}).refine((input) => input.startYear <= input.endYear, {
  message: "startYear must be less than or equal to endYear",
  path: ["endYear"],
});

export const metroTrendResponseDataSchema = z.object({
  metro: z.string().min(1),
  startYear: yearSchema,
  endYear: yearSchema,
  series: z.array(trendSeriesPointSchema),
});

export type TrendPoint = z.infer<typeof trendPointSchema>;
export type TrendSeriesPoint = z.infer<typeof trendSeriesPointSchema>;
export type MetroTrendRequest = z.infer<typeof metroTrendRequestSchema>;
export type MetroTrendResponseData = z.infer<typeof metroTrendResponseDataSchema>;