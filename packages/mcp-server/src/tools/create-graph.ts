import {
  chartSpecSchema,
  createGraphHelperInputSchema,
  createGraphRequestSchema,
  type ChartSpec,
  type CreateGraphHelperInput,
  type CreateGraphRequest,
} from "@student-reality-lab/shared";
import { buildAffordabilityScenarioBar } from "../graph/builders/affordability-scenario-bar.js";
import { buildMetroCompareLine } from "../graph/builders/metro-compare-line.js";
import { buildMetroSnapshotBar } from "../graph/builders/metro-snapshot-bar.js";
import { buildMetroTrendLine } from "../graph/builders/metro-trend-line.js";
import {
  createToolFailure,
  createToolSuccess,
  normalizeErrorMessage,
  type ToolResult,
} from "./tool-result.js";

const toolName = "create_graph";

const metricPresentation = {
  rent_burden_percent: {
    label: "Rent Burden (%)",
    formatter: "percent" as const,
  },
  median_gross_rent: {
    label: "Median Gross Rent",
    formatter: "currency_usd" as const,
  },
  median_monthly_income: {
    label: "Median Monthly Income",
    formatter: "currency_usd" as const,
  },
  maxAffordableMonthlyHousing: {
    label: "Max Affordable Monthly Housing",
    formatter: "currency_usd" as const,
  },
  affordabilityRatio: {
    label: "Affordability Ratio",
    formatter: "percent" as const,
  },
};

function buildHighestAndLowest(points: Array<{ label: string; value: number }>) {
  if (points.length === 0) {
    return {};
  }

  const sorted = [...points].sort((left, right) => right.value - left.value);
  const highest = sorted[0];
  const lowest = sorted[sorted.length - 1];

  return {
    highestValue: highest ? { label: highest.label, value: highest.value } : undefined,
    lowestValue: lowest ? { label: lowest.label, value: lowest.value } : undefined,
  };
}

