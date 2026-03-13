import {
  calculateAffordabilityTool,
  createGraphTool,
  getAvailableYearsTool,
  getDataSourceStatusTool,
  getMetricsSnapshotTool,
  getMetrosTool,
  getMetroTrendTool,
  type ToolFailure,
  type ToolResult,
  type ToolSuccess,
} from "@student-reality-lab/mcp-server";
import type { ChartSpec, GetAvailableYearsResponseData, GetDataSourceStatusResponseData, GetMetrosResponseData, MetricsSnapshotResponseData, MetroTrendResponseData } from "@student-reality-lab/shared";
import type { CalculateAffordabilityResponseData } from "@student-reality-lab/shared";
import type { ToolCallSummary } from "@web/lib/chat-types";

export type SupportedToolName =
  | "get_available_years"
  | "get_metros"
  | "get_metrics_snapshot"
  | "get_metro_trend"
  | "calculate_affordability"
  | "get_data_source_status"
  | "create_graph";

type ToolDataMap = {
  get_available_years: GetAvailableYearsResponseData;
  get_metros: GetMetrosResponseData;
  get_metrics_snapshot: MetricsSnapshotResponseData;
  get_metro_trend: MetroTrendResponseData;
  calculate_affordability: CalculateAffordabilityResponseData;
  get_data_source_status: GetDataSourceStatusResponseData;
  create_graph: ChartSpec;
};

const toolRegistry = {
  get_available_years: getAvailableYearsTool,
  get_metros: getMetrosTool,
  get_metrics_snapshot: getMetricsSnapshotTool,
  get_metro_trend: getMetroTrendTool,
  calculate_affordability: calculateAffordabilityTool,
  get_data_source_status: getDataSourceStatusTool,
  create_graph: createGraphTool,
} satisfies Record<SupportedToolName, (input: unknown) => ToolResult<unknown>>;

export interface ToolExecutionSuccess<TToolName extends SupportedToolName> {
  ok: true;
  toolName: TToolName;
  result: ToolSuccess<ToolDataMap[TToolName]>;
  summary: ToolCallSummary;
}

export interface ToolExecutionFailure<TToolName extends SupportedToolName> {
  ok: false;
  toolName: TToolName;
  result: ToolFailure;
  summary: ToolCallSummary;
}

export type ToolExecution<TToolName extends SupportedToolName> =
  | ToolExecutionSuccess<TToolName>
  | ToolExecutionFailure<TToolName>;

function summarizeSuccess(toolName: SupportedToolName, data: ToolDataMap[SupportedToolName]): string {
  switch (toolName) {
    case "get_available_years": {
      const yearsData = data as ToolDataMap["get_available_years"];
      return `Resolved ${yearsData.years.length} supported years.`;
    }
    case "get_metros": {
      const metrosData = data as ToolDataMap["get_metros"];
      return `Resolved ${metrosData.metros.length} supported metros.`;
    }
    case "get_metrics_snapshot": {
      const snapshotData = data as ToolDataMap["get_metrics_snapshot"];
      return `Loaded ${snapshotData.rows.length} metro rows for ${snapshotData.year}.`;
    }
    case "get_metro_trend": {
      const trendData = data as ToolDataMap["get_metro_trend"];
      return `Loaded ${trendData.series.length} trend points for ${trendData.metro}.`;
    }
    case "calculate_affordability": {
      const affordabilityData = data as ToolDataMap["calculate_affordability"];
      return affordabilityData.results.summary ?? "Calculated affordability metrics.";
    }
    case "get_data_source_status": {
      const statusData = data as ToolDataMap["get_data_source_status"];
      return `Active source mode is ${statusData.sourceMode}.`;
    }
    case "create_graph": {
      const chartData = data as ToolDataMap["create_graph"];
      return `Created a ${chartData.chartType} chart specification.`;
    }
  }
}

export function runTool<TToolName extends SupportedToolName>(
  toolName: TToolName,
  input: unknown = {},
): ToolExecution<TToolName> {
  const result = toolRegistry[toolName](input) as ToolResult<ToolDataMap[TToolName]>;

  if (result.ok) {
    return {
      ok: true,
      toolName,
      result,
      summary: {
        toolName,
        status: "success",
        summary: summarizeSuccess(toolName, result.data as ToolDataMap[SupportedToolName]),
        input: typeof input === "object" && input !== null ? (input as Record<string, unknown>) : undefined,
      },
    };
  }

  return {
    ok: false,
    toolName,
    result,
    summary: {
      toolName,
      status: "error",
      summary: result.error.message,
      input: typeof input === "object" && input !== null ? (input as Record<string, unknown>) : undefined,
    },
  };
}