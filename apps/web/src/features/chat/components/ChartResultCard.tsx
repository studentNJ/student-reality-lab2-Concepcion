import type { ChartSpec, SeriesSpec } from "@student-reality-lab/shared";

interface ChartResultCardProps {
  chartSpec: ChartSpec;
}

const seriesColors = ["#b5523d", "#0f766e", "#c68b2c", "#5f6caf"];
const chartTop = 20;
const chartBottom = 140;
const chartHeight = chartBottom - chartTop;

interface ThresholdAnnotation {
  label: string;
  value: number;
}

function getPointNumber(point: Record<string, unknown>, field: string): number {
  const value = point[field];
  return typeof value === "number" ? value : 0;
}

function getPointLabel(point: Record<string, unknown>, field: string): string {
  const value = point[field];

  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  return "n/a";
}

function formatValue(value: number, formatter?: ChartSpec["axes"]["y"]["formatter"]): string {
  if (formatter === "currency_usd") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  }

  if (formatter === "percent") {
    return `${value.toFixed(1)}%`;
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
  }).format(value);
}

function getSeriesColor(index: number): string {
  return seriesColors[index % seriesColors.length];
}

function roundScaleValue(value: number): number {
  return Number(value.toFixed(1));
}

function getNiceStep(value: number): number {
  if (value <= 0) {
    return 1;
  }

  const exponent = Math.floor(Math.log10(value));
  const fraction = value / 10 ** exponent;

  if (fraction <= 1) {
    return 10 ** exponent;
  }

  if (fraction <= 2) {
    return 2 * 10 ** exponent;
  }

  if (fraction <= 5) {
    return 5 * 10 ** exponent;
  }

  return 10 * 10 ** exponent;
}

function buildScaleTicks(maxValue: number, formatter?: ChartSpec["axes"]["y"]["formatter"]): number[] {
  const paddedMax = Math.max(maxValue * 1.1, 1);
  const desiredTickCount = formatter === "percent" ? 5 : 4;
  const step = getNiceStep(paddedMax / (desiredTickCount - 1));
  const roundedMax = Math.ceil(paddedMax / step) * step;
  const tickCount = Math.max(Math.round(roundedMax / step), 1);

  return Array.from({ length: tickCount + 1 }, (_, index) => roundScaleValue(roundedMax - index * step));
}

function getThresholdAnnotation(chartSpec: ChartSpec): ThresholdAnnotation | null {
  const annotation = chartSpec.annotations?.find((item) => item.type === "threshold" && typeof item.value === "number");

  if (!annotation || typeof annotation.value !== "number") {
    return null;
  }

  return {
    label: annotation.label,
    value: annotation.value,
  };
}

function getPlotY(value: number, scaleMax: number): number {
  return Math.max(chartBottom - (value / scaleMax) * chartHeight, 8);
}

function buildLinePath(series: SeriesSpec, chartSpec: ChartSpec, scaleMax: number): string {
  const previewPoints = series.points.slice(0, 8);

  return previewPoints
    .map((point, pointIndex) => {
      const x = previewPoints.length === 1 ? 160 : (pointIndex / (previewPoints.length - 1)) * 320;
      const rawValue = getPointNumber(point, chartSpec.axes.y.field);
      const y = getPlotY(rawValue, scaleMax);
      const command = pointIndex === 0 ? "M" : "L";

      return `${command}${x.toFixed(2)} ${Math.max(y, 8).toFixed(2)}`;
    })
    .join(" ");
}

