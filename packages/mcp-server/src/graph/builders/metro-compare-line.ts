import { chartSpecSchema, type ChartSpec, type CreateGraphRequest } from "@student-reality-lab/shared";

export function buildMetroCompareLine(request: CreateGraphRequest): ChartSpec {
  return chartSpecSchema.parse({
    ...request,
    chartType: "metro_compare_line",
    formattingHints: {
      showLegend: request.formattingHints?.showLegend ?? true,
      showGrid: request.formattingHints?.showGrid ?? true,
      legendPosition: request.formattingHints?.legendPosition ?? "top",
    },
  });
}