import type { ReactNode } from "react";

interface InsightBadgeProps {
  children: ReactNode;
  tone?: "neutral" | "teal" | "brick" | "gold";
}

export function InsightBadge({ children, tone = "neutral" }: InsightBadgeProps) {
  return <span className={`insight-badge insight-${tone}`}>{children}</span>;
}