import { z } from "zod";

export const affordabilityOptionsSchema = z.object({
  monthlyDebt: z.number().min(0).optional(),
  monthlyStudentLoan: z.number().min(0).optional(),
  roommates: z.number().int().min(0).optional(),
  householdSize: z.number().int().positive().optional(),
  useEstimatedAfterTaxIncome: z.boolean().optional(),
});

export const affordabilityResultSchema = z.object({
  rentBurdenPercent: z.number(),
  monthlyDisposableIncome: z.number(),
  risk: z.enum(["Safe", "Risky", "Cost-burdened"]),
  effectiveMonthlyRent: z.number(),
  monthlyIncomeBasis: z.number(),
  salaryNeededForThirtyPercent: z.number(),
  householdSize: z.number().int().positive(),
  incomeMode: z.enum(["gross", "estimated_after_tax"]),
});

export const calculateAffordabilityRequestSchema = z.object({
  annualIncome: z.number().positive(),
  monthlyDebt: z.number().min(0).optional(),
  householdSize: z.number().int().positive().optional(),
  roommates: z.number().int().min(0).optional(),
  targetMetro: z.string().min(1).optional(),
  useEstimatedAfterTaxIncome: z.boolean().optional(),
}).refine(
  (input) => input.householdSize === undefined || input.roommates === undefined || input.householdSize === input.roommates + 1,
  {
    message: "householdSize must equal roommates plus one when both are provided",
    path: ["householdSize"],
  },
);

export const calculateAffordabilityResponseDataSchema = z.object({
  inputs: z.record(z.string(), z.unknown()),
  results: z.object({
    maxAffordableMonthlyHousing: z.number().optional(),
    affordabilityRatio: z.number().optional(),
    summary: z.string().optional(),
  }),
});

export const affordabilityScenarioRequestSchema = z.object({
  label: z.string().min(1),
  monthlyDebt: z.number().min(0).optional(),
  householdSize: z.number().int().positive().optional(),
  roommates: z.number().int().min(0).optional(),
  useEstimatedAfterTaxIncome: z.boolean().optional(),
}).refine(
  (input) => input.householdSize === undefined || input.roommates === undefined || input.householdSize === input.roommates + 1,
  {
    message: "householdSize must equal roommates plus one when both are provided",
    path: ["householdSize"],
  },
);

export const compareAffordabilityScenariosRequestSchema = z.object({
  annualIncome: z.number().positive(),
  targetMetro: z.string().min(1).optional(),
  scenarios: z.array(affordabilityScenarioRequestSchema).min(2),
});

export const compareAffordabilityScenariosResponseDataSchema = z.object({
  annualIncome: z.number().positive(),
  targetMetro: z.string().min(1).optional(),
  scenarios: z.array(
    z.object({
      label: z.string().min(1),
      risk: z.enum(["Safe", "Risky", "Cost-burdened"]).optional(),
      data: calculateAffordabilityResponseDataSchema,
    }),
  ).min(2),
});

export type AffordabilityOptions = z.infer<typeof affordabilityOptionsSchema>;
export type AffordabilityResult = z.infer<typeof affordabilityResultSchema>;
export type CalculateAffordabilityRequest = z.infer<typeof calculateAffordabilityRequestSchema>;
export type CalculateAffordabilityResponseData = z.infer<typeof calculateAffordabilityResponseDataSchema>;
export type AffordabilityScenarioRequest = z.infer<typeof affordabilityScenarioRequestSchema>;
export type CompareAffordabilityScenariosRequest = z.infer<typeof compareAffordabilityScenariosRequestSchema>;
export type CompareAffordabilityScenariosResponseData = z.infer<typeof compareAffordabilityScenariosResponseDataSchema>;