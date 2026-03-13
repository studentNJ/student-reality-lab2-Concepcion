import type { DashboardMetric, MetroMetric } from "../types/metrics.js";

function roundToTwo(value: number): number {
  return Number(value.toFixed(2));
}

export function isYearInRange(year: number, startYear: number, endYear: number): boolean {
  return year >= startYear && year <= endYear;
}

export function summarizeMetrics(rows: MetroMetric[]): DashboardMetric[] {
  const grouped = new Map<string, {
    metro_name: string;
    sample_size: number;
    start_year: number;
    end_year: number;
    total_monthly_income: number;
    total_rent: number;
    total_rent_burden: number;
  }>();

  for (const row of rows) {
    const existing = grouped.get(row.metro_id);

    if (existing) {
      existing.sample_size += 1;
      existing.start_year = Math.min(existing.start_year, row.year);
      existing.end_year = Math.max(existing.end_year, row.year);
      existing.total_monthly_income += row.median_monthly_income;
      existing.total_rent += row.median_gross_rent;
      existing.total_rent_burden += row.rent_burden_percent;
      continue;
    }

    grouped.set(row.metro_id, {
      metro_name: row.metro_name,
      sample_size: 1,
      start_year: row.year,
      end_year: row.year,
      total_monthly_income: row.median_monthly_income,
      total_rent: row.median_gross_rent,
      total_rent_burden: row.rent_burden_percent,
    });
  }

  return Array.from(grouped.entries())
    .map(([metro_id, summary]) => ({
      metro_id,
      metro_name: summary.metro_name,
      start_year: summary.start_year,
      end_year: summary.end_year,
      median_monthly_income: roundToTwo(summary.total_monthly_income / summary.sample_size),
      median_gross_rent: roundToTwo(summary.total_rent / summary.sample_size),
      rent_burden_percent: roundToTwo(summary.total_rent_burden / summary.sample_size),
      sample_size: summary.sample_size,
    }))
    .sort((left, right) => right.rent_burden_percent - left.rent_burden_percent);
}