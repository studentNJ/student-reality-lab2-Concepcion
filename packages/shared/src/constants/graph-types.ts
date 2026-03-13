export const graphTypes = [
  "metro_snapshot_bar",
  "metro_trend_line",
  "metro_compare_line",
  "affordability_scenario_bar",
] as const;

export type GraphType = (typeof graphTypes)[number];