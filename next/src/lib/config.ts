import type { LokiTransportOptions } from "@/lib/utils/LokiTransport";

export const environment = process.env.NODE_ENV || "development";
export const isProduction = environment === "production";
export const isDevelopment = environment === "development";
export const isTestEnvironment = environment === "test";
export const shouldLogToConsole = !isTestEnvironment;

export const GITHUB_URL = "https://github.com/still-forest";
export const LINKEDIN_URL = "https://www.linkedin.com/in/jszymanowski";

export const operatorEmailUrl = process.env.OPERATOR_EMAIL_URL || "http://operator.test/api/email";

export const contact = {
  email: "abroad.support@stillforest.dev", // TODO: move this to API / ENV var
};

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
