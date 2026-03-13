# Progress Tracker

## Status Legend
not started  
in progress  
blocked  
done  

---

## Phases

[~] Phase 1 Domain extraction  
[ ] Phase 2 Shared schemas  
[ ] Phase 3 MCP server  
[ ] Phase 4 Graph tool  
[ ] Phase 5 Chat UI  
[ ] Phase 6 AI orchestration  
[ ] Phase 7 Persistence  
[ ] Phase 8 Polish  

---

## Current Focus

Phase 1 Domain extraction.

---

## Notes

- Created the initial workspace scaffold and `packages/domain` package.
- Implemented Phase 1 affordability, metrics, trend, and data source services.
- Added local sample data under `data/processed` for v2-only development.
- Added domain tests covering the extracted behavior from the reference implementation.
- Verified with `npm run typecheck` and `npm test`.

---

## Next Step

Refine the domain export surface if needed, then begin Phase 1 compatibility wiring for downstream packages and document updates.