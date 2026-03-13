import { describe, expect, it } from "vitest";
import {
  annualIncomeToMonthlyIncome,
  calculateAffordability,
  calculateSalaryNeededForThirtyPercent,
  classifyRisk,
  getEstimatedMonthlyIncome,
  getRoommateAdjustedRent,
} from "../../packages/domain/src/index.js";

describe("affordability domain", () => {
  it("computes burden, disposable income, and risk for valid inputs", () => {
    const result = calculateAffordability(72000, 1800, 200);

    expect(result.rentBurdenPercent).toBe(30);
    expect(result.monthlyDisposableIncome).toBe(4000);
    expect(result.risk).toBe("Risky");
  });

  it("classifies boundaries correctly", () => {
    expect(classifyRisk(24.99)).toBe("Safe");
    expect(classifyRisk(25)).toBe("Risky");
    expect(classifyRisk(35)).toBe("Risky");
    expect(classifyRisk(35.01)).toBe("Cost-burdened");
  });

  it("throws on invalid annual income", () => {
    expect(() => calculateAffordability(0, 1000, 0)).toThrow("annualIncome must be greater than 0");
  });

  it("throws on negative debt", () => {
    expect(() => calculateAffordability(60000, 1000, -5)).toThrow("monthlyDebt cannot be negative");
  });

  it("converts annual salary to monthly income", () => {
    expect(annualIncomeToMonthlyIncome(72000)).toBe(6000);
  });

  it("adjusts rent for roommates", () => {
    expect(getRoommateAdjustedRent(2400, 2)).toBe(800);
  });

  it("rounds roommate-adjusted rent and rejects invalid roommate counts", () => {
    expect(getRoommateAdjustedRent(2000, 2)).toBe(666.67);
    expect(() => getRoommateAdjustedRent(2000, -1)).toThrow("roommates must be a non-negative whole number");
  });

  it("supports estimated after-tax income and salary target", () => {
    const result = calculateAffordability(72000, 1800, {
      monthlyStudentLoan: 200,
      roommates: 1,
      useEstimatedAfterTaxIncome: true,
    });

    expect(getEstimatedMonthlyIncome(72000, true)).toBe(4680);
    expect(result.effectiveMonthlyRent).toBe(900);
    expect(result.salaryNeededForThirtyPercent).toBe(36000);
    expect(result.incomeMode).toBe("estimated_after_tax");
  });

  it("supports household size input as a compatibility alias", () => {
    const result = calculateAffordability(72000, 1800, {
      householdSize: 2,
    });

    expect(result.effectiveMonthlyRent).toBe(900);
    expect(result.householdSize).toBe(2);
  });

  it("computes the salary needed to hit the 30 percent rule", () => {
    expect(calculateSalaryNeededForThirtyPercent(1500)).toBe(60000);
  });

  it("rounds affordability outputs for uneven rent splits", () => {
    const result = calculateAffordability(80000, 2000, {
      roommates: 2,
      monthlyDebt: 333.33,
    });

    expect(result.effectiveMonthlyRent).toBe(666.67);
    expect(result.rentBurdenPercent).toBe(10);
    expect(result.monthlyDisposableIncome).toBe(5666.67);
    expect(result.salaryNeededForThirtyPercent).toBe(26666.8);
  });
});