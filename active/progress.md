# Progress Tracker

## Status Legend
not started  
in progress  
blocked  
done  

---

## Phases

[~] Phase 1 Domain extraction  
[~] Phase 2 Shared schemas  
[~] Phase 3 MCP server  
[~] Phase 4 Graph tool  
[ ] Phase 5 Chat UI  
[ ] Phase 6 AI orchestration  
[ ] Phase 7 Persistence  
[ ] Phase 8 Polish  

---

## Current Focus

Phase 4 Graph tool.

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

---

## Next Step

Connect the graph tool to richer data flows and then begin Phase 5 chat UI scaffolding.