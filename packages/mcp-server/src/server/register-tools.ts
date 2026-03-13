import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { calculateAffordabilityTool } from "../tools/calculate-affordability.js";
import { createGraphTool } from "../tools/create-graph.js";
import { getDataSourceStatusTool } from "../tools/get-data-source-status.js";
import { getMetricsSnapshotTool } from "../tools/get-metrics-snapshot.js";
import { getMetrosTool } from "../tools/get-metros.js";
import { getMetroTrendTool } from "../tools/get-trend.js";
import { getAvailableYearsTool } from "../tools/get-years.js";
import { toMcpToolResponse } from "../tools/tool-result.js";

export const phase3ToolNames = [
  "get_available_years",
  "get_metros",
  "get_metrics_snapshot",
  "get_metro_trend",
  "calculate_affordability",
  "get_data_source_status",
  "create_graph",
] as const;

const noInputShape = {};

const metricsSnapshotShape = {
  year: z.number().int(),
};

const metroTrendShape = {
  metro: z.string().min(1),
  startYear: z.number().int(),
  endYear: z.number().int(),
};

const calculateAffordabilityShape = {
  annualIncome: z.number().positive(),
  monthlyDebt: z.number().min(0).optional(),
  householdSize: z.number().int().positive().optional(),
  roommates: z.number().int().min(0).optional(),
  targetMetro: z.string().min(1).optional(),
  useEstimatedAfterTaxIncome: z.boolean().optional(),
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
    "get_metro_trend",
    "Return trend data for a metro across a year range.",
    metroTrendShape,
    async (input) => toMcpToolResponse(getMetroTrendTool(input)),
  );

  server.tool(
    "calculate_affordability",
    "Run affordability calculations based on user inputs.",
    calculateAffordabilityShape,
    async (input) => toMcpToolResponse(calculateAffordabilityTool(input)),
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

  return server;
}

export function createRegisteredServer(): McpServer {
  const server = new McpServer({
    name: "student-reality-lab",
    version: "0.1.0",
  });

  return registerTools(server);
}