import { getMetroTrend, getMetros } from "@student-reality-lab/domain";
import {
  compareMetrosRequestSchema,
  compareMetrosResponseDataSchema,
} from "@student-reality-lab/shared";
import {
  createToolFailure,
  createToolSuccess,
  normalizeErrorMessage,
  type ToolResult,
} from "./tool-result.js";

const toolName = "compare_metros";

function getMetroAliases(metroName: string): string[] {
  const parts = metroName
    .toLowerCase()
    .split(/[-,\/]/)
    .map((part) => part.trim())
    .filter((part) => part.length >= 3);

  return Array.from(new Set([metroName.toLowerCase(), ...parts]));
}

export function compareMetrosTool(input: unknown): ToolResult<{
  metros: string[];
  startYear: number;
  endYear: number;
  metric: "rent_burden_percent";
  trends: Array<{
    metro: string;
    startYear: number;
    endYear: number;
    series: Array<{ year: number; value: number }>;
  }>;
}> {
  try {
    const validated = compareMetrosRequestSchema.parse(input);
    const availableMetros = getMetros();
    const resolvedMetros = validated.metros.map((requestedMetro) => {
      const normalizedMetro = requestedMetro.toLowerCase();
      const metroRecord = availableMetros.find((metro) => metro.id === requestedMetro || getMetroAliases(metro.name).includes(normalizedMetro));

      if (!metroRecord) {
        throw new Error(`Unsupported metro: ${requestedMetro}`);
      }

      return metroRecord;
    });

    const uniqueMetroIds = new Set(resolvedMetros.map((metro) => metro.id));

    if (uniqueMetroIds.size < 2) {
      throw new Error("compare_metros requires at least two distinct metros");
    }

    const trends = resolvedMetros.map((metro) => {
      const series = getMetroTrend(metro.id, validated.startYear, validated.endYear);

      return {
        metro: metro.name,
        startYear: validated.startYear,
        endYear: validated.endYear,
        series: series.map((point) => ({
          year: point.year,
          value: point.rent_burden_percent,
        })),
      };
    });

    const data = compareMetrosResponseDataSchema.parse({
      metros: resolvedMetros.map((metro) => metro.name),
      startYear: validated.startYear,
      endYear: validated.endYear,
      metric: validated.metric,
      trends,
    });

    return createToolSuccess(toolName, data, {
      resolvedMetroIds: resolvedMetros.map((metro) => metro.id),
    });
  } catch (error) {
    return createToolFailure(toolName, "COMPARE_METROS_FAILED", normalizeErrorMessage(error));
  }
}