import fs from "node:fs";
import path from "node:path";
import type { ChartSpec } from "@student-reality-lab/shared";
import type { ChatMessage, ToolCallSummary } from "@web/lib/chat-types";
import { runTool, type ToolExecution } from "./tool-runner";

const workspaceRoot = path.resolve(process.cwd(), "../../");

function loadWorkspaceEnv(): void {
  for (const fileName of [".env.local", ".env"]) {
    const envPath = path.join(workspaceRoot, fileName);

    if (fs.existsSync(envPath)) {
      process.loadEnvFile(envPath);
    }
  }
}

loadWorkspaceEnv();

export interface ChatApiRequest {
  prompt: string;
  conversationId?: string;
  history?: Array<Pick<ChatMessage, "role" | "content">>;
}

export interface ChatApiResponse {
  message: ChatMessage;
  meta: {
    conversationId?: string;
    planner: "model" | "fallback";
    intent: string;
  };
}

interface PlanningContext {
  metros: string[];
  years: number[];
}

interface HistoricalPlanningContext {
  history: ChatApiRequest["history"];
  lastIntent?: OrchestrationPlan["intent"];
  metros: string[];
  startYear?: number;
  endYear?: number;
  year?: number;
  annualIncome?: number;
  monthlyDebt?: number;
  roommates?: number;
  householdSize?: number;
  targetMetro?: string | null;
  useEstimatedAfterTaxIncome?: boolean;
}

interface PlanBase {
  intent:
    | "metro_trend_chart"
    | "compare_metros"
    | "metrics_snapshot"
    | "metrics_range"
    | "affordability"
    | "compare_affordability_scenarios"
    | "data_source_status"
    | "clarification"
    | "help";
  assistantMessage?: string;
}

interface MetroTrendPlan extends PlanBase {
  intent: "metro_trend_chart";
  metro?: string | null;
  metros?: string[];
  startYear?: number;
  endYear?: number;
}

interface CompareMetrosPlan extends PlanBase {
  intent: "compare_metros";
  metros: string[];
  startYear?: number;
  endYear?: number;
  wantsChart?: boolean;
}

interface MetricsSnapshotPlan extends PlanBase {
  intent: "metrics_snapshot";
  year?: number;
  metric?: "rent_burden_percent" | "median_gross_rent" | "median_monthly_income";
  wantsChart?: boolean;
}

interface MetricsRangePlan extends PlanBase {
  intent: "metrics_range";
  startYear?: number;
  endYear?: number;
  metric?: "rent_burden_percent" | "median_gross_rent" | "median_monthly_income";
  wantsChart?: boolean;
}

interface AffordabilityPlan extends PlanBase {
  intent: "affordability";
  annualIncome?: number;
  monthlyDebt?: number;
  targetMetro?: string | null;
  roommates?: number;
  householdSize?: number;
  useEstimatedAfterTaxIncome?: boolean;
}

interface CompareAffordabilityScenariosPlan extends PlanBase {
  intent: "compare_affordability_scenarios";
  annualIncome?: number;
  targetMetro?: string | null;
  scenarios: Array<{
    label: string;
    monthlyDebt?: number;
    roommates?: number;
    householdSize?: number;
    useEstimatedAfterTaxIncome?: boolean;
  }>;
  chartMetric?: "maxAffordableMonthlyHousing" | "affordabilityRatio";
}

interface DataSourceStatusPlan extends PlanBase {
  intent: "data_source_status";
}

interface ClarificationPlan extends PlanBase {
  intent: "clarification";
  clarificationMessage: string;
}

interface HelpPlan extends PlanBase {
  intent: "help";
}

type OrchestrationPlan =
  | MetroTrendPlan
  | CompareMetrosPlan
  | MetricsSnapshotPlan
  | MetricsRangePlan
  | AffordabilityPlan
  | CompareAffordabilityScenariosPlan
  | DataSourceStatusPlan
  | ClarificationPlan
  | HelpPlan;

interface ExecutionState {
  toolCalls: ToolCallSummary[];
  values: Record<string, unknown>;
  chartSpecs: ChartSpec[];
  completedMetros: string[];
  failedMetros: string[];
  notices: string[];
}

interface ExecutionStep {
  id: string;
  execute: (state: ExecutionState) => Promise<void>;
}

interface ExecutionPlan {
  intent: OrchestrationPlan["intent"];
  steps: ExecutionStep[];
  buildMessage: (state: ExecutionState) => ChatMessage;
}

interface OpenAiMessage {
  role: "system" | "user";
  content: string;
}

interface OpenAiResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
}

const snapshotMetricAliases = {
  rent_burden: "rent_burden_percent",
  rent_burden_percent: "rent_burden_percent",
  burden: "rent_burden_percent",
  median_gross_rent: "median_gross_rent",
  gross_rent: "median_gross_rent",
  rent: "median_gross_rent",
  median_monthly_income: "median_monthly_income",
  monthly_income: "median_monthly_income",
  income: "median_monthly_income",
} as const;

function normalizePrompt(input: string): string {
  return input.toLowerCase();
}

function extractYear(prompt: string, years: number[]): number | undefined {
  const matches = prompt.match(/\b20\d{2}\b/g);

  if (!matches) {
    return undefined;
  }

  const matchedYear = Number(matches[0]);
  return years.includes(matchedYear) ? matchedYear : undefined;
}

function extractYearRange(prompt: string, years: number[]): { startYear: number; endYear: number } | null {
  const matches = prompt.match(/\b20\d{2}\b/g);

  if (!matches || matches.length < 2) {
    return null;
  }

  const [first, second] = matches.map((value) => Number(value));

  if (!years.includes(first) || !years.includes(second)) {
    return null;
  }

  return first <= second
    ? { startYear: first, endYear: second }
    : { startYear: second, endYear: first };
}

function extractAnnualIncome(prompt: string): number | undefined {
  const compactMatch = prompt.match(/\b(\d{2,3})k\b/i);

  if (compactMatch) {
    return Number(compactMatch[1]) * 1_000;
  }

  const fullMatch = prompt.match(/\$?\s*(\d{2,3}(?:,\d{3})+|\d{5,6})\b/);

  if (!fullMatch) {
    return undefined;
  }

  return Number(fullMatch[1].replaceAll(",", ""));
}

