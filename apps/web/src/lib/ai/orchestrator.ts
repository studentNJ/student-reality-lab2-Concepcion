import fs from "node:fs";
import path from "node:path";
import type { ChartSpec } from "@student-reality-lab/shared";
import type { ChatMessage, ToolCallSummary } from "@web/lib/chat-types";
import { runTool } from "./tool-runner";

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

interface PlanBase {
  intent: "metro_trend_chart" | "metrics_snapshot" | "affordability" | "data_source_status" | "help";
  assistantMessage?: string;
}

interface MetroTrendPlan extends PlanBase {
  intent: "metro_trend_chart";
  metro?: string | null;
  metros?: string[];
  startYear?: number;
  endYear?: number;
}

interface MetricsSnapshotPlan extends PlanBase {
  intent: "metrics_snapshot";
  year?: number;
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

interface DataSourceStatusPlan extends PlanBase {
  intent: "data_source_status";
}

interface HelpPlan extends PlanBase {
  intent: "help";
}

type OrchestrationPlan = MetroTrendPlan | MetricsSnapshotPlan | AffordabilityPlan | DataSourceStatusPlan | HelpPlan;

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

function buildFallbackPlan(prompt: string, context: PlanningContext): OrchestrationPlan {
  const normalizedPrompt = normalizePrompt(prompt);
  const matchedMetros = resolveMetros(prompt, context.metros);
  const matchedMetro = matchedMetros[0] ?? null;
  const requestedYear = extractYear(prompt, context.years);

  if (normalizedPrompt.includes("source") || normalizedPrompt.includes("dataset") || normalizedPrompt.includes("data status")) {
    return { intent: "data_source_status" };
  }

  if (normalizedPrompt.includes("afford") || normalizedPrompt.includes("salary") || normalizedPrompt.includes("income")) {
    const roommates = extractRoommates(prompt);
    return {
      intent: "affordability",
      annualIncome: extractAnnualIncome(prompt),
      monthlyDebt: extractMonthlyDebt(prompt),
      roommates,
      householdSize: roommates === undefined ? undefined : roommates + 1,
      targetMetro: matchedMetro,
      useEstimatedAfterTaxIncome: normalizedPrompt.includes("after tax") || normalizedPrompt.includes("take home"),
    };
  }

  if (normalizedPrompt.includes("trend") || normalizedPrompt.includes("chart") || normalizedPrompt.includes("graph")) {
    const window = defaultTrendWindow(context.years);
    return {
      intent: "metro_trend_chart",
      metros: matchedMetros,
      startYear: requestedYear ?? window?.startYear,
      endYear: window?.endYear,
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
        "Choose one intent from: metro_trend_chart, metrics_snapshot, affordability, data_source_status, help.",
        "If the user asks for a chart or trend, prefer metro_trend_chart when a metro is present; otherwise use metrics_snapshot.",
        "If the user asks for multiple metros, return metros as an ordered array matching the request order.",
        "Only use metro names from this list:",
        context.metros.join(", "),
        `Supported years: ${context.years.join(", ")}`,
        "JSON shape: { intent, assistantMessage?, metro?, metros?, startYear?, endYear?, year?, metric?, wantsChart?, annualIncome?, monthlyDebt?, targetMetro?, roommates?, householdSize?, useEstimatedAfterTaxIncome? }",
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
  const modelPlan = await planWithModel(request.prompt, request.history, context);

  if (modelPlan) {
    if (modelPlan.intent === "metro_trend_chart") {
      const normalizedMetros = modelPlan.metros?.length
        ? modelPlan.metros
        : modelPlan.metro
          ? [modelPlan.metro]
          : resolveMetros(request.prompt, context.metros);

      return {
        planner: "model",
        plan: {
          ...modelPlan,
          metros: normalizedMetros,
        },
      };
    }

    return { planner: "model", plan: modelPlan };
  }

  return {
    planner: "fallback",
    plan: buildFallbackPlan(request.prompt, context),
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

async function executePlan(plan: OrchestrationPlan, context: PlanningContext): Promise<ChatMessage> {
  switch (plan.intent) {
    case "data_source_status": {
      const status = runTool("get_data_source_status");
      return createAssistantMessage({
        state: status.ok ? "complete" : "error",
        content: status.ok
          ? `The dataset is currently running in ${status.result.data.sourceMode} mode.`
          : "I could not retrieve the current data source status.",
        toolCalls: [status.summary],
      });
    }
    case "affordability": {
      if (!plan.annualIncome) {
        return createAssistantMessage({
          state: "error",
          content: "I need an annual income to run the affordability calculation. Try a prompt like: Can a $72,000 salary afford rent in Chicago?",
        });
      }

      const affordability = runTool("calculate_affordability", {
        annualIncome: plan.annualIncome,
        monthlyDebt: plan.monthlyDebt,
        roommates: plan.roommates,
        householdSize: plan.householdSize,
        targetMetro: plan.targetMetro ?? undefined,
        useEstimatedAfterTaxIncome: plan.useEstimatedAfterTaxIncome,
      });

      return createAssistantMessage({
        state: affordability.ok ? "complete" : "error",
        content: affordability.ok
          ? affordability.result.data.results.summary ?? "Affordability calculation completed."
          : "I could not calculate affordability for that request.",
        toolCalls: [affordability.summary],
      });
    }
    case "metrics_snapshot": {
      const year = plan.year ?? latestYear(context.years);

      if (year === undefined) {
        return createAssistantMessage({
          state: "error",
          content: "No supported year was available for a metrics snapshot.",
        });
      }

      const snapshot = runTool("get_metrics_snapshot", { year });

      if (!snapshot.ok) {
        return createAssistantMessage({
          state: "error",
          content: "I could not load the metro snapshot for that year.",
          toolCalls: [snapshot.summary],
        });
      }

      const toolCalls: ToolCallSummary[] = [snapshot.summary];
      let chartSpec: ChartSpec | undefined;

      if (plan.wantsChart) {
        const graph = runTool("create_graph", {
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

        toolCalls.push(graph.summary);
        chartSpec = graph.ok ? graph.result.data : undefined;
      }

      return createAssistantMessage({
        content: chartSpec
          ? `Here is the ${plan.metric === "median_monthly_income" ? "income" : plan.metric === "median_gross_rent" ? "rent" : "rent burden"} comparison for ${year}.`
          : `I loaded the metro snapshot for ${year}.`,
        chartSpec,
        toolCalls,
      });
    }
    case "metro_trend_chart": {
      const metros = plan.metros?.length ? plan.metros : plan.metro ? [plan.metro] : [];
      const window = defaultTrendWindow(context.years);
      const startYear = plan.startYear ?? window?.startYear;
      const endYear = plan.endYear ?? window?.endYear;

      if (metros.length === 0 || startYear === undefined || endYear === undefined) {
        return createAssistantMessage({
          state: "error",
          content: "I need a metro and a supported year range to build a trend chart. Try: Show a rent burden trend chart for Chicago.",
        });
      }

      const chartSpecs: ChartSpec[] = [];
      const toolCalls: ToolCallSummary[] = [];
      const completedMetros: string[] = [];
      const failedMetros: string[] = [];

      for (const metro of metros) {
        const trend = runTool("get_metro_trend", { metro, startYear, endYear });
        toolCalls.push(trend.summary);

        if (!trend.ok) {
          failedMetros.push(metro);
          continue;
        }

        const graph = runTool("create_graph", {
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
        toolCalls.push(graph.summary);

        if (!graph.ok) {
          failedMetros.push(metro);
          continue;
        }

        chartSpecs.push(graph.result.data);
        completedMetros.push(trend.result.data.metro);
      }

      if (chartSpecs.length === 0) {
        return createAssistantMessage({
          state: "error",
          content: `I could not load the trend charts for ${formatSeriesList(metros)}.`,
          toolCalls,
        });
      }

      const summary = failedMetros.length > 0
        ? `Here are the rent burden trend charts for ${formatSeriesList(completedMetros)}. I could not finish ${formatSeriesList(failedMetros)}.`
        : chartSpecs.length === 1
          ? buildTrendSummary(completedMetros[0] ?? metros[0], true)
          : `Here are the rent burden trend charts for ${formatSeriesList(completedMetros)}.`;

      return createAssistantMessage({
        state: failedMetros.length > 0 ? "error" : "complete",
        content: summary,
        chartSpecs,
        toolCalls,
      });
    }
    case "help":
      return createAssistantMessage({
        content: plan.assistantMessage ?? "Ask for a metro trend, a year snapshot comparison, an affordability estimate, or the current data source status.",
      });
  }
}

export async function orchestrateChat(request: ChatApiRequest): Promise<ChatApiResponse> {
  const metros = runTool("get_metros");
  const years = runTool("get_available_years");

  const context: PlanningContext = {
    metros: metros.ok ? metros.result.data.metros.map((metro) => metro.name) : [],
    years: years.ok ? years.result.data.years : [],
  };

  const planning = await planRequest(request, context);
  const message = await executePlan(planning.plan, context);

  return {
    message,
    meta: {
      planner: planning.planner,
      intent: planning.plan.intent,
    },
  };
}