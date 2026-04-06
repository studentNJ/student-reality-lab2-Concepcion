import { InsightBadge } from "./InsightBadge";

interface HeaderBarProps {
  modeLabel: string;
  statusLabel: string;
  chartCount: number;
  toolCount: number;
  showToolCards: boolean;
  hasErrors: boolean;
}

export function HeaderBar({ modeLabel, statusLabel, chartCount, toolCount, showToolCards, hasErrors }: HeaderBarProps) {
  return (
    <header className="header-bar">
      <div>
        <p className="header-kicker">Student Reality Lab 2</p>
        <div className="header-title-row">
          <h1>Housing analysis studio</h1>
          <InsightBadge tone={hasErrors ? "brick" : "teal"}>{statusLabel}</InsightBadge>
        </div>
        <p className="header-copy">A chat-first workspace for rent burden, affordability, and metro-level housing evidence.</p>
      </div>
      <div className="header-metadata" aria-label="Workspace status">
        <div className="header-metric-card">
          <span>Mode</span>
          <strong>{modeLabel}</strong>
        </div>
        <div className="header-metric-card">
          <span>Charts</span>
          <strong>{chartCount}</strong>
        </div>
        {showToolCards ? (
          <div className="header-metric-card">
            <span>Tool cards</span>
            <strong>{toolCount}</strong>
          </div>
        ) : null}
      </div>
    </header>
  );
}