function extractMonthlyDebt(prompt: string): number | undefined {
  const debtMatch = prompt.match(/(?:debt|loan)[^\d]*(\d{2,4})/i);
  return debtMatch ? Number(debtMatch[1]) : undefined;
}

function extractRoommates(prompt: string): number | undefined {
  const roommatesMatch = prompt.match(/(\d+)\s+roommates?/i);
  return roommatesMatch ? Number(roommatesMatch[1]) : undefined;
}

function getMetroAliases(metro: string): string[] {
  const parts = metro
    .toLowerCase()
    .split(/[-,\/]/)
    .map((part) => part.trim())
    .filter((part) => part.length >= 3);

  return Array.from(new Set([metro.toLowerCase(), ...parts]));
}

function resolveMetros(prompt: string, metros: string[]): string[] {
  const normalizedPrompt = normalizePrompt(prompt);
  const matches: Array<{ metro: string; position: number; score: number }> = [];

  for (const metro of metros) {
    const aliases = getMetroAliases(metro);
    let bestMatch: { metro: string; position: number; score: number } | null = null;

    for (const alias of aliases) {
      const position = normalizedPrompt.indexOf(alias);

      if (position === -1) {
        continue;
      }

      const score = alias.length;

      if (
        !bestMatch
        || position < bestMatch.position
        || (position === bestMatch.position && score > bestMatch.score)
      ) {
        bestMatch = { metro, position, score };
      }
    }

    if (bestMatch) {
      matches.push(bestMatch);
    }
  }

  return matches
    .sort((left, right) => left.position - right.position || right.score - left.score)
    .map((match) => match.metro);
}

function resolveMetro(prompt: string, metros: string[]): string | null {
  return resolveMetros(prompt, metros)[0] ?? null;
}

function latestYear(years: number[]): number | undefined {
  return years[years.length - 1];
}

function defaultTrendWindow(years: number[]): { startYear: number; endYear: number } | null {
  const endYear = latestYear(years);

  if (endYear === undefined) {
    return null;
  }

  const startYear = years[Math.max(0, years.length - 5)] ?? endYear;
  return { startYear, endYear };
}

function normalizeSnapshotMetric(metric: unknown): MetricsSnapshotPlan["metric"] | undefined {
  if (typeof metric !== "string") {
    return undefined;
  }

  const normalizedMetric = metric.trim().toLowerCase().replaceAll(/[\s-]+/g, "_");
  return snapshotMetricAliases[normalizedMetric as keyof typeof snapshotMetricAliases];
}

function normalizePlan(plan: OrchestrationPlan, context: PlanningContext): OrchestrationPlan {
  switch (plan.intent) {
    case "metrics_range": {
      const range = typeof plan.startYear === "number" && typeof plan.endYear === "number"
        ? extractYearRange(`${plan.startYear} ${plan.endYear}`, context.years)
        : defaultTrendWindow(context.years);

      return {
        ...plan,
        metric: normalizeSnapshotMetric(plan.metric) ?? "rent_burden_percent",
        startYear: range?.startYear,
        endYear: range?.endYear,
      };
    }
    case "metrics_snapshot": {
      return {
        ...plan,
        metric: normalizeSnapshotMetric(plan.metric) ?? "rent_burden_percent",
        year: typeof plan.year === "number" && context.years.includes(plan.year) ? plan.year : latestYear(context.years),
      };
    }
    case "compare_metros": {
      const range = typeof plan.startYear === "number" && typeof plan.endYear === "number"
        ? { startYear: plan.startYear, endYear: plan.endYear }
        : defaultTrendWindow(context.years);

      return {
        ...plan,
        metros: plan.metros.filter((metro): metro is string => typeof metro === "string" && metro.length > 0),
        startYear: range?.startYear,
        endYear: range?.endYear,
      };
    }
    case "metro_trend_chart": {
      return {
        ...plan,
        metros: plan.metros?.filter((metro): metro is string => typeof metro === "string" && metro.length > 0),
      };
    }
    default:
      return plan;
  }
}

function mergeUniqueMetros(values: string[]): string[] {
  return Array.from(new Set(values.filter((value) => value.length > 0)));
}

function isRepeatPrompt(normalizedPrompt: string): boolean {
  return /\b(again|same|repeat|that again|previous one)\b/.test(normalizedPrompt);
}

function isAffordabilityFollowUpPrompt(normalizedPrompt: string): boolean {
  return /\b(what about|how about|instead|for)\b/.test(normalizedPrompt);
}

function isComparisonPrompt(normalizedPrompt: string): boolean {
  return normalizedPrompt.includes("compare") || normalizedPrompt.includes(" vs ") || normalizedPrompt.includes(" versus ");
}

function isRangeSummaryPrompt(normalizedPrompt: string): boolean {
  return normalizedPrompt.includes("average")
    || normalizedPrompt.includes("summary")
    || normalizedPrompt.includes("across")
    || normalizedPrompt.includes("from ")
    || normalizedPrompt.includes("between ");
}

function inferRangeMetric(prompt: string): MetricsSnapshotPlan["metric"] {
  const normalizedPrompt = normalizePrompt(prompt);

  if (normalizedPrompt.includes("income")) {
    return "median_monthly_income";
  }

  if (normalizedPrompt.includes("rent")) {
    return "median_gross_rent";
  }

  return "rent_burden_percent";
}

function hasRelativeTimeWindow(prompt: string): boolean {
  return /\b(last|past)\s+\d+\s+years?\b/i.test(prompt)
    || /\brecent\s+years\b/i.test(prompt)
    || /\bover\s+time\b/i.test(prompt);
}

