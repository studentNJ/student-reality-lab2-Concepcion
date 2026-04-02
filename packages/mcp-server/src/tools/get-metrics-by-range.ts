import { getMetricsByRange } from "@student-reality-lab/domain";
import { metricsRangeRequestSchema, metricsRangeResponseDataSchema } from "@student-reality-lab/shared";
import {
  createToolFailure,
  createToolSuccess,
  normalizeErrorMessage,
  type ToolResult,
} from "./tool-result.js";

const toolName = "get_metrics_by_range";

export function getMetricsByRangeTool(input: unknown): ToolResult<{
  startYear: number;
  endYear: number;
  rows: Array<Record<string, unknown>>;
}> {
  try {
    const validated = metricsRangeRequestSchema.parse(input);
    const data = metricsRangeResponseDataSchema.parse({
      startYear: validated.startYear,
      endYear: validated.endYear,
      rows: getMetricsByRange(validated.startYear, validated.endYear),
    });

    return createToolSuccess(toolName, data);
  } catch (error) {
    return createToolFailure(toolName, "GET_METRICS_BY_RANGE_FAILED", normalizeErrorMessage(error));
  }
}