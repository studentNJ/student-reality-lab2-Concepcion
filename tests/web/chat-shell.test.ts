import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { ChatShell } from "../../apps/web/src/features/chat/components/ChatShell.js";

describe("ChatShell", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("hides passive workspace status surfaces outside production mode", () => {
    vi.stubEnv("NODE_ENV", "test");

    const markup = renderToStaticMarkup(React.createElement(ChatShell));

    expect(markup).not.toContain("Tool cards");
    expect(markup).not.toContain("Workspace status");
    expect(markup).not.toContain("Workspace context");
    expect(markup).not.toContain("Session state");
    expect(markup).not.toContain("Dataset status");
    expect(markup).not.toContain("Selected context");
    expect(markup).not.toContain("Transparency");
    expect(markup).not.toContain("header-metric-card");
    expect(markup).toContain("Housing analysis studio");
  });

  it("keeps the shell free of passive workspace status in production mode", () => {
    vi.stubEnv("NODE_ENV", "production");

    const markup = renderToStaticMarkup(React.createElement(ChatShell));

    expect(markup).not.toContain("Tool cards");
    expect(markup).not.toContain("Workspace status");
    expect(markup).not.toContain("Workspace context");
    expect(markup).not.toContain("header-metric-card");
    expect(markup).toContain("Housing analysis studio");
  });
});