function buildRangeGraphRequest(
  metric: NonNullable<MetricsRangePlan["metric"]>,
  startYear: number,
  endYear: number,
  rows: Array<Record<string, unknown>>,
): Record<string, unknown> {
  const sortedRows = [...rows].sort((left, right) => Number(right[metric]) - Number(left[metric]));
  const highest = sortedRows[0];
  const lowest = sortedRows[sortedRows.length - 1];
  const metricConfig = metric === "median_monthly_income"
    ? { label: "Median Monthly Income", formatter: "currency_usd" as const }
    : metric === "median_gross_rent"
      ? { label: "Median Gross Rent", formatter: "currency_usd" as const }
      : { label: "Rent Burden (%)", formatter: "percent" as const };

  return {
    graphType: "metro_snapshot_bar",
    title: `${metricConfig.label} by metro (${startYear}-${endYear})`,
    subtitle: `Average values across ${startYear}-${endYear}`,
    axes: {
      x: { label: "Metro", field: "metro_name", type: "category" },
      y: { label: metricConfig.label, field: "value", type: "number", formatter: metricConfig.formatter },
    },
    series: [
      {
        id: metric,
        label: metricConfig.label,
        points: sortedRows.map((row) => ({
          metro_id: row.metro_id,
          metro_name: row.metro_name,
          value: row[metric],
        })),
      },
    ],
    annotations: [
      ...(metric === "rent_burden_percent"
        ? [
            {
              type: "threshold",
              label: "Rent Burden (%) threshold",
              field: "value",
              value: 30,
            },
          ]
        : []),
      ...(highest
        ? [
            {
              type: "callout",
              label: `Highest: ${String(highest.metro_name)}`,
              seriesId: metric,
              pointIndex: 0,
            },
          ]
        : []),
      ...(lowest && sortedRows.length > 1
        ? [
            {
              type: "callout",
              label: `Lowest: ${String(lowest.metro_name)}`,
              seriesId: metric,
              pointIndex: sortedRows.length - 1,
            },
          ]
        : []),
    ],
    formattingHints: {
      showLegend: false,
      showGrid: true,
    },
    narrativeMeta: highest && lowest
      ? {
          summary: `Highest metro: ${String(highest.metro_name)}. Lowest metro: ${String(lowest.metro_name)}.`,
          highestValue: {
            label: String(highest.metro_name),
            value: Number(highest[metric]),
          },
          lowestValue: {
            label: String(lowest.metro_name),
            value: Number(lowest[metric]),
          },
        }
      : undefined,
  };
}

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function buildHistoryFromMessages(messages: Array<{ role: "user" | "assistant"; content: string }>): ChatApiRequest["history"] {
  return messages.map((message) => ({
    role: message.role,
    content: message.content,
  }));
}

async function loadHistoricalPlanningContext(request: ChatApiRequest): Promise<HistoricalPlanningContext> {
  const history = request.history ?? [];

  if (!request.conversationId) {
    return {
      history,
      metros: [],
    };
  }

  const conversation = await runTool("retrieve_conversation_history", {
    conversationId: request.conversationId,
    limit: 8,
    includeToolCalls: true,
  });

  if (!conversation.ok) {
    return {
      history,
      metros: [],
    };
  }

  const persistedHistory = buildHistoryFromMessages(
    conversation.result.data.messages.map((message) => ({
      role: message.role,
      content: message.content,
    })),
  );

  const reversedMessages = [...conversation.result.data.messages].reverse();

  for (const message of reversedMessages) {
    if (message.role !== "assistant") {
      continue;
    }

    if (message.intent === "metro_trend_chart") {
      const trendCalls = (message.toolCalls ?? []).filter((toolCall) => toolCall.toolName === "get_metro_trend" && toolCall.status === "success");

      if (trendCalls.length > 0) {
        const metros = mergeUniqueMetros(
          trendCalls.flatMap((toolCall) => {
            if (!isObjectRecord(toolCall.input) || typeof toolCall.input.metro !== "string") {
              return [];
            }

            return [toolCall.input.metro];
          }),
        );
        const firstCallInput = trendCalls[0]?.input;

        return {
          history: history.length > 0 ? history : persistedHistory,
          lastIntent: "metro_trend_chart",
          metros,
          startYear: isObjectRecord(firstCallInput) && typeof firstCallInput.startYear === "number" ? firstCallInput.startYear : undefined,
          endYear: isObjectRecord(firstCallInput) && typeof firstCallInput.endYear === "number" ? firstCallInput.endYear : undefined,
        };
      }
    }

    if (message.intent === "metrics_snapshot") {
      const snapshotCall = (message.toolCalls ?? []).find((toolCall) => toolCall.toolName === "get_metrics_snapshot" && toolCall.status === "success");
      const graphCall = (message.toolCalls ?? []).find((toolCall) => toolCall.toolName === "create_graph" && toolCall.status === "success");
      const snapshotInput = snapshotCall?.input;
      const graphInput = graphCall?.input;

      return {
        history: history.length > 0 ? history : persistedHistory,
        lastIntent: "metrics_snapshot",
        metros: [],
        year: isObjectRecord(snapshotInput) && typeof snapshotInput.year === "number" ? snapshotInput.year : undefined,
        targetMetro: undefined,
        useEstimatedAfterTaxIncome: undefined,
        ...(isObjectRecord(graphInput) && typeof graphInput.metric === "string" ? {} : {}),
      };
    }

    if (message.intent === "affordability") {
      const affordabilityCall = (message.toolCalls ?? []).find((toolCall) => toolCall.toolName === "calculate_affordability" && toolCall.status === "success");
      const affordabilityInput = affordabilityCall?.input;

      if (isObjectRecord(affordabilityInput)) {
        return {
          history: history.length > 0 ? history : persistedHistory,
          lastIntent: "affordability",
          metros: [],
          annualIncome: typeof affordabilityInput.annualIncome === "number" ? affordabilityInput.annualIncome : undefined,
          monthlyDebt: typeof affordabilityInput.monthlyDebt === "number" ? affordabilityInput.monthlyDebt : undefined,
          roommates: typeof affordabilityInput.roommates === "number" ? affordabilityInput.roommates : undefined,
          householdSize: typeof affordabilityInput.householdSize === "number" ? affordabilityInput.householdSize : undefined,
          targetMetro: typeof affordabilityInput.targetMetro === "string" ? affordabilityInput.targetMetro : undefined,
          useEstimatedAfterTaxIncome: typeof affordabilityInput.useEstimatedAfterTaxIncome === "boolean"
            ? affordabilityInput.useEstimatedAfterTaxIncome
            : undefined,
        };
      }
    }

    if (message.intent === "data_source_status") {
      return {
        history: history.length > 0 ? history : persistedHistory,
        lastIntent: "data_source_status",
        metros: [],
      };
    }
  }

  return {
    history: history.length > 0 ? history : persistedHistory,
    metros: [],
  };
}

