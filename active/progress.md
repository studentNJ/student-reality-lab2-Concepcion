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
[ ] Phase 6 AI orchestration  
[ ] Phase 7 Persistence  
[ ] Phase 8 Polish  

---

## Current Focus

Phase 5 complete. Awaiting confirmation before Phase 6.

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

---

## Next Step

Await confirmation before starting Phase 6 API and orchestration wiring.