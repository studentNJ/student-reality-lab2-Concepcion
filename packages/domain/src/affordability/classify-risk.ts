import type { Risk } from "../types/affordability.js";

export function classifyRisk(rentBurdenPercent: number): Risk {
  if (rentBurdenPercent < 25) {
    return "Safe";
  }

  if (rentBurdenPercent <= 35) {
    return "Risky";
  }

  return "Cost-burdened";
}