function buildFallbackPlan(prompt: string, context: PlanningContext, historical: HistoricalPlanningContext): OrchestrationPlan {
  const normalizedPrompt = normalizePrompt(prompt);
  const matchedMetros = resolveMetros(prompt, context.metros);
  const matchedMetro = matchedMetros[0] ?? null;
  const requestedYear = extractYear(prompt, context.years);
  const requestedRange = extractYearRange(prompt, context.years);
  const wantsRepeat = isRepeatPrompt(normalizedPrompt);
  const affordabilityFollowUp = isAffordabilityFollowUpPrompt(normalizedPrompt);
  const comparisonPrompt = isComparisonPrompt(normalizedPrompt);
  const extractedIncome = extractAnnualIncome(prompt);
  const extractedDebt = extractMonthlyDebt(prompt);
  const extractedRoommates = extractRoommates(prompt);

  if (historical.lastIntent === "metro_trend_chart" && (wantsRepeat || normalizedPrompt.includes("compare"))) {
    const window = defaultTrendWindow(context.years);
    const followUpMetros = normalizedPrompt.includes("compare")
      ? mergeUniqueMetros([...historical.metros, ...matchedMetros])
      : historical.metros;

    if (followUpMetros.length > 0) {
      return {
        intent: "metro_trend_chart",
        metros: followUpMetros,
        startYear: requestedYear ?? historical.startYear ?? window?.startYear,
        endYear: historical.endYear ?? window?.endYear,
      };
    }
  }

  if (historical.lastIntent === "metrics_snapshot" && wantsRepeat) {
    return {
      intent: "metrics_snapshot",
      year: requestedYear ?? historical.year ?? latestYear(context.years),
      metric: normalizedPrompt.includes("income")
        ? "median_monthly_income"
        : normalizedPrompt.includes("rent")
          ? "median_gross_rent"
          : "rent_burden_percent",
      wantsChart: true,
    };
  }

  if (historical.lastIntent === "affordability" && wantsRepeat) {
    return {
      intent: "affordability",
      annualIncome: historical.annualIncome,
      monthlyDebt: historical.monthlyDebt,
      roommates: historical.roommates,
      householdSize: historical.householdSize,
      targetMetro: historical.targetMetro,
      useEstimatedAfterTaxIncome: historical.useEstimatedAfterTaxIncome,
    };
  }

  if (
    historical.lastIntent === "affordability"
    && historical.annualIncome !== undefined
    && (
      matchedMetro !== null
      || affordabilityFollowUp
      || extractedIncome !== undefined
      || extractedDebt !== undefined
      || extractedRoommates !== undefined
      || normalizedPrompt.includes("after tax")
      || normalizedPrompt.includes("take home")
    )
  ) {
    if (comparisonPrompt && normalizedPrompt.includes("roommate")) {
      const roommateCount = extractedRoommates ?? 1;

      return {
        intent: "compare_affordability_scenarios",
        annualIncome: extractedIncome ?? historical.annualIncome,
        targetMetro: matchedMetro ?? historical.targetMetro ?? null,
        chartMetric: matchedMetro ?? historical.targetMetro ? "affordabilityRatio" : "maxAffordableMonthlyHousing",
        scenarios: [
          {
            label: "Solo",
            monthlyDebt: extractedDebt ?? historical.monthlyDebt,
            useEstimatedAfterTaxIncome: historical.useEstimatedAfterTaxIncome,
          },
          {
            label: roommateCount === 1 ? "With roommate" : `With ${roommateCount} roommates`,
            monthlyDebt: extractedDebt ?? historical.monthlyDebt,
            roommates: roommateCount,
            householdSize: roommateCount + 1,
            useEstimatedAfterTaxIncome: historical.useEstimatedAfterTaxIncome,
          },
        ],
      };
    }

    return {
      intent: "affordability",
      annualIncome: extractedIncome ?? historical.annualIncome,
      monthlyDebt: extractedDebt ?? historical.monthlyDebt,
      roommates: extractedRoommates ?? historical.roommates,
      householdSize: extractedRoommates === undefined
        ? historical.householdSize
        : extractedRoommates + 1,
      targetMetro: matchedMetro ?? historical.targetMetro ?? null,
      useEstimatedAfterTaxIncome: normalizedPrompt.includes("after tax") || normalizedPrompt.includes("take home")
        ? true
        : historical.useEstimatedAfterTaxIncome,
    };
  }

  if (
    comparisonPrompt
    && (normalizedPrompt.includes("roommate") || normalizedPrompt.includes("solo"))
    && extractedIncome === undefined
    && historical.annualIncome === undefined
  ) {
    return {
      intent: "clarification",
      clarificationMessage: "I can compare affordability scenarios, but I need an annual income. Try: Compare solo vs roommate affordability in Chicago on $72k.",
    };
  }

  if (
    comparisonPrompt
    && (normalizedPrompt.includes("roommate") || normalizedPrompt.includes("solo"))
    && (extractedIncome !== undefined || historical.annualIncome !== undefined)
  ) {
    const roommateCount = extractedRoommates ?? 1;

    return {
      intent: "compare_affordability_scenarios",
      annualIncome: extractedIncome,
      targetMetro: matchedMetro,
      chartMetric: matchedMetro ? "affordabilityRatio" : "maxAffordableMonthlyHousing",
      scenarios: [
        {
          label: "Solo",
          monthlyDebt: extractedDebt,
        },
        {
          label: roommateCount === 1 ? "With roommate" : `With ${roommateCount} roommates`,
          monthlyDebt: extractedDebt,
          roommates: roommateCount,
          householdSize: roommateCount + 1,
        },
      ],
    };
  }

  if (comparisonPrompt && matchedMetros.length >= 2 && requestedRange === null && !hasRelativeTimeWindow(prompt)) {
    return {
      intent: "clarification",
      clarificationMessage: `I can compare ${formatSeriesList(matchedMetros)}, but I need a year range. Try: Compare ${formatSeriesList(matchedMetros)} from 2020 to 2024.`,
    };
  }

  if (comparisonPrompt && matchedMetros.length >= 2) {
    const window = defaultTrendWindow(context.years);
    const effectiveRange = requestedRange ?? window;

    if (!effectiveRange) {
      return {
        intent: "clarification",
        clarificationMessage: `I can compare ${formatSeriesList(matchedMetros)}, but I could not determine a valid year range from the available data.`,
      };
    }

    return {
      intent: "compare_metros",
      metros: matchedMetros,
      startYear: effectiveRange.startYear,
      endYear: effectiveRange.endYear,
      wantsChart: normalizedPrompt.includes("chart") || normalizedPrompt.includes("graph") || normalizedPrompt.includes("trend"),
    };
  }

  if (comparisonPrompt && matchedMetros.length < 2) {
    return {
      intent: "clarification",
      clarificationMessage: "I need at least two supported metros to compare. Try: Compare Chicago and Washington from 2020 to 2024.",
    };
  }

  if (!requestedRange && isRangeSummaryPrompt(normalizedPrompt) && matchedMetros.length === 0) {
    return {
      intent: "clarification",
      clarificationMessage: "I can summarize metrics across time, but I need a year range. Try: Show average rent burden from 2020 to 2024.",
    };
  }

  if (requestedRange && isRangeSummaryPrompt(normalizedPrompt) && matchedMetros.length === 0) {
    return {
      intent: "metrics_range",
      startYear: requestedRange.startYear,
      endYear: requestedRange.endYear,
      metric: inferRangeMetric(prompt),
      wantsChart: normalizedPrompt.includes("chart") || normalizedPrompt.includes("graph"),
    };
  }

  if (normalizedPrompt.includes("source") || normalizedPrompt.includes("dataset") || normalizedPrompt.includes("data status")) {
    return { intent: "data_source_status" };
  }

  if (normalizedPrompt.includes("afford") || normalizedPrompt.includes("salary") || normalizedPrompt.includes("income")) {
    return {
      intent: "affordability",
      annualIncome: extractedIncome ?? historical.annualIncome,
      monthlyDebt: extractedDebt ?? historical.monthlyDebt,
      roommates: extractedRoommates,
      householdSize: extractedRoommates === undefined ? undefined : extractedRoommates + 1,
      targetMetro: matchedMetro ?? historical.targetMetro ?? null,
      useEstimatedAfterTaxIncome: normalizedPrompt.includes("after tax") || normalizedPrompt.includes("take home"),
    };
  }

  if (normalizedPrompt.includes("trend") || normalizedPrompt.includes("chart") || normalizedPrompt.includes("graph")) {
    const window = defaultTrendWindow(context.years);
    return {
      intent: "metro_trend_chart",
      metros: matchedMetros.length > 0 ? matchedMetros : historical.metros,
      startYear: requestedYear ?? historical.startYear ?? window?.startYear,
      endYear: historical.endYear ?? window?.endYear,
    };
  }

  if (normalizedPrompt.includes("compare") || normalizedPrompt.includes("snapshot") || normalizedPrompt.includes("metro")) {
    return {
      intent: "metrics_snapshot",
      year: requestedYear ?? latestYear(context.years),
      metric: normalizedPrompt.includes("income")
        ? "median_monthly_income"
        : normalizedPrompt.includes("rent")
          ? "median_gross_rent"
          : "rent_burden_percent",
      wantsChart: normalizedPrompt.includes("chart") || normalizedPrompt.includes("graph") || normalizedPrompt.includes("compare"),
    };
  }

  return {
    intent: "help",
    assistantMessage: "Ask for a metro trend, a yearly metro comparison, an affordability estimate, or the current data source status.",
  };
}

