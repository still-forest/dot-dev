import "dotenv/config";
import type { HttpTransportOptions } from "winston/lib/winston/transports";

export const port = Number(process.env.PORT) || 8080;
export const environment = process.env.NODE_ENV || "development";
export const isProduction = environment === "production";
export const isDevelopment = environment === "development";
export const isTestEnvironment = environment === "test";
export const shouldLogToConsole = !isTestEnvironment;

export const productionOrigins = ["https://stillforest.dev", "https://www.stillforest.dev"];
export const operatorEmailUrl = process.env.OPERATOR_EMAIL_URL || "http://operator.test/api/email";

export const lokiConfig: HttpTransportOptions = {
  host: process.env.LOKI_HOST,
  auth: {
    username: process.env.LOKI_USERNAME,
    password: process.env.LOKI_API_KEY,
  },
};

export const lokiStreamConfig = {
  job: "still-forest-dot-dev",
  service: "api",
};
