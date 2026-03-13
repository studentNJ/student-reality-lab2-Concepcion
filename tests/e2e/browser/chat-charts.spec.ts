import { expect, test } from "@playwright/test";

const chartLeft = 8;
const chartRight = 312;

function buildTrendChart(title: string, values: number[], startYear = 2021) {
  return {
    chartType: "metro_trend_line",
    title,
    subtitle: `${startYear}-${startYear + values.length - 1}`,
    axes: {
      x: { label: "Year", field: "year", type: "time", formatter: "integer" },
      y: { label: "Rent Burden (%)", field: "value", type: "number", formatter: "percent" },
    },
    series: [
      {
        id: title,
        label: title,
        points: values.map((value, index) => ({ year: startYear + index, value })),
      },
    ],
    annotations: [
      {
        type: "threshold",
        label: "Rent Burden (%) threshold",
        field: "value",
        value: 30,
      },
    ],
    formattingHints: {
      showLegend: false,
      showGrid: true,
    },
  };
}

test("renders multiple metro chart cards in the requested order", async ({ page }) => {
  await page.route("**/api/chat", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        message: {
          id: "assistant-multi-chart",
          role: "assistant",
          state: "complete",
          content: "Here are the requested rent burden charts.",
          chartSpecs: [
            buildTrendChart("Chicago-Naperville-Elgin Rent Burden (%) trend", [28.8, 29, 29.2, 29.4, 29.6]),
            buildTrendChart("Washington-Arlington-Alexandria Rent Burden (%) trend", [26.1, 26.4, 26.8, 27.2, 27.5]),
            buildTrendChart("New York-Newark-Jersey City Rent Burden (%) trend", [35.6, 36, 36.4, 36.9, 37.2]),
          ],
          toolCalls: [],
        },
        meta: {
          planner: "fallback",
          intent: "metro_trend_chart",
          conversationId: "conversation-multi-chart",
        },
      }),
    });
  });

  await page.goto("/");
  await page.getByPlaceholder("Ask about metros, affordability scenarios, or request a graph").fill(
    "I want the rent burden charts for Chicago, Washington and Newark.",
  );
  await page.getByRole("button", { name: "Send" }).click();

  const chartTitles = page.locator(".chart-card h3");
  await expect(chartTitles).toHaveCount(3);
  await expect(chartTitles.nth(0)).toContainText("Chicago");
  await expect(chartTitles.nth(1)).toContainText("Washington");
  await expect(chartTitles.nth(2)).toContainText("Newark");
});

test("renders an adaptive y axis for rent burden charts", async ({ page }) => {
  await page.route("**/api/chat", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        message: {
          id: "assistant-axis-chart",
          role: "assistant",
          state: "complete",
          content: "Here is the rent burden chart for Chicago.",
          chartSpec: buildTrendChart("Chicago-Naperville-Elgin Rent Burden (%) trend", [28.77, 29, 29.22, 29.43, 29.63]),
          toolCalls: [],
        },
        meta: {
          planner: "fallback",
          intent: "metro_trend_chart",
          conversationId: "conversation-axis-chart",
        },
      }),
    });
  });

  await page.goto("/");
  await page.getByPlaceholder("Ask about metros, affordability scenarios, or request a graph").fill(
    "Show a rent burden trend chart for Chicago.",
  );
  await page.getByRole("button", { name: "Send" }).click();

  const yAxisTicks = page.locator(".chart-card .chart-y-axis span");
  await expect(yAxisTicks).toHaveCount(5);
  await expect(yAxisTicks.nth(0)).toHaveText("40.0%");
  await expect(yAxisTicks.nth(1)).toHaveText("30.0%");
  await expect(yAxisTicks.nth(2)).toHaveText("20.0%");
  await expect(page.locator(".chart-card .chart-threshold-label")).toContainText("threshold");
});

test("spans the full x axis range for multi-year trend charts", async ({ page }) => {
  await page.route("**/api/chat", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        message: {
          id: "assistant-x-range-chart",
          role: "assistant",
          state: "complete",
          content: "Here is the rent burden chart for New York.",
          chartSpec: buildTrendChart(
            "New York-Newark-Jersey City Rent Burden (%) trend",
            [33.0, 33.4, 33.8, 34.2, 34.7, 35.1, 35.5, 35.9, 36.6, 37.3, 38.1],
            2015,
          ),
          toolCalls: [],
        },
        meta: {
          planner: "fallback",
          intent: "metro_trend_chart",
          conversationId: "conversation-x-range-chart",
        },
      }),
    });
  });

  await page.goto("/");
  await page.getByPlaceholder("Ask about metros, affordability scenarios, or request a graph").fill(
    "Show a rent burden trend chart for New York from 2015 to 2025.",
  );
  await page.getByRole("button", { name: "Send" }).click();

  const linePath = page.locator(".chart-card .chart-line").first();
  const d = await linePath.getAttribute("d");
  const svg = page.locator(".chart-card .chart-svg").first();
  const firstTick = page.locator(".chart-card .chart-ticks .chart-tick").first();
  const lastTick = page.locator(".chart-card .chart-ticks .chart-tick").last();

  expect(d).toBeTruthy();

  const coordinates = Array.from(d?.matchAll(/[ML]([0-9.]+) ([0-9.]+)/g) ?? []).map((match) => Number(match[1]));
  const [pathBox, svgBox, firstTickBox, lastTickBox] = await Promise.all([
    linePath.boundingBox(),
    svg.boundingBox(),
    firstTick.boundingBox(),
    lastTick.boundingBox(),
  ]);

  expect(coordinates[0]).toBeLessThan(15);
  expect(coordinates[coordinates.length - 1]).toBeGreaterThan(305);
  expect(pathBox).toBeTruthy();
  expect(svgBox).toBeTruthy();
  expect(firstTickBox).toBeTruthy();
  expect(lastTickBox).toBeTruthy();
  expect((pathBox?.width ?? 0) / (svgBox?.width ?? 1)).toBeGreaterThan(0.9);
  const plotLeft = (svgBox?.x ?? 0) + ((svgBox?.width ?? 0) * chartLeft) / 320;
  const plotRight = (svgBox?.x ?? 0) + ((svgBox?.width ?? 0) * chartRight) / 320;

  expect(Math.abs((firstTickBox?.x ?? 0) - plotLeft)).toBeLessThan(20);
  expect(Math.abs(((lastTickBox?.x ?? 0) + (lastTickBox?.width ?? 0)) - plotRight)).toBeLessThan(20);

  const xAxisTicks = page.locator(".chart-card .chart-ticks span");
  await expect(xAxisTicks.first()).toHaveText("2015");
  await expect(xAxisTicks.last()).toHaveText("2025");
});