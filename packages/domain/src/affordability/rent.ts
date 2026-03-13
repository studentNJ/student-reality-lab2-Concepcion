function roundToTwo(value: number): number {
  return Number(value.toFixed(2));
}

export function getRoommateAdjustedRent(medianGrossRent: number, roommates = 0): number {
  if (!Number.isInteger(roommates) || roommates < 0) {
    throw new Error("roommates must be a non-negative whole number");
  }

  return roundToTwo(medianGrossRent / (roommates + 1));
}

export function calculateSalaryNeededForThirtyPercent(monthlyRent: number): number {
  return roundToTwo((monthlyRent * 12) / 0.3);
}