async function planWithModel(prompt: string, history: ChatApiRequest["history"], context: PlanningContext): Promise<OrchestrationPlan | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL ?? "gpt-5.4";

  if (!apiKey) {
    return null;
  }

  const messages: OpenAiMessage[] = [
    {
      role: "system",
      content: [
        "You are a planning model for a housing affordability assistant.",
        "Return only JSON.",
        "Choose one intent from: metro_trend_chart, compare_metros, metrics_snapshot, metrics_range, affordability, compare_affordability_scenarios, data_source_status, help.",
        "If the user asks for a chart or trend, prefer metro_trend_chart when a metro is present; otherwise use metrics_snapshot.",
        "Use compare_metros for direct multi-metro comparison requests over the same year range.",
        "Use metrics_range for average or summary requests across a year range.",
        "Use compare_affordability_scenarios for prompts comparing solo versus roommate affordability or similar scenario-based affordability tradeoffs.",
        "If the user asks for multiple metros, return metros as an ordered array matching the request order.",
        "Only use metro names from this list:",
        context.metros.join(", "),
        `Supported years: ${context.years.join(", ")}`,
        "JSON shape: { intent, assistantMessage?, metro?, metros?, startYear?, endYear?, year?, metric?, wantsChart?, annualIncome?, monthlyDebt?, targetMetro?, roommates?, householdSize?, useEstimatedAfterTaxIncome?, scenarios?, chartMetric? }",
      ].join("\n"),
    },
    {
      role: "user",
      content: JSON.stringify({ prompt, history: history ?? [] }),
    },
  ];

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      response_format: { type: "json_object" },
      messages,
      temperature: 0.1,
    }),
  });

  if (!response.ok) {
    return null;
  }

  const payload = await response.json() as OpenAiResponse;
  const content = payload.choices?.[0]?.message?.content;

  if (!content) {
    return null;
  }

  try {
    return JSON.parse(content) as OrchestrationPlan;
  } catch {
    return null;
  }
}

