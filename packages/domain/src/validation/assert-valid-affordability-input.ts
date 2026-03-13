import type {
  AffordabilityOptions,
  NormalizedAffordabilityOptions,
} from "../types/affordability.js";

function normalizeOptions(input?: number | AffordabilityOptions): NormalizedAffordabilityOptions {
  if (typeof input === "number") {
    return {
      monthlyDebt: input,
      roommates: 0,
      householdSize: 1,
      useEstimatedAfterTaxIncome: false,
    };
  }

  const monthlyDebt = input?.monthlyDebt ?? input?.monthlyStudentLoan ?? 0;

  if (input?.roommates !== undefined) {
    return {
      monthlyDebt,
      roommates: input.roommates,
      householdSize: input.roommates + 1,
      useEstimatedAfterTaxIncome: input.useEstimatedAfterTaxIncome ?? false,
    };
  }

  if (input?.householdSize !== undefined) {
    return {
      monthlyDebt,
      roommates: input.householdSize - 1,
      householdSize: input.householdSize,
      useEstimatedAfterTaxIncome: input.useEstimatedAfterTaxIncome ?? false,
    };
  }

  return {
    monthlyDebt,
    roommates: 0,
    householdSize: 1,
    useEstimatedAfterTaxIncome: input?.useEstimatedAfterTaxIncome ?? false,
  };
}

export function assertValidAffordabilityInput(
  annualIncome: number,
  medianGrossRent: number,
  input?: number | AffordabilityOptions,
): NormalizedAffordabilityOptions {
  if (annualIncome <= 0) {
    throw new Error("annualIncome must be greater than 0");
  }

  if (medianGrossRent < 0) {
    throw new Error("medianGrossRent cannot be negative");
  }

  const options = normalizeOptions(input);

  if (options.monthlyDebt < 0) {
    throw new Error("monthlyDebt cannot be negative");
  }

  if (!Number.isInteger(options.roommates) || options.roommates < 0) {
    throw new Error("roommates must be a non-negative whole number");
  }

  if (!Number.isInteger(options.householdSize) || options.householdSize <= 0) {
    throw new Error("householdSize must be a positive whole number");
  }

  return options;
}