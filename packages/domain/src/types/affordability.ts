export type Risk = "Safe" | "Risky" | "Cost-burdened";

export interface AffordabilityOptions {
  monthlyDebt?: number;
  monthlyStudentLoan?: number;
  roommates?: number;
  householdSize?: number;
  useEstimatedAfterTaxIncome?: boolean;
}

export interface NormalizedAffordabilityOptions {
  monthlyDebt: number;
  roommates: number;
  householdSize: number;
  useEstimatedAfterTaxIncome: boolean;
}

export interface AffordabilityResult {
  rentBurdenPercent: number;
  monthlyDisposableIncome: number;
  risk: Risk;
  effectiveMonthlyRent: number;
  monthlyIncomeBasis: number;
  salaryNeededForThirtyPercent: number;
  householdSize: number;
  incomeMode: "gross" | "estimated_after_tax";
}