async function planRequest(request: ChatApiRequest, context: PlanningContext): Promise<{ planner: "model" | "fallback"; plan: OrchestrationPlan }> {
  const historical = await loadHistoricalPlanningContext(request);
  const modelPlan = await planWithModel(request.prompt, historical.history, context);

  if (modelPlan) {
    if (modelPlan.intent === "metro_trend_chart") {
      const normalizedMetros = modelPlan.metros?.length
        ? modelPlan.metros
        : modelPlan.metro
          ? [modelPlan.metro]
          : resolveMetros(request.prompt, context.metros).length > 0
            ? resolveMetros(request.prompt, context.metros)
            : historical.metros;

      return {
        planner: "model",
        plan: normalizePlan({
          ...modelPlan,
          metros: normalizedMetros,
        }, context),
      };
    }

    if (modelPlan.intent === "compare_metros") {
      return {
        planner: "model",
        plan: normalizePlan({
          ...modelPlan,
          metros: modelPlan.metros?.length ? modelPlan.metros : resolveMetros(request.prompt, context.metros),
        }, context),
      };
    }

    return { planner: "model", plan: normalizePlan(modelPlan, context) };
  }

  return {
    planner: "fallback",
    plan: buildFallbackPlan(request.prompt, context, historical),
  };
}

function createAssistantMessage(input: {
  content: string;
  state?: ChatMessage["state"];
  chartSpec?: ChartSpec;
  chartSpecs?: ChartSpec[];
  toolCalls?: ToolCallSummary[];
}): ChatMessage {
  const chartSpecs = input.chartSpecs ?? (input.chartSpec ? [input.chartSpec] : undefined);

  return {
    id: `assistant-${crypto.randomUUID()}`,
    role: "assistant",
    state: input.state ?? "complete",
    content: input.content,
    ...(chartSpecs?.length === 1 ? { chartSpec: chartSpecs[0] } : {}),
    ...(chartSpecs?.length ? { chartSpecs } : {}),
    ...(input.toolCalls ? { toolCalls: input.toolCalls } : {}),
  };
}

function createExecutionState(): ExecutionState {
  return {
    toolCalls: [],
    values: {},
    chartSpecs: [],
    completedMetros: [],
    failedMetros: [],
    notices: [],
  };
}

function setExecutionValue<T>(state: ExecutionState, key: string, value: T): void {
  state.values[key] = value;
}

function getExecutionValue<T>(state: ExecutionState, key: string): T | undefined {
  return state.values[key] as T | undefined;
}

function recordToolExecution(state: ExecutionState, execution: ToolExecution<any>): void {
  state.toolCalls.push(execution.summary);
}

function createImmediatePlan(
  intent: OrchestrationPlan["intent"],
  buildMessage: (state: ExecutionState) => ChatMessage,
): ExecutionPlan {
  return {
    intent,
    steps: [],
    buildMessage,
  };
}

function appendNotice(content: string, notices: string[]): string {
  if (notices.length === 0) {
    return content;
  }

  return `${content} ${notices.join(" ")}`;
}

