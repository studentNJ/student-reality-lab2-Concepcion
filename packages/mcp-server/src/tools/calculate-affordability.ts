import {
  calculateAffordability,
  classifyRisk,
  getEstimatedMonthlyIncome,
  getLatestRentByMetro,
} from "@student-reality-lab/domain";
import {
  calculateAffordabilityRequestSchema,
  calculateAffordabilityResponseDataSchema,
} from "@student-reality-lab/shared";
import {
  createToolFailure,
  createToolSuccess,
  normalizeErrorMessage,
  type ToolResult,
} from "./tool-result.js";

const toolName = "calculate_affordability";

function roundToTwo(value: number): number {
  return Number(value.toFixed(2));
}

export function calculateAffordabilityTool(input: unknown): ToolResult<{
  inputs: Record<string, unknown>;
  results: {
    maxAffordableMonthlyHousing?: number;
    affordabilityRatio?: number;
    summary?: string;
  };
}> {
  try {
    const validated = calculateAffordabilityRequestSchema.parse(input);
    const monthlyIncomeBasis = getEstimatedMonthlyIncome(
      validated.annualIncome,
      validated.useEstimatedAfterTaxIncome ?? false,
    );
    const maxAffordableMonthlyHousing = roundToTwo(monthlyIncomeBasis * 0.3);
    const targetMetroRent = validated.targetMetro ? getLatestRentByMetro(validated.targetMetro) : null;

    const affordability = targetMetroRent !== null
      ? calculateAffordability(validated.annualIncome, targetMetroRent, {
          monthlyDebt: validated.monthlyDebt,
          householdSize: validated.householdSize,
          roommates: validated.roommates,
          useEstimatedAfterTaxIncome: validated.useEstimatedAfterTaxIncome,
        })
      : null;

    const summary = affordability
      ? `${validated.targetMetro} is ${affordability.risk.toLowerCase()} at ${affordability.rentBurdenPercent}% of monthly income.`
      : `At 30% of monthly income, the maximum affordable monthly housing cost is $${maxAffordableMonthlyHousing}.`;

    const data = calculateAffordabilityResponseDataSchema.parse({
      inputs: validated,
      results: {
        maxAffordableMonthlyHousing,
        affordabilityRatio: affordability ? roundToTwo(affordability.rentBurdenPercent / 100) : undefined,
        summary,
      },
    });

    return createToolSuccess(toolName, data, affordability ? { risk: classifyRisk(affordability.rentBurdenPercent) } : undefined);
  } catch (error) {
    return createToolFailure(toolName, "CALCULATE_AFFORDABILITY_FAILED", normalizeErrorMessage(error));
  }
}