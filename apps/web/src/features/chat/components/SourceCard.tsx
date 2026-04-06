import type { SourceNote } from "@web/lib/chat-types";
import { AnalysisCard } from "./AnalysisCard";

interface SourceCardProps {
  source: SourceNote;
}

export function SourceCard({ source }: SourceCardProps) {
  return (
    <AnalysisCard className="source-card" label={source.kind === "method" ? "Method" : source.kind === "scope" ? "Scope" : "Source"}>
      <h3>{source.title}</h3>
      <p>{source.detail}</p>
      {source.cue ? <p className="artifact-description">{source.cue}</p> : null}
    </AnalysisCard>
  );
}