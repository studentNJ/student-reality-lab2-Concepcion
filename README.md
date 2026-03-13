# student-reality-lab2-Concepcion
Version 2 of student-Reality-Lab

## Workspace Notes

- Use `npm run clean:web-build` to remove `apps/web/.next` safely.
- The cleanup script refuses to delete the build directory while a Next.js process for this workspace is still running, which avoids misleading Turbopack `.sst` cache-write errors during local verification.
