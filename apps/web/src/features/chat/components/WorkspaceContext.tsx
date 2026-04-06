import { useEffect, useState } from "react";
import type { ChatMessage, SourceNote, ToolCallSummary } from "@web/lib/chat-types";
import { InsightBadge } from "./InsightBadge";

type SourceMode = "database" | "csv" | "mixed";

interface DataSourceStatusDetail {
  configuredMode: "database" | "csv";
  activeSource: "database" | "csv_fallback";
  datasetType: "sample" | "production";
  datasetLabel: string;
  metroCount: number;
  startYear: number | null;
  endYear: number | null;
  lastRefreshed: string | null;
}

interface DataSourceStatusResponse {
  sourceMode: SourceMode;
  detail: DataSourceStatusDetail | null;
}

interface FocusContext {
  title: string;
  summary: string;
  badges: Array<{ label: string; tone?: "neutral" | "teal" | "brick" | "gold" }>;
}

interface LatestSources {
  title: string;
  summary: string;
  notes: SourceNote[];
}

interface WorkspaceContextProps {
  isPending: boolean;
  modeLabel: string;
  statusLabel: string;
  chartCount: number;
  hasErrors: boolean;
  messages: ChatMessage[];
}

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getToolCalls(message: ChatMessage): ToolCallSummary[] {
  return message.toolCalls ?? (message.toolCall ? [message.toolCall] : []);
}

function formatMetroList(metros: string[]): string {
  if (metros.length <= 2) {
    return metros.join(" and ");
  }

  return `${metros.slice(0, 2).join(", ")} +${metros.length - 2} more`;
}

function deriveFocusContext(messages: ChatMessage[]): FocusContext {
  for (const message of [...messages].reverse()) {
    for (const toolCall of getToolCalls(message).filter((entry) => entry.status === "success").reverse()) {
      const input = toolCall.input;

      if (!isObjectRecord(input)) {
        continue;
      }

      if (toolCall.toolName === "compare_metros" && Array.isArray(input.metros)) {
        const metros = input.metros.filter((value): value is string => typeof value === "string" && value.length > 0);
        const startYear = typeof input.startYear === "number" ? input.startYear : null;
        const endYear = typeof input.endYear === "number" ? input.endYear : null;

        if (metros.length > 0) {
          return {
            title: formatMetroList(metros),
            summary: startYear && endYear
              ? `Comparing metro trends across ${startYear}-${endYear}.`
              : "Comparing multiple metros in the current thread.",
            badges: [
              { label: `${metros.length} metros`, tone: "teal" },
              ...(startYear && endYear ? [{ label: `${startYear}-${endYear}`, tone: "gold" as const }] : []),
            ],
          };
        }
      }

      if (toolCall.toolName === "get_metro_trend" && typeof input.metro === "string") {
        const startYear = typeof input.startYear === "number" ? input.startYear : null;
        const endYear = typeof input.endYear === "number" ? input.endYear : null;

        return {
          title: input.metro,
          summary: startYear && endYear
            ? `Trend view for ${startYear}-${endYear}.`
            : "Trend analysis is active for this metro.",
          badges: [
            { label: "Trend", tone: "teal" },
            ...(startYear && endYear ? [{ label: `${startYear}-${endYear}`, tone: "gold" as const }] : []),
          ],
        };
      }

      if (toolCall.toolName === "calculate_affordability") {
        const targetMetro = typeof input.targetMetro === "string" ? input.targetMetro : null;
        const annualIncome = typeof input.annualIncome === "number" ? input.annualIncome : null;

        return {
          title: targetMetro ?? "Affordability scenario",
          summary: targetMetro
            ? "Affordability check is scoped to the selected metro."
            : "Affordability check is currently metro-agnostic.",
          badges: [
            { label: "Affordability", tone: "teal" },
            ...(annualIncome ? [{ label: `$${annualIncome.toLocaleString()}`, tone: "gold" as const }] : []),
          ],
        };
      }

      if (toolCall.toolName === "get_metrics_snapshot" && typeof input.year === "number") {
        return {
          title: "Metro snapshot",
          summary: `Snapshot view for ${input.year}.`,
          badges: [
            { label: `${input.year}`, tone: "gold" },
            { label: "Snapshot", tone: "teal" },
          ],
        };
      }

      if (toolCall.toolName === "get_metrics_by_range") {
        const startYear = typeof input.startYear === "number" ? input.startYear : null;
        const endYear = typeof input.endYear === "number" ? input.endYear : null;

        return {
          title: "Metro range summary",
          summary: startYear && endYear
            ? `Aggregated view across ${startYear}-${endYear}.`
            : "Aggregated metro summary is active.",
          badges: [
            { label: "Range", tone: "teal" },
            ...(startYear && endYear ? [{ label: `${startYear}-${endYear}`, tone: "gold" as const }] : []),
          ],
        };
      }
    }
  }

  return {
    title: "No metro selected yet",
    summary: "Ask for a metro trend, comparison, or affordability check to pin analysis context here.",
    badges: [{ label: "Waiting for prompt" }],
  };
}