function buildExecutionPlan(plan: OrchestrationPlan, context: PlanningContext): ExecutionPlan {
  switch (plan.intent) {
    case "data_source_status": {
      return {
        intent: plan.intent,
        steps: [
          {
            id: "load-data-source-status",
            execute: async (state) => {
              const status = await runTool("get_data_source_status");
              setExecutionValue(state, "data_source_status", status);
              recordToolExecution(state, status);
            },
          },
        ],
        buildMessage: (state) => {
          const status = getExecutionValue<ToolExecution<"get_data_source_status">>(state, "data_source_status");

          return createAssistantMessage({
            state: status?.ok ? "complete" : "error",
            content: status?.ok
              ? `The dataset is currently running in ${status.result.data.sourceMode} mode.`
              : "I could not retrieve the current data source status.",
            toolCalls: state.toolCalls,
          });
        },
      };
    }
    case "affordability": {
      if (!plan.annualIncome) {
        return createImmediatePlan(plan.intent, () => createAssistantMessage({
          state: "error",
          content: "I need an annual income to run the affordability calculation. Try a prompt like: Can a $72,000 salary afford rent in Chicago?",
        }));
      }

      return {
        intent: plan.intent,
        steps: [
          {
            id: "calculate-affordability",
            execute: async (state) => {
              const affordability = await runTool("calculate_affordability", {
                annualIncome: plan.annualIncome,
                monthlyDebt: plan.monthlyDebt,
                roommates: plan.roommates,
                householdSize: plan.householdSize,
                targetMetro: plan.targetMetro ?? undefined,
                useEstimatedAfterTaxIncome: plan.useEstimatedAfterTaxIncome,
              });

              setExecutionValue(state, "affordability", affordability);
              recordToolExecution(state, affordability);
            },
          },
        ],
        buildMessage: (state) => {
          const affordability = getExecutionValue<ToolExecution<"calculate_affordability">>(state, "affordability");

          return createAssistantMessage({
            state: affordability?.ok ? "complete" : "error",
            content: affordability?.ok
              ? affordability.result.data.results.summary ?? "Affordability calculation completed."
              : "I could not calculate affordability for that request.",
            toolCalls: state.toolCalls,
          });
        },
      };
    }
    case "compare_affordability_scenarios": {
      if (!plan.annualIncome || plan.scenarios.length < 2) {
        return createImmediatePlan(plan.intent, () => createAssistantMessage({
          state: "error",
          content: "I need an annual income and at least two scenarios to compare affordability.",
        }));
      }

      const chartMetric = plan.chartMetric ?? (plan.targetMetro ? "affordabilityRatio" : "maxAffordableMonthlyHousing");

      return {
        intent: plan.intent,
        steps: [
          {
            id: "compare-affordability-scenarios",
            execute: async (state) => {
              const comparison = await runTool("compare_affordability_scenarios", {
                annualIncome: plan.annualIncome,
                targetMetro: plan.targetMetro ?? undefined,
                scenarios: plan.scenarios,
              });
              setExecutionValue(state, "compare_affordability_scenarios", comparison);
              recordToolExecution(state, comparison);

              if (!comparison.ok) {
                return;
              }

              const graph = await runTool("create_graph", {
                inputMode: "helper",
                graphType: "affordability_scenario_bar",
                sourceTool: "calculate_affordability",
                scenarios: comparison.result.data.scenarios.map((scenario) => ({
                  label: scenario.label,
                  data: scenario.data,
                })),
                metric: chartMetric,
              });
              setExecutionValue(state, "compare_affordability_scenarios_graph", graph);
              recordToolExecution(state, graph);

              if (graph.ok) {
                state.chartSpecs.push(graph.result.data);
              } else {
                state.notices.push("I calculated the scenarios but could not generate the comparison chart.");
              }
            },
          },
        ],
        buildMessage: (state) => {
          const comparison = getExecutionValue<ToolExecution<"compare_affordability_scenarios">>(state, "compare_affordability_scenarios");

          if (!comparison?.ok) {
            return createAssistantMessage({
              state: "error",
              content: "I could not compare affordability scenarios for that request.",
              toolCalls: state.toolCalls,
            });
          }

          return createAssistantMessage({
            content: appendNotice(
              `Here is the affordability comparison for ${comparison.result.data.scenarios.map((scenario) => scenario.label).join(" and ")}${comparison.result.data.targetMetro ? ` in ${comparison.result.data.targetMetro}` : ""}.`,
              state.notices,
            ),
            chartSpec: state.chartSpecs[0],
            toolCalls: state.toolCalls,
          });
        },
      };
    }
    case "metrics_snapshot": {
      const year = plan.year ?? latestYear(context.years);

      if (year === undefined) {
        return createImmediatePlan(plan.intent, () => createAssistantMessage({
          state: "error",
          content: "No supported year was available for a metrics snapshot.",
        }));
      }

      const steps: ExecutionStep[] = [
        {
          id: "load-metrics-snapshot",
          execute: async (state) => {
            const snapshot = await runTool("get_metrics_snapshot", { year });
            setExecutionValue(state, "metrics_snapshot", snapshot);
            recordToolExecution(state, snapshot);
          },
        },
      ];

      if (plan.wantsChart) {
        steps.push({
          id: "build-metrics-snapshot-graph",
          execute: async (state) => {
            const snapshot = getExecutionValue<ToolExecution<"get_metrics_snapshot">>(state, "metrics_snapshot");

            if (!snapshot?.ok) {
              return;
            }

            const graph = await runTool("create_graph", {
              inputMode: "helper",
              graphType: "metro_snapshot_bar",
              sourceTool: "get_metrics_snapshot",
              data: snapshot.result.data,
              metric: plan.metric ?? "rent_burden_percent",
              topN: 8,
              sortOrder: "desc",
              highlightThreshold: plan.metric === "rent_burden_percent" ? 30 : undefined,
              formattingHints: {
                showLegend: false,
                showGrid: true,
              },
            });

            setExecutionValue(state, "metrics_snapshot_graph", graph);
            recordToolExecution(state, graph);

            if (graph.ok) {
              state.chartSpecs.push(graph.result.data);
            }
          },
        });
      }

      return {
        intent: plan.intent,
        steps,
        buildMessage: (state) => {
          const snapshot = getExecutionValue<ToolExecution<"get_metrics_snapshot">>(state, "metrics_snapshot");
          const chartSpec = state.chartSpecs[0];

          if (!snapshot?.ok) {
            return createAssistantMessage({
              state: "error",
              content: "I could not load the metro snapshot for that year.",
              toolCalls: state.toolCalls,
            });
          }

          return createAssistantMessage({
            content: chartSpec
              ? `Here is the ${plan.metric === "median_monthly_income" ? "income" : plan.metric === "median_gross_rent" ? "rent" : "rent burden"} comparison for ${year}.`
              : `I loaded the metro snapshot for ${year}.`,
            chartSpec,
            toolCalls: state.toolCalls,
          });
        },
      };
    }
    case "metrics_range": {
      const startYear = plan.startYear;
      const endYear = plan.endYear;

      if (startYear === undefined || endYear === undefined) {
        return createImmediatePlan(plan.intent, () => createAssistantMessage({
          state: "error",
          content: "I need a supported year range to summarize those metrics.",
        }));
      }

      const metric = plan.metric ?? "rent_burden_percent";

      const steps: ExecutionStep[] = [
        {
          id: "load-metrics-range",
          execute: async (state) => {
            const range = await runTool("get_metrics_by_range", { startYear, endYear });
            setExecutionValue(state, "metrics_range", range);
            recordToolExecution(state, range);
          },
        },
      ];

      if (plan.wantsChart) {
        steps.push({
          id: "build-metrics-range-graph",
          execute: async (state) => {
            const range = getExecutionValue<ToolExecution<"get_metrics_by_range">>(state, "metrics_range");

            if (!range?.ok) {
              return;
            }

            const graph = await runTool("create_graph", buildRangeGraphRequest(metric, startYear, endYear, range.result.data.rows));
            setExecutionValue(state, "metrics_range_graph", graph);
            recordToolExecution(state, graph);

            if (graph.ok) {
              state.chartSpecs.push(graph.result.data);
            } else {
              state.notices.push("I summarized the range successfully but could not generate the chart.");
            }
          },
        });
      }

      return {
        intent: plan.intent,
        steps,
        buildMessage: (state) => {
          const range = getExecutionValue<ToolExecution<"get_metrics_by_range">>(state, "metrics_range");

          if (!range?.ok) {
            return createAssistantMessage({
              state: "error",
              content: "I could not summarize metrics for that year range.",
              toolCalls: state.toolCalls,
            });
          }

          return createAssistantMessage({
            content: appendNotice(
              `Here is the ${metric === "median_monthly_income" ? "income" : metric === "median_gross_rent" ? "rent" : "rent burden"} summary across ${startYear}-${endYear}.`,
              state.notices,
            ),
            chartSpec: state.chartSpecs[0],
            toolCalls: state.toolCalls,
          });
        },
      };
    }
    case "compare_metros": {
      const startYear = plan.startYear;
      const endYear = plan.endYear;

      if (plan.metros.length < 2 || startYear === undefined || endYear === undefined) {
        return createImmediatePlan(plan.intent, () => createAssistantMessage({
          state: "error",
          content: "I need at least two metros and a supported year range to compare them.",
        }));
      }

      return {
        intent: plan.intent,
        steps: [
          {
            id: "compare-metros",
            execute: async (state) => {
              const comparison = await runTool("compare_metros", {
                metros: plan.metros,
                startYear,
                endYear,
                metric: "rent_burden_percent",
              });
              setExecutionValue(state, "compare_metros", comparison);
              recordToolExecution(state, comparison);

              if (!comparison.ok || !plan.wantsChart) {
                return;
              }

              const graph = await runTool("create_graph", {
                inputMode: "helper",
                graphType: "metro_compare_line",
                sourceTool: "get_metro_trend",
                data: comparison.result.data.trends,
                metric: "rent_burden_percent",
              });
              setExecutionValue(state, "compare_metros_graph", graph);
              recordToolExecution(state, graph);

              if (graph.ok) {
                state.chartSpecs.push(graph.result.data);
              } else {
                state.notices.push("I compared the metros successfully but could not generate the chart.");
              }
            },
          },
        ],
        buildMessage: (state) => {
          const comparison = getExecutionValue<ToolExecution<"compare_metros">>(state, "compare_metros");

          if (!comparison?.ok) {
            return createAssistantMessage({
              state: "error",
              content: "I could not compare those metros.",
              toolCalls: state.toolCalls,
            });
          }

          return createAssistantMessage({
            content: appendNotice(
              `Here is the rent burden comparison for ${formatSeriesList(comparison.result.data.metros)} from ${startYear} to ${endYear}.`,
              state.notices,
            ),
            chartSpec: state.chartSpecs[0],
            toolCalls: state.toolCalls,
          });
        },
      };
    }
    case "metro_trend_chart": {
      const metros = plan.metros?.length ? plan.metros : plan.metro ? [plan.metro] : [];
      const window = defaultTrendWindow(context.years);
      const startYear = plan.startYear ?? window?.startYear;
      const endYear = plan.endYear ?? window?.endYear;

      if (metros.length === 0 || startYear === undefined || endYear === undefined) {
        return createImmediatePlan(plan.intent, () => createAssistantMessage({
          state: "error",
          content: "I need a metro and a supported year range to build a trend chart. Try: Show a rent burden trend chart for Chicago.",
        }));
      }

      return {
        intent: plan.intent,
        steps: metros.map((metro, index) => ({
          id: `build-trend-chart-${index}`,
          execute: async (state) => {
            const trend = await runTool("get_metro_trend", { metro, startYear, endYear });
            recordToolExecution(state, trend);

            if (!trend.ok) {
              state.failedMetros.push(metro);
              return;
            }

            const graph = await runTool("create_graph", {
              inputMode: "helper",
              graphType: "metro_trend_line",
              sourceTool: "get_metro_trend",
              data: trend.result.data,
              metric: "rent_burden_percent",
              highlightThreshold: 30,
              formattingHints: {
                showLegend: false,
                showGrid: true,
              },
            });
            recordToolExecution(state, graph);

            if (!graph.ok) {
              state.failedMetros.push(metro);
              return;
            }

            state.chartSpecs.push(graph.result.data);
            state.completedMetros.push(trend.result.data.metro);
          },
        })),
        buildMessage: (state) => {
          if (state.chartSpecs.length === 0) {
            return createAssistantMessage({
              state: "error",
              content: `I could not load the trend charts for ${formatSeriesList(metros)}.`,
              toolCalls: state.toolCalls,
            });
          }

          const summary = state.failedMetros.length > 0
            ? `Here are the rent burden trend charts for ${formatSeriesList(state.completedMetros)}. I could not finish ${formatSeriesList(state.failedMetros)}.`
            : state.chartSpecs.length === 1
              ? buildTrendSummary(state.completedMetros[0] ?? metros[0], true)
              : `Here are the rent burden trend charts for ${formatSeriesList(state.completedMetros)}.`;

          return createAssistantMessage({
            state: state.failedMetros.length > 0 ? "error" : "complete",
            content: summary,
            chartSpecs: state.chartSpecs,
            toolCalls: state.toolCalls,
          });
        },
      };
    }
    case "clarification":
      return createImmediatePlan(plan.intent, () => createAssistantMessage({
        content: plan.clarificationMessage,
      }));
    case "help":
      return createImmediatePlan(plan.intent, () => createAssistantMessage({
        content: plan.assistantMessage ?? "Ask for a metro trend, a year snapshot comparison, an affordability estimate, or the current data source status.",
      }));
  }
}

