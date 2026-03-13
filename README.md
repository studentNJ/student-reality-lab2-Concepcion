# Student Reality Lab v2

Student Reality Lab v2 is a chat-first housing affordability application built as a monorepo around a Next.js web client, shared tool schemas, domain logic, and Prisma-backed chat persistence.

The current app lets a user ask for metro rent burden trends, year-based metro comparisons, affordability calculations, and data source status. The assistant answers with plain language, tool call summaries, and chart cards rendered inline in the chat UI.

## What This Project Is

This repository is a local-first prototype of a housing analysis assistant. It combines:

- A Next.js web app in `apps/web`
- Shared schemas and chart contracts in `packages/shared`
- Domain/data logic for metros, trends, and affordability in `packages/domain`
- MCP-style tool implementations in `packages/mcp-server`
- Prisma + SQLite persistence for chat conversations in `packages/db`

The current product shape is a single-page chat interface backed by one API route: `POST /api/chat`.

## How It Works

At a high level, a request flows like this:

1. The user submits a prompt in the chat UI.
2. `apps/web/src/app/api/chat/route.ts` validates the request and calls the orchestrator.
3. `apps/web/src/lib/ai/orchestrator.ts` builds a plan.
	 - If `OPENAI_API_KEY` is available, it asks an OpenAI model to return a JSON plan.
	 - If not, it falls back to local prompt parsing rules.
4. The orchestrator executes local tools through `apps/web/src/lib/ai/tool-runner.ts`.
5. Tool results can be converted into chart specs with the graph helper tool.
6. The assistant response is returned to the UI.
7. The API route attempts to persist the user prompt, assistant response, and tool summaries to SQLite through Prisma.

This means the app can still function without an LLM API key for the supported intents, but planning will be rule-based instead of model-based.

## Current Functions

The current app supports these primary workflows:

- Metro trend charts
	- Example: “Show a rent burden trend chart for Chicago.”
	- Supports multi-metro chart requests in requested order.
	- Produces inline chart cards from tool output.

- Year snapshot comparisons
	- Example: “Compare metro affordability for 2024.”
	- Supports rent burden, gross rent, and income-oriented comparisons.

- Affordability calculations
	- Example: “Can a $72,000 salary afford rent in Chicago?”
	- Supports inputs like income, debt, roommates, household size, and after-tax preference.

- Data source status
	- Example: “What data source is the app using right now?”

- Chat persistence
	- Conversations, assistant messages, and tool-call summaries are written to SQLite when persistence succeeds.

## Current Tooling Surface

The orchestrator currently uses these local tools:

- `get_available_years`
- `get_metros`
- `get_metrics_snapshot`
- `get_metro_trend`
- `calculate_affordability`
- `get_data_source_status`
- `create_graph`

## Current Limitations

This repository is functional, but it is still a prototype. Important current limitations:

- Narrow intent coverage
	- The assistant is currently built around four main intent families: trend charts, metric snapshots, affordability, and source status.
	- General open-ended chat is not the target behavior.

- Single API surface
	- The product currently centers on a single chat endpoint rather than a broader public API.

- Local SQLite persistence
	- Persistence uses Prisma + SQLite today.
	- This is suitable for local development and small-scale use, but not a multi-instance production deployment strategy.

- Best-effort persistence
	- If persistence fails, the chat response still returns, but the conversation may not be saved.

- No auth or multi-user controls
	- There is currently no login, permissions model, or tenant separation.

- No streaming responses
	- The assistant responds after orchestration completes rather than streaming partial output.

- Limited chart system
	- Charts are rendered from internal chart specs and are optimized for the currently supported graph types.
	- The chart UI is not yet a general-purpose analytics layer.

- Minimal production hardening
	- The app can be built and started in production mode, but it is not yet documented or structured as a hardened hosted service with observability, secrets management, and external database infrastructure.

## Repository Layout

Key directories:

- `apps/web`: Next.js application and chat UI
- `packages/shared`: shared types, schemas, and chart contracts
- `packages/domain`: domain logic over the metro metrics dataset
- `packages/mcp-server`: local tool implementations used by the app
- `packages/db`: Prisma client and persistence layer
- `tests`: Vitest and Playwright coverage
- `scripts`: repo utility scripts such as safe web build cleanup

## Prerequisites

Before running locally, make sure you have:

- Node.js 20+
- npm

## Environment

The orchestrator loads environment variables from the workspace root using `.env.local` first, then `.env`.

Typical values:

```env
DATABASE_URL="file:/home/your-user/path/to/student-reality-lab2-Concepcion/packages/db/prisma/dev.db"
OPENAI_API_KEY="your-key-here"
OPENAI_MODEL="gpt-5.4"
```

Notes:

- `DATABASE_URL` is required for Prisma-backed persistence.
- If `OPENAI_API_KEY` is omitted, the app still runs using the fallback planner for supported prompts.
- The model name defaults to `gpt-5.4` when not overridden.

## First-Time Local Setup

From the repository root:

```bash
npm install
npm run db:generate
npm run db:push
```

If you want a migration-based local setup instead of schema push, use:

```bash
npm run db:migrate
```

## Run Locally In Dev Mode

From the repository root:

```bash
npm run dev
```

This starts the Next.js development server for `apps/web`.

Open:

```text
http://localhost:3000
```

Useful dev commands:

```bash
npm run typecheck
npm run test:web
npm run test:e2e
```

If you need to remove the web build output safely:

```bash
npm run clean:web-build
```

That script is safer than deleting `apps/web/.next` manually because it avoids cleanup while a Next.js process is still using the directory.

## Run Locally In Production Mode

From the repository root:

1. Build the web app:

```bash
npm run build:web
```

2. Start the production server:

```bash
npm run start:web
```

Open:

```text
http://localhost:3000
```

Production mode expectations:

- `DATABASE_URL` must still be set if you want persistence enabled.
- `OPENAI_API_KEY` is optional, but without it the app will use fallback planning.
- `npm run start:web` must be run from the repository root, not the parent folder.

## Testing

Current repo-level test commands:

```bash
npm run test
npm run test:web
npm run test:e2e
```

What they cover:

- `npm run test`: domain, shared-schema, and MCP/tool tests
- `npm run test:web`: web orchestration tests
- `npm run test:e2e`: Playwright browser coverage

## Current Product Summary

Today, this repo is best described as:

- A chat UI for housing-analysis requests
- A local tool orchestration layer over metro and affordability data
- A chart-rendering interface for trend and comparison outputs
- A Prisma + SQLite-backed persistence prototype

It is already usable for the supported workflows, but it is not yet a full generalized analytics platform or a production-hardened multi-user service.
