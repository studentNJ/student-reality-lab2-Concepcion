import { z } from "zod";
import { graphTypes } from "../constants/graph-types.js";

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

export type GraphType = z.infer<typeof graphTypeSchema>;
export type AxisSpec = z.infer<typeof axisSpecSchema>;
export type SeriesSpec = z.infer<typeof seriesSpecSchema>;
export type AnnotationSpec = z.infer<typeof annotationSpecSchema>;
export type FormattingHints = z.infer<typeof formattingHintsSchema>;
export type NarrativeMeta = z.infer<typeof narrativeMetaSchema>;
export type ChartSpec = z.infer<typeof chartSpecSchema>;
export type CreateGraphRequest = z.infer<typeof createGraphRequestSchema>;