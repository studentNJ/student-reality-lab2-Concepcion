import { getMetricsSnapshotByYear } from "@student-reality-lab/domain";
import { metricsSnapshotRequestSchema, metricsSnapshotResponseDataSchema } from "@student-reality-lab/shared";
import {
  createToolFailure,
  createToolSuccess,
  normalizeErrorMessage,
  type ToolResult,
} from "./tool-result.js";

const toolName = "get_metrics_snapshot";

export function getMetricsSnapshotTool(input: unknown): ToolResult<{ year: number; rows: Array<Record<string, unknown>> }> {
  try {
    const validated = metricsSnapshotRequestSchema.parse(input);
    const data = metricsSnapshotResponseDataSchema.parse({
      year: validated.year,
      rows: getMetricsSnapshotByYear(validated.year),
    });

    return createToolSuccess(toolName, data);
  } catch (error) {
    return createToolFailure(toolName, "GET_METRICS_SNAPSHOT_FAILED", normalizeErrorMessage(error));
  }
}