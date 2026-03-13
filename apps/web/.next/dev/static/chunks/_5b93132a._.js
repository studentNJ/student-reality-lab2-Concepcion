(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/web/src/features/chat/components/ChartResultCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChartResultCard",
    ()=>ChartResultCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const seriesColors = [
    "#b5523d",
    "#0f766e",
    "#c68b2c",
    "#5f6caf"
];
const chartLeft = 8;
const chartRight = 312;
const chartWidth = chartRight - chartLeft;
const chartTop = 20;
const chartBottom = 140;
const chartHeight = chartBottom - chartTop;
function getPointNumber(point, field) {
    const value = point[field];
    return typeof value === "number" ? value : 0;
}
function getPointLabel(point, field) {
    const value = point[field];
    if (typeof value === "string" || typeof value === "number") {
        return String(value);
    }
    return "n/a";
}
function getPointAxisValue(point, field) {
    const value = point[field];
    if (typeof value === "string" || typeof value === "number") {
        return value;
    }
    return null;
}
function formatValue(value, formatter) {
    if (formatter === "currency_usd") {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0
        }).format(value);
    }
    if (formatter === "percent") {
        return `${value.toFixed(1)}%`;
    }
    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 1
    }).format(value);
}
function getSeriesColor(index) {
    return seriesColors[index % seriesColors.length];
}
function roundScaleValue(value) {
    return Number(value.toFixed(1));
}
function getNiceStep(value) {
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
function buildScaleTicks(maxValue, formatter) {
    const paddedMax = Math.max(maxValue * 1.1, 1);
    const desiredTickCount = formatter === "percent" ? 5 : 4;
    const step = getNiceStep(paddedMax / (desiredTickCount - 1));
    const roundedMax = Math.ceil(paddedMax / step) * step;
    const tickCount = Math.max(Math.round(roundedMax / step), 1);
    return Array.from({
        length: tickCount + 1
    }, (_, index)=>roundScaleValue(roundedMax - index * step));
}
function getThresholdAnnotation(chartSpec) {
    const annotation = chartSpec.annotations?.find((item)=>item.type === "threshold" && typeof item.value === "number");
    if (!annotation || typeof annotation.value !== "number") {
        return null;
    }
    return {
        label: annotation.label,
        value: annotation.value
    };
}
function getPlotY(value, scaleMax) {
    return Math.max(chartBottom - value / scaleMax * chartHeight, 8);
}
function buildXDomain(chartSpec, seriesCollection) {
    const rawValues = seriesCollection.flatMap((series)=>series.points.map((point)=>getPointAxisValue(point, chartSpec.axes.x.field)));
    const definedValues = rawValues.filter((value)=>value !== null);
    if (chartSpec.axes.x.type === "time" || chartSpec.axes.x.type === "number") {
        const numericValues = definedValues.map((value)=>typeof value === "number" ? value : Number(value)).filter((value)=>Number.isFinite(value));
        const uniqueValues = Array.from(new Set(numericValues)).sort((left, right)=>left - right);
        return {
            values: uniqueValues,
            keyToIndex: new Map(uniqueValues.map((value, index)=>[
                    String(value),
                    index
                ])),
            minNumber: uniqueValues[0] ?? null,
            maxNumber: uniqueValues[uniqueValues.length - 1] ?? null
        };
    }
    const uniqueValues = Array.from(new Set(definedValues.map((value)=>String(value))));
    return {
        values: uniqueValues,
        keyToIndex: new Map(uniqueValues.map((value, index)=>[
                String(value),
                index
            ])),
        minNumber: null,
        maxNumber: null
    };
}
function buildXTicks(domain, maxTickCount = 8) {
    if (domain.values.length <= maxTickCount) {
        return domain.values;
    }
    const tickIndexes = [];
    const lastIndex = domain.values.length - 1;
    const step = Math.max(1, Math.ceil(lastIndex / (maxTickCount - 1)));
    for(let index = 0; index <= lastIndex; index += step){
        tickIndexes.push(index);
    }
    if (tickIndexes[tickIndexes.length - 1] !== lastIndex) {
        tickIndexes.push(lastIndex);
    }
    return tickIndexes.map((index)=>domain.values[index]).filter((value)=>value !== undefined);
}
function getPlotX(point, chartSpec, xDomain) {
    const rawValue = getPointAxisValue(point, chartSpec.axes.x.field);
    return getPlotXForValue(rawValue, chartSpec, xDomain);
}
function getPlotXForValue(rawValue, chartSpec, xDomain) {
    if (rawValue === null) {
        return chartLeft;
    }
    if ((chartSpec.axes.x.type === "time" || chartSpec.axes.x.type === "number") && xDomain.minNumber !== null && xDomain.maxNumber !== null) {
        const numericValue = typeof rawValue === "number" ? rawValue : Number(rawValue);
        if (!Number.isFinite(numericValue) || xDomain.maxNumber === xDomain.minNumber) {
            return (chartLeft + chartRight) / 2;
        }
        return chartLeft + (numericValue - xDomain.minNumber) / (xDomain.maxNumber - xDomain.minNumber) * chartWidth;
    }
    const index = xDomain.keyToIndex.get(String(rawValue)) ?? 0;
    if (xDomain.values.length <= 1) {
        return (chartLeft + chartRight) / 2;
    }
    return chartLeft + index / (xDomain.values.length - 1) * chartWidth;
}
function buildLinePath(series, chartSpec, xDomain, scaleMax) {
    const previewPoints = series.points;
    return previewPoints.map((point, pointIndex)=>{
        const x = getPlotX(point, chartSpec, xDomain);
        const rawValue = getPointNumber(point, chartSpec.axes.y.field);
        const y = getPlotY(rawValue, scaleMax);
        const command = pointIndex === 0 ? "M" : "L";
        return `${command}${x.toFixed(2)} ${Math.max(y, 8).toFixed(2)}`;
    }).join(" ");
}
function renderLineChart(chartSpec, scaleTicks, scaleMax) {
    const xDomain = buildXDomain(chartSpec, chartSpec.series);
    const xTicks = buildXTicks(xDomain).map((value, index, values)=>({
            value,
            label: String(value),
            left: `${getPlotXForValue(value, chartSpec, xDomain) / 320 * 100}%`,
            align: index === 0 ? "start" : index === values.length - 1 ? "end" : "center"
        }));
    const threshold = getThresholdAnnotation(chartSpec);
    const thresholdY = threshold ? getPlotY(threshold.value, scaleMax) : null;
    const thresholdLabelOffset = thresholdY !== null ? `${thresholdY / 160 * 100}%` : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "chart-preview chart-preview-line",
        "aria-label": "Chart preview",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "chart-preview-frame",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "chart-y-axis",
                        "aria-hidden": "true",
                        children: scaleTicks.map((tick)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: formatValue(tick, chartSpec.axes.y.formatter)
                            }, tick, false, {
                                fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                                lineNumber: 244,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                        lineNumber: 242,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "chart-plot-area",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "chart-svg-shell",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "chart-svg",
                                        viewBox: "0 0 320 160",
                                        preserveAspectRatio: "none",
                                        role: "img",
                                        "aria-label": chartSpec.title,
                                        children: [
                                            scaleTicks.map((tick)=>{
                                                const y = getPlotY(tick, scaleMax);
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                    className: "chart-grid-line",
                                                    x1: "0",
                                                    x2: "320",
                                                    y1: y,
                                                    y2: y
                                                }, tick, false, {
                                                    fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                                                    lineNumber: 253,
                                                    columnNumber: 24
                                                }, this);
                                            }),
                                            threshold && thresholdY !== null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                className: "chart-threshold-line",
                                                x1: "0",
                                                x2: "320",
                                                y1: thresholdY,
                                                y2: thresholdY
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                                                lineNumber: 256,
                                                columnNumber: 17
                                            }, this) : null,
                                            chartSpec.series.map((series, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    className: "chart-line",
                                                    d: buildLinePath(series, chartSpec, xDomain, scaleMax),
                                                    stroke: getSeriesColor(index)
                                                }, series.id, false, {
                                                    fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                                                    lineNumber: 259,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                                        lineNumber: 249,
                                        columnNumber: 13
                                    }, this),
                                    threshold && thresholdLabelOffset ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "chart-threshold-label",
                                        style: {
                                            top: `max(calc(${thresholdLabelOffset} - 0.95rem), 0.35rem)`
                                        },
                                        children: threshold.label
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                                        lineNumber: 268,
                                        columnNumber: 15
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                                lineNumber: 248,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "chart-ticks",
                                children: xTicks.map((tick, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `chart-tick chart-tick-${tick.align}`,
                                        style: {
                                            left: tick.left
                                        },
                                        children: tick.label
                                    }, `${tick.label}-${index}`, false, {
                                        fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                                        lineNumber: 275,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                                lineNumber: 273,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                        lineNumber: 247,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                lineNumber: 241,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "chart-axis-caption",
                children: [
                    "Y axis: ",
                    chartSpec.axes.y.label
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                lineNumber: 286,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
        lineNumber: 240,
        columnNumber: 5
    }, this);
}
function renderBarChart(chartSpec, scaleTicks, scaleMax) {
    const previewSeries = chartSpec.series.map((series)=>({
            ...series,
            points: series.points.slice(0, 6)
        }));
    const labels = previewSeries[0]?.points.map((point)=>getPointLabel(point, chartSpec.axes.x.field)) ?? [];
    const showValueLabels = previewSeries.length <= 2;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "chart-preview chart-preview-bar",
        "aria-label": "Chart preview",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "chart-preview-frame",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "chart-y-axis",
                        "aria-hidden": "true",
                        children: scaleTicks.map((tick)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: formatValue(tick, chartSpec.axes.y.formatter)
                            }, tick, false, {
                                fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                                lineNumber: 304,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                        lineNumber: 302,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "chart-plot-area",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "chart-bars-grid",
                            style: {
                                gridTemplateColumns: `repeat(${Math.max(labels.length, 1)}, minmax(0, 1fr))`
                            },
                            children: labels.map((label, labelIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "chart-group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "chart-group-bars",
                                            children: previewSeries.map((series, seriesIndex)=>{
                                                const point = series.points[labelIndex];
                                                const value = point ? getPointNumber(point, chartSpec.axes.y.field) : 0;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "chart-bar-column",
                                                    children: [
                                                        showValueLabels ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "chart-bar-value",
                                                            children: formatValue(value, chartSpec.axes.y.formatter)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                                                            lineNumber: 318,
                                                            columnNumber: 44
                                                        }, this) : null,
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "chart-bar",
                                                            style: {
                                                                background: getSeriesColor(seriesIndex),
                                                                height: `${Math.max(value / scaleMax * 100, 8)}%`
                                                            },
                                                            title: formatValue(value, chartSpec.axes.y.formatter)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                                                            lineNumber: 319,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, `${series.id}-${labelIndex}`, true, {
                                                    fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                                                    lineNumber: 317,
                                                    columnNumber: 23
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                                            lineNumber: 311,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "chart-group-label",
                                            children: label
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                                            lineNumber: 331,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, `${label}-${labelIndex}`, true, {
                                    fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                                    lineNumber: 310,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                            lineNumber: 308,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                        lineNumber: 307,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                lineNumber: 301,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "chart-axis-caption",
                children: [
                    "Y axis: ",
                    chartSpec.axes.y.label
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                lineNumber: 337,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
        lineNumber: 300,
        columnNumber: 5
    }, this);
}
function ChartResultCard({ chartSpec }) {
    const allPreviewPoints = chartSpec.series.flatMap((series)=>series.points.slice(0, 8));
    const threshold = getThresholdAnnotation(chartSpec);
    const maxValue = Math.max(...allPreviewPoints.map((point)=>getPointNumber(point, chartSpec.axes.y.field)), threshold?.value ?? 0, 1);
    const scaleTicks = buildScaleTicks(maxValue, chartSpec.axes.y.formatter);
    const scaleMax = scaleTicks[0] ?? maxValue;
    const showLinePreview = chartSpec.chartType.includes("line");
    const shouldShowLegend = chartSpec.formattingHints?.showLegend ?? chartSpec.series.length > 1;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "artifact-card chart-card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "artifact-header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "artifact-label",
                        children: "Chart"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                        lineNumber: 358,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "artifact-mode",
                        children: chartSpec.chartType
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                        lineNumber: 359,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                lineNumber: 357,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                children: chartSpec.title
            }, void 0, false, {
                fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                lineNumber: 361,
                columnNumber: 7
            }, this),
            chartSpec.subtitle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "artifact-subtitle",
                children: chartSpec.subtitle
            }, void 0, false, {
                fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                lineNumber: 362,
                columnNumber: 29
            }, this) : null,
            chartSpec.description ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "artifact-description",
                children: chartSpec.description
            }, void 0, false, {
                fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                lineNumber: 363,
                columnNumber: 32
            }, this) : null,
            showLinePreview ? renderLineChart(chartSpec, scaleTicks, scaleMax) : renderBarChart(chartSpec, scaleTicks, scaleMax),
            shouldShowLegend ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "chart-legend",
                "aria-label": "Series legend",
                children: chartSpec.series.map((series, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "chart-legend-item",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "chart-legend-swatch",
                                style: {
                                    background: getSeriesColor(index)
                                }
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                                lineNumber: 369,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: series.label
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                                lineNumber: 370,
                                columnNumber: 15
                            }, this)
                        ]
                    }, series.id, true, {
                        fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                        lineNumber: 368,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                lineNumber: 366,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                className: "chart-facts",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                children: "X Axis"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                                lineNumber: 377,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                children: chartSpec.axes.x.label
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                                lineNumber: 378,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                        lineNumber: 376,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                children: "Y Axis"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                                lineNumber: 381,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                children: chartSpec.axes.y.label
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                                lineNumber: 382,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                        lineNumber: 380,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                children: "Series"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                                lineNumber: 385,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                children: chartSpec.series.length
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                                lineNumber: 386,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                        lineNumber: 384,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                lineNumber: 375,
                columnNumber: 7
            }, this),
            chartSpec.narrativeMeta ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "chart-narrative",
                children: [
                    chartSpec.narrativeMeta.summary ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: chartSpec.narrativeMeta.summary
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                        lineNumber: 391,
                        columnNumber: 46
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "chart-metrics",
                        children: [
                            chartSpec.narrativeMeta.highestValue ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "High"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                                        lineNumber: 395,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: [
                                            chartSpec.narrativeMeta.highestValue.label,
                                            ": ",
                                            formatValue(chartSpec.narrativeMeta.highestValue.value, chartSpec.axes.y.formatter)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                                        lineNumber: 396,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                                lineNumber: 394,
                                columnNumber: 15
                            }, this) : null,
                            chartSpec.narrativeMeta.lowestValue ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Low"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                                        lineNumber: 403,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: [
                                            chartSpec.narrativeMeta.lowestValue.label,
                                            ": ",
                                            formatValue(chartSpec.narrativeMeta.lowestValue.value, chartSpec.axes.y.formatter)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                                        lineNumber: 404,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                                lineNumber: 402,
                                columnNumber: 15
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                        lineNumber: 392,
                        columnNumber: 11
                    }, this),
                    chartSpec.narrativeMeta.thresholdNotes?.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "chart-notes",
                        children: chartSpec.narrativeMeta.thresholdNotes.map((note)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: note
                            }, note, false, {
                                fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                                lineNumber: 413,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                        lineNumber: 411,
                        columnNumber: 13
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                lineNumber: 390,
                columnNumber: 9
            }, this) : null,
            chartSpec.annotations?.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "chart-annotations",
                children: chartSpec.annotations.map((annotation, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "annotation-chip",
                        children: [
                            annotation.type,
                            ": ",
                            annotation.label
                        ]
                    }, `${annotation.type}-${annotation.label}-${index}`, true, {
                        fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                        lineNumber: 422,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
                lineNumber: 420,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/features/chat/components/ChartResultCard.tsx",
        lineNumber: 356,
        columnNumber: 5
    }, this);
}
_c = ChartResultCard;
var _c;
__turbopack_context__.k.register(_c, "ChartResultCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/features/chat/components/MessageBubble.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MessageBubble",
    ()=>MessageBubble
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function MessageBubble({ message }) {
    const isLoading = message.state === "loading";
    const isError = message.state === "error";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: message.role === "user" ? "message message-user" : `message message-assistant${isLoading ? " message-loading" : ""}${isError ? " message-error" : ""}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "message-meta",
                children: [
                    message.role === "user" ? "You" : "Assistant",
                    isLoading ? " • Working" : null,
                    isError ? " • Needs attention" : null
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/features/chat/components/MessageBubble.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "loading-block",
                children: [
                    message.content ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "message-content loading-copy",
                        children: message.content
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/features/chat/components/MessageBubble.tsx",
                        lineNumber: 26,
                        columnNumber: 30
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "typing-indicator",
                        "aria-label": "Assistant is responding",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                fileName: "[project]/apps/web/src/features/chat/components/MessageBubble.tsx",
                                lineNumber: 28,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                fileName: "[project]/apps/web/src/features/chat/components/MessageBubble.tsx",
                                lineNumber: 29,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                fileName: "[project]/apps/web/src/features/chat/components/MessageBubble.tsx",
                                lineNumber: 30,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/features/chat/components/MessageBubble.tsx",
                        lineNumber: 27,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/features/chat/components/MessageBubble.tsx",
                lineNumber: 25,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "message-content",
                children: message.content
            }, void 0, false, {
                fileName: "[project]/apps/web/src/features/chat/components/MessageBubble.tsx",
                lineNumber: 34,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/features/chat/components/MessageBubble.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_c = MessageBubble;
var _c;
__turbopack_context__.k.register(_c, "MessageBubble");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/features/chat/components/ToolCallCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToolCallCard",
    ()=>ToolCallCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function ToolCallCard({ toolCall }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "artifact-card tool-card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "artifact-header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "artifact-label",
                        children: "Tool"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/features/chat/components/ToolCallCard.tsx",
                        lineNumber: 11,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `status-chip status-${toolCall.status}`,
                        children: toolCall.status
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/features/chat/components/ToolCallCard.tsx",
                        lineNumber: 12,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/features/chat/components/ToolCallCard.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                children: toolCall.toolName
            }, void 0, false, {
                fileName: "[project]/apps/web/src/features/chat/components/ToolCallCard.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: toolCall.summary
            }, void 0, false, {
                fileName: "[project]/apps/web/src/features/chat/components/ToolCallCard.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            toolCall.input ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                className: "artifact-pre",
                children: JSON.stringify(toolCall.input, null, 2)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/features/chat/components/ToolCallCard.tsx",
                lineNumber: 17,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/features/chat/components/ToolCallCard.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = ToolCallCard;
var _c;
__turbopack_context__.k.register(_c, "ToolCallCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/features/chat/components/MessageList.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MessageList",
    ()=>MessageList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$features$2f$chat$2f$components$2f$ChartResultCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/features/chat/components/ChartResultCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$features$2f$chat$2f$components$2f$MessageBubble$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/features/chat/components/MessageBubble.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$features$2f$chat$2f$components$2f$ToolCallCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/features/chat/components/ToolCallCard.tsx [app-client] (ecmascript)");
;
;
;
;
function MessageList({ messages }) {
    if (messages.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "message-list",
            "aria-label": "Conversation",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "empty-state",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "empty-state-eyebrow",
                        children: "Conversation"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/features/chat/components/MessageList.tsx",
                        lineNumber: 15,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Start with a metro, a scenario, or a chart request."
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/features/chat/components/MessageList.tsx",
                        lineNumber: 16,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "The Phase 5 interface is ready to display assistant text, tool results, and chart specs in one stream."
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/features/chat/components/MessageList.tsx",
                        lineNumber: 17,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/features/chat/components/MessageList.tsx",
                lineNumber: 14,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/src/features/chat/components/MessageList.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "message-list",
        "aria-label": "Conversation",
        children: messages.map((message)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "message-stack",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$features$2f$chat$2f$components$2f$MessageBubble$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MessageBubble"], {
                        message: message
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/features/chat/components/MessageList.tsx",
                        lineNumber: 27,
                        columnNumber: 11
                    }, this),
                    (message.toolCalls ?? (message.toolCall ? [
                        message.toolCall
                    ] : [])).map((toolCall, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$features$2f$chat$2f$components$2f$ToolCallCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToolCallCard"], {
                            toolCall: toolCall
                        }, `${message.id}-${toolCall.toolName}-${index}`, false, {
                            fileName: "[project]/apps/web/src/features/chat/components/MessageList.tsx",
                            lineNumber: 29,
                            columnNumber: 13
                        }, this)),
                    (message.chartSpecs ?? (message.chartSpec ? [
                        message.chartSpec
                    ] : [])).map((chartSpec, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$features$2f$chat$2f$components$2f$ChartResultCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChartResultCard"], {
                            chartSpec: chartSpec
                        }, `${message.id}-chart-${chartSpec.title}-${index}`, false, {
                            fileName: "[project]/apps/web/src/features/chat/components/MessageList.tsx",
                            lineNumber: 32,
                            columnNumber: 13
                        }, this))
                ]
            }, message.id, true, {
                fileName: "[project]/apps/web/src/features/chat/components/MessageList.tsx",
                lineNumber: 26,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/apps/web/src/features/chat/components/MessageList.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_c = MessageList;
var _c;
__turbopack_context__.k.register(_c, "MessageList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/features/chat/components/PromptBox.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PromptBox",
    ()=>PromptBox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function PromptBox({ disabled = false, onSubmit, suggestions = [] }) {
    _s();
    const [prompt, setPrompt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    function submitPrompt() {
        const trimmed = prompt.trim();
        if (!trimmed || disabled) {
            return;
        }
        onSubmit(trimmed);
        setPrompt("");
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "prompt-box-shell",
        children: [
            suggestions.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "prompt-suggestions",
                "aria-label": "Starter prompts",
                children: suggestions.map((suggestion)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "suggestion-chip",
                        disabled: disabled,
                        onClick: ()=>onSubmit(suggestion),
                        type: "button",
                        children: suggestion
                    }, suggestion, false, {
                        fileName: "[project]/apps/web/src/features/chat/components/PromptBox.tsx",
                        lineNumber: 30,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/web/src/features/chat/components/PromptBox.tsx",
                lineNumber: 28,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                className: "prompt-box",
                disabled: disabled,
                onChange: (event)=>setPrompt(event.target.value),
                onKeyDown: (event)=>{
                    if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        submitPrompt();
                    }
                },
                placeholder: "Ask about metros, affordability scenarios, or request a graph",
                rows: 4,
                value: prompt
            }, void 0, false, {
                fileName: "[project]/apps/web/src/features/chat/components/PromptBox.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "prompt-actions",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: disabled ? "Assistant is preparing the next response." : "Shift+Enter for a new line. Enter to send."
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/features/chat/components/PromptBox.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "send-button",
                        disabled: disabled || prompt.trim().length === 0,
                        onClick: submitPrompt,
                        type: "button",
                        children: "Send"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/features/chat/components/PromptBox.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/features/chat/components/PromptBox.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/features/chat/components/PromptBox.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_s(PromptBox, "aktPPfsqt7fI0SQCfTqjxGF+A+w=");
_c = PromptBox;
var _c;
__turbopack_context__.k.register(_c, "PromptBox");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/features/chat/components/ChatShell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatShell",
    ()=>ChatShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$features$2f$chat$2f$components$2f$MessageList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/features/chat/components/MessageList.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$features$2f$chat$2f$components$2f$PromptBox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/features/chat/components/PromptBox.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const starterPrompts = [
    "Show a rent burden trend chart for Chicago.",
    "Compare metro affordability for 2024.",
    "Estimate whether a $72,000 salary can afford rent.",
    "What data source is the app using right now?"
];
const initialMessages = [
    {
        id: "assistant-intro",
        role: "assistant",
        state: "complete",
        content: "Ask for a metro trend, a snapshot comparison, an affordability estimate, or the current data source status."
    }
];
function buildPendingContent(prompt) {
    const normalizedPrompt = prompt.toLowerCase();
    if (normalizedPrompt.includes("chart") || normalizedPrompt.includes("trend") || normalizedPrompt.includes("graph")) {
        return "Building the chart request, running the needed tools, and formatting the result.";
    }
    if (normalizedPrompt.includes("afford") || normalizedPrompt.includes("salary") || normalizedPrompt.includes("income")) {
        return "Calculating the affordability scenario and checking the requested metro context.";
    }
    if (normalizedPrompt.includes("source") || normalizedPrompt.includes("dataset") || normalizedPrompt.includes("status")) {
        return "Checking the current data source status and packaging the response.";
    }
    return "Planning the request and gathering the tool output needed for the answer.";
}
function ChatShell() {
    _s();
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialMessages);
    const [isPending, setIsPending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pendingContent, setPendingContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [conversationId, setConversationId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [plannerMode, setPlannerMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("live-api");
    const pendingMessage = {
        id: "assistant-pending",
        role: "assistant",
        state: "loading",
        content: pendingContent
    };
    const visibleMessages = isPending ? [
        ...messages,
        pendingMessage
    ] : messages;
    const successfulToolCalls = messages.reduce((count, message)=>{
        const toolCalls = message.toolCalls ?? (message.toolCall ? [
            message.toolCall
        ] : []);
        return count + toolCalls.filter((toolCall)=>toolCall.status === "success").length;
    }, 0);
    const chartCount = messages.reduce((count, message)=>{
        return count + (message.chartSpecs?.length ?? (message.chartSpec ? 1 : 0));
    }, 0);
    const hasErrors = messages.some((message)=>{
        const toolCalls = message.toolCalls ?? (message.toolCall ? [
            message.toolCall
        ] : []);
        return message.state === "error" || toolCalls.some((toolCall)=>toolCall.status === "error");
    });
    async function handleSubmit(prompt) {
        const userMessage = {
            id: `user-${crypto.randomUUID()}`,
            role: "user",
            state: "complete",
            content: prompt
        };
        setMessages((currentMessages)=>[
                ...currentMessages,
                userMessage
            ]);
        setIsPending(true);
        setPendingContent(buildPendingContent(prompt));
        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    conversationId,
                    prompt,
                    history: messages.map((message)=>({
                            role: message.role,
                            content: message.content
                        }))
                })
            });
            const payload = await response.json();
            const assistantMessage = payload.message ?? {
                id: `assistant-${crypto.randomUUID()}`,
                role: "assistant",
                state: "error",
                content: "The chat API returned an unexpected response."
            };
            if (!response.ok && assistantMessage.state !== "error") {
                assistantMessage.state = "error";
            }
            setMessages((currentMessages)=>[
                    ...currentMessages,
                    assistantMessage
                ]);
            setConversationId((currentConversationId)=>payload.meta?.conversationId ?? currentConversationId);
            setPlannerMode(payload.meta?.planner ?? "fallback");
        } catch  {
            setMessages((currentMessages)=>[
                    ...currentMessages,
                    {
                        id: `assistant-${crypto.randomUUID()}`,
                        role: "assistant",
                        state: "error",
                        content: "The chat request failed before a response was returned."
                    }
                ]);
            setPlannerMode("fallback");
        } finally{
            setIsPending(false);
            setPendingContent("");
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "chat-shell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "hero-panel",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "eyebrow",
                        children: "Student Reality Lab v2"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/features/chat/components/ChatShell.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: "Chat-first housing analysis with tool and chart results inline."
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/features/chat/components/ChatShell.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "hero-copy",
                        children: "The UI is now structured around assistant messages, MCP tool cards, and graph specs so Phase 6 can plug in orchestration without changing the presentation contract."
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/features/chat/components/ChatShell.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "system-strip",
                        "aria-label": "Conversation status",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "system-stat",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Mode"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/features/chat/components/ChatShell.tsx",
                                        lineNumber: 140,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: plannerMode === "live-api" ? "Live API" : plannerMode === "model" ? "Model plan" : "Fallback plan"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/features/chat/components/ChatShell.tsx",
                                        lineNumber: 141,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/features/chat/components/ChatShell.tsx",
                                lineNumber: 139,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "system-stat",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Tool cards"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/features/chat/components/ChatShell.tsx",
                                        lineNumber: 144,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: successfulToolCalls
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/features/chat/components/ChatShell.tsx",
                                        lineNumber: 145,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/features/chat/components/ChatShell.tsx",
                                lineNumber: 143,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "system-stat",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Charts"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/features/chat/components/ChatShell.tsx",
                                        lineNumber: 148,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: chartCount
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/features/chat/components/ChatShell.tsx",
                                        lineNumber: 149,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/features/chat/components/ChatShell.tsx",
                                lineNumber: 147,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `system-stat ${hasErrors ? "system-stat-warning" : "system-stat-ok"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Status"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/features/chat/components/ChatShell.tsx",
                                        lineNumber: 152,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: hasErrors ? "Needs review" : isPending ? "Working" : "Ready"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/features/chat/components/ChatShell.tsx",
                                        lineNumber: 153,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/features/chat/components/ChatShell.tsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/features/chat/components/ChatShell.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/features/chat/components/ChatShell.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "workspace-panel",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$features$2f$chat$2f$components$2f$MessageList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MessageList"], {
                        messages: visibleMessages
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/features/chat/components/ChatShell.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$features$2f$chat$2f$components$2f$PromptBox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PromptBox"], {
                        disabled: isPending,
                        onSubmit: handleSubmit,
                        suggestions: starterPrompts
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/features/chat/components/ChatShell.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/features/chat/components/ChatShell.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/features/chat/components/ChatShell.tsx",
        lineNumber: 131,
        columnNumber: 5
    }, this);
}
_s(ChatShell, "/xXjDakyb6sqk5Qu833MszLk8F8=");
_c = ChatShell;
var _c;
__turbopack_context__.k.register(_c, "ChatShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=_5b93132a._.js.map