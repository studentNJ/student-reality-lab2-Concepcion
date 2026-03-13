export interface ToolSuccess<T> {
  [key: string]: unknown;
  ok: true;
  toolName: string;
  data: T;
  meta?: Record<string, unknown>;
}

export interface ToolFailure {
  [key: string]: unknown;
  ok: false;
  toolName: string;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

export type ToolResult<T> = ToolSuccess<T> | ToolFailure;

export function createToolSuccess<T>(
  toolName: string,
  data: T,
  meta?: Record<string, unknown>,
): ToolSuccess<T> {
  return {
    ok: true,
    toolName,
    data,
    ...(meta ? { meta } : {}),
  };
}

export function createToolFailure(
  toolName: string,
  code: string,
  message: string,
  details?: Record<string, unknown>,
): ToolFailure {
  return {
    ok: false,
    toolName,
    error: {
      code,
      message,
      ...(details ? { details } : {}),
    },
  };
}

export function toMcpToolResponse<T>(result: ToolResult<T>) {
  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(result, null, 2),
      },
    ],
    structuredContent: result as Record<string, unknown>,
  };
}

export function normalizeErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown error";
}