import {
  calculateAffordabilityTool,
  compareAffordabilityScenariosTool,
  compareMetrosTool,
  createGraphTool,
  retrieveConversationHistoryTool,
  getAvailableYearsTool,
  getDataSourceStatusTool,
  getMetricsByRangeTool,
  getMetricsSnapshotTool,
  getMetrosTool,
  getMetroTrendTool,
  type ToolFailure,
  type ToolResult,
  type ToolSuccess,
} from "@student-reality-lab/mcp-server";
import type { ChartSpec, CompareAffordabilityScenariosResponseData, CompareMetrosResponseData, ConversationHistoryResponseData, GetAvailableYearsResponseData, GetDataSourceStatusResponseData, GetMetrosResponseData, MetricsRangeResponseData, MetricsSnapshotResponseData, MetroTrendResponseData } from "@student-reality-lab/shared";
import type { CalculateAffordabilityResponseData } from "@student-reality-lab/shared";
import type { ToolCallSummary } from "@web/lib/chat-types";

export type SupportedToolName =
  | "get_available_years"
  | "get_metros"
  | "get_metrics_snapshot"
  | "get_metrics_by_range"
  | "get_metro_trend"
  | "compare_metros"
  | "calculate_affordability"
  | "compare_affordability_scenarios"
  | "get_data_source_status"
  | "create_graph"
  | "retrieve_conversation_history";

type ToolDataMap = {
  get_available_years: GetAvailableYearsResponseData;
  get_metros: GetMetrosResponseData;
  get_metrics_snapshot: MetricsSnapshotResponseData;
  get_metrics_by_range: MetricsRangeResponseData;
  get_metro_trend: MetroTrendResponseData;
  compare_metros: CompareMetrosResponseData;
  calculate_affordability: CalculateAffordabilityResponseData;
  compare_affordability_scenarios: CompareAffordabilityScenariosResponseData;
  get_data_source_status: GetDataSourceStatusResponseData;
  create_graph: ChartSpec;
  retrieve_conversation_history: ConversationHistoryResponseData;
};

const toolRegistry = {
  get_available_years: getAvailableYearsTool,
  get_metros: getMetrosTool,
  get_metrics_snapshot: getMetricsSnapshotTool,
  get_metrics_by_range: getMetricsByRangeTool,
  get_metro_trend: getMetroTrendTool,
  compare_metros: compareMetrosTool,
  calculate_affordability: calculateAffordabilityTool,
  compare_affordability_scenarios: compareAffordabilityScenariosTool,
  get_data_source_status: getDataSourceStatusTool,
  create_graph: createGraphTool,
  retrieve_conversation_history: retrieveConversationHistoryTool,
} satisfies Record<SupportedToolName, (input: unknown) => ToolResult<unknown> | Promise<ToolResult<unknown>>>;

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
    case "get_metrics_by_range": {
      const rangeData = data as ToolDataMap["get_metrics_by_range"];
      return `Loaded ${rangeData.rows.length} aggregated metro summaries for ${rangeData.startYear}-${rangeData.endYear}.`;
    }
    case "get_metro_trend": {
      const trendData = data as ToolDataMap["get_metro_trend"];
      return `Loaded ${trendData.series.length} trend points for ${trendData.metro}.`;
    }
    case "compare_metros": {
      const compareData = data as ToolDataMap["compare_metros"];
      return `Loaded comparable trend data for ${compareData.trends.length} metros.`;
    }
    case "calculate_affordability": {
      const affordabilityData = data as ToolDataMap["calculate_affordability"];
      return affordabilityData.results.summary ?? "Calculated affordability metrics.";
    }
    case "compare_affordability_scenarios": {
      const scenarioData = data as ToolDataMap["compare_affordability_scenarios"];
      return `Calculated ${scenarioData.scenarios.length} affordability scenarios.`;
    }
    case "get_data_source_status": {
      const statusData = data as ToolDataMap["get_data_source_status"];
      return `Active source mode is ${statusData.sourceMode}.`;
    }
    case "create_graph": {
      const chartData = data as ToolDataMap["create_graph"];
      return `Created a ${chartData.chartType} chart specification.`;
    }
    case "retrieve_conversation_history": {
      const historyData = data as ToolDataMap["retrieve_conversation_history"];
      return `Loaded ${historyData.messages.length} persisted messages from the conversation history.`;
    }
  }
}

export async function runTool<TToolName extends SupportedToolName>(
  toolName: TToolName,
  input: unknown = {},
): Promise<ToolExecution<TToolName>> {
  const result = await toolRegistry[toolName](input) as ToolResult<ToolDataMap[TToolName]>;

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