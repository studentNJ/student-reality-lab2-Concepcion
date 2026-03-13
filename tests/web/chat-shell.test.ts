import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { ChatShell } from "../../apps/web/src/features/chat/components/ChatShell.js";

describe("ChatShell", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("shows the tool-card status box outside production mode", () => {
    vi.stubEnv("NODE_ENV", "test");

    const markup = renderToStaticMarkup(React.createElement(ChatShell));

    expect(markup).toContain("Tool cards");
    expect(markup).toContain("Charts");
  });

  it("hides the tool-card status box in production mode", () => {
    vi.stubEnv("NODE_ENV", "production");

    const markup = renderToStaticMarkup(React.createElement(ChatShell));

    expect(markup).not.toContain("Tool cards");
    expect(markup).toContain("Charts");
  });
});