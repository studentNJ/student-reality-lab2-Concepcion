interface HeroIntroProps {
  onPromptSelect: (prompt: string) => void;
  suggestions: string[];
}

const principleCards = [
  {
    title: "Ask a housing question",
    description: "Start with a metro trend, yearly comparison, affordability scenario, or source-status check.",
  },
  {
    title: "Inspect the evidence",
    description: "Charts and tool traces stay attached to the assistant response that generated them.",
  },
  {
    title: "Continue the analysis",
    description: "Use follow-up prompts to compare metros, revisit scenarios, or narrow the time range.",
  },
];

export function HeroIntro({ onPromptSelect, suggestions }: HeroIntroProps) {
  return (
    <section className="hero-panel">
      <div className="hero-copy-block">
        <p className="eyebrow">Conversational analytics studio</p>
        <h2>Explore rent burden and affordability like a policy memo, not a dashboard.</h2>
        <p className="hero-copy">
          Ask a question, inspect the supporting chart or tool output, and continue the analysis in the same thread.
        </p>
      </div>
      <div className="hero-principles" aria-label="Workflow overview">
        {principleCards.map((card) => (
          <article className="hero-principle-card" key={card.title}>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </article>
        ))}
      </div>
      <div className="hero-prompts" aria-label="Example prompts">
        {suggestions.map((suggestion) => (
          <button className="hero-prompt" key={suggestion} onClick={() => onPromptSelect(suggestion)} type="button">
            {suggestion}
          </button>
        ))}
      </div>
    </section>
  );
}