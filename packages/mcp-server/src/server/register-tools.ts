import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { calculateAffordabilityTool } from "../tools/calculate-affordability.js";
import { compareAffordabilityScenariosTool } from "../tools/compare-affordability-scenarios.js";
import { compareMetrosTool } from "../tools/compare-metros.js";
import { createGraphTool } from "../tools/create-graph.js";
import { getDataSourceStatusTool } from "../tools/get-data-source-status.js";
import { getMetricsByRangeTool } from "../tools/get-metrics-by-range.js";
import { getMetricsSnapshotTool } from "../tools/get-metrics-snapshot.js";
import { getMetrosTool } from "../tools/get-metros.js";
import { getMetroTrendTool } from "../tools/get-trend.js";
import { getAvailableYearsTool } from "../tools/get-years.js";
import { retrieveConversationHistoryTool } from "../tools/retrieve-conversation-history.js";
import { toMcpToolResponse } from "../tools/tool-result.js";

export const phase3ToolNames = [
  "get_available_years",
  "get_metros",
  "get_metrics_snapshot",
  "get_metrics_by_range",
  "get_metro_trend",
  "compare_metros",
  "calculate_affordability",
  "compare_affordability_scenarios",
  "get_data_source_status",
  "create_graph",
  "retrieve_conversation_history",
] as const;

const noInputShape = {};

const metricsSnapshotShape = {
  year: z.number().int(),
};

const metricsRangeShape = {
  startYear: z.number().int(),
  endYear: z.number().int(),
};

const metroTrendShape = {
  metro: z.string().min(1),
  startYear: z.number().int(),
  endYear: z.number().int(),
};

const compareMetrosShape = {
  metros: z.array(z.string().min(1)).min(2),
  startYear: z.number().int(),
  endYear: z.number().int(),
  metric: z.enum(["rent_burden_percent"]).optional(),
};

const calculateAffordabilityShape = {
  annualIncome: z.number().positive(),
  monthlyDebt: z.number().min(0).optional(),
  householdSize: z.number().int().positive().optional(),
  roommates: z.number().int().min(0).optional(),
  targetMetro: z.string().min(1).optional(),
  useEstimatedAfterTaxIncome: z.boolean().optional(),
};

const compareAffordabilityScenariosShape = {
  annualIncome: z.number().positive(),
  targetMetro: z.string().min(1).optional(),
  scenarios: z.array(z.object({
    label: z.string().min(1),
    monthlyDebt: z.number().min(0).optional(),
    householdSize: z.number().int().positive().optional(),
    roommates: z.number().int().min(0).optional(),
    useEstimatedAfterTaxIncome: z.boolean().optional(),
  })).min(2),
};

const conversationHistoryShape = {
  conversationId: z.string().min(1),
  limit: z.number().int().positive().optional(),
  includeToolCalls: z.boolean().optional(),
};

const graphAxisShape = z.object({
  label: z.string().min(1),
  field: z.string().min(1),
  type: z.enum(["category", "number", "time"]),
  formatter: z.enum(["currency_usd", "percent", "integer"]).optional(),
});

const graphSeriesShape = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  points: z.array(z.record(z.string(), z.unknown())),
});

const createGraphShape = {
  inputMode: z.literal("helper").optional(),
  graphType: z.enum([
    "metro_snapshot_bar",
    "metro_trend_line",
    "metro_compare_line",
    "affordability_scenario_bar",
  ]),
  title: z.string().min(1).optional(),
  axes: z.object({
    x: graphAxisShape,
    y: graphAxisShape,
  }).optional(),
  series: z.array(graphSeriesShape).min(1).optional(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  annotations: z.array(
    z.object({
      type: z.enum(["threshold", "callout", "highlight"]),
      label: z.string().min(1),
      field: z.string().min(1).optional(),
      value: z.union([z.string(), z.number()]).optional(),
      seriesId: z.string().min(1).optional(),
      pointIndex: z.number().int().min(0).optional(),
    }),
  ).optional(),
  formattingHints: z.object({
    showLegend: z.boolean().optional(),
    showGrid: z.boolean().optional(),
    legendPosition: z.enum(["top", "bottom", "left", "right"]).optional(),
  }).optional(),
  narrativeMeta: z.object({
    summary: z.string().optional(),
    highestValue: z.object({ label: z.string().min(1), value: z.number() }).optional(),
    lowestValue: z.object({ label: z.string().min(1), value: z.number() }).optional(),
    thresholdNotes: z.array(z.string()).optional(),
  }).optional(),
  sourceTool: z.enum(["get_metrics_snapshot", "get_metro_trend", "calculate_affordability"]).optional(),
  data: z.unknown().optional(),
  scenarios: z.array(
    z.object({
      label: z.string().min(1),
      data: z.unknown(),
    }),
  ).optional(),
  metric: z.enum([
    "rent_burden_percent",
    "median_gross_rent",
    "median_monthly_income",
    "maxAffordableMonthlyHousing",
    "affordabilityRatio",
  ]).optional(),
  topN: z.number().int().positive().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  highlightThreshold: z.number().optional(),
  highlightMetroIds: z.array(z.string().min(1)).optional(),
};

export function registerTools(server: McpServer): McpServer {
  server.tool(
    "get_available_years",
    "Return all supported years in the dataset.",
    noInputShape,
    async () => toMcpToolResponse(getAvailableYearsTool()),
  );

  server.tool(
    "get_metros",
    "Return supported metro names.",
    noInputShape,
    async () => toMcpToolResponse(getMetrosTool()),
  );

  server.tool(
    "get_metrics_snapshot",
    "Return metric data for a single year.",
    metricsSnapshotShape,
    async (input) => toMcpToolResponse(getMetricsSnapshotTool(input)),
  );

  server.tool(
    "get_metrics_by_range",
    "Return aggregated metric data across a year range.",
    metricsRangeShape,
    async (input) => toMcpToolResponse(getMetricsByRangeTool(input)),
  );

  server.tool(
    "get_metro_trend",
    "Return trend data for a metro across a year range.",
    metroTrendShape,
    async (input) => toMcpToolResponse(getMetroTrendTool(input)),
  );

  server.tool(
    "compare_metros",
    "Return comparable trend data for two or more metros across the same year range.",
    compareMetrosShape,
    async (input) => toMcpToolResponse(compareMetrosTool(input)),
  );

  server.tool(
    "calculate_affordability",
    "Run affordability calculations based on user inputs.",
    calculateAffordabilityShape,
    async (input) => toMcpToolResponse(calculateAffordabilityTool(input)),
  );

  server.tool(
    "compare_affordability_scenarios",
    "Run multiple affordability scenarios for the same base income and optional metro target.",
    compareAffordabilityScenariosShape,
    async (input) => toMcpToolResponse(compareAffordabilityScenariosTool(input)),
  );

  server.tool(
    "get_data_source_status",
    "Return information about the current dataset source.",
    noInputShape,
    async () => toMcpToolResponse(getDataSourceStatusTool()),
  );

  server.tool(
    "create_graph",
    "Create structured chart specifications.",
    createGraphShape,
    async (input) => toMcpToolResponse(createGraphTool(input)),
  );

  server.tool(
    "retrieve_conversation_history",
    "Return persisted messages and optional tool calls for a conversation.",
    conversationHistoryShape,
    async (input) => toMcpToolResponse(await retrieveConversationHistoryTool(input)),
  );

  return server;
}

export function createRegisteredServer(): McpServer {
  const server = new McpServer({
    name: "student-reality-lab",
    version: "0.1.0",
  });

  return registerTools(server);
}