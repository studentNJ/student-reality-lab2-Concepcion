import { NextResponse } from "next/server";
import { orchestrateChat, type ChatApiRequest } from "@web/lib/ai/orchestrator";

export async function POST(request: Request) {
  try {
    const body = await request.json() as Partial<ChatApiRequest>;

    if (!body.prompt || typeof body.prompt !== "string") {
      return NextResponse.json(
        {
          message: {
            id: `assistant-${crypto.randomUUID()}`,
            role: "assistant",
            state: "error",
            content: "A prompt is required.",
          },
          meta: {
            planner: "fallback",
            intent: "help",
          },
        },
        { status: 400 },
      );
    }

    const response = await orchestrateChat({
      prompt: body.prompt,
      history: Array.isArray(body.history) ? body.history : [],
    });

    return NextResponse.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";

    return NextResponse.json(
      {
        message: {
          id: `assistant-${crypto.randomUUID()}`,
          role: "assistant",
          state: "error",
          content: `Chat orchestration failed: ${message}`,
        },
        meta: {
          planner: "fallback",
          intent: "help",
        },
      },
      { status: 500 },
    );
  }
}