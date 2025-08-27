import "dotenv/config";
import type { LokiTransportOptions } from "./utils/LokiTransport";

export const port = Number(process.env.PORT) || 8080;

type AppEnvironment = "development" | "staging" | "production" | "test";
export const environment: AppEnvironment = (process.env.APP_ENV || "development") as AppEnvironment;
export const isProduction = environment === "production";
export const isDevelopment = environment === "development";
export const isStaging = environment === "staging";
export const isTestEnvironment = environment === "test";

export const productionOrigins = ["https://stillforest.dev", "https://www.stillforest.dev"];
export const operatorEmailUrl = process.env.OPERATOR_EMAIL_URL || "http://operator.test/api/email";

export const shouldLogToConsole = !isTestEnvironment;
export const lokiConfig: LokiTransportOptions = {
  host: process.env.LOKI_HOST!,
  port: Number(process.env.LOKI_PORT) || 443,
  ssl: process.env.LOKI_SSL !== "false",
  path: "/loki/api/v1/push",
  streamLabels: {
    job: "still-forest-dot-dev",
    service: "api",
  },
  batchSize: 1, // Send immediately for now
  timeout: 10000, // 10 second timeout
};
