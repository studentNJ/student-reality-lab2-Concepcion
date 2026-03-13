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
[ ] Phase 3 MCP server  
[ ] Phase 4 Graph tool  
[ ] Phase 5 Chat UI  
[ ] Phase 6 AI orchestration  
[ ] Phase 7 Persistence  
[ ] Phase 8 Polish  

---

## Current Focus

Phase 2 Shared schemas.

---

## Notes

- Created the initial workspace scaffold and `packages/domain` package.
- Implemented Phase 1 affordability, metrics, trend, and data source services.
- Added local sample data under `data/processed` for v2-only development.
- Added domain tests covering the extracted behavior from the reference implementation.
- Verified with `npm run typecheck` and `npm test`.
- Created `packages/shared` with Zod schemas for metro, metrics, trend, affordability, and graph contracts.
- Added shared schema tests and compatibility checks against live domain outputs.

---

## Next Step

Use the shared schemas inside Phase 3 MCP tool implementations so tool inputs and outputs are validated through one package.