function buildTrendSummary(metro: string, chartCreated: boolean): string {
  return chartCreated
    ? `Here is the rent burden trend for ${metro}, including a chart spec generated from live tool output.`
    : `I loaded the rent burden trend for ${metro}.`;
}

function formatSeriesList(values: string[]): string {
  if (values.length <= 1) {
    return values[0] ?? "";
  }

  if (values.length === 2) {
    return `${values[0]} and ${values[1]}`;
  }

  return `${values.slice(0, -1).join(", ")}, and ${values[values.length - 1]}`;
}

async function executePlan(plan: ExecutionPlan): Promise<ChatMessage> {
  const state = createExecutionState();

  for (const step of plan.steps) {
    await step.execute(state);
  }

  return plan.buildMessage(state);
}

export async function orchestrateChat(request: ChatApiRequest): Promise<ChatApiResponse> {
  const metros = await runTool("get_metros");
  const years = await runTool("get_available_years");

  const context: PlanningContext = {
    metros: metros.ok ? metros.result.data.metros.map((metro) => metro.name) : [],
    years: years.ok ? years.result.data.years : [],
  };

  const planning = await planRequest(request, context);
  const executionPlan = buildExecutionPlan(planning.plan, context);
  const message = await executePlan(executionPlan);

  return {
    message,
    meta: {
      planner: planning.planner,
      intent: planning.plan.intent,
    },
  };
}