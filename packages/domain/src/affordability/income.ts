const ESTIMATED_TAKE_HOME_RATE = 0.78;

function roundToTwo(value: number): number {
  return Number(value.toFixed(2));
}

export function annualIncomeToMonthlyIncome(annualIncome: number): number {
  return roundToTwo(annualIncome / 12);
}

export function getEstimatedMonthlyIncome(
  annualIncome: number,
  useEstimatedAfterTaxIncome = false,
): number {
  const grossMonthlyIncome = annualIncomeToMonthlyIncome(annualIncome);

  if (!useEstimatedAfterTaxIncome) {
    return grossMonthlyIncome;
  }

  return roundToTwo(grossMonthlyIncome * ESTIMATED_TAKE_HOME_RATE);
}