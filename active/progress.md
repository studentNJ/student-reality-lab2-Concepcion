# Progress Tracker

## Status Legend
not started  
in progress  
blocked  
done  

---

## Phases

[x] Phase 1 Domain extraction  
[x] Phase 2 Shared schemas  
[x] Phase 3 MCP server  
[x] Phase 4 Graph tool  
[x] Phase 5 Chat UI  
[x] Phase 6 AI orchestration  
[ ] Phase 7 Persistence  
[ ] Phase 8 Polish  

---

## Current Focus

Phase 6 complete. Ready for Phase 7.

---

## Notes

- Created the initial workspace scaffold and `packages/domain` package.
- Implemented Phase 1 affordability, metrics, trend, and data source services.
- Added local sample data under `data/processed` for v2-only development.
- Added domain tests covering the extracted behavior from the reference implementation.
- Verified with `npm run typecheck` and `npm test`.
- Created `packages/shared` with Zod schemas for metro, metrics, trend, affordability, and graph contracts.
- Added shared schema tests and compatibility checks against live domain outputs.
- Created `packages/mcp-server` with tool handlers for years, metros, metrics snapshot, trend, affordability, and data source status.
- Wired a real MCP stdio server entrypoint and registration layer using the MCP SDK.
- Added tool-level tests for success and failure envelopes.
- Added the `create_graph` MCP tool with separate builders for all four planned graph types.
- Added graph tool tests to verify every supported chart type and invalid-input rejection.
- Created the initial `apps/web` Next app scaffold and Phase 5 chat components.
- Wired a demo chat shell that renders assistant messages, tool cards, and chart cards using the current graph spec contract.
- Upgraded the chart result card to render line and grouped-bar previews plus legend, narrative, and annotation details from the chart spec.
- Added Phase 5 polish with starter prompts, assistant working state, simulated error state, empty-state handling, and conversation status indicators.
- Added a real `/api/chat` route plus a web orchestration layer that plans requests, executes MCP tool handlers, and returns structured assistant messages to the UI.
- Replaced the demo-only client response flow with live API calls and multi-tool result rendering in the chat shell.
- Added an optional OpenAI-backed planner with a deterministic fallback planner when model credentials are not configured.
- Validated the live model-planning path with the configured API key and fixed monorepo root env loading for the web app.
- Fixed metro trend orchestration so natural metro names resolve to dataset metros and the trend tool resolves metro names to metro IDs.

---

## Next Step

Begin Phase 7 persistence using the now-validated chat and tool orchestration flow.