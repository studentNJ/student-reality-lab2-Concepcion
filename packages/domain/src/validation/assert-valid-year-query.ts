export function assertValidYear(year: number, fieldName = "year"): void {
  if (!Number.isInteger(year)) {
    throw new Error(`${fieldName} must be a whole number`);
  }
}

export function assertValidYearRange(startYear: number, endYear: number): void {
  assertValidYear(startYear, "startYear");
  assertValidYear(endYear, "endYear");

  if (startYear > endYear) {
    throw new Error("startYear must be less than or equal to endYear");
  }
}