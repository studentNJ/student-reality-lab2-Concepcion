"use client";

import { useState } from "react";

interface PromptBoxProps {
  disabled?: boolean;
  onSubmit: (prompt: string) => void;
}

export function PromptBox({ disabled = false, onSubmit }: PromptBoxProps) {
  const [prompt, setPrompt] = useState("");

  function submitPrompt() {
    const trimmed = prompt.trim();

    if (!trimmed || disabled) {
      return;
    }

    onSubmit(trimmed);
    setPrompt("");
  }

  return (
    <section className="prompt-box-shell">
      <textarea
        className="prompt-box"
        disabled={disabled}
        onChange={(event) => setPrompt(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            submitPrompt();
          }
        }}
        placeholder="Ask about metros, affordability scenarios, year ranges, or request a chart"
        rows={5}
        value={prompt}
      />
      <div className="prompt-actions">
        <p>{disabled ? "Assistant is preparing the next response." : "Use Enter to send and Shift+Enter for a new line."}</p>
        <button className="send-button" disabled={disabled || prompt.trim().length === 0} onClick={submitPrompt} type="button">
          Start analysis
        </button>
      </div>
    </section>
  );
}