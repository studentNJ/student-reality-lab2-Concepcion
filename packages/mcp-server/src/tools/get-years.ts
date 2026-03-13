import { getAvailableYears } from "@student-reality-lab/domain";
import {
  getAvailableYearsRequestSchema,
  getAvailableYearsResponseDataSchema,
} from "@student-reality-lab/shared";
import {
  createToolFailure,
  createToolSuccess,
  normalizeErrorMessage,
  type ToolResult,
} from "./tool-result.js";

const toolName = "get_available_years";

export function getAvailableYearsTool(input: unknown = {}): ToolResult<{ years: number[] }> {
  try {
    getAvailableYearsRequestSchema.parse(input);
    const data = getAvailableYearsResponseDataSchema.parse({ years: getAvailableYears() });
    return createToolSuccess(toolName, data);
  } catch (error) {
    return createToolFailure(toolName, "GET_AVAILABLE_YEARS_FAILED", normalizeErrorMessage(error));
  }
}