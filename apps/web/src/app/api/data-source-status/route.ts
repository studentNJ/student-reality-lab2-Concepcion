import { NextResponse } from "next/server";
import { getDataSourceStatusTool } from "@student-reality-lab/mcp-server";

interface DataSourceStatusDetail {
  configuredMode: "database" | "csv";
  activeSource: "database" | "csv_fallback";
  datasetType: "sample" | "production";
  datasetLabel: string;
  metroCount: number;
  startYear: number | null;
  endYear: number | null;
  lastRefreshed: string | null;
}

export async function GET() {
  const status = getDataSourceStatusTool();

  if (!status.ok) {
    return NextResponse.json({ error: status.error.message }, { status: 500 });
  }

  const detailRecord = status.data.details?.[0];
  const detail = detailRecord ? {
    configuredMode: detailRecord.configuredMode,
    activeSource: detailRecord.activeSource,
    datasetType: detailRecord.datasetType,
    datasetLabel: detailRecord.datasetLabel,
    metroCount: detailRecord.metroCount,
    startYear: detailRecord.startYear,
    endYear: detailRecord.endYear,
    lastRefreshed: detailRecord.lastRefreshed,
  } as DataSourceStatusDetail : null;

  return NextResponse.json({
    sourceMode: status.data.sourceMode,
    detail,
  }, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}