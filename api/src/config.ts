import "dotenv/config";
import type { LokiTransportOptions } from "winston-loki";
import type { GrafanaCloudConfig } from "./types";

export const port = Number(process.env.PORT) || 8080;
export const environment = process.env.NODE_ENV || "development";
export const isProduction = environment === "production";
export const isDevelopment = environment === "development";
export const isTestEnvironment = environment === "test";
export const shouldLogToConsole = !isTestEnvironment;

export const productionOrigins = ["https://stillforest.dev", "https://www.stillforest.dev"];
export const operatorEmailUrl = process.env.OPERATOR_EMAIL_URL || "http://operator.test/api/email";

export const lokiConfig: LokiTransportOptions = {
  host: process.env.LOKI_HOST,
  labels: {
    app: "still-forest-dot-dev",
    environment: environment,
  },
  auth: {
    username: process.env.LOKI_USERNAME,
    password: process.env.LOKI_API_KEY,
  },
  json: true,
};

export const prometheusConfig: GrafanaCloudConfig = {
  pushUrl: process.env.PROMETHEUS_PUSH_URL || "",
  username: process.env.PROMETHEUS_USERNAME || "",
  password: process.env.PROMETHEUS_API_KEY || "",
  jobName: "still-forest-dot-dev",
};
export const PROMETHEUS_PUSH_INTERVAL_MS = 30_000;
