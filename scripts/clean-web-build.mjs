import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(scriptDirectory, "..");
const distDirectory = path.join(workspaceRoot, "apps", "web", ".next");
const force = process.argv.includes("--force");

function findRunningNextProcesses() {
  try {
    const output = execFileSync("ps", ["-eo", "pid=,args="], {
      cwd: workspaceRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });

    return output
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const firstSpace = line.indexOf(" ");
        return {
          pid: firstSpace === -1 ? line : line.slice(0, firstSpace),
          command: firstSpace === -1 ? "" : line.slice(firstSpace + 1),
        };
      })
      .filter(({ command }) => {
        const normalized = command.replace(/\\/g, "/");
        const touchesWorkspace = normalized.includes(workspaceRoot.replace(/\\/g, "/"));
        const looksLikeNext =
          normalized.includes("next/dist/bin/next")
          || normalized.includes(" next dev")
          || normalized.includes(" next start")
          || normalized.includes(" next-server");

        return touchesWorkspace && looksLikeNext;
      });
  } catch {
    return [];
  }
}

if (!fs.existsSync(distDirectory)) {
  console.log("No web build output to remove.");
  process.exit(0);
}

const runningProcesses = findRunningNextProcesses();

if (runningProcesses.length > 0 && !force) {
  console.error("Refusing to remove apps/web/.next while a Next.js process for this workspace is still running.");
  for (const processInfo of runningProcesses) {
    console.error(`- pid ${processInfo.pid}: ${processInfo.command}`);
  }
  console.error("Stop the web server first, or rerun with --force if you have already shut it down.");
  process.exit(1);
}

fs.rmSync(distDirectory, { recursive: true, force: true });
console.log("Removed apps/web/.next.");