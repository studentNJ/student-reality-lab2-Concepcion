import { getDataSourceStatus } from "@student-reality-lab/domain";
import { getDataSourceStatusRequestSchema, getDataSourceStatusResponseDataSchema } from "@student-reality-lab/shared";
import {
  createToolFailure,
  createToolSuccess,
  normalizeErrorMessage,
  type ToolResult,
} from "./tool-result.js";

const toolName = "get_data_source_status";

export function getDataSourceStatusTool(input: unknown = {}): ToolResult<{
  sourceMode: "database" | "csv" | "mixed";
  details?: Array<Record<string, unknown>>;
}> {
  try {
    getDataSourceStatusRequestSchema.parse(input);
    const status = getDataSourceStatus();
    const sourceMode = status.configuredMode === "database"
      ? (status.activeSource === "database" ? "database" : "mixed")
      : "csv";

    const data = getDataSourceStatusResponseDataSchema.parse({
      sourceMode,
      details: [
        {
          configuredMode: status.configuredMode,
          activeSource: status.activeSource,
          datasetType: status.datasetType,
          datasetLabel: status.datasetLabel,
          metroCount: status.metroCount,
          startYear: status.startYear,
          endYear: status.endYear,
          lastRefreshed: status.lastRefreshed,
        },
      ],
    });

    return createToolSuccess(toolName, data);
  } catch (error) {
    return createToolFailure(toolName, "GET_DATA_SOURCE_STATUS_FAILED", normalizeErrorMessage(error));
  }
}