function toRawGraphRequest(input: CreateGraphHelperInput): CreateGraphRequest {
  switch (input.graphType) {
    case "metro_snapshot_bar": {
      const presentation = metricPresentation[input.metric];
      const sortedRows = [...input.data.rows].sort((left, right) => {
        const leftValue = left[input.metric];
        const rightValue = right[input.metric];
        return input.sortOrder === "asc" ? leftValue - rightValue : rightValue - leftValue;
      });
      const rows = input.topN ? sortedRows.slice(0, input.topN) : sortedRows;
      const pointSummaries = rows.map((row) => ({ label: row.metro_name, value: row[input.metric] }));

      return {
        graphType: input.graphType,
        title: input.title ?? `${presentation.label} by metro (${input.data.year})`,
        subtitle: input.subtitle ?? `Derived from get_metrics_snapshot for ${input.data.year}`,
        description: input.description,
        axes: {
          x: { label: "Metro", field: "metro_name", type: "category" },
          y: { label: presentation.label, field: "value", type: "number", formatter: presentation.formatter },
        },
        series: [
          {
            id: input.metric,
            label: presentation.label,
            points: rows.map((row) => ({
              metro_id: row.metro_id,
              metro_name: row.metro_name,
              value: row[input.metric],
              year: row.year,
            })),
          },
        ],
        annotations: [
          ...(input.annotations ?? []),
          ...(input.highlightThreshold !== undefined
            ? [
                {
                  type: "threshold" as const,
                  label: `${presentation.label} threshold`,
                  field: "value",
                  value: input.highlightThreshold,
                },
              ]
            : []),
        ],
        formattingHints: input.formattingHints,
        narrativeMeta: {
          ...input.narrativeMeta,
          ...buildHighestAndLowest(pointSummaries),
        },
      };
    }
    case "metro_trend_line": {
      const presentation = metricPresentation[input.metric];
      const pointSummaries = input.data.series.map((point) => ({ label: String(point.year), value: point.value }));

      return {
        graphType: input.graphType,
        title: input.title ?? `${input.data.metro} ${presentation.label} trend`,
        subtitle: input.subtitle ?? `${input.data.startYear}-${input.data.endYear}`,
        description: input.description,
        axes: {
          x: { label: "Year", field: "year", type: "time", formatter: "integer" },
          y: { label: presentation.label, field: "value", type: "number", formatter: presentation.formatter },
        },
        series: [
          {
            id: input.data.metro,
            label: input.data.metro,
            points: input.data.series,
          },
        ],
        annotations: [
          ...(input.annotations ?? []),
          ...(input.highlightThreshold !== undefined
            ? [
                {
                  type: "threshold" as const,
                  label: `${presentation.label} threshold`,
                  field: "value",
                  value: input.highlightThreshold,
                },
              ]
            : []),
        ],
        formattingHints: input.formattingHints,
        narrativeMeta: {
          ...input.narrativeMeta,
          ...buildHighestAndLowest(pointSummaries),
        },
      };
    }
    case "metro_compare_line": {
      const presentation = metricPresentation[input.metric];
      const pointSummaries = input.data.flatMap((trend) => trend.series.map((point) => ({
        label: `${trend.metro} ${point.year}`,
        value: point.value,
      })));

      return {
        graphType: input.graphType,
        title: input.title ?? `Metro comparison for ${presentation.label}`,
        subtitle: input.subtitle ?? `${input.data[0]?.startYear}-${input.data[0]?.endYear}`,
        description: input.description,
        axes: {
          x: { label: "Year", field: "year", type: "time", formatter: "integer" },
          y: { label: presentation.label, field: "value", type: "number", formatter: presentation.formatter },
        },
        series: input.data.map((trend) => ({
          id: trend.metro,
          label: trend.metro,
          points: trend.series,
        })),
        annotations: input.annotations,
        formattingHints: {
          showLegend: input.formattingHints?.showLegend ?? true,
          showGrid: input.formattingHints?.showGrid,
          legendPosition: input.formattingHints?.legendPosition,
        },
        narrativeMeta: {
          ...input.narrativeMeta,
          ...buildHighestAndLowest(pointSummaries),
        },
      };
    }
    case "affordability_scenario_bar": {
      const presentation = metricPresentation[input.metric];
      const points = input.scenarios.map((scenario) => {
        const value = scenario.data.results[input.metric];

        if (typeof value !== "number") {
          throw new Error(`${input.metric} is required for each affordability scenario`);
        }

        return {
          scenario: scenario.label,
          value,
        };
      });

      return {
        graphType: input.graphType,
        title: input.title ?? `${presentation.label} across affordability scenarios`,
        subtitle: input.subtitle,
        description: input.description,
        axes: {
          x: { label: "Scenario", field: "scenario", type: "category" },
          y: { label: presentation.label, field: "value", type: "number", formatter: presentation.formatter },
        },
        series: [
          {
            id: input.metric,
            label: presentation.label,
            points,
          },
        ],
        annotations: input.annotations,
        formattingHints: input.formattingHints,
        narrativeMeta: {
          ...input.narrativeMeta,
          ...buildHighestAndLowest(points.map((point) => ({ label: point.scenario, value: point.value }))),
        },
      };
    }
  }
}

function normalizeGraphInput(input: unknown): { request: CreateGraphRequest; mode: "raw" | "helper" } {
  if (typeof input === "object" && input !== null && "inputMode" in input) {
    const helperInput = createGraphHelperInputSchema.parse(input);
    return {
      request: toRawGraphRequest(helperInput),
      mode: "helper",
    };
  }

  return {
    request: createGraphRequestSchema.parse(input),
    mode: "raw",
  };
}

function buildChartSpec(request: CreateGraphRequest): ChartSpec {
  switch (request.graphType) {
    case "metro_snapshot_bar":
      return buildMetroSnapshotBar(request);
    case "metro_trend_line":
      return buildMetroTrendLine(request);
    case "metro_compare_line":
      return buildMetroCompareLine(request);
    case "affordability_scenario_bar":
      return buildAffordabilityScenarioBar(request);
    default:
      throw new Error("Unsupported graph type");
  }
}

export function createGraphTool(input: unknown): ToolResult<ChartSpec> {
  try {
    const normalized = normalizeGraphInput(input);
    const data = chartSpecSchema.parse(buildChartSpec(normalized.request));
    return createToolSuccess(toolName, data, {
      builder: normalized.request.graphType,
      inputMode: normalized.mode,
    });
  } catch (error) {
    return createToolFailure(toolName, "CREATE_GRAPH_FAILED", normalizeErrorMessage(error));
  }
}