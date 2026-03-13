import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { PrismaClient } from "@prisma/client";

declare global {
  var __studentRealityLabPrisma: PrismaClient | undefined;
}

function resolveWorkspaceRoot(): string {
  const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
  return path.resolve(currentDirectory, "..", "..", "..");
}

function ensureDatabaseUrl(): void {
  if (process.env.DATABASE_URL) {
    return;
  }

  const databasePath = path.join(resolveWorkspaceRoot(), "packages", "db", "prisma", "dev.db");
  process.env.DATABASE_URL = pathToFileURL(databasePath).href;
}

ensureDatabaseUrl();

export function getPrismaClient(): PrismaClient {
  if (!globalThis.__studentRealityLabPrisma) {
    globalThis.__studentRealityLabPrisma = new PrismaClient();
  }

  return globalThis.__studentRealityLabPrisma;
}