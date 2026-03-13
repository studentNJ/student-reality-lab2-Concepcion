import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { orchestrateChat } from "../../apps/web/src/lib/ai/orchestrator.js";

const originalOpenAiApiKey = process.env.OPENAI_API_KEY;
const originalFetch = global.fetch;

describe("orchestrateChat", () => {
  beforeEach(() => {
    delete process.env.OPENAI_API_KEY;
  });

  afterEach(() => {
    if (originalOpenAiApiKey === undefined) {
      delete process.env.OPENAI_API_KEY;
      return;
    }

    process.env.OPENAI_API_KEY = originalOpenAiApiKey;
    global.fetch = originalFetch;
  });

  it("creates multiple metro trend charts in prompt order", async () => {
    const response = await orchestrateChat({
      prompt: "I want the rent burden charts for Chicago, Washington and Newark.",
    });

    expect(response.meta.intent).toBe("metro_trend_chart");
    expect(response.message.state).toBe("complete");
    expect(response.message.chartSpecs).toHaveLength(3);
    expect(response.message.chartSpecs?.map((chartSpec) => chartSpec.title)).toEqual([
      expect.stringContaining("Chicago"),
      expect.stringContaining("Washington"),
      expect.stringContaining("Newark"),
    ]);
  });

  it("keeps single-metro trend requests on the single-chart path", async () => {
    const response = await orchestrateChat({
      prompt: "Show a rent burden trend chart for Chicago.",
    });

    expect(response.meta.intent).toBe("metro_trend_chart");
    expect(response.message.chartSpec?.title).toContain("Chicago");
    expect(response.message.chartSpecs).toHaveLength(1);
  });

  it("normalizes legacy model metric aliases before building snapshot charts", async () => {
    process.env.OPENAI_API_KEY = "test-key";
    global.fetch = async () => {
      return new Response(JSON.stringify({
        choices: [
          {
            message: {
              content: JSON.stringify({
                intent: "metrics_snapshot",
                year: 2015,
                metric: "rent_burden",
                wantsChart: true,
              }),
            },
          },
        ],
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };

    const response = await orchestrateChat({
      prompt: "Rent Burden by Metro for the year 2015 chart",
    });

    expect(response.meta.intent).toBe("metrics_snapshot");
    expect(response.message.state).toBe("complete");
    expect(response.message.chartSpec?.chartType).toBe("metro_snapshot_bar");
    expect(response.message.content).toContain("2015");
    expect(response.message.toolCalls?.some((toolCall) => toolCall.toolName === "create_graph" && toolCall.status === "success")).toBe(true);
  });
});