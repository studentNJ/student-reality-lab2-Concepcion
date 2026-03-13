import { chartSpecSchema, type ChartSpec, type CreateGraphRequest } from "@student-reality-lab/shared";

export function buildAffordabilityScenarioBar(request: CreateGraphRequest): ChartSpec {
  return chartSpecSchema.parse({
    ...request,
    chartType: "affordability_scenario_bar",
    formattingHints: {
      showLegend: request.formattingHints?.showLegend ?? false,
      showGrid: request.formattingHints?.showGrid ?? true,
      legendPosition: request.formattingHints?.legendPosition,
    },
  });
}