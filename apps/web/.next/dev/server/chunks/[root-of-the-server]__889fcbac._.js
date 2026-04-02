module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[externals]/node:url [external] (node:url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:url", () => require("node:url"));

module.exports = mod;
}),
"[project]/packages/db/src/client.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPrismaClient",
    ()=>getPrismaClient
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:url [external] (node:url, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
const __TURBOPACK__import$2e$meta__ = {
    get url () {
        return `file://${__turbopack_context__.P("packages/db/src/client.ts")}`;
    }
};
;
;
;
function resolveWorkspaceRoot() {
    const currentDirectory = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].dirname((0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__["fileURLToPath"])(__TURBOPACK__import$2e$meta__.url));
    return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].resolve(currentDirectory, "..", "..", "..");
}
function ensureDatabaseUrl() {
    if (process.env.DATABASE_URL) {
        return;
    }
    const databasePath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(resolveWorkspaceRoot(), "packages", "db", "prisma", "dev.db");
    process.env.DATABASE_URL = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__["pathToFileURL"])(databasePath).href;
}
ensureDatabaseUrl();
function getPrismaClient() {
    if (!globalThis.__studentRealityLabPrisma) {
        globalThis.__studentRealityLabPrisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]();
    }
    return globalThis.__studentRealityLabPrisma;
}
}),
"[project]/packages/db/src/persistence/retrieve-conversation-history.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "retrieveConversationHistory",
    ()=>retrieveConversationHistory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/src/client.ts [app-route] (ecmascript)");
;
function parseToolInput(input) {
    if (!input) {
        return undefined;
    }
    try {
        const parsed = JSON.parse(input);
        return typeof parsed === "object" && parsed !== null ? parsed : undefined;
    } catch  {
        return undefined;
    }
}
async function retrieveConversationHistory(input) {
    const prisma = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPrismaClient"])();
    const conversation = await prisma.conversation.findUnique({
        where: {
            id: input.conversationId
        },
        select: {
            id: true
        }
    });
    if (!conversation) {
        return null;
    }
    const records = await prisma.message.findMany({
        where: {
            conversationId: input.conversationId
        },
        orderBy: {
            sequence: "asc"
        },
        include: {
            toolCalls: {
                orderBy: {
                    sequence: "asc"
                }
            }
        }
    });
    const slicedRecords = input.limit ? records.slice(-input.limit) : records;
    return {
        conversationId: input.conversationId,
        totalMessages: records.length,
        messages: slicedRecords.map((record)=>({
                id: record.id,
                role: record.role === "assistant" ? "assistant" : "user",
                state: record.state ?? undefined,
                content: record.content,
                planner: record.planner ?? undefined,
                intent: record.intent ?? undefined,
                hasChartSpec: record.chartSpec !== null,
                createdAt: record.createdAt.toISOString(),
                toolCalls: input.includeToolCalls ? record.toolCalls.map((toolCall)=>({
                        toolName: toolCall.toolName,
                        status: toolCall.status === "error" ? "error" : toolCall.status === "pending" ? "pending" : "success",
                        summary: toolCall.summary,
                        input: parseToolInput(toolCall.input)
                    })) : undefined
            }))
    };
}
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/packages/db/src/persistence/save-chat-turn.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "saveChatTurn",
    ()=>saveChatTurn
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/src/client.ts [app-route] (ecmascript)");
;
;
function serializeToolInput(input) {
    return input ? JSON.stringify(input) : null;
}
function serializeChartSpec(message) {
    if (message.chartSpecs && message.chartSpecs.length > 0) {
        return JSON.stringify(message.chartSpecs);
    }
    return message.chartSpec ? JSON.stringify(message.chartSpec) : null;
}
async function saveChatTurn(input) {
    const prisma = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPrismaClient"])();
    const conversationId = input.conversationId ?? (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["randomUUID"])();
    await prisma.$transaction(async (transaction)=>{
        const existingConversation = await transaction.conversation.findUnique({
            where: {
                id: conversationId
            },
            select: {
                id: true
            }
        });
        if (!existingConversation) {
            await transaction.conversation.create({
                data: {
                    id: conversationId
                }
            });
        } else {
            await transaction.conversation.update({
                where: {
                    id: conversationId
                },
                data: {
                    updatedAt: new Date()
                }
            });
        }
        const messageCount = await transaction.message.count({
            where: {
                conversationId
            }
        });
        const userMessageId = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["randomUUID"])();
        const assistantMessageId = input.assistantMessage.id || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["randomUUID"])();
        await transaction.message.create({
            data: {
                id: userMessageId,
                conversationId,
                role: "user",
                state: "complete",
                content: input.userPrompt,
                sequence: messageCount
            }
        });
        await transaction.message.create({
            data: {
                id: assistantMessageId,
                conversationId,
                role: input.assistantMessage.role,
                state: input.assistantMessage.state ?? "complete",
                content: input.assistantMessage.content,
                planner: input.planner,
                intent: input.intent,
                chartSpec: serializeChartSpec(input.assistantMessage),
                sequence: messageCount + 1
            }
        });
        const toolCalls = input.assistantMessage.toolCalls ?? (input.assistantMessage.toolCall ? [
            input.assistantMessage.toolCall
        ] : []);
        if (toolCalls.length > 0) {
            await transaction.toolCall.createMany({
                data: toolCalls.map((toolCall, index)=>({
                        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["randomUUID"])(),
                        messageId: assistantMessageId,
                        toolName: toolCall.toolName,
                        status: toolCall.status,
                        summary: toolCall.summary,
                        input: serializeToolInput(toolCall.input),
                        sequence: index
                    }))
            });
        }
    });
    return {
        conversationId
    };
}
}),
"[project]/packages/db/src/index.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/src/client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$persistence$2f$retrieve$2d$conversation$2d$history$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/src/persistence/retrieve-conversation-history.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$persistence$2f$save$2d$chat$2d$turn$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/src/persistence/save-chat-turn.ts [app-route] (ecmascript)");
;
;
;
}),
"[externals]/node:fs [external] (node:fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs", () => require("node:fs"));

module.exports = mod;
}),
"[externals]/node:process [external] (node:process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:process", () => require("node:process"));

module.exports = mod;
}),
"[project]/packages/domain/src/affordability/classify-risk.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "classifyRisk",
    ()=>classifyRisk
]);
function classifyRisk(rentBurdenPercent) {
    if (rentBurdenPercent < 25) {
        return "Safe";
    }
    if (rentBurdenPercent <= 35) {
        return "Risky";
    }
    return "Cost-burdened";
}
}),
"[project]/packages/domain/src/affordability/income.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "annualIncomeToMonthlyIncome",
    ()=>annualIncomeToMonthlyIncome,
    "getEstimatedMonthlyIncome",
    ()=>getEstimatedMonthlyIncome
]);
const ESTIMATED_TAKE_HOME_RATE = 0.78;
function roundToTwo(value) {
    return Number(value.toFixed(2));
}
function annualIncomeToMonthlyIncome(annualIncome) {
    return roundToTwo(annualIncome / 12);
}
function getEstimatedMonthlyIncome(annualIncome, useEstimatedAfterTaxIncome = false) {
    const grossMonthlyIncome = annualIncomeToMonthlyIncome(annualIncome);
    if (!useEstimatedAfterTaxIncome) {
        return grossMonthlyIncome;
    }
    return roundToTwo(grossMonthlyIncome * ESTIMATED_TAKE_HOME_RATE);
}
}),
"[project]/packages/domain/src/affordability/rent.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateSalaryNeededForThirtyPercent",
    ()=>calculateSalaryNeededForThirtyPercent,
    "getRoommateAdjustedRent",
    ()=>getRoommateAdjustedRent
]);
function roundToTwo(value) {
    return Number(value.toFixed(2));
}
function getRoommateAdjustedRent(medianGrossRent, roommates = 0) {
    if (!Number.isInteger(roommates) || roommates < 0) {
        throw new Error("roommates must be a non-negative whole number");
    }
    return roundToTwo(medianGrossRent / (roommates + 1));
}
function calculateSalaryNeededForThirtyPercent(monthlyRent) {
    return roundToTwo(monthlyRent * 12 / 0.3);
}
}),
"[project]/packages/domain/src/validation/assert-valid-affordability-input.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assertValidAffordabilityInput",
    ()=>assertValidAffordabilityInput
]);
function normalizeOptions(input) {
    if (typeof input === "number") {
        return {
            monthlyDebt: input,
            roommates: 0,
            householdSize: 1,
            useEstimatedAfterTaxIncome: false
        };
    }
    const monthlyDebt = input?.monthlyDebt ?? input?.monthlyStudentLoan ?? 0;
    if (input?.roommates !== undefined) {
        return {
            monthlyDebt,
            roommates: input.roommates,
            householdSize: input.roommates + 1,
            useEstimatedAfterTaxIncome: input.useEstimatedAfterTaxIncome ?? false
        };
    }
    if (input?.householdSize !== undefined) {
        return {
            monthlyDebt,
            roommates: input.householdSize - 1,
            householdSize: input.householdSize,
            useEstimatedAfterTaxIncome: input.useEstimatedAfterTaxIncome ?? false
        };
    }
    return {
        monthlyDebt,
        roommates: 0,
        householdSize: 1,
        useEstimatedAfterTaxIncome: input?.useEstimatedAfterTaxIncome ?? false
    };
}
function assertValidAffordabilityInput(annualIncome, medianGrossRent, input) {
    if (annualIncome <= 0) {
        throw new Error("annualIncome must be greater than 0");
    }
    if (medianGrossRent < 0) {
        throw new Error("medianGrossRent cannot be negative");
    }
    const options = normalizeOptions(input);
    if (options.monthlyDebt < 0) {
        throw new Error("monthlyDebt cannot be negative");
    }
    if (!Number.isInteger(options.roommates) || options.roommates < 0) {
        throw new Error("roommates must be a non-negative whole number");
    }
    if (!Number.isInteger(options.householdSize) || options.householdSize <= 0) {
        throw new Error("householdSize must be a positive whole number");
    }
    return options;
}
}),
"[project]/packages/domain/src/affordability/calculate-affordability.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateAffordability",
    ()=>calculateAffordability
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$affordability$2f$classify$2d$risk$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/affordability/classify-risk.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$affordability$2f$income$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/affordability/income.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$affordability$2f$rent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/affordability/rent.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$validation$2f$assert$2d$valid$2d$affordability$2d$input$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/validation/assert-valid-affordability-input.ts [app-route] (ecmascript)");
;
;
;
;
function roundToTwo(value) {
    return Number(value.toFixed(2));
}
function calculateAffordability(annualIncome, medianGrossRent, input) {
    const options = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$validation$2f$assert$2d$valid$2d$affordability$2d$input$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["assertValidAffordabilityInput"])(annualIncome, medianGrossRent, input);
    const monthlyIncomeBasis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$affordability$2f$income$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEstimatedMonthlyIncome"])(annualIncome, options.useEstimatedAfterTaxIncome);
    const effectiveMonthlyRent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$affordability$2f$rent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRoommateAdjustedRent"])(medianGrossRent, options.roommates);
    const rentBurdenPercent = roundToTwo(effectiveMonthlyRent / monthlyIncomeBasis * 100);
    const monthlyDisposableIncome = roundToTwo(monthlyIncomeBasis - effectiveMonthlyRent - options.monthlyDebt);
    return {
        rentBurdenPercent,
        monthlyDisposableIncome,
        risk: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$affordability$2f$classify$2d$risk$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["classifyRisk"])(rentBurdenPercent),
        effectiveMonthlyRent,
        monthlyIncomeBasis,
        salaryNeededForThirtyPercent: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$affordability$2f$rent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateSalaryNeededForThirtyPercent"])(effectiveMonthlyRent),
        householdSize: options.householdSize,
        incomeMode: options.useEstimatedAfterTaxIncome ? "estimated_after_tax" : "gross"
    };
}
}),
"[project]/packages/domain/src/data/load-metrics-dataset.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getMetricsDatasetLastModified",
    ()=>getMetricsDatasetLastModified,
    "getMetricsDatasetPath",
    ()=>getMetricsDatasetPath,
    "getSourceMetadataPath",
    ()=>getSourceMetadataPath,
    "loadMetricsDataset",
    ()=>loadMetricsDataset,
    "loadSourceMetadata",
    ()=>loadSourceMetadata
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs [external] (node:fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:url [external] (node:url, cjs)");
const __TURBOPACK__import$2e$meta__ = {
    get url () {
        return `file://${__turbopack_context__.P("packages/domain/src/data/load-metrics-dataset.ts")}`;
    }
};
;
;
;
const moduleDirectory = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].dirname((0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__["fileURLToPath"])(__TURBOPACK__import$2e$meta__.url));
const workspaceRoot = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].resolve(moduleDirectory, "../../../../");
const defaultMetricsPath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].resolve(workspaceRoot, "data", "processed", "metro_metrics.csv");
const defaultMetadataPath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].resolve(workspaceRoot, "data", "processed", "source-metadata.json");
let cachedMetricsPath = null;
let cachedMetrics = null;
function parseNumber(value) {
    const parsed = Number.parseFloat(value);
    if (Number.isNaN(parsed)) {
        throw new Error(`Invalid numeric value: ${value}`);
    }
    return parsed;
}
function getMetricsDatasetPath() {
    return process.env.SRL_METRICS_CSV_PATH ?? defaultMetricsPath;
}
function getSourceMetadataPath() {
    return process.env.SRL_SOURCE_METADATA_PATH ?? defaultMetadataPath;
}
function loadMetricsDataset(forceReload = false) {
    const metricsPath = getMetricsDatasetPath();
    if (!forceReload && cachedMetrics && cachedMetricsPath === metricsPath) {
        return cachedMetrics;
    }
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(metricsPath)) {
        throw new Error(`Could not locate metrics dataset at ${metricsPath}`);
    }
    const raw = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readFileSync(metricsPath, "utf8").trim();
    const [header, ...lines] = raw.split(/\r?\n/);
    if (!header || lines.length === 0) {
        cachedMetricsPath = metricsPath;
        cachedMetrics = [];
        return cachedMetrics;
    }
    cachedMetrics = lines.map((line)=>{
        const [metro_id, metro_name, year, annual, monthly, rent, burden] = line.split(",");
        return {
            metro_id,
            metro_name,
            year: parseNumber(year),
            median_annual_income: parseNumber(annual),
            median_monthly_income: parseNumber(monthly),
            median_gross_rent: parseNumber(rent),
            rent_burden_percent: parseNumber(burden)
        };
    });
    cachedMetricsPath = metricsPath;
    return cachedMetrics;
}
function loadSourceMetadata() {
    const metadataPath = getSourceMetadataPath();
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(metadataPath)) {
        return null;
    }
    try {
        return JSON.parse(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readFileSync(metadataPath, "utf8"));
    } catch  {
        return null;
    }
}
function getMetricsDatasetLastModified() {
    const metricsPath = getMetricsDatasetPath();
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(metricsPath)) {
        return null;
    }
    return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].statSync(metricsPath).mtime.toISOString().slice(0, 10);
}
}),
"[project]/packages/domain/src/metrics/get-available-years.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAvailableYears",
    ()=>getAvailableYears
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$data$2f$load$2d$metrics$2d$dataset$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/data/load-metrics-dataset.ts [app-route] (ecmascript)");
;
function getAvailableYears(rows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$data$2f$load$2d$metrics$2d$dataset$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadMetricsDataset"])()) {
    return Array.from(new Set(rows.map((row)=>row.year))).sort((left, right)=>left - right);
}
}),
"[project]/packages/domain/src/metrics/get-metros.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getMetros",
    ()=>getMetros
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$data$2f$load$2d$metrics$2d$dataset$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/data/load-metrics-dataset.ts [app-route] (ecmascript)");
;
function getMetros(rows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$data$2f$load$2d$metrics$2d$dataset$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadMetricsDataset"])()) {
    const metros = new Map();
    for (const row of rows){
        metros.set(row.metro_id, row.metro_name);
    }
    return Array.from(metros.entries()).map(([id, name])=>({
            id,
            name
        })).sort((left, right)=>left.name.localeCompare(right.name));
}
}),
"[project]/packages/domain/src/metrics/get-data-source-status.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDataSourceStatus",
    ()=>getDataSourceStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$data$2f$load$2d$metrics$2d$dataset$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/data/load-metrics-dataset.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$metrics$2f$get$2d$available$2d$years$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/metrics/get-available-years.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$metrics$2f$get$2d$metros$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/metrics/get-metros.ts [app-route] (ecmascript)");
