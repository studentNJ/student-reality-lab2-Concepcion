import { expect, test } from "@playwright/test";

function buildTrendChart(title: string, values: number[]) {
  return {
    chartType: "metro_trend_line",
    title,
    subtitle: "2021-2025",
    axes: {
      x: { label: "Year", field: "year", type: "time", formatter: "integer" },
      y: { label: "Rent Burden (%)", field: "value", type: "number", formatter: "percent" },
    },
    series: [
      {
        id: title,
        label: title,
        points: values.map((value, index) => ({ year: 2021 + index, value })),
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