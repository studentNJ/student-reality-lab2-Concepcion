import {
  compareAffordabilityScenariosRequestSchema,
  compareAffordabilityScenariosResponseDataSchema,
} from "@student-reality-lab/shared";
import {
  createToolFailure,
  createToolSuccess,
  normalizeErrorMessage,
  type ToolResult,
} from "./tool-result.js";
import { calculateAffordabilityTool } from "./calculate-affordability.js";

const toolName = "compare_affordability_scenarios";

export function compareAffordabilityScenariosTool(input: unknown): ToolResult<{
  annualIncome: number;
  targetMetro?: string;
  scenarios: Array<{
    label: string;
    risk?: "Safe" | "Risky" | "Cost-burdened";
    data: {
      inputs: Record<string, unknown>;
      results: {
        maxAffordableMonthlyHousing?: number;
        affordabilityRatio?: number;
        summary?: string;
      };
    };
  }>;
}> {
  try {
    const validated = compareAffordabilityScenariosRequestSchema.parse(input);

    const scenarios = validated.scenarios.map((scenario) => {
      const result = calculateAffordabilityTool({
        annualIncome: validated.annualIncome,
        targetMetro: validated.targetMetro,
        monthlyDebt: scenario.monthlyDebt,
        householdSize: scenario.householdSize,
        roommates: scenario.roommates,
        useEstimatedAfterTaxIncome: scenario.useEstimatedAfterTaxIncome,
      });

      if (!result.ok) {
        throw new Error(`${scenario.label}: ${result.error.message}`);
      }

      return {
        label: scenario.label,
        risk: result.meta?.risk as "Safe" | "Risky" | "Cost-burdened" | undefined,
        data: result.data,
      };
    });

    const data = compareAffordabilityScenariosResponseDataSchema.parse({
      annualIncome: validated.annualIncome,
      targetMetro: validated.targetMetro,
      scenarios,
    });

    return createToolSuccess(toolName, data, {
      scenarioCount: scenarios.length,
    });
  } catch (error) {
    return createToolFailure(toolName, "COMPARE_AFFORDABILITY_SCENARIOS_FAILED", normalizeErrorMessage(error));
  }
}