function getModeTone(sourceMode: SourceMode): "teal" | "gold" | "brick" {
  if (sourceMode === "database") {
    return "teal";
  }

  if (sourceMode === "mixed") {
    return "gold";
  }

  return "brick";
}

function getLatestSources(messages: ChatMessage[]): LatestSources {
  for (const message of [...messages].reverse()) {
    if (message.role === "assistant" && message.sources?.length) {
      return {
        title: "Sources and method",
        summary: "Latest response transparency notes derived from the assistant output.",
        notes: message.sources,
      };
    }
  }

  return {
    title: "Sources and method",
    summary: "Source notes will appear here once the assistant returns data-backed analysis.",
    notes: [],
  };
}

function formatCoverage(detail: DataSourceStatusDetail | null): string {
  if (!detail) {
    return "Coverage details unavailable.";
  }

  if (detail.startYear !== null && detail.endYear !== null) {
    return `${detail.metroCount} metros across ${detail.startYear}-${detail.endYear}.`;
  }

  return `${detail.metroCount} metros available.`;
}

export function WorkspaceContext({ isPending, modeLabel, statusLabel, chartCount, hasErrors, messages }: WorkspaceContextProps) {
  const [dataStatus, setDataStatus] = useState<DataSourceStatusResponse | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);
  const focus = deriveFocusContext(messages);
  const latestSources = getLatestSources(messages);

  useEffect(() => {
    let isCancelled = false;

    async function loadDataSourceStatus() {
      try {
        const response = await fetch("/api/data-source-status", { cache: "no-store" });

        if (!response.ok) {
          throw new Error("Failed to load dataset status.");
        }

        const payload = await response.json() as DataSourceStatusResponse;

        if (!isCancelled) {
          setDataStatus(payload);
          setStatusError(null);
        }
      } catch (error) {
        if (!isCancelled) {
          setStatusError(error instanceof Error ? error.message : "Failed to load dataset status.");
        }
      }
    }

    void loadDataSourceStatus();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <>
      <section className="context-card">
        <p className="context-card-eyebrow">Session state</p>
        <h3>{statusLabel}</h3>
        <p>{isPending ? "The assistant is planning the next response and preparing any required tool calls." : "Ask a housing question to produce a memo-style response with inline evidence."}</p>
        <div className="context-badges">
          <InsightBadge tone="gold">{modeLabel}</InsightBadge>
          <InsightBadge tone={hasErrors ? "brick" : "teal"}>{chartCount} charts</InsightBadge>
        </div>
      </section>
      <section className="context-card">
        <p className="context-card-eyebrow">Dataset status</p>
        <h3>{dataStatus?.detail?.datasetLabel ?? "Loading dataset status"}</h3>
        <p>{statusError ?? formatCoverage(dataStatus?.detail ?? null)}</p>
        <div className="context-badges">
          {dataStatus ? <InsightBadge tone={getModeTone(dataStatus.sourceMode)}>{dataStatus.sourceMode} mode</InsightBadge> : <InsightBadge>Refreshing</InsightBadge>}
          {dataStatus?.detail ? <InsightBadge tone="teal">{dataStatus.detail.datasetType}</InsightBadge> : null}
        </div>
        {dataStatus?.detail ? (
          <dl className="context-stats">
            <div>
              <dt>Configured</dt>
              <dd>{dataStatus.detail.configuredMode}</dd>
            </div>
            <div>
              <dt>Active</dt>
              <dd>{dataStatus.detail.activeSource === "csv_fallback" ? "CSV fallback" : "Database"}</dd>
            </div>
            <div>
              <dt>Updated</dt>
              <dd>{dataStatus.detail.lastRefreshed ?? "Unknown"}</dd>
            </div>
          </dl>
        ) : null}
      </section>
      <section className="context-card">
        <p className="context-card-eyebrow">Selected context</p>
        <h3>{focus.title}</h3>
        <p>{focus.summary}</p>
        <div className="context-badges">
          {focus.badges.map((badge) => (
            <InsightBadge key={badge.label} tone={badge.tone}>{badge.label}</InsightBadge>
          ))}
        </div>
      </section>
      <section className="context-card">
        <p className="context-card-eyebrow">Transparency</p>
        <h3>{latestSources.title}</h3>
        <p>{latestSources.summary}</p>
        {latestSources.notes.length ? (
          <div className="context-source-list">
            {latestSources.notes.map((note) => (
              <article className="context-source-item" key={`${note.kind}-${note.title}`}>
                <span>{note.kind}</span>
                <strong>{note.title}</strong>
                <p>{note.detail}</p>
              </article>
            ))}
          </div>
        ) : null}
      </section>
    </>
  );
}