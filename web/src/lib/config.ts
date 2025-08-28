import type { LokiTransportOptions } from "./utils/LokiTransport";

type AppEnvironment = "development" | "staging" | "production" | "test";
export const environment: AppEnvironment = (process.env.NODE_ENV || "development") as AppEnvironment;
export const isProduction = environment === "production";
export const isDevelopment = environment === "development";
export const isStaging = environment === "staging";
export const isTestEnvironment = environment === "test";

export const GITHUB_URL = "https://github.com/still-forest";
export const LINKEDIN_URL = "https://www.linkedin.com/in/jszymanowski";

export const operatorEmailUrl = process.env.OPERATOR_EMAIL_URL || "http://operator.test/api/email";

export const CONTACT_SUBMISSION_URL = isProduction ? "/api/contact" : "http://localhost:8080/api/contact";
export const DEV_CONTACT_FROM_EMAIL = isDevelopment ? "dev@test.dev" : "";
export const CONTACT_FORM_RATE_LIMIT_MS = 60_000;

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
