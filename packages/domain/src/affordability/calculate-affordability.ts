import { classifyRisk } from "./classify-risk.js";
import { getEstimatedMonthlyIncome } from "./income.js";
import { calculateSalaryNeededForThirtyPercent, getRoommateAdjustedRent } from "./rent.js";
import type { AffordabilityOptions, AffordabilityResult } from "../types/affordability.js";
import { assertValidAffordabilityInput } from "../validation/assert-valid-affordability-input.js";

function roundToTwo(value: number): number {
  return Number(value.toFixed(2));
}

export function calculateAffordability(
  annualIncome: number,
  medianGrossRent: number,
  input?: number | AffordabilityOptions,
): AffordabilityResult {
  const options = assertValidAffordabilityInput(annualIncome, medianGrossRent, input);
  const monthlyIncomeBasis = getEstimatedMonthlyIncome(annualIncome, options.useEstimatedAfterTaxIncome);
  const effectiveMonthlyRent = getRoommateAdjustedRent(medianGrossRent, options.roommates);
  const rentBurdenPercent = roundToTwo((effectiveMonthlyRent / monthlyIncomeBasis) * 100);
  const monthlyDisposableIncome = roundToTwo(monthlyIncomeBasis - effectiveMonthlyRent - options.monthlyDebt);

  return {
    rentBurdenPercent,
    monthlyDisposableIncome,
    risk: classifyRisk(rentBurdenPercent),
    effectiveMonthlyRent,
    monthlyIncomeBasis,
    salaryNeededForThirtyPercent: calculateSalaryNeededForThirtyPercent(effectiveMonthlyRent),
    householdSize: options.householdSize,
    incomeMode: options.useEstimatedAfterTaxIncome ? "estimated_after_tax" : "gross",
  };
}