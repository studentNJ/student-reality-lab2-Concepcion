import { describe, expect, it } from "vitest";
import { createRegisteredServer, phase3ToolNames } from "../../packages/mcp-server/src/index.js";

describe("mcp server registration", () => {
  it("creates a registered server and exposes the expected tool names", () => {
    const server = createRegisteredServer();

    expect(server).toBeDefined();
    expect(phase3ToolNames).toEqual([
      "get_available_years",
      "get_metros",
      "get_metrics_snapshot",
      "get_metro_trend",
      "calculate_affordability",
      "get_data_source_status",
      "create_graph",
    ]);
  });
});