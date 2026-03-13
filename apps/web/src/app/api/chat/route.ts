import { NextResponse } from "next/server";
import { saveChatTurn } from "@student-reality-lab/db";
import { orchestrateChat, type ChatApiRequest } from "@web/lib/ai/orchestrator";

export async function POST(request: Request) {
  let requestedConversationId: string | undefined;

  try {
    const body = await request.json() as Partial<ChatApiRequest>;
    requestedConversationId = typeof body.conversationId === "string" ? body.conversationId : undefined;

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
      conversationId: requestedConversationId,
      history: Array.isArray(body.history) ? body.history : [],
    });

    if (response.message.role !== "assistant") {
      throw new Error("Chat orchestration returned a non-assistant message.");
    }

    let persistedConversationId = requestedConversationId;

    try {
      const persistence = await saveChatTurn({
        conversationId: requestedConversationId,
        userPrompt: body.prompt,
        assistantMessage: response.message,
        planner: response.meta.planner,
        intent: response.meta.intent,
      });

      persistedConversationId = persistence.conversationId;
    } catch (persistenceError) {
      console.error("Chat persistence failed", persistenceError);
    }

    return NextResponse.json({
      ...response,
      meta: {
        ...response.meta,
        conversationId: persistedConversationId,
      },
    });
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
          conversationId: requestedConversationId,
          planner: "fallback",
          intent: "help",
        },
      },
      { status: 500 },
    );
  }
}