function renderLineChart(chartSpec: ChartSpec, scaleTicks: number[], scaleMax: number) {
  const firstSeries = chartSpec.series[0];
  const labels = firstSeries?.points.slice(0, 8).map((point) => getPointLabel(point, chartSpec.axes.x.field)) ?? [];
  const threshold = getThresholdAnnotation(chartSpec);
  const thresholdY = threshold ? getPlotY(threshold.value, scaleMax) : null;

  return (
    <div className="chart-preview chart-preview-line" aria-label="Chart preview">
      <div className="chart-preview-frame">
        <div className="chart-y-axis" aria-hidden="true">
          {scaleTicks.map((tick) => (
            <span key={tick}>{formatValue(tick, chartSpec.axes.y.formatter)}</span>
          ))}
        </div>
        <div className="chart-plot-area">
          <svg className="chart-svg" viewBox="0 0 320 160" role="img" aria-label={chartSpec.title}>
            {scaleTicks.map((tick) => {
              const y = getPlotY(tick, scaleMax);

              return <line className="chart-grid-line" key={tick} x1="0" x2="320" y1={y} y2={y} />;
            })}
            {threshold && thresholdY !== null ? (
              <>
                <line className="chart-threshold-line" x1="0" x2="320" y1={thresholdY} y2={thresholdY} />
                <text className="chart-threshold-label" x="318" y={Math.max(thresholdY - 6, 10)} textAnchor="end">
                  {threshold.label}
                </text>
              </>
            ) : null}
            {chartSpec.series.map((series, index) => (
              <path
                className="chart-line"
                d={buildLinePath(series, chartSpec, scaleMax)}
                key={series.id}
                stroke={getSeriesColor(index)}
              />
            ))}
          </svg>
          <div className="chart-ticks" style={{ gridTemplateColumns: `repeat(${Math.max(labels.length, 1)}, minmax(0, 1fr))` }}>
            {labels.map((label, index) => (
              <span key={`${label}-${index}`}>{label}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="chart-axis-caption">Y axis: {chartSpec.axes.y.label}</div>
    </div>
  );
}

function renderBarChart(chartSpec: ChartSpec, scaleTicks: number[], scaleMax: number) {
  const previewSeries = chartSpec.series.map((series) => ({
    ...series,
    points: series.points.slice(0, 6),
  }));
  const labels = previewSeries[0]?.points.map((point) => getPointLabel(point, chartSpec.axes.x.field)) ?? [];
  const showValueLabels = previewSeries.length <= 2;

  return (
    <div className="chart-preview chart-preview-bar" aria-label="Chart preview">
      <div className="chart-preview-frame">
        <div className="chart-y-axis" aria-hidden="true">
          {scaleTicks.map((tick) => (
            <span key={tick}>{formatValue(tick, chartSpec.axes.y.formatter)}</span>
          ))}
        </div>
        <div className="chart-plot-area">
          <div className="chart-bars-grid" style={{ gridTemplateColumns: `repeat(${Math.max(labels.length, 1)}, minmax(0, 1fr))` }}>
            {labels.map((label, labelIndex) => (
              <div className="chart-group" key={`${label}-${labelIndex}`}>
                <div className="chart-group-bars">
                  {previewSeries.map((series, seriesIndex) => {
                    const point = series.points[labelIndex];
                    const value = point ? getPointNumber(point, chartSpec.axes.y.field) : 0;

                    return (
                      <div className="chart-bar-column" key={`${series.id}-${labelIndex}`}>
                        {showValueLabels ? <span className="chart-bar-value">{formatValue(value, chartSpec.axes.y.formatter)}</span> : null}
                        <div
                          className="chart-bar"
                          style={{
                            background: getSeriesColor(seriesIndex),
                            height: `${Math.max((value / scaleMax) * 100, 8)}%`,
                          }}
                          title={formatValue(value, chartSpec.axes.y.formatter)}
                        />
                      </div>
                    );
                  })}
                </div>
                <span className="chart-group-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="chart-axis-caption">Y axis: {chartSpec.axes.y.label}</div>
    </div>
  );
}

export function ChartResultCard({ chartSpec }: ChartResultCardProps) {
  const allPreviewPoints = chartSpec.series.flatMap((series) => series.points.slice(0, 8));
  const threshold = getThresholdAnnotation(chartSpec);
  const maxValue = Math.max(
    ...allPreviewPoints.map((point) => getPointNumber(point, chartSpec.axes.y.field)),
    threshold?.value ?? 0,
    1,
  );
  const scaleTicks = buildScaleTicks(maxValue, chartSpec.axes.y.formatter);
  const scaleMax = scaleTicks[0] ?? maxValue;
  const showLinePreview = chartSpec.chartType.includes("line");
  const shouldShowLegend = chartSpec.formattingHints?.showLegend ?? chartSpec.series.length > 1;

  return (
    <section className="artifact-card chart-card">
      <div className="artifact-header">
        <span className="artifact-label">Chart</span>
        <span className="artifact-mode">{chartSpec.chartType}</span>
      </div>
      <h3>{chartSpec.title}</h3>
      {chartSpec.subtitle ? <p className="artifact-subtitle">{chartSpec.subtitle}</p> : null}
      {chartSpec.description ? <p className="artifact-description">{chartSpec.description}</p> : null}
      {showLinePreview ? renderLineChart(chartSpec, scaleTicks, scaleMax) : renderBarChart(chartSpec, scaleTicks, scaleMax)}
      {shouldShowLegend ? (
        <div className="chart-legend" aria-label="Series legend">
          {chartSpec.series.map((series, index) => (
            <div className="chart-legend-item" key={series.id}>
              <span className="chart-legend-swatch" style={{ background: getSeriesColor(index) }} />
              <span>{series.label}</span>
            </div>
          ))}
        </div>
      ) : null}
      <dl className="chart-facts">
        <div>
          <dt>X Axis</dt>
          <dd>{chartSpec.axes.x.label}</dd>
        </div>
        <div>
          <dt>Y Axis</dt>
          <dd>{chartSpec.axes.y.label}</dd>
        </div>
        <div>
          <dt>Series</dt>
          <dd>{chartSpec.series.length}</dd>
        </div>
      </dl>
      {chartSpec.narrativeMeta ? (
        <section className="chart-narrative">
          {chartSpec.narrativeMeta.summary ? <p>{chartSpec.narrativeMeta.summary}</p> : null}
          <div className="chart-metrics">
            {chartSpec.narrativeMeta.highestValue ? (
              <div>
                <span>High</span>
                <strong>
                  {chartSpec.narrativeMeta.highestValue.label}: {formatValue(chartSpec.narrativeMeta.highestValue.value, chartSpec.axes.y.formatter)}
                </strong>
              </div>
            ) : null}
            {chartSpec.narrativeMeta.lowestValue ? (
              <div>
                <span>Low</span>
                <strong>
                  {chartSpec.narrativeMeta.lowestValue.label}: {formatValue(chartSpec.narrativeMeta.lowestValue.value, chartSpec.axes.y.formatter)}
                </strong>
              </div>
            ) : null}
          </div>
          {chartSpec.narrativeMeta.thresholdNotes?.length ? (
            <ul className="chart-notes">
              {chartSpec.narrativeMeta.thresholdNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : null}
      {chartSpec.annotations?.length ? (
        <section className="chart-annotations">
          {chartSpec.annotations.map((annotation, index) => (
            <span className="annotation-chip" key={`${annotation.type}-${annotation.label}-${index}`}>
              {annotation.type}: {annotation.label}
            </span>
          ))}
        </section>
      ) : null}
    </section>
  );
}