;
;
;
function formatDateString(value) {
    if (!value) {
        return null;
    }
    return value.slice(0, 10);
}
function getDerivedDataStatus(rows) {
    const years = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$metrics$2f$get$2d$available$2d$years$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAvailableYears"])(rows);
    return {
        datasetType: "sample",
        datasetLabel: "Sample Dataset",
        sourceDescription: "Bundled placeholder data stored in data/processed/metro_metrics.csv",
        metroCount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$metrics$2f$get$2d$metros$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMetros"])(rows).length,
        startYear: years[0] ?? null,
        endYear: years[years.length - 1] ?? null,
        lastRefreshed: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$data$2f$load$2d$metrics$2d$dataset$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMetricsDatasetLastModified"])()
    };
}
function getDataSourceStatus(rows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$data$2f$load$2d$metrics$2d$dataset$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadMetricsDataset"])()) {
    const metadata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$data$2f$load$2d$metrics$2d$dataset$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadSourceMetadata"])();
    const configuredMode = process.env.USE_DATABASE === "true" && Boolean(process.env.DATABASE_URL) ? "database" : "csv";
    const derived = getDerivedDataStatus(rows);
    return {
        configuredMode,
        activeSource: "csv_fallback",
        datasetType: metadata?.datasetType ?? derived.datasetType,
        datasetLabel: metadata?.displayName ?? (metadata?.datasetType === "production" ? "Production Dataset" : derived.datasetLabel),
        sourceDescription: metadata?.source ?? derived.sourceDescription,
        metroCount: metadata?.metroCount ?? derived.metroCount,
        startYear: metadata?.startYear ?? derived.startYear,
        endYear: metadata?.endYear ?? derived.endYear,
        lastRefreshed: formatDateString(metadata?.lastRefreshed) ?? derived.lastRefreshed
    };
}
}),
"[project]/packages/domain/src/metrics/summarize-metrics.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isYearInRange",
    ()=>isYearInRange,
    "summarizeMetrics",
    ()=>summarizeMetrics
]);
function roundToTwo(value) {
    return Number(value.toFixed(2));
}
function isYearInRange(year, startYear, endYear) {
    return year >= startYear && year <= endYear;
}
function summarizeMetrics(rows) {
    const grouped = new Map();
    for (const row of rows){
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
            total_rent_burden: row.rent_burden_percent
        });
    }
    return Array.from(grouped.entries()).map(([metro_id, summary])=>({
            metro_id,
            metro_name: summary.metro_name,
            start_year: summary.start_year,
            end_year: summary.end_year,
            median_monthly_income: roundToTwo(summary.total_monthly_income / summary.sample_size),
            median_gross_rent: roundToTwo(summary.total_rent / summary.sample_size),
            rent_burden_percent: roundToTwo(summary.total_rent_burden / summary.sample_size),
            sample_size: summary.sample_size
        })).sort((left, right)=>right.rent_burden_percent - left.rent_burden_percent);
}
}),
"[project]/packages/domain/src/validation/assert-valid-year-query.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assertValidYear",
    ()=>assertValidYear,
    "assertValidYearRange",
    ()=>assertValidYearRange
]);
function assertValidYear(year, fieldName = "year") {
    if (!Number.isInteger(year)) {
        throw new Error(`${fieldName} must be a whole number`);
    }
}
function assertValidYearRange(startYear, endYear) {
    assertValidYear(startYear, "startYear");
    assertValidYear(endYear, "endYear");
    if (startYear > endYear) {
        throw new Error("startYear must be less than or equal to endYear");
    }
}
}),
"[project]/packages/domain/src/metrics/get-metrics-by-range.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getMetricsByRange",
    ()=>getMetricsByRange
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$data$2f$load$2d$metrics$2d$dataset$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/data/load-metrics-dataset.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$metrics$2f$summarize$2d$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/metrics/summarize-metrics.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$validation$2f$assert$2d$valid$2d$year$2d$query$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/validation/assert-valid-year-query.ts [app-route] (ecmascript)");
;
;
;
function getMetricsByRange(startYear, endYear, rows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$data$2f$load$2d$metrics$2d$dataset$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadMetricsDataset"])()) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$validation$2f$assert$2d$valid$2d$year$2d$query$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["assertValidYearRange"])(startYear, endYear);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$metrics$2f$summarize$2d$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["summarizeMetrics"])(rows.filter((row)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$metrics$2f$summarize$2d$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isYearInRange"])(row.year, startYear, endYear)));
}
}),
"[project]/packages/domain/src/metrics/get-metrics-snapshot-by-year.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getMetricsByYear",
    ()=>getMetricsByYear,
    "getMetricsSnapshotByYear",
    ()=>getMetricsSnapshotByYear
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$data$2f$load$2d$metrics$2d$dataset$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/data/load-metrics-dataset.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$validation$2f$assert$2d$valid$2d$year$2d$query$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/validation/assert-valid-year-query.ts [app-route] (ecmascript)");
;
;
function getMetricsSnapshotByYear(year, rows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$data$2f$load$2d$metrics$2d$dataset$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadMetricsDataset"])()) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$validation$2f$assert$2d$valid$2d$year$2d$query$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["assertValidYear"])(year, "year");
    return rows.filter((row)=>row.year === year);
}
function getMetricsByYear(year, rows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$data$2f$load$2d$metrics$2d$dataset$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadMetricsDataset"])()) {
    return getMetricsSnapshotByYear(year, rows);
}
}),
"[project]/packages/domain/src/trends/get-metro-trend.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getMetroTrend",
    ()=>getMetroTrend,
    "getTrendByMetro",
    ()=>getTrendByMetro
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$data$2f$load$2d$metrics$2d$dataset$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/data/load-metrics-dataset.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$metrics$2f$summarize$2d$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/metrics/summarize-metrics.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$validation$2f$assert$2d$valid$2d$year$2d$query$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/validation/assert-valid-year-query.ts [app-route] (ecmascript)");
;
;
;
function getMetroTrend(metroId, startYear, endYear, rows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$data$2f$load$2d$metrics$2d$dataset$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadMetricsDataset"])()) {
    if (startYear !== undefined || endYear !== undefined) {
        if (startYear === undefined || endYear === undefined) {
            throw new Error("startYear and endYear must both be provided when filtering a trend");
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$validation$2f$assert$2d$valid$2d$year$2d$query$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["assertValidYearRange"])(startYear, endYear);
    }
    return rows.filter((row)=>{
        if (row.metro_id !== metroId) {
            return false;
        }
        if (startYear === undefined || endYear === undefined) {
            return true;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$metrics$2f$summarize$2d$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isYearInRange"])(row.year, startYear, endYear);
    }).sort((left, right)=>left.year - right.year).map((row)=>({
            year: row.year,
            median_monthly_income: row.median_monthly_income,
            median_gross_rent: row.median_gross_rent,
            rent_burden_percent: row.rent_burden_percent
        }));
}
function getTrendByMetro(metroId, startYear, endYear, rows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$data$2f$load$2d$metrics$2d$dataset$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadMetricsDataset"])()) {
    return getMetroTrend(metroId, startYear, endYear, rows);
}
}),
"[project]/packages/domain/src/trends/get-latest-rent-by-metro.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getLatestRentByMetro",
    ()=>getLatestRentByMetro
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$trends$2f$get$2d$metro$2d$trend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/trends/get-metro-trend.ts [app-route] (ecmascript)");
;
function getLatestRentByMetro(metroId, rows) {
    const trend = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$trends$2f$get$2d$metro$2d$trend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMetroTrend"])(metroId, undefined, undefined, rows);
    if (trend.length === 0) {
        return null;
    }
    return trend[trend.length - 1].median_gross_rent;
}
}),
"[project]/packages/domain/src/index.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$affordability$2f$calculate$2d$affordability$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/affordability/calculate-affordability.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$affordability$2f$classify$2d$risk$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/affordability/classify-risk.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$affordability$2f$income$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/affordability/income.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$affordability$2f$rent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/affordability/rent.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$metrics$2f$get$2d$data$2d$source$2d$status$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/metrics/get-data-source-status.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$metrics$2f$get$2d$available$2d$years$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/metrics/get-available-years.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$metrics$2f$get$2d$metrics$2d$by$2d$range$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/metrics/get-metrics-by-range.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$metrics$2f$get$2d$metrics$2d$snapshot$2d$by$2d$year$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/metrics/get-metrics-snapshot-by-year.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$metrics$2f$get$2d$metros$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/metrics/get-metros.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$metrics$2f$summarize$2d$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/metrics/summarize-metrics.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$data$2f$load$2d$metrics$2d$dataset$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/data/load-metrics-dataset.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$trends$2f$get$2d$latest$2d$rent$2d$by$2d$metro$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/trends/get-latest-rent-by-metro.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$trends$2f$get$2d$metro$2d$trend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/trends/get-metro-trend.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$validation$2f$assert$2d$valid$2d$year$2d$query$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/validation/assert-valid-year-query.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$validation$2f$assert$2d$valid$2d$affordability$2d$input$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/validation/assert-valid-affordability-input.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/packages/shared/src/constants/graph-types.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "graphTypes",
    ()=>graphTypes
]);
const graphTypes = [
    "metro_snapshot_bar",
    "metro_trend_line",
    "metro_compare_line",
    "affordability_scenario_bar"
];
}),
"[project]/packages/shared/src/schemas/affordability.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "affordabilityOptionsSchema",
    ()=>affordabilityOptionsSchema,
    "affordabilityResultSchema",
    ()=>affordabilityResultSchema,
    "calculateAffordabilityRequestSchema",
    ()=>calculateAffordabilityRequestSchema,
    "calculateAffordabilityResponseDataSchema",
    ()=>calculateAffordabilityResponseDataSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
;
const affordabilityOptionsSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    monthlyDebt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(0).optional(),
    monthlyStudentLoan: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(0).optional(),
    roommates: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(0).optional(),
    householdSize: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive().optional(),
    useEstimatedAfterTaxIncome: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional()
});
const affordabilityResultSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    rentBurdenPercent: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    monthlyDisposableIncome: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    risk: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "Safe",
        "Risky",
        "Cost-burdened"
    ]),
    effectiveMonthlyRent: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    monthlyIncomeBasis: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    salaryNeededForThirtyPercent: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    householdSize: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive(),
    incomeMode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "gross",
        "estimated_after_tax"
    ])
});
const calculateAffordabilityRequestSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    annualIncome: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().positive(),
    monthlyDebt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(0).optional(),
    householdSize: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive().optional(),
    roommates: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(0).optional(),
    targetMetro: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).optional(),
    useEstimatedAfterTaxIncome: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional()
}).refine((input)=>input.householdSize === undefined || input.roommates === undefined || input.householdSize === input.roommates + 1, {
    message: "householdSize must equal roommates plus one when both are provided",
    path: [
        "householdSize"
    ]
});
const calculateAffordabilityResponseDataSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    inputs: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].unknown()),
    results: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        maxAffordableMonthlyHousing: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
        affordabilityRatio: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
        summary: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
    })
});
}),
"[project]/packages/shared/src/schemas/chat.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "conversationHistoryRequestSchema",
    ()=>conversationHistoryRequestSchema,
    "conversationHistoryResponseDataSchema",
    ()=>conversationHistoryResponseDataSchema,
    "persistedChatMessageSchema",
    ()=>persistedChatMessageSchema,
    "persistedToolCallSchema",
    ()=>persistedToolCallSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
;
const persistedToolCallSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    toolName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    status: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "success",
        "error",
        "pending"
    ]),
    summary: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    input: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].unknown()).optional()
});
const conversationHistoryRequestSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    conversationId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    limit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive().optional(),
    includeToolCalls: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional()
});
const persistedChatMessageSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    role: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "user",
        "assistant"
    ]),
    state: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    content: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    planner: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    intent: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    hasChartSpec: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    toolCalls: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(persistedToolCallSchema).optional()
});
const conversationHistoryResponseDataSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    conversationId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    totalMessages: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().nonnegative(),
    messages: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(persistedChatMessageSchema)
});
}),
"[project]/packages/shared/src/schemas/metrics.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dashboardMetricSchema",
    ()=>dashboardMetricSchema,
    "domainDataSourceStatusSchema",
    ()=>domainDataSourceStatusSchema,
    "getAvailableYearsRequestSchema",
    ()=>getAvailableYearsRequestSchema,
    "getAvailableYearsResponseDataSchema",
    ()=>getAvailableYearsResponseDataSchema,
    "getDataSourceStatusRequestSchema",
    ()=>getDataSourceStatusRequestSchema,
    "getDataSourceStatusResponseDataSchema",
    ()=>getDataSourceStatusResponseDataSchema,
    "metricsRangeRequestSchema",
    ()=>metricsRangeRequestSchema,
    "metricsRangeResponseDataSchema",
    ()=>metricsRangeResponseDataSchema,
    "metricsSnapshotRequestSchema",
    ()=>metricsSnapshotRequestSchema,
    "metricsSnapshotResponseDataSchema",
    ()=>metricsSnapshotResponseDataSchema,
    "metroMetricSchema",
    ()=>metroMetricSchema,
    "yearSchema",
    ()=>yearSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
;
const yearSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int();
const metroMetricSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    metro_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    metro_name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    year: yearSchema,
    median_annual_income: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    median_monthly_income: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    median_gross_rent: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    rent_burden_percent: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number()
});
const dashboardMetricSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    metro_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    metro_name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    start_year: yearSchema,
    end_year: yearSchema,
    median_monthly_income: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    median_gross_rent: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    rent_burden_percent: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    sample_size: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().nonnegative()
});
const getAvailableYearsRequestSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({}).strict();
const getAvailableYearsResponseDataSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    years: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(yearSchema)
});
const metricsSnapshotRequestSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    year: yearSchema
});
const metricsSnapshotResponseDataSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    year: yearSchema,
    rows: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(metroMetricSchema)
});
const metricsRangeRequestSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    startYear: yearSchema,
    endYear: yearSchema
}).refine((input)=>input.startYear <= input.endYear, {
    message: "startYear must be less than or equal to endYear",
    path: [
        "endYear"
    ]
});
const metricsRangeResponseDataSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    startYear: yearSchema,
    endYear: yearSchema,
    rows: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(dashboardMetricSchema)
});
const domainDataSourceStatusSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    configuredMode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "database",
        "csv"
    ]),
    activeSource: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "database",
        "csv_fallback"
    ]),
    datasetType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "sample",
        "production"
    ]),
    datasetLabel: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    sourceDescription: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
    metroCount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().nonnegative(),
    startYear: yearSchema.nullable(),
    endYear: yearSchema.nullable(),
    lastRefreshed: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable()
});
const getDataSourceStatusRequestSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({}).strict();
const getDataSourceStatusResponseDataSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    sourceMode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "database",
        "csv",
        "mixed"
    ]),
    details: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].unknown())).optional()
});
}),
"[project]/packages/shared/src/schemas/trend.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "metroTrendRequestSchema",
    ()=>metroTrendRequestSchema,
    "metroTrendResponseDataSchema",
    ()=>metroTrendResponseDataSchema,
    "trendPointSchema",
    ()=>trendPointSchema,
    "trendSeriesPointSchema",
    ()=>trendSeriesPointSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/schemas/metrics.ts [app-route] (ecmascript)");
;
;
const trendPointSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    year: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["yearSchema"],
    median_monthly_income: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    median_gross_rent: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    rent_burden_percent: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number()
});
const trendSeriesPointSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    year: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["yearSchema"],
    value: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number()
});
const metroTrendRequestSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    metro: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    startYear: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["yearSchema"],
    endYear: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["yearSchema"]
}).refine((input)=>input.startYear <= input.endYear, {
    message: "startYear must be less than or equal to endYear",
    path: [
        "endYear"
    ]
});
const metroTrendResponseDataSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    metro: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    startYear: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["yearSchema"],
    endYear: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["yearSchema"],
    series: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(trendSeriesPointSchema)
});
}),
"[project]/packages/shared/src/schemas/graph.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "affordabilityScenarioGraphHelperInputSchema",
    ()=>affordabilityScenarioGraphHelperInputSchema,
    "annotationSpecSchema",
    ()=>annotationSpecSchema,
    "axisSpecSchema",
    ()=>axisSpecSchema,
    "chartSpecSchema",
    ()=>chartSpecSchema,
    "createGraphHelperInputSchema",
    ()=>createGraphHelperInputSchema,
    "createGraphRequestSchema",
    ()=>createGraphRequestSchema,
    "formattingHintsSchema",
    ()=>formattingHintsSchema,
    "graphHelperBaseSchema",
    ()=>graphHelperBaseSchema,
    "graphHelperMetricSchema",
    ()=>graphHelperMetricSchema,
    "graphTypeSchema",
    ()=>graphTypeSchema,
    "metroCompareGraphHelperInputSchema",
    ()=>metroCompareGraphHelperInputSchema,
    "metroSnapshotGraphHelperInputSchema",
    ()=>metroSnapshotGraphHelperInputSchema,
    "metroTrendGraphHelperInputSchema",
    ()=>metroTrendGraphHelperInputSchema,
    "narrativeMetaSchema",
    ()=>narrativeMetaSchema,
    "seriesSpecSchema",
    ()=>seriesSpecSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$constants$2f$graph$2d$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/constants/graph-types.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$affordability$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/schemas/affordability.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/schemas/metrics.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$trend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/schemas/trend.ts [app-route] (ecmascript)");
;
;
;
;
;
const graphTypeSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$constants$2f$graph$2d$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["graphTypes"]);
const axisSpecSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    field: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "category",
        "number",
        "time"
    ]),
    formatter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "currency_usd",
        "percent",
        "integer"
    ]).optional()
});
const seriesSpecSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    points: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].unknown()))
});
const annotationSpecSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "threshold",
        "callout",
        "highlight"
    ]),
    label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    field: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).optional(),
    value: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].union([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number()
    ]).optional(),
    seriesId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).optional(),
    pointIndex: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(0).optional()
});
const formattingHintsSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    showLegend: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional(),
    showGrid: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional(),
    legendPosition: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "top",
        "bottom",
        "left",
        "right"
    ]).optional()
});
const narrativeMetaSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    summary: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    highestValue: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
        value: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number()
    }).optional(),
    lowestValue: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
        value: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number()
    }).optional(),
    thresholdNotes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).optional()
});
const chartSpecSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    chartType: graphTypeSchema,
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    subtitle: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    axes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        x: axisSpecSchema,
        y: axisSpecSchema
    }),
    series: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(seriesSpecSchema).min(1),
    annotations: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(annotationSpecSchema).optional(),
    formattingHints: formattingHintsSchema.optional(),
    narrativeMeta: narrativeMetaSchema.optional()
});
const createGraphRequestSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    graphType: graphTypeSchema,
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    axes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        x: axisSpecSchema,
        y: axisSpecSchema
    }),
    series: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(seriesSpecSchema).min(1),
    subtitle: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    annotations: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(annotationSpecSchema).optional(),
    formattingHints: formattingHintsSchema.optional(),
    narrativeMeta: narrativeMetaSchema.optional()
});
const graphHelperMetricSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
    "rent_burden_percent",
    "median_gross_rent",
    "median_monthly_income",
    "maxAffordableMonthlyHousing",
    "affordabilityRatio"
]);
const graphHelperBaseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    inputMode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("helper"),
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).optional(),
    subtitle: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    annotations: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(annotationSpecSchema).optional(),
    formattingHints: formattingHintsSchema.optional(),
    narrativeMeta: narrativeMetaSchema.optional()
});
const metroSnapshotGraphHelperInputSchema = graphHelperBaseSchema.extend({
    graphType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("metro_snapshot_bar"),
    sourceTool: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("get_metrics_snapshot"),
    data: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsSnapshotResponseDataSchema"],
    metric: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "rent_burden_percent",
        "median_gross_rent",
        "median_monthly_income"
    ]).default("rent_burden_percent"),
    topN: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive().optional(),
    sortOrder: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "asc",
        "desc"
    ]).default("desc"),
    highlightThreshold: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
    highlightMetroIds: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1)).optional()
});
const metroTrendGraphHelperInputSchema = graphHelperBaseSchema.extend({
    graphType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("metro_trend_line"),
    sourceTool: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("get_metro_trend"),
    data: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$trend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metroTrendResponseDataSchema"],
    metric: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "rent_burden_percent"
    ]).default("rent_burden_percent"),
    highlightThreshold: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional()
});
const metroCompareGraphHelperInputSchema = graphHelperBaseSchema.extend({
    graphType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("metro_compare_line"),
    sourceTool: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("get_metro_trend"),
    data: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$trend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metroTrendResponseDataSchema"]).min(2),
    metric: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "rent_burden_percent"
    ]).default("rent_burden_percent")
}).superRefine((input, context)=>{
    const [first, ...rest] = input.data;
    for (const trend of rest){
        if (trend.startYear !== first.startYear || trend.endYear !== first.endYear) {
            context.addIssue({
                code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ZodIssueCode.custom,
                message: "all comparison trend inputs must share the same year range",
                path: [
                    "data"
                ]
            });
            return;
        }
    }
});
const affordabilityScenarioGraphHelperInputSchema = graphHelperBaseSchema.extend({
    graphType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("affordability_scenario_bar"),
    sourceTool: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("calculate_affordability"),
    scenarios: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
        data: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$affordability$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateAffordabilityResponseDataSchema"]
    })).min(1),
    metric: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "maxAffordableMonthlyHousing",
        "affordabilityRatio"
    ]).default("maxAffordableMonthlyHousing")
});
const createGraphHelperInputSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].union([
    metroSnapshotGraphHelperInputSchema,
    metroTrendGraphHelperInputSchema,
    metroCompareGraphHelperInputSchema,
    affordabilityScenarioGraphHelperInputSchema
]);
}),
"[project]/packages/shared/src/schemas/metro.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getMetrosRequestSchema",
    ()=>getMetrosRequestSchema,
    "getMetrosResponseDataSchema",
    ()=>getMetrosResponseDataSchema,
    "metroRecordSchema",
    ()=>metroRecordSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
;
const metroRecordSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    state: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).optional(),
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).optional()
});
const getMetrosRequestSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({}).strict();
const getMetrosResponseDataSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    metros: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(metroRecordSchema)
});
}),
"[project]/packages/shared/src/index.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$constants$2f$graph$2d$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/constants/graph-types.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$affordability$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/schemas/affordability.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$chat$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/schemas/chat.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$graph$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/schemas/graph.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$metro$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/schemas/metro.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/schemas/metrics.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$trend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/schemas/trend.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
}),
"[project]/packages/mcp-server/src/tools/tool-result.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createToolFailure",
    ()=>createToolFailure,
    "createToolSuccess",
    ()=>createToolSuccess,
    "normalizeErrorMessage",
    ()=>normalizeErrorMessage,
    "toMcpToolResponse",
    ()=>toMcpToolResponse
]);
function createToolSuccess(toolName, data, meta) {
    return {
        ok: true,
        toolName,
        data,
        ...meta ? {
            meta
        } : {}
    };
}
function createToolFailure(toolName, code, message, details) {
    return {
        ok: false,
        toolName,
        error: {
            code,
            message,
            ...details ? {
                details
            } : {}
        }
    };
}
function toMcpToolResponse(result) {
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(result, null, 2)
            }
        ],
        structuredContent: result
    };
}
function normalizeErrorMessage(error) {
    if (error instanceof Error) {
        return error.message;
    }
    return "Unknown error";
}
}),
"[project]/packages/mcp-server/src/tools/calculate-affordability.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateAffordabilityTool",
    ()=>calculateAffordabilityTool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/domain/src/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$affordability$2f$calculate$2d$affordability$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/affordability/calculate-affordability.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$affordability$2f$classify$2d$risk$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/affordability/classify-risk.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$affordability$2f$income$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/affordability/income.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$trends$2f$get$2d$latest$2d$rent$2d$by$2d$metro$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/trends/get-latest-rent-by-metro.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$metrics$2f$get$2d$metros$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/metrics/get-metros.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/shared/src/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$affordability$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/schemas/affordability.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/tools/tool-result.ts [app-route] (ecmascript)");
;
;
;
const toolName = "calculate_affordability";
function roundToTwo(value) {
    return Number(value.toFixed(2));
}
function getMetroAliases(metroName) {
    const parts = metroName.toLowerCase().split(/[-,\/]/).map((part)=>part.trim()).filter((part)=>part.length >= 3);
    return Array.from(new Set([
        metroName.toLowerCase(),
        ...parts
    ]));
}
function calculateAffordabilityTool(input) {
    try {
        const validated = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$affordability$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateAffordabilityRequestSchema"].parse(input);
        const requestedTargetMetro = validated.targetMetro?.toLowerCase();
        const metroRecord = requestedTargetMetro ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$metrics$2f$get$2d$metros$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMetros"])().find((metro)=>metro.id === validated.targetMetro || getMetroAliases(metro.name).includes(requestedTargetMetro)) : undefined;
        const resolvedTargetMetro = metroRecord?.id ?? validated.targetMetro;
        const resolvedTargetMetroName = metroRecord?.name ?? validated.targetMetro;
        const monthlyIncomeBasis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$affordability$2f$income$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEstimatedMonthlyIncome"])(validated.annualIncome, validated.useEstimatedAfterTaxIncome ?? false);
        const maxAffordableMonthlyHousing = roundToTwo(monthlyIncomeBasis * 0.3);
        const targetMetroRent = resolvedTargetMetro ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$trends$2f$get$2d$latest$2d$rent$2d$by$2d$metro$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLatestRentByMetro"])(resolvedTargetMetro) : null;
        const affordability = targetMetroRent !== null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$affordability$2f$calculate$2d$affordability$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateAffordability"])(validated.annualIncome, targetMetroRent, {
            monthlyDebt: validated.monthlyDebt,
            householdSize: validated.householdSize,
            roommates: validated.roommates,
            useEstimatedAfterTaxIncome: validated.useEstimatedAfterTaxIncome
        }) : null;
        const summary = affordability ? `${resolvedTargetMetroName} is ${affordability.risk.toLowerCase()} at ${affordability.rentBurdenPercent}% of monthly income.` : `At 30% of monthly income, the maximum affordable monthly housing cost is $${maxAffordableMonthlyHousing}.`;
        const data = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$affordability$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateAffordabilityResponseDataSchema"].parse({
            inputs: validated,
            results: {
                maxAffordableMonthlyHousing,
                affordabilityRatio: affordability ? roundToTwo(affordability.rentBurdenPercent / 100) : undefined,
                summary
            }
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createToolSuccess"])(toolName, data, affordability ? {
            risk: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$affordability$2f$classify$2d$risk$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["classifyRisk"])(affordability.rentBurdenPercent)
        } : undefined);
    } catch (error) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createToolFailure"])(toolName, "CALCULATE_AFFORDABILITY_FAILED", (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeErrorMessage"])(error));
    }
}
}),
"[project]/packages/mcp-server/src/graph/builders/affordability-scenario-bar.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildAffordabilityScenarioBar",
    ()=>buildAffordabilityScenarioBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/shared/src/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$graph$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/schemas/graph.ts [app-route] (ecmascript)");
;
function buildAffordabilityScenarioBar(request) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$graph$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["chartSpecSchema"].parse({
        ...request,
        chartType: "affordability_scenario_bar",
        formattingHints: {
            showLegend: request.formattingHints?.showLegend ?? false,
            showGrid: request.formattingHints?.showGrid ?? true,
            legendPosition: request.formattingHints?.legendPosition
        }
    });
}
}),
"[project]/packages/mcp-server/src/graph/builders/metro-compare-line.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildMetroCompareLine",
    ()=>buildMetroCompareLine
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/shared/src/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$graph$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/schemas/graph.ts [app-route] (ecmascript)");
;
function buildMetroCompareLine(request) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$graph$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["chartSpecSchema"].parse({
        ...request,
        chartType: "metro_compare_line",
        formattingHints: {
            showLegend: request.formattingHints?.showLegend ?? true,
            showGrid: request.formattingHints?.showGrid ?? true,
            legendPosition: request.formattingHints?.legendPosition ?? "top"
        }
    });
}
}),
"[project]/packages/mcp-server/src/graph/builders/metro-snapshot-bar.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildMetroSnapshotBar",
    ()=>buildMetroSnapshotBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/shared/src/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$graph$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/schemas/graph.ts [app-route] (ecmascript)");
;
function buildMetroSnapshotBar(request) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$graph$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["chartSpecSchema"].parse({
        ...request,
        chartType: "metro_snapshot_bar",
        formattingHints: {
            showLegend: request.formattingHints?.showLegend ?? false,
            showGrid: request.formattingHints?.showGrid ?? true,
            legendPosition: request.formattingHints?.legendPosition
        }
    });
}
}),
"[project]/packages/mcp-server/src/graph/builders/metro-trend-line.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildMetroTrendLine",
    ()=>buildMetroTrendLine
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/shared/src/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$graph$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/schemas/graph.ts [app-route] (ecmascript)");
;
function buildMetroTrendLine(request) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$graph$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["chartSpecSchema"].parse({
        ...request,
        chartType: "metro_trend_line",
        formattingHints: {
            showLegend: request.formattingHints?.showLegend ?? false,
            showGrid: request.formattingHints?.showGrid ?? true,
            legendPosition: request.formattingHints?.legendPosition
        }
    });
}
}),
"[project]/packages/mcp-server/src/tools/create-graph.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createGraphTool",
    ()=>createGraphTool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/shared/src/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$graph$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/schemas/graph.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$graph$2f$builders$2f$affordability$2d$scenario$2d$bar$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/graph/builders/affordability-scenario-bar.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$graph$2f$builders$2f$metro$2d$compare$2d$line$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/graph/builders/metro-compare-line.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$graph$2f$builders$2f$metro$2d$snapshot$2d$bar$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/graph/builders/metro-snapshot-bar.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$graph$2f$builders$2f$metro$2d$trend$2d$line$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/graph/builders/metro-trend-line.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/tools/tool-result.ts [app-route] (ecmascript)");
;
;
;
;
;
;
const toolName = "create_graph";
const metricPresentation = {
    rent_burden_percent: {
        label: "Rent Burden (%)",
        formatter: "percent"
    },
    median_gross_rent: {
        label: "Median Gross Rent",
        formatter: "currency_usd"
    },
    median_monthly_income: {
        label: "Median Monthly Income",
        formatter: "currency_usd"
    },
    maxAffordableMonthlyHousing: {
        label: "Max Affordable Monthly Housing",
        formatter: "currency_usd"
    },
    affordabilityRatio: {
        label: "Affordability Ratio",
        formatter: "percent"
    }
};
function buildHighestAndLowest(points) {
    if (points.length === 0) {
        return {};
    }
    const sorted = [
        ...points
    ].sort((left, right)=>right.value - left.value);
    const highest = sorted[0];
    const lowest = sorted[sorted.length - 1];
    return {
        highestValue: highest ? {
            label: highest.label,
            value: highest.value
        } : undefined,
        lowestValue: lowest ? {
            label: lowest.label,
            value: lowest.value
        } : undefined
    };
}
function toRawGraphRequest(input) {
    switch(input.graphType){
        case "metro_snapshot_bar":
            {
                const presentation = metricPresentation[input.metric];
                const sortedRows = [
                    ...input.data.rows
                ].sort((left, right)=>{
                    const leftValue = left[input.metric];
                    const rightValue = right[input.metric];
                    return input.sortOrder === "asc" ? leftValue - rightValue : rightValue - leftValue;
                });
                const rows = input.topN ? sortedRows.slice(0, input.topN) : sortedRows;
                const pointSummaries = rows.map((row)=>({
                        label: row.metro_name,
                        value: row[input.metric]
                    }));
                return {
                    graphType: input.graphType,
                    title: input.title ?? `${presentation.label} by metro (${input.data.year})`,
                    subtitle: input.subtitle ?? `Derived from get_metrics_snapshot for ${input.data.year}`,
                    description: input.description,
                    axes: {
                        x: {
                            label: "Metro",
                            field: "metro_name",
                            type: "category"
                        },
                        y: {
                            label: presentation.label,
                            field: "value",
                            type: "number",
                            formatter: presentation.formatter
                        }
                    },
                    series: [
                        {
                            id: input.metric,
                            label: presentation.label,
                            points: rows.map((row)=>({
                                    metro_id: row.metro_id,
                                    metro_name: row.metro_name,
                                    value: row[input.metric],
                                    year: row.year
                                }))
                        }
                    ],
                    annotations: [
                        ...input.annotations ?? [],
                        ...input.highlightThreshold !== undefined ? [
                            {
                                type: "threshold",
                                label: `${presentation.label} threshold`,
                                field: "value",
                                value: input.highlightThreshold
                            }
                        ] : []
                    ],
                    formattingHints: input.formattingHints,
                    narrativeMeta: {
                        ...input.narrativeMeta,
                        ...buildHighestAndLowest(pointSummaries)
                    }
                };
            }
        case "metro_trend_line":
            {
                const presentation = metricPresentation[input.metric];
                const pointSummaries = input.data.series.map((point)=>({
                        label: String(point.year),
                        value: point.value
                    }));
                return {
                    graphType: input.graphType,
                    title: input.title ?? `${input.data.metro} ${presentation.label} trend`,
                    subtitle: input.subtitle ?? `${input.data.startYear}-${input.data.endYear}`,
                    description: input.description,
                    axes: {
                        x: {
                            label: "Year",
                            field: "year",
                            type: "time",
                            formatter: "integer"
                        },
                        y: {
                            label: presentation.label,
                            field: "value",
                            type: "number",
                            formatter: presentation.formatter
                        }
                    },
                    series: [
                        {
                            id: input.data.metro,
                            label: input.data.metro,
                            points: input.data.series
                        }
                    ],
                    annotations: [
                        ...input.annotations ?? [],
                        ...input.highlightThreshold !== undefined ? [
                            {
                                type: "threshold",
                                label: `${presentation.label} threshold`,
                                field: "value",
                                value: input.highlightThreshold
                            }
                        ] : []
                    ],
                    formattingHints: input.formattingHints,
                    narrativeMeta: {
                        ...input.narrativeMeta,
                        ...buildHighestAndLowest(pointSummaries)
                    }
                };
            }
        case "metro_compare_line":
            {
                const presentation = metricPresentation[input.metric];
                const pointSummaries = input.data.flatMap((trend)=>trend.series.map((point)=>({
                            label: `${trend.metro} ${point.year}`,
                            value: point.value
                        })));
                return {
                    graphType: input.graphType,
                    title: input.title ?? `Metro comparison for ${presentation.label}`,
                    subtitle: input.subtitle ?? `${input.data[0]?.startYear}-${input.data[0]?.endYear}`,
                    description: input.description,
                    axes: {
                        x: {
                            label: "Year",
                            field: "year",
                            type: "time",
                            formatter: "integer"
                        },
                        y: {
                            label: presentation.label,
                            field: "value",
                            type: "number",
                            formatter: presentation.formatter
                        }
                    },
                    series: input.data.map((trend)=>({
                            id: trend.metro,
                            label: trend.metro,
                            points: trend.series
                        })),
                    annotations: input.annotations,
                    formattingHints: {
                        showLegend: input.formattingHints?.showLegend ?? true,
                        showGrid: input.formattingHints?.showGrid,
                        legendPosition: input.formattingHints?.legendPosition
                    },
                    narrativeMeta: {
                        ...input.narrativeMeta,
                        ...buildHighestAndLowest(pointSummaries)
                    }
                };
            }
        case "affordability_scenario_bar":
            {
                const presentation = metricPresentation[input.metric];
                const points = input.scenarios.map((scenario)=>{
                    const value = scenario.data.results[input.metric];
                    if (typeof value !== "number") {
                        throw new Error(`${input.metric} is required for each affordability scenario`);
                    }
                    return {
                        scenario: scenario.label,
                        value
                    };
                });
                return {
                    graphType: input.graphType,
                    title: input.title ?? `${presentation.label} across affordability scenarios`,
                    subtitle: input.subtitle,
                    description: input.description,
                    axes: {
                        x: {
                            label: "Scenario",
                            field: "scenario",
                            type: "category"
                        },
                        y: {
                            label: presentation.label,
                            field: "value",
                            type: "number",
                            formatter: presentation.formatter
                        }
                    },
                    series: [
                        {
                            id: input.metric,
                            label: presentation.label,
                            points
                        }
                    ],
                    annotations: input.annotations,
                    formattingHints: input.formattingHints,
                    narrativeMeta: {
                        ...input.narrativeMeta,
                        ...buildHighestAndLowest(points.map((point)=>({
                                label: point.scenario,
                                value: point.value
                            })))
                    }
                };
            }
    }
}
function normalizeGraphInput(input) {
    if (typeof input === "object" && input !== null && "inputMode" in input) {
        const helperInput = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$graph$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createGraphHelperInputSchema"].parse(input);
        return {
            request: toRawGraphRequest(helperInput),
            mode: "helper"
        };
    }
    return {
        request: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$graph$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createGraphRequestSchema"].parse(input),
        mode: "raw"
    };
}
function buildChartSpec(request) {
    switch(request.graphType){
        case "metro_snapshot_bar":
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$graph$2f$builders$2f$metro$2d$snapshot$2d$bar$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildMetroSnapshotBar"])(request);
        case "metro_trend_line":
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$graph$2f$builders$2f$metro$2d$trend$2d$line$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildMetroTrendLine"])(request);
        case "metro_compare_line":
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$graph$2f$builders$2f$metro$2d$compare$2d$line$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildMetroCompareLine"])(request);
        case "affordability_scenario_bar":
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$graph$2f$builders$2f$affordability$2d$scenario$2d$bar$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildAffordabilityScenarioBar"])(request);
        default:
            throw new Error("Unsupported graph type");
    }
}
function createGraphTool(input) {
    try {
        const normalized = normalizeGraphInput(input);
        const data = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$graph$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["chartSpecSchema"].parse(buildChartSpec(normalized.request));
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createToolSuccess"])(toolName, data, {
            builder: normalized.request.graphType,
            inputMode: normalized.mode
        });
    } catch (error) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createToolFailure"])(toolName, "CREATE_GRAPH_FAILED", (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeErrorMessage"])(error));
    }
}
}),
"[project]/packages/mcp-server/src/tools/get-data-source-status.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDataSourceStatusTool",
    ()=>getDataSourceStatusTool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/domain/src/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$metrics$2f$get$2d$data$2d$source$2d$status$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/metrics/get-data-source-status.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/shared/src/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/schemas/metrics.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/tools/tool-result.ts [app-route] (ecmascript)");
;
;
;
const toolName = "get_data_source_status";
function getDataSourceStatusTool(input = {}) {
    try {
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDataSourceStatusRequestSchema"].parse(input);
        const status = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$metrics$2f$get$2d$data$2d$source$2d$status$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDataSourceStatus"])();
        const sourceMode = status.configuredMode === "database" ? status.activeSource === "database" ? "database" : "mixed" : "csv";
        const data = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDataSourceStatusResponseDataSchema"].parse({
            sourceMode,
            details: [
                {
                    configuredMode: status.configuredMode,
                    activeSource: status.activeSource,
                    datasetType: status.datasetType,
                    datasetLabel: status.datasetLabel,
                    metroCount: status.metroCount,
                    startYear: status.startYear,
                    endYear: status.endYear,
                    lastRefreshed: status.lastRefreshed
                }
            ]
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createToolSuccess"])(toolName, data);
    } catch (error) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createToolFailure"])(toolName, "GET_DATA_SOURCE_STATUS_FAILED", (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeErrorMessage"])(error));
    }
}
}),
"[project]/packages/mcp-server/src/tools/get-metrics-snapshot.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getMetricsSnapshotTool",
    ()=>getMetricsSnapshotTool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/domain/src/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$metrics$2f$get$2d$metrics$2d$snapshot$2d$by$2d$year$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/metrics/get-metrics-snapshot-by-year.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/shared/src/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/schemas/metrics.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/tools/tool-result.ts [app-route] (ecmascript)");
;
;
;
const toolName = "get_metrics_snapshot";
function getMetricsSnapshotTool(input) {
    try {
        const validated = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsSnapshotRequestSchema"].parse(input);
        const data = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsSnapshotResponseDataSchema"].parse({
            year: validated.year,
            rows: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$metrics$2f$get$2d$metrics$2d$snapshot$2d$by$2d$year$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMetricsSnapshotByYear"])(validated.year)
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createToolSuccess"])(toolName, data);
    } catch (error) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createToolFailure"])(toolName, "GET_METRICS_SNAPSHOT_FAILED", (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeErrorMessage"])(error));
    }
}
}),
"[project]/packages/mcp-server/src/tools/get-metros.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getMetrosTool",
    ()=>getMetrosTool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/domain/src/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$metrics$2f$get$2d$metros$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/metrics/get-metros.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/shared/src/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$metro$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/schemas/metro.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/tools/tool-result.ts [app-route] (ecmascript)");
;
;
;
const toolName = "get_metros";
function getMetrosTool(input = {}) {
    try {
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$metro$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMetrosRequestSchema"].parse(input);
        const metros = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$metrics$2f$get$2d$metros$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMetros"])().map((metro)=>({
                id: metro.id,
                name: metro.name
            }));
        const data = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$metro$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMetrosResponseDataSchema"].parse({
            metros
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createToolSuccess"])(toolName, data);
    } catch (error) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createToolFailure"])(toolName, "GET_METROS_FAILED", (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeErrorMessage"])(error));
    }
}
}),
"[project]/packages/mcp-server/src/tools/get-trend.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getMetroTrendTool",
    ()=>getMetroTrendTool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/domain/src/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$trends$2f$get$2d$metro$2d$trend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/trends/get-metro-trend.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$metrics$2f$get$2d$metros$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/metrics/get-metros.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/shared/src/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$trend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/schemas/trend.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/tools/tool-result.ts [app-route] (ecmascript)");
;
;
;
const toolName = "get_metro_trend";
function getMetroTrendTool(input) {
    try {
        const validated = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$trend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metroTrendRequestSchema"].parse(input);
        const metroRecord = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$metrics$2f$get$2d$metros$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMetros"])().find((metro)=>metro.id === validated.metro || metro.name.toLowerCase() === validated.metro.toLowerCase());
        const resolvedMetroId = metroRecord?.id ?? validated.metro;
        const resolvedMetroName = metroRecord?.name ?? validated.metro;
        const trend = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$trends$2f$get$2d$metro$2d$trend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMetroTrend"])(resolvedMetroId, validated.startYear, validated.endYear);
        const data = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$trend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metroTrendResponseDataSchema"].parse({
            metro: resolvedMetroName,
            startYear: validated.startYear,
            endYear: validated.endYear,
            series: trend.map((point)=>({
                    year: point.year,
                    value: point.rent_burden_percent
                }))
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createToolSuccess"])(toolName, data, {
            metric: "rent_burden_percent",
            resolvedMetroId
        });
    } catch (error) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createToolFailure"])(toolName, "GET_METRO_TREND_FAILED", (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeErrorMessage"])(error));
    }
}
}),
"[project]/packages/mcp-server/src/tools/get-years.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAvailableYearsTool",
    ()=>getAvailableYearsTool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/domain/src/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$metrics$2f$get$2d$available$2d$years$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/domain/src/metrics/get-available-years.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/shared/src/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/schemas/metrics.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/tools/tool-result.ts [app-route] (ecmascript)");
;
;
;
const toolName = "get_available_years";
function getAvailableYearsTool(input = {}) {
    try {
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAvailableYearsRequestSchema"].parse(input);
        const data = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAvailableYearsResponseDataSchema"].parse({
            years: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$domain$2f$src$2f$metrics$2f$get$2d$available$2d$years$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAvailableYears"])()
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createToolSuccess"])(toolName, data);
    } catch (error) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createToolFailure"])(toolName, "GET_AVAILABLE_YEARS_FAILED", (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeErrorMessage"])(error));
    }
}
}),
"[project]/packages/mcp-server/src/tools/retrieve-conversation-history.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "retrieveConversationHistoryTool",
    ()=>retrieveConversationHistoryTool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/src/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$persistence$2f$retrieve$2d$conversation$2d$history$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/src/persistence/retrieve-conversation-history.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/shared/src/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$chat$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/schemas/chat.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/tools/tool-result.ts [app-route] (ecmascript)");
;
;
;
const toolName = "retrieve_conversation_history";
async function retrieveConversationHistoryTool(input) {
    try {
        const validated = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$chat$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["conversationHistoryRequestSchema"].parse(input);
        const conversation = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$persistence$2f$retrieve$2d$conversation$2d$history$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["retrieveConversationHistory"])(validated);
        if (!conversation) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createToolFailure"])(toolName, "CONVERSATION_NOT_FOUND", `Conversation ${validated.conversationId} was not found.`);
        }
        const data = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$schemas$2f$chat$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["conversationHistoryResponseDataSchema"].parse(conversation);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createToolSuccess"])(toolName, data);
    } catch (error) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createToolFailure"])(toolName, "RETRIEVE_CONVERSATION_HISTORY_FAILED", (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeErrorMessage"])(error));
    }
}
}),
"[project]/packages/mcp-server/src/server/register-tools.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createRegisteredServer",
    ()=>createRegisteredServer,
    "phase3ToolNames",
    ()=>phase3ToolNames,
    "registerTools",
    ()=>registerTools
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$modelcontextprotocol$2f$sdk$2f$dist$2f$esm$2f$server$2f$mcp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@modelcontextprotocol/sdk/dist/esm/server/mcp.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$calculate$2d$affordability$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/tools/calculate-affordability.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$create$2d$graph$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/tools/create-graph.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$get$2d$data$2d$source$2d$status$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/tools/get-data-source-status.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$get$2d$metrics$2d$snapshot$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/tools/get-metrics-snapshot.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$get$2d$metros$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/tools/get-metros.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$get$2d$trend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/tools/get-trend.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$get$2d$years$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/tools/get-years.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$retrieve$2d$conversation$2d$history$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/tools/retrieve-conversation-history.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/tools/tool-result.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
const phase3ToolNames = [
    "get_available_years",
    "get_metros",
    "get_metrics_snapshot",
    "get_metro_trend",
    "calculate_affordability",
    "get_data_source_status",
    "create_graph",
    "retrieve_conversation_history"
];
const noInputShape = {};
const metricsSnapshotShape = {
    year: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int()
};
const metroTrendShape = {
    metro: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    startYear: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int(),
    endYear: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int()
};
const calculateAffordabilityShape = {
    annualIncome: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().positive(),
    monthlyDebt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(0).optional(),
    householdSize: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive().optional(),
    roommates: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(0).optional(),
    targetMetro: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).optional(),
    useEstimatedAfterTaxIncome: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional()
};
const conversationHistoryShape = {
    conversationId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    limit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive().optional(),
    includeToolCalls: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional()
};
const graphAxisShape = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    field: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "category",
        "number",
        "time"
    ]),
    formatter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "currency_usd",
        "percent",
        "integer"
    ]).optional()
});
const graphSeriesShape = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    points: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].unknown()))
});
const createGraphShape = {
    inputMode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("helper").optional(),
    graphType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "metro_snapshot_bar",
        "metro_trend_line",
        "metro_compare_line",
        "affordability_scenario_bar"
    ]),
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).optional(),
    axes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        x: graphAxisShape,
        y: graphAxisShape
    }).optional(),
    series: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(graphSeriesShape).min(1).optional(),
    subtitle: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    annotations: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
            "threshold",
            "callout",
            "highlight"
        ]),
        label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
        field: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).optional(),
        value: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].union([
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number()
        ]).optional(),
        seriesId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).optional(),
        pointIndex: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(0).optional()
    })).optional(),
    formattingHints: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        showLegend: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional(),
        showGrid: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional(),
        legendPosition: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
            "top",
            "bottom",
            "left",
            "right"
        ]).optional()
    }).optional(),
    narrativeMeta: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        summary: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        highestValue: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
            value: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number()
        }).optional(),
        lowestValue: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
            value: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number()
        }).optional(),
        thresholdNotes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).optional()
    }).optional(),
    sourceTool: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "get_metrics_snapshot",
        "get_metro_trend",
        "calculate_affordability"
    ]).optional(),
    data: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].unknown().optional(),
    scenarios: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
        data: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].unknown()
    })).optional(),
    metric: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "rent_burden_percent",
        "median_gross_rent",
        "median_monthly_income",
        "maxAffordableMonthlyHousing",
        "affordabilityRatio"
    ]).optional(),
    topN: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive().optional(),
    sortOrder: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "asc",
        "desc"
    ]).optional(),
    highlightThreshold: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
    highlightMetroIds: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1)).optional()
};
function registerTools(server) {
    server.tool("get_available_years", "Return all supported years in the dataset.", noInputShape, async ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toMcpToolResponse"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$get$2d$years$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAvailableYearsTool"])()));
    server.tool("get_metros", "Return supported metro names.", noInputShape, async ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toMcpToolResponse"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$get$2d$metros$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMetrosTool"])()));
    server.tool("get_metrics_snapshot", "Return metric data for a single year.", metricsSnapshotShape, async (input)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toMcpToolResponse"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$get$2d$metrics$2d$snapshot$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMetricsSnapshotTool"])(input)));
    server.tool("get_metro_trend", "Return trend data for a metro across a year range.", metroTrendShape, async (input)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toMcpToolResponse"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$get$2d$trend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMetroTrendTool"])(input)));
    server.tool("calculate_affordability", "Run affordability calculations based on user inputs.", calculateAffordabilityShape, async (input)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toMcpToolResponse"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$calculate$2d$affordability$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateAffordabilityTool"])(input)));
    server.tool("get_data_source_status", "Return information about the current dataset source.", noInputShape, async ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toMcpToolResponse"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$get$2d$data$2d$source$2d$status$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDataSourceStatusTool"])()));
    server.tool("create_graph", "Create structured chart specifications.", createGraphShape, async (input)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toMcpToolResponse"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$create$2d$graph$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createGraphTool"])(input)));
    server.tool("retrieve_conversation_history", "Return persisted messages and optional tool calls for a conversation.", conversationHistoryShape, async (input)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$tool$2d$result$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toMcpToolResponse"])(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$retrieve$2d$conversation$2d$history$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["retrieveConversationHistoryTool"])(input)));
    return server;
}
function createRegisteredServer() {
    const server = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$modelcontextprotocol$2f$sdk$2f$dist$2f$esm$2f$server$2f$mcp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["McpServer"]({
        name: "student-reality-lab",
        version: "0.1.0"
    });
    return registerTools(server);
}
}),
"[project]/packages/mcp-server/src/index.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "startMcpServer",
    ()=>startMcpServer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$modelcontextprotocol$2f$sdk$2f$dist$2f$esm$2f$server$2f$stdio$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@modelcontextprotocol/sdk/dist/esm/server/stdio.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$server$2f$register$2d$tools$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/server/register-tools.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$calculate$2d$affordability$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/tools/calculate-affordability.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$create$2d$graph$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/tools/create-graph.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$get$2d$data$2d$source$2d$status$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/tools/get-data-source-status.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$get$2d$metrics$2d$snapshot$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/tools/get-metrics-snapshot.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$get$2d$metros$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/tools/get-metros.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$get$2d$trend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/tools/get-trend.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$get$2d$years$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/tools/get-years.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$retrieve$2d$conversation$2d$history$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/tools/retrieve-conversation-history.ts [app-route] (ecmascript)");
const __TURBOPACK__import$2e$meta__ = {
    get url () {
        return `file://${__turbopack_context__.P("packages/mcp-server/src/index.ts")}`;
    }
};
;
;
;
;
;
;
;
;
;
;
;
async function startMcpServer() {
    const server = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$server$2f$register$2d$tools$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRegisteredServer"])();
    const transport = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$modelcontextprotocol$2f$sdk$2f$dist$2f$esm$2f$server$2f$stdio$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["StdioServerTransport"]();
    await server.connect(transport);
}
if (process.argv[1] && __TURBOPACK__import$2e$meta__.url === new URL(`file://${process.argv[1]}`).href) {
    void startMcpServer();
}
}),
"[project]/apps/web/src/lib/ai/tool-runner.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runTool",
    ()=>runTool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$calculate$2d$affordability$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/tools/calculate-affordability.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$create$2d$graph$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/tools/create-graph.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$retrieve$2d$conversation$2d$history$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/tools/retrieve-conversation-history.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$get$2d$years$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/tools/get-years.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$get$2d$data$2d$source$2d$status$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/tools/get-data-source-status.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$get$2d$metrics$2d$snapshot$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/tools/get-metrics-snapshot.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$get$2d$metros$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/tools/get-metros.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$get$2d$trend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/mcp-server/src/tools/get-trend.ts [app-route] (ecmascript)");
;
const toolRegistry = {
    get_available_years: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$get$2d$years$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAvailableYearsTool"],
    get_metros: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$get$2d$metros$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMetrosTool"],
    get_metrics_snapshot: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$get$2d$metrics$2d$snapshot$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMetricsSnapshotTool"],
    get_metro_trend: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$get$2d$trend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMetroTrendTool"],
    calculate_affordability: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$calculate$2d$affordability$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateAffordabilityTool"],
    get_data_source_status: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$get$2d$data$2d$source$2d$status$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDataSourceStatusTool"],
    create_graph: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$create$2d$graph$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createGraphTool"],
    retrieve_conversation_history: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$mcp$2d$server$2f$src$2f$tools$2f$retrieve$2d$conversation$2d$history$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["retrieveConversationHistoryTool"]
};
function summarizeSuccess(toolName, data) {
    switch(toolName){
        case "get_available_years":
            {
                const yearsData = data;
                return `Resolved ${yearsData.years.length} supported years.`;
            }
        case "get_metros":
            {
                const metrosData = data;
                return `Resolved ${metrosData.metros.length} supported metros.`;
            }
        case "get_metrics_snapshot":
            {
                const snapshotData = data;
                return `Loaded ${snapshotData.rows.length} metro rows for ${snapshotData.year}.`;
            }
        case "get_metro_trend":
            {
                const trendData = data;
                return `Loaded ${trendData.series.length} trend points for ${trendData.metro}.`;
            }
        case "calculate_affordability":
            {
                const affordabilityData = data;
                return affordabilityData.results.summary ?? "Calculated affordability metrics.";
            }
        case "get_data_source_status":
            {
                const statusData = data;
                return `Active source mode is ${statusData.sourceMode}.`;
            }
        case "create_graph":
            {
                const chartData = data;
                return `Created a ${chartData.chartType} chart specification.`;
            }
        case "retrieve_conversation_history":
            {
                const historyData = data;
                return `Loaded ${historyData.messages.length} persisted messages from the conversation history.`;
            }
    }
}
async function runTool(toolName, input = {}) {
    const result = await toolRegistry[toolName](input);
    if (result.ok) {
        return {
            ok: true,
            toolName,
            result,
            summary: {
                toolName,
                status: "success",
                summary: summarizeSuccess(toolName, result.data),
                input: typeof input === "object" && input !== null ? input : undefined
            }
        };
    }
    return {
        ok: false,
        toolName,
        result,
        summary: {
            toolName,
            status: "error",
            summary: result.error.message,
            input: typeof input === "object" && input !== null ? input : undefined
        }
    };
}
}),
"[project]/apps/web/src/lib/ai/orchestrator.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "orchestrateChat",
    ()=>orchestrateChat
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs [external] (node:fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$ai$2f$tool$2d$runner$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/ai/tool-runner.ts [app-route] (ecmascript)");
;
;
;
const workspaceRoot = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].resolve(process.cwd(), "../../");
function loadWorkspaceEnv() {
    for (const fileName of [
        ".env.local",
        ".env"
    ]){
        const envPath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(workspaceRoot, fileName);
        if (__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(envPath)) {
            process.loadEnvFile(envPath);
        }
    }
}
loadWorkspaceEnv();
const snapshotMetricAliases = {
    rent_burden: "rent_burden_percent",
    rent_burden_percent: "rent_burden_percent",
    burden: "rent_burden_percent",
    median_gross_rent: "median_gross_rent",
    gross_rent: "median_gross_rent",
    rent: "median_gross_rent",
    median_monthly_income: "median_monthly_income",
    monthly_income: "median_monthly_income",
    income: "median_monthly_income"
};
function normalizePrompt(input) {
    return input.toLowerCase();
}
function extractYear(prompt, years) {
    const matches = prompt.match(/\b20\d{2}\b/g);
    if (!matches) {
        return undefined;
    }
    const matchedYear = Number(matches[0]);
    return years.includes(matchedYear) ? matchedYear : undefined;
}
function extractAnnualIncome(prompt) {
    const compactMatch = prompt.match(/\b(\d{2,3})k\b/i);
    if (compactMatch) {
        return Number(compactMatch[1]) * 1_000;
    }
    const fullMatch = prompt.match(/\$?\s*(\d{2,3}(?:,\d{3})+|\d{5,6})\b/);
    if (!fullMatch) {
        return undefined;
    }
    return Number(fullMatch[1].replaceAll(",", ""));
}
function extractMonthlyDebt(prompt) {
    const debtMatch = prompt.match(/(?:debt|loan)[^\d]*(\d{2,4})/i);
    return debtMatch ? Number(debtMatch[1]) : undefined;
}
function extractRoommates(prompt) {
    const roommatesMatch = prompt.match(/(\d+)\s+roommates?/i);
    return roommatesMatch ? Number(roommatesMatch[1]) : undefined;
}
function getMetroAliases(metro) {
    const parts = metro.toLowerCase().split(/[-,\/]/).map((part)=>part.trim()).filter((part)=>part.length >= 3);
    return Array.from(new Set([
        metro.toLowerCase(),
        ...parts
    ]));
}
function resolveMetros(prompt, metros) {
    const normalizedPrompt = normalizePrompt(prompt);
    const matches = [];
    for (const metro of metros){
        const aliases = getMetroAliases(metro);
        let bestMatch = null;
        for (const alias of aliases){
            const position = normalizedPrompt.indexOf(alias);
            if (position === -1) {
                continue;
            }
            const score = alias.length;
            if (!bestMatch || position < bestMatch.position || position === bestMatch.position && score > bestMatch.score) {
                bestMatch = {
                    metro,
                    position,
                    score
                };
            }
        }
        if (bestMatch) {
            matches.push(bestMatch);
        }
    }
    return matches.sort((left, right)=>left.position - right.position || right.score - left.score).map((match)=>match.metro);
}
function resolveMetro(prompt, metros) {
    return resolveMetros(prompt, metros)[0] ?? null;
}
function latestYear(years) {
    return years[years.length - 1];
}
function defaultTrendWindow(years) {
    const endYear = latestYear(years);
    if (endYear === undefined) {
        return null;
    }
    const startYear = years[Math.max(0, years.length - 5)] ?? endYear;
    return {
        startYear,
        endYear
    };
}
function normalizeSnapshotMetric(metric) {
    if (typeof metric !== "string") {
        return undefined;
    }
    const normalizedMetric = metric.trim().toLowerCase().replaceAll(/[\s-]+/g, "_");
    return snapshotMetricAliases[normalizedMetric];
}
function normalizePlan(plan, context) {
    switch(plan.intent){
        case "metrics_snapshot":
            {
                return {
                    ...plan,
                    metric: normalizeSnapshotMetric(plan.metric) ?? "rent_burden_percent",
                    year: typeof plan.year === "number" && context.years.includes(plan.year) ? plan.year : latestYear(context.years)
                };
            }
        case "metro_trend_chart":
            {
                return {
                    ...plan,
                    metros: plan.metros?.filter((metro)=>typeof metro === "string" && metro.length > 0)
                };
            }
        default:
            return plan;
    }
}
function mergeUniqueMetros(values) {
    return Array.from(new Set(values.filter((value)=>value.length > 0)));
}
function isRepeatPrompt(normalizedPrompt) {
    return /\b(again|same|repeat|that again|previous one)\b/.test(normalizedPrompt);
}
function isAffordabilityFollowUpPrompt(normalizedPrompt) {
    return /\b(what about|how about|instead|for)\b/.test(normalizedPrompt);
}
function isObjectRecord(value) {
    return typeof value === "object" && value !== null;
}
function buildHistoryFromMessages(messages) {
    return messages.map((message)=>({
            role: message.role,
            content: message.content
        }));
}
async function loadHistoricalPlanningContext(request) {
    const history = request.history ?? [];
    if (!request.conversationId) {
        return {
            history,
            metros: []
        };
    }
    const conversation = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$ai$2f$tool$2d$runner$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["runTool"])("retrieve_conversation_history", {
        conversationId: request.conversationId,
        limit: 8,
        includeToolCalls: true
    });
    if (!conversation.ok) {
        return {
            history,
            metros: []
        };
    }
    const persistedHistory = buildHistoryFromMessages(conversation.result.data.messages.map((message)=>({
            role: message.role,
            content: message.content
        })));
    const reversedMessages = [
        ...conversation.result.data.messages
    ].reverse();
    for (const message of reversedMessages){
        if (message.role !== "assistant") {
            continue;
        }
        if (message.intent === "metro_trend_chart") {
            const trendCalls = (message.toolCalls ?? []).filter((toolCall)=>toolCall.toolName === "get_metro_trend" && toolCall.status === "success");
            if (trendCalls.length > 0) {
                const metros = mergeUniqueMetros(trendCalls.flatMap((toolCall)=>{
                    if (!isObjectRecord(toolCall.input) || typeof toolCall.input.metro !== "string") {
                        return [];
                    }
                    return [
                        toolCall.input.metro
                    ];
                }));
                const firstCallInput = trendCalls[0]?.input;
                return {
                    history: history.length > 0 ? history : persistedHistory,
                    lastIntent: "metro_trend_chart",
                    metros,
                    startYear: isObjectRecord(firstCallInput) && typeof firstCallInput.startYear === "number" ? firstCallInput.startYear : undefined,
                    endYear: isObjectRecord(firstCallInput) && typeof firstCallInput.endYear === "number" ? firstCallInput.endYear : undefined
                };
            }
        }
        if (message.intent === "metrics_snapshot") {
            const snapshotCall = (message.toolCalls ?? []).find((toolCall)=>toolCall.toolName === "get_metrics_snapshot" && toolCall.status === "success");
            const graphCall = (message.toolCalls ?? []).find((toolCall)=>toolCall.toolName === "create_graph" && toolCall.status === "success");
            const snapshotInput = snapshotCall?.input;
            const graphInput = graphCall?.input;
            return {
                history: history.length > 0 ? history : persistedHistory,
                lastIntent: "metrics_snapshot",
                metros: [],
                year: isObjectRecord(snapshotInput) && typeof snapshotInput.year === "number" ? snapshotInput.year : undefined,
                targetMetro: undefined,
                useEstimatedAfterTaxIncome: undefined,
                ...isObjectRecord(graphInput) && typeof graphInput.metric === "string" ? {} : {}
            };
        }
        if (message.intent === "affordability") {
            const affordabilityCall = (message.toolCalls ?? []).find((toolCall)=>toolCall.toolName === "calculate_affordability" && toolCall.status === "success");
            const affordabilityInput = affordabilityCall?.input;
            if (isObjectRecord(affordabilityInput)) {
                return {
                    history: history.length > 0 ? history : persistedHistory,
                    lastIntent: "affordability",
                    metros: [],
                    annualIncome: typeof affordabilityInput.annualIncome === "number" ? affordabilityInput.annualIncome : undefined,
                    monthlyDebt: typeof affordabilityInput.monthlyDebt === "number" ? affordabilityInput.monthlyDebt : undefined,
                    roommates: typeof affordabilityInput.roommates === "number" ? affordabilityInput.roommates : undefined,
                    householdSize: typeof affordabilityInput.householdSize === "number" ? affordabilityInput.householdSize : undefined,
                    targetMetro: typeof affordabilityInput.targetMetro === "string" ? affordabilityInput.targetMetro : undefined,
                    useEstimatedAfterTaxIncome: typeof affordabilityInput.useEstimatedAfterTaxIncome === "boolean" ? affordabilityInput.useEstimatedAfterTaxIncome : undefined
                };
            }
        }
        if (message.intent === "data_source_status") {
            return {
                history: history.length > 0 ? history : persistedHistory,
                lastIntent: "data_source_status",
                metros: []
            };
        }
    }
    return {
        history: history.length > 0 ? history : persistedHistory,
        metros: []
    };
}
function buildFallbackPlan(prompt, context, historical) {
    const normalizedPrompt = normalizePrompt(prompt);
    const matchedMetros = resolveMetros(prompt, context.metros);
    const matchedMetro = matchedMetros[0] ?? null;
    const requestedYear = extractYear(prompt, context.years);
    const wantsRepeat = isRepeatPrompt(normalizedPrompt);
    const affordabilityFollowUp = isAffordabilityFollowUpPrompt(normalizedPrompt);
    const extractedIncome = extractAnnualIncome(prompt);
    const extractedDebt = extractMonthlyDebt(prompt);
    const extractedRoommates = extractRoommates(prompt);
    if (historical.lastIntent === "metro_trend_chart" && (wantsRepeat || normalizedPrompt.includes("compare"))) {
        const window = defaultTrendWindow(context.years);
        const followUpMetros = normalizedPrompt.includes("compare") ? mergeUniqueMetros([
            ...historical.metros,
            ...matchedMetros
        ]) : historical.metros;
        if (followUpMetros.length > 0) {
            return {
                intent: "metro_trend_chart",
                metros: followUpMetros,
                startYear: requestedYear ?? historical.startYear ?? window?.startYear,
                endYear: historical.endYear ?? window?.endYear
            };
        }
    }
    if (historical.lastIntent === "metrics_snapshot" && wantsRepeat) {
        return {
            intent: "metrics_snapshot",
            year: requestedYear ?? historical.year ?? latestYear(context.years),
            metric: normalizedPrompt.includes("income") ? "median_monthly_income" : normalizedPrompt.includes("rent") ? "median_gross_rent" : "rent_burden_percent",
            wantsChart: true
        };
    }
    if (historical.lastIntent === "affordability" && wantsRepeat) {
        return {
            intent: "affordability",
            annualIncome: historical.annualIncome,
            monthlyDebt: historical.monthlyDebt,
            roommates: historical.roommates,
            householdSize: historical.householdSize,
            targetMetro: historical.targetMetro,
            useEstimatedAfterTaxIncome: historical.useEstimatedAfterTaxIncome
        };
    }
    if (historical.lastIntent === "affordability" && historical.annualIncome !== undefined && (matchedMetro !== null || affordabilityFollowUp || extractedIncome !== undefined || extractedDebt !== undefined || extractedRoommates !== undefined || normalizedPrompt.includes("after tax") || normalizedPrompt.includes("take home"))) {
        return {
            intent: "affordability",
            annualIncome: extractedIncome ?? historical.annualIncome,
            monthlyDebt: extractedDebt ?? historical.monthlyDebt,
            roommates: extractedRoommates ?? historical.roommates,
            householdSize: extractedRoommates === undefined ? historical.householdSize : extractedRoommates + 1,
            targetMetro: matchedMetro ?? historical.targetMetro ?? null,
            useEstimatedAfterTaxIncome: normalizedPrompt.includes("after tax") || normalizedPrompt.includes("take home") ? true : historical.useEstimatedAfterTaxIncome
        };
    }
    if (normalizedPrompt.includes("source") || normalizedPrompt.includes("dataset") || normalizedPrompt.includes("data status")) {
        return {
            intent: "data_source_status"
        };
    }
    if (normalizedPrompt.includes("afford") || normalizedPrompt.includes("salary") || normalizedPrompt.includes("income")) {
        return {
            intent: "affordability",
            annualIncome: extractedIncome ?? historical.annualIncome,
            monthlyDebt: extractedDebt ?? historical.monthlyDebt,
            roommates: extractedRoommates,
            householdSize: extractedRoommates === undefined ? undefined : extractedRoommates + 1,
            targetMetro: matchedMetro ?? historical.targetMetro ?? null,
            useEstimatedAfterTaxIncome: normalizedPrompt.includes("after tax") || normalizedPrompt.includes("take home")
        };
    }
    if (normalizedPrompt.includes("trend") || normalizedPrompt.includes("chart") || normalizedPrompt.includes("graph")) {
        const window = defaultTrendWindow(context.years);
        return {
            intent: "metro_trend_chart",
            metros: matchedMetros.length > 0 ? matchedMetros : historical.metros,
            startYear: requestedYear ?? historical.startYear ?? window?.startYear,
            endYear: historical.endYear ?? window?.endYear
        };
    }
    if (normalizedPrompt.includes("compare") || normalizedPrompt.includes("snapshot") || normalizedPrompt.includes("metro")) {
        return {
            intent: "metrics_snapshot",
            year: requestedYear ?? latestYear(context.years),
            metric: normalizedPrompt.includes("income") ? "median_monthly_income" : normalizedPrompt.includes("rent") ? "median_gross_rent" : "rent_burden_percent",
            wantsChart: normalizedPrompt.includes("chart") || normalizedPrompt.includes("graph") || normalizedPrompt.includes("compare")
        };
    }
    return {
        intent: "help",
        assistantMessage: "Ask for a metro trend, a yearly metro comparison, an affordability estimate, or the current data source status."
    };
}
async function planWithModel(prompt, history, context) {
    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.OPENAI_MODEL ?? "gpt-5.4";
    if (!apiKey) {
        return null;
    }
    const messages = [
        {
            role: "system",
            content: [
                "You are a planning model for a housing affordability assistant.",
                "Return only JSON.",
                "Choose one intent from: metro_trend_chart, metrics_snapshot, affordability, data_source_status, help.",
                "If the user asks for a chart or trend, prefer metro_trend_chart when a metro is present; otherwise use metrics_snapshot.",
                "If the user asks for multiple metros, return metros as an ordered array matching the request order.",
                "Only use metro names from this list:",
                context.metros.join(", "),
                `Supported years: ${context.years.join(", ")}`,
                "JSON shape: { intent, assistantMessage?, metro?, metros?, startYear?, endYear?, year?, metric?, wantsChart?, annualIncome?, monthlyDebt?, targetMetro?, roommates?, householdSize?, useEstimatedAfterTaxIncome? }"
            ].join("\n")
        },
        {
            role: "user",
            content: JSON.stringify({
                prompt,
                history: history ?? []
            })
        }
    ];
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model,
            response_format: {
                type: "json_object"
            },
            messages,
            temperature: 0.1
        })
    });
    if (!response.ok) {
        return null;
    }
    const payload = await response.json();
    const content = payload.choices?.[0]?.message?.content;
    if (!content) {
        return null;
    }
    try {
        return JSON.parse(content);
    } catch  {
        return null;
    }
}
async function planRequest(request, context) {
    const historical = await loadHistoricalPlanningContext(request);
    const modelPlan = await planWithModel(request.prompt, historical.history, context);
    if (modelPlan) {
        if (modelPlan.intent === "metro_trend_chart") {
            const normalizedMetros = modelPlan.metros?.length ? modelPlan.metros : modelPlan.metro ? [
                modelPlan.metro
            ] : resolveMetros(request.prompt, context.metros).length > 0 ? resolveMetros(request.prompt, context.metros) : historical.metros;
            return {
                planner: "model",
                plan: normalizePlan({
                    ...modelPlan,
                    metros: normalizedMetros
                }, context)
            };
        }
        return {
            planner: "model",
            plan: normalizePlan(modelPlan, context)
        };
    }
    return {
        planner: "fallback",
        plan: buildFallbackPlan(request.prompt, context, historical)
    };
}
function createAssistantMessage(input) {
    const chartSpecs = input.chartSpecs ?? (input.chartSpec ? [
        input.chartSpec
    ] : undefined);
    return {
        id: `assistant-${crypto.randomUUID()}`,
        role: "assistant",
        state: input.state ?? "complete",
        content: input.content,
        ...chartSpecs?.length === 1 ? {
            chartSpec: chartSpecs[0]
        } : {},
        ...chartSpecs?.length ? {
            chartSpecs
        } : {},
        ...input.toolCalls ? {
            toolCalls: input.toolCalls
        } : {}
    };
}
function buildTrendSummary(metro, chartCreated) {
    return chartCreated ? `Here is the rent burden trend for ${metro}, including a chart spec generated from live tool output.` : `I loaded the rent burden trend for ${metro}.`;
}
function formatSeriesList(values) {
    if (values.length <= 1) {
        return values[0] ?? "";
    }
    if (values.length === 2) {
        return `${values[0]} and ${values[1]}`;
    }
    return `${values.slice(0, -1).join(", ")}, and ${values[values.length - 1]}`;
}
async function executePlan(plan, context) {
    switch(plan.intent){
        case "data_source_status":
            {
                const status = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$ai$2f$tool$2d$runner$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["runTool"])("get_data_source_status");
                return createAssistantMessage({
                    state: status.ok ? "complete" : "error",
                    content: status.ok ? `The dataset is currently running in ${status.result.data.sourceMode} mode.` : "I could not retrieve the current data source status.",
                    toolCalls: [
                        status.summary
                    ]
                });
            }
        case "affordability":
            {
                if (!plan.annualIncome) {
                    return createAssistantMessage({
                        state: "error",
                        content: "I need an annual income to run the affordability calculation. Try a prompt like: Can a $72,000 salary afford rent in Chicago?"
                    });
                }
                const affordability = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$ai$2f$tool$2d$runner$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["runTool"])("calculate_affordability", {
                    annualIncome: plan.annualIncome,
                    monthlyDebt: plan.monthlyDebt,
                    roommates: plan.roommates,
                    householdSize: plan.householdSize,
                    targetMetro: plan.targetMetro ?? undefined,
                    useEstimatedAfterTaxIncome: plan.useEstimatedAfterTaxIncome
                });
                return createAssistantMessage({
                    state: affordability.ok ? "complete" : "error",
                    content: affordability.ok ? affordability.result.data.results.summary ?? "Affordability calculation completed." : "I could not calculate affordability for that request.",
                    toolCalls: [
                        affordability.summary
                    ]
                });
            }
        case "metrics_snapshot":
            {
                const year = plan.year ?? latestYear(context.years);
                if (year === undefined) {
                    return createAssistantMessage({
                        state: "error",
                        content: "No supported year was available for a metrics snapshot."
                    });
                }
                const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$ai$2f$tool$2d$runner$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["runTool"])("get_metrics_snapshot", {
                    year
                });
                if (!snapshot.ok) {
                    return createAssistantMessage({
                        state: "error",
                        content: "I could not load the metro snapshot for that year.",
                        toolCalls: [
                            snapshot.summary
                        ]
                    });
                }
                const toolCalls = [
                    snapshot.summary
                ];
                let chartSpec;
                if (plan.wantsChart) {
                    const graph = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$ai$2f$tool$2d$runner$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["runTool"])("create_graph", {
                        inputMode: "helper",
                        graphType: "metro_snapshot_bar",
                        sourceTool: "get_metrics_snapshot",
                        data: snapshot.result.data,
                        metric: plan.metric ?? "rent_burden_percent",
                        topN: 8,
                        sortOrder: "desc",
                        highlightThreshold: plan.metric === "rent_burden_percent" ? 30 : undefined,
                        formattingHints: {
                            showLegend: false,
                            showGrid: true
                        }
                    });
                    toolCalls.push(graph.summary);
                    chartSpec = graph.ok ? graph.result.data : undefined;
                }
                return createAssistantMessage({
                    content: chartSpec ? `Here is the ${plan.metric === "median_monthly_income" ? "income" : plan.metric === "median_gross_rent" ? "rent" : "rent burden"} comparison for ${year}.` : `I loaded the metro snapshot for ${year}.`,
                    chartSpec,
                    toolCalls
                });
            }
        case "metro_trend_chart":
            {
                const metros = plan.metros?.length ? plan.metros : plan.metro ? [
                    plan.metro
                ] : [];
                const window = defaultTrendWindow(context.years);
                const startYear = plan.startYear ?? window?.startYear;
                const endYear = plan.endYear ?? window?.endYear;
                if (metros.length === 0 || startYear === undefined || endYear === undefined) {
                    return createAssistantMessage({
                        state: "error",
                        content: "I need a metro and a supported year range to build a trend chart. Try: Show a rent burden trend chart for Chicago."
                    });
                }
                const chartSpecs = [];
                const toolCalls = [];
                const completedMetros = [];
                const failedMetros = [];
                for (const metro of metros){
                    const trend = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$ai$2f$tool$2d$runner$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["runTool"])("get_metro_trend", {
                        metro,
                        startYear,
                        endYear
                    });
                    toolCalls.push(trend.summary);
                    if (!trend.ok) {
                        failedMetros.push(metro);
                        continue;
                    }
                    const graph = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$ai$2f$tool$2d$runner$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["runTool"])("create_graph", {
                        inputMode: "helper",
                        graphType: "metro_trend_line",
                        sourceTool: "get_metro_trend",
                        data: trend.result.data,
                        metric: "rent_burden_percent",
                        highlightThreshold: 30,
                        formattingHints: {
                            showLegend: false,
                            showGrid: true
                        }
                    });
                    toolCalls.push(graph.summary);
                    if (!graph.ok) {
                        failedMetros.push(metro);
                        continue;
                    }
                    chartSpecs.push(graph.result.data);
                    completedMetros.push(trend.result.data.metro);
                }
                if (chartSpecs.length === 0) {
                    return createAssistantMessage({
                        state: "error",
                        content: `I could not load the trend charts for ${formatSeriesList(metros)}.`,
                        toolCalls
                    });
                }
                const summary = failedMetros.length > 0 ? `Here are the rent burden trend charts for ${formatSeriesList(completedMetros)}. I could not finish ${formatSeriesList(failedMetros)}.` : chartSpecs.length === 1 ? buildTrendSummary(completedMetros[0] ?? metros[0], true) : `Here are the rent burden trend charts for ${formatSeriesList(completedMetros)}.`;
                return createAssistantMessage({
                    state: failedMetros.length > 0 ? "error" : "complete",
                    content: summary,
                    chartSpecs,
                    toolCalls
                });
            }
        case "help":
            return createAssistantMessage({
                content: plan.assistantMessage ?? "Ask for a metro trend, a year snapshot comparison, an affordability estimate, or the current data source status."
            });
    }
}
async function orchestrateChat(request) {
    const metros = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$ai$2f$tool$2d$runner$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["runTool"])("get_metros");
    const years = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$ai$2f$tool$2d$runner$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["runTool"])("get_available_years");
    const context = {
        metros: metros.ok ? metros.result.data.metros.map((metro)=>metro.name) : [],
        years: years.ok ? years.result.data.years : []
    };
    const planning = await planRequest(request, context);
    const message = await executePlan(planning.plan, context);
    return {
        message,
        meta: {
            planner: planning.planner,
            intent: planning.plan.intent
        }
    };
}
}),
"[project]/apps/web/src/app/api/chat/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/src/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$persistence$2f$save$2d$chat$2d$turn$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/src/persistence/save-chat-turn.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$ai$2f$orchestrator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/ai/orchestrator.ts [app-route] (ecmascript)");
;
;
;
async function POST(request) {
    let requestedConversationId;
    try {
        const body = await request.json();
        requestedConversationId = typeof body.conversationId === "string" ? body.conversationId : undefined;
        if (!body.prompt || typeof body.prompt !== "string") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: {
                    id: `assistant-${crypto.randomUUID()}`,
                    role: "assistant",
                    state: "error",
                    content: "A prompt is required."
                },
                meta: {
                    planner: "fallback",
                    intent: "help"
                }
            }, {
                status: 400
            });
        }
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$ai$2f$orchestrator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["orchestrateChat"])({
            prompt: body.prompt,
            conversationId: requestedConversationId,
            history: Array.isArray(body.history) ? body.history : []
        });
        if (response.message.role !== "assistant") {
            throw new Error("Chat orchestration returned a non-assistant message.");
        }
        let persistedConversationId = requestedConversationId;
        try {
            const persistence = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$persistence$2f$save$2d$chat$2d$turn$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["saveChatTurn"])({
                conversationId: requestedConversationId,
                userPrompt: body.prompt,
                assistantMessage: response.message,
                planner: response.meta.planner,
                intent: response.meta.intent
            });
            persistedConversationId = persistence.conversationId;
        } catch (persistenceError) {
            console.error("Chat persistence failed", persistenceError);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ...response,
            meta: {
                ...response.meta,
                conversationId: persistedConversationId
            }
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unexpected error";
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: {
                id: `assistant-${crypto.randomUUID()}`,
                role: "assistant",
                state: "error",
                content: `Chat orchestration failed: ${message}`
            },
            meta: {
                conversationId: requestedConversationId,
                planner: "fallback",
                intent: "help"
            }
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__889fcbac._.js.map