import { saveChatTurn } from "@student-reality-lab/db";
import type { ChatStreamEvent } from "@web/lib/chat-stream-types";
import { streamChat, type ChatApiRequest } from "@web/lib/ai/orchestrator";

function createSseFrame(event: ChatStreamEvent): string {
  return `data: ${JSON.stringify(event)}\n\n`;
}

export async function POST(request: Request) {
  let requestedConversationId: string | undefined;

  try {
    const body = await request.json() as Partial<ChatApiRequest>;
    requestedConversationId = typeof body.conversationId === "string" ? body.conversationId : undefined;

    if (!body.prompt || typeof body.prompt !== "string") {
      return new Response(createSseFrame({
        type: "error",
        content: "A prompt is required.",
        meta: {
          planner: "fallback",
          intent: "help",
          conversationId: requestedConversationId,
        },
      }), {
        status: 400,
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache, no-transform",
          Connection: "keep-alive",
        },
      });
    }

    const prompt = body.prompt;

    const encoder = new TextEncoder();
    let isAborted = false;

    request.signal.addEventListener("abort", () => {
      isAborted = true;
    });

    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        const emit = async (event: Exclude<ChatStreamEvent, { type: "final" }>) => {
          if (isAborted) {
            return;
          }

          controller.enqueue(encoder.encode(createSseFrame(event)));
        };

        void (async () => {
          try {
            const response = await streamChat({
              prompt,
              conversationId: requestedConversationId,
              history: Array.isArray(body.history) ? body.history : [],
            }, emit);

            if (isAborted) {
              return;
            }

            let persistedConversationId = requestedConversationId;

            try {
              const persistence = await saveChatTurn({
                conversationId: requestedConversationId,
                userPrompt: prompt,
                assistantMessage: response.message,
                planner: response.meta.planner,
                intent: response.meta.intent,
              });

              persistedConversationId = persistence.conversationId;
            } catch (persistenceError) {
              console.error("Chat persistence failed", persistenceError);
            }

            if (isAborted) {
              return;
            }

            controller.enqueue(encoder.encode(createSseFrame({
              type: "final",
              message: response.message,
              meta: {
                ...response.meta,
                conversationId: persistedConversationId,
              },
            })));
          } catch (error) {
            if (isAborted) {
              return;
            }

            const message = error instanceof Error ? error.message : "Unexpected error";

            controller.enqueue(encoder.encode(createSseFrame({
              type: "error",
              content: `Chat orchestration failed: ${message}`,
              meta: {
                conversationId: requestedConversationId,
                planner: "fallback",
                intent: "help",
              },
            })));
          } finally {
            if (!isAborted) {
              controller.close();
            }
          }
        })();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";

    return new Response(createSseFrame({
      type: "error",
      content: `Chat orchestration failed: ${message}`,
      meta: {
        conversationId: requestedConversationId,
        planner: "fallback",
        intent: "help",
      },
    }), {
      status: 500,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  }
}