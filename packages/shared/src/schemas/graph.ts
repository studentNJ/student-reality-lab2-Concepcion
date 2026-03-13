import { z } from "zod";
import { graphTypes } from "../constants/graph-types.js";
import { calculateAffordabilityResponseDataSchema } from "./affordability.js";
import { metricsSnapshotResponseDataSchema } from "./metrics.js";
import { metroTrendResponseDataSchema } from "./trend.js";

export const graphTypeSchema = z.enum(graphTypes);

export const axisSpecSchema = z.object({
  label: z.string().min(1),
  field: z.string().min(1),
  type: z.enum(["category", "number", "time"]),
  formatter: z.enum(["currency_usd", "percent", "integer"]).optional(),
});

export const seriesSpecSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  points: z.array(z.record(z.string(), z.unknown())),
});

export const annotationSpecSchema = z.object({
  type: z.enum(["threshold", "callout", "highlight"]),
  label: z.string().min(1),
  field: z.string().min(1).optional(),
  value: z.union([z.string(), z.number()]).optional(),
  seriesId: z.string().min(1).optional(),
  pointIndex: z.number().int().min(0).optional(),
});

export const formattingHintsSchema = z.object({
  showLegend: z.boolean().optional(),
  showGrid: z.boolean().optional(),
  legendPosition: z.enum(["top", "bottom", "left", "right"]).optional(),
});

export const narrativeMetaSchema = z.object({
  summary: z.string().optional(),
  highestValue: z.object({
    label: z.string().min(1),
    value: z.number(),
  }).optional(),
  lowestValue: z.object({
    label: z.string().min(1),
    value: z.number(),
  }).optional(),
  thresholdNotes: z.array(z.string()).optional(),
});

export const chartSpecSchema = z.object({
  chartType: graphTypeSchema,
  title: z.string().min(1),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  axes: z.object({
    x: axisSpecSchema,
    y: axisSpecSchema,
  }),
  series: z.array(seriesSpecSchema).min(1),
  annotations: z.array(annotationSpecSchema).optional(),
  formattingHints: formattingHintsSchema.optional(),
  narrativeMeta: narrativeMetaSchema.optional(),
});

export const createGraphRequestSchema = z.object({
  graphType: graphTypeSchema,
  title: z.string().min(1),
  axes: z.object({
    x: axisSpecSchema,
    y: axisSpecSchema,
  }),
  series: z.array(seriesSpecSchema).min(1),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  annotations: z.array(annotationSpecSchema).optional(),
  formattingHints: formattingHintsSchema.optional(),
  narrativeMeta: narrativeMetaSchema.optional(),
});

export const graphHelperMetricSchema = z.enum([
  "rent_burden_percent",
  "median_gross_rent",
  "median_monthly_income",
  "maxAffordableMonthlyHousing",
  "affordabilityRatio",
]);

export const graphHelperBaseSchema = z.object({
  inputMode: z.literal("helper"),
  title: z.string().min(1).optional(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  annotations: z.array(annotationSpecSchema).optional(),
  formattingHints: formattingHintsSchema.optional(),
  narrativeMeta: narrativeMetaSchema.optional(),
});

export const metroSnapshotGraphHelperInputSchema = graphHelperBaseSchema.extend({
  graphType: z.literal("metro_snapshot_bar"),
  sourceTool: z.literal("get_metrics_snapshot"),
  data: metricsSnapshotResponseDataSchema,
  metric: z.enum(["rent_burden_percent", "median_gross_rent", "median_monthly_income"]).default("rent_burden_percent"),
  topN: z.number().int().positive().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  highlightThreshold: z.number().optional(),
  highlightMetroIds: z.array(z.string().min(1)).optional(),
});

export const metroTrendGraphHelperInputSchema = graphHelperBaseSchema.extend({
  graphType: z.literal("metro_trend_line"),
  sourceTool: z.literal("get_metro_trend"),
  data: metroTrendResponseDataSchema,
  metric: z.enum(["rent_burden_percent"]).default("rent_burden_percent"),
  highlightThreshold: z.number().optional(),
});

export const metroCompareGraphHelperInputSchema = graphHelperBaseSchema.extend({
  graphType: z.literal("metro_compare_line"),
  sourceTool: z.literal("get_metro_trend"),
  data: z.array(metroTrendResponseDataSchema).min(2),
  metric: z.enum(["rent_burden_percent"]).default("rent_burden_percent"),
}).superRefine((input, context) => {
  const [first, ...rest] = input.data;

  for (const trend of rest) {
    if (trend.startYear !== first.startYear || trend.endYear !== first.endYear) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "all comparison trend inputs must share the same year range",
        path: ["data"],
      });
      return;
    }
  }
});

export const affordabilityScenarioGraphHelperInputSchema = graphHelperBaseSchema.extend({
  graphType: z.literal("affordability_scenario_bar"),
  sourceTool: z.literal("calculate_affordability"),
  scenarios: z.array(
    z.object({
      label: z.string().min(1),
      data: calculateAffordabilityResponseDataSchema,
    }),
  ).min(1),
  metric: z.enum(["maxAffordableMonthlyHousing", "affordabilityRatio"]).default("maxAffordableMonthlyHousing"),
});

export const createGraphHelperInputSchema = z.union([
  metroSnapshotGraphHelperInputSchema,
  metroTrendGraphHelperInputSchema,
  metroCompareGraphHelperInputSchema,
  affordabilityScenarioGraphHelperInputSchema,
]);

export type GraphType = z.infer<typeof graphTypeSchema>;
export type AxisSpec = z.infer<typeof axisSpecSchema>;
export type SeriesSpec = z.infer<typeof seriesSpecSchema>;
export type AnnotationSpec = z.infer<typeof annotationSpecSchema>;
export type FormattingHints = z.infer<typeof formattingHintsSchema>;
export type NarrativeMeta = z.infer<typeof narrativeMetaSchema>;
export type ChartSpec = z.infer<typeof chartSpecSchema>;
export type CreateGraphRequest = z.infer<typeof createGraphRequestSchema>;
export type GraphHelperMetric = z.infer<typeof graphHelperMetricSchema>;
export type GraphHelperBase = z.infer<typeof graphHelperBaseSchema>;
export type MetroSnapshotGraphHelperInput = z.infer<typeof metroSnapshotGraphHelperInputSchema>;
export type MetroTrendGraphHelperInput = z.infer<typeof metroTrendGraphHelperInputSchema>;
export type MetroCompareGraphHelperInput = z.infer<typeof metroCompareGraphHelperInputSchema>;
export type AffordabilityScenarioGraphHelperInput = z.infer<typeof affordabilityScenarioGraphHelperInputSchema>;
export type CreateGraphHelperInput = z.infer<typeof createGraphHelperInputSchema>;