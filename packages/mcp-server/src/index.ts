import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createRegisteredServer } from "./server/register-tools.js";

export { createRegisteredServer, phase3ToolNames, registerTools } from "./server/register-tools.js";
export { calculateAffordabilityTool } from "./tools/calculate-affordability.js";
export { createGraphTool } from "./tools/create-graph.js";
export { getDataSourceStatusTool } from "./tools/get-data-source-status.js";
export { getMetricsSnapshotTool } from "./tools/get-metrics-snapshot.js";
export { getMetrosTool } from "./tools/get-metros.js";
export { getMetroTrendTool } from "./tools/get-trend.js";
export { getAvailableYearsTool } from "./tools/get-years.js";
export type { ToolFailure, ToolResult, ToolSuccess } from "./tools/tool-result.js";

export async function startMcpServer(): Promise<void> {
  const server = createRegisteredServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  void startMcpServer();
}