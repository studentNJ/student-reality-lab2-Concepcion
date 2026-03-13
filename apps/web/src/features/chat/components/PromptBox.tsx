"use client";

import { useState } from "react";

interface PromptBoxProps {
  disabled?: boolean;
  onSubmit: (prompt: string) => void;
  suggestions?: string[];
}

export function PromptBox({ disabled = false, onSubmit, suggestions = [] }: PromptBoxProps) {
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
      {suggestions.length > 0 ? (
        <div className="prompt-suggestions" aria-label="Starter prompts">
          {suggestions.map((suggestion) => (
            <button
              className="suggestion-chip"
              disabled={disabled}
              key={suggestion}
              onClick={() => onSubmit(suggestion)}
              type="button"
            >
              {suggestion}
            </button>
          ))}
        </div>
      ) : null}
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
        placeholder="Ask about metros, affordability scenarios, or request a graph"
        rows={4}
        value={prompt}
      />
      <div className="prompt-actions">
        <p>{disabled ? "Assistant is preparing the next response." : "Shift+Enter for a new line. Enter to send."}</p>
        <button className="send-button" disabled={disabled || prompt.trim().length === 0} onClick={submitPrompt} type="button">
          Send
        </button>
      </div>
    </section>
  );
}