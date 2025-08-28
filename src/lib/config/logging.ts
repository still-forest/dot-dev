import type { LokiTransportOptions } from "@/lib/utils/LokiTransport";
import { isTestEnvironment } from "./environment";

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
