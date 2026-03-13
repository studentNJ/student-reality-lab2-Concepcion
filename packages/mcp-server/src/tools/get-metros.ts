import { getMetros } from "@student-reality-lab/domain";
import { getMetrosRequestSchema, getMetrosResponseDataSchema } from "@student-reality-lab/shared";
import {
  createToolFailure,
  createToolSuccess,
  normalizeErrorMessage,
  type ToolResult,
} from "./tool-result.js";

const toolName = "get_metros";

export function getMetrosTool(input: unknown = {}): ToolResult<{ metros: Array<{ name: string; id?: string }> }> {
  try {
    getMetrosRequestSchema.parse(input);
    const metros = getMetros().map((metro) => ({ id: metro.id, name: metro.name }));
    const data = getMetrosResponseDataSchema.parse({ metros });
    return createToolSuccess(toolName, data);
  } catch (error) {
    return createToolFailure(toolName, "GET_METROS_FAILED", normalizeErrorMessage(error));
  }
}