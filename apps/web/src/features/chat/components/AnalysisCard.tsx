import type { ReactNode } from "react";

interface AnalysisCardProps {
  label: string;
  mode?: string;
  status?: "success" | "error" | "pending";
  className?: string;
  children: ReactNode;
}

export function AnalysisCard({ label, mode, status, className, children }: AnalysisCardProps) {
  return (
    <section className={`artifact-card analysis-card${className ? ` ${className}` : ""}`}>
      <div className="artifact-header">
        <span className="artifact-label">{label}</span>
        {status ? <span className={`status-chip status-${status}`}>{status}</span> : null}
        {!status && mode ? <span className="artifact-mode">{mode}</span> : null}
      </div>
      {children}
    </section>
  );
}