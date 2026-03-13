import { getMetroTrend } from "@student-reality-lab/domain";
import { metroTrendRequestSchema, metroTrendResponseDataSchema } from "@student-reality-lab/shared";
import {
  createToolFailure,
  createToolSuccess,
  normalizeErrorMessage,
  type ToolResult,
} from "./tool-result.js";

const toolName = "get_metro_trend";

export function getMetroTrendTool(input: unknown): ToolResult<{
  metro: string;
  startYear: number;
  endYear: number;
  series: Array<{ year: number; value: number }>;
}> {
  try {
    const validated = metroTrendRequestSchema.parse(input);
    const trend = getMetroTrend(validated.metro, validated.startYear, validated.endYear);
    const data = metroTrendResponseDataSchema.parse({
      metro: validated.metro,
      startYear: validated.startYear,
      endYear: validated.endYear,
      series: trend.map((point) => ({
        year: point.year,
        value: point.rent_burden_percent,
      })),
    });

    return createToolSuccess(toolName, data, { metric: "rent_burden_percent" });
  } catch (error) {
    return createToolFailure(toolName, "GET_METRO_TREND_FAILED", normalizeErrorMessage(error));
  }
}