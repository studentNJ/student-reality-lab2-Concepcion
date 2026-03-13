import { chartSpecSchema, type ChartSpec, type CreateGraphRequest } from "@student-reality-lab/shared";

export function buildMetroTrendLine(request: CreateGraphRequest): ChartSpec {
  return chartSpecSchema.parse({
    ...request,
    chartType: "metro_trend_line",
    formattingHints: {
      showLegend: request.formattingHints?.showLegend ?? false,
      showGrid: request.formattingHints?.showGrid ?? true,
      legendPosition: request.formattingHints?.legendPosition,
    },
  });
}