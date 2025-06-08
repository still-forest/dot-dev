import axios from "axios";
import { Counter, collectDefaultMetrics, Histogram, Registry } from "prom-client";
import type { GrafanaCloudConfig } from "../types";
import { getLogger, type LoggerService } from "./logger.service";

const registry = new Registry();
collectDefaultMetrics({ register: registry });

const httpDuration = new Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
});

const httpRequests = new Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});

registry.registerMetric(httpDuration);
registry.registerMetric(httpRequests);

class MetricsPusher {
  private config: GrafanaCloudConfig;
  private pushInterval: NodeJS.Timeout | null = null;
  private logger: LoggerService;

  constructor(config: GrafanaCloudConfig) {
    if (!config.pushUrl || !config.username || !config.password) {
      throw new Error("Missing required configuration for metrics pusher");
    }

    this.config = config;
    this.logger = getLogger("prometheus");
  }

  async pushMetrics(): Promise<void> {
    try {
      const metrics = await registry.metrics();

      const response = await axios.post(this.config.pushUrl, metrics, {
        headers: {
          "Content-Type": "text/plain; version=0.0.4; charset=utf-8",
          Authorization: `Basic ${Buffer.from(`${this.config.username}:${this.config.password}`).toString("base64")}`,
        },
        timeout: 10000,
      });

      this.logger.info("Metrics pushed successfully", { status: response.status });
    } catch (error) {
      this.logger.error("Failed to push metrics:", { error });

      if (axios.isAxiosError(error)) {
        this.logger.error("Response data:", { data: error.response?.data });
        this.logger.error("Response status:", { status: error.response?.status });
      }
    }
  }

  startPushing(intervalMs: number = 30000): void {
    if (this.pushInterval) {
      clearInterval(this.pushInterval);
    }

    this.pushMetrics();
    this.pushInterval = setInterval(() => {
      this.pushMetrics();
    }, intervalMs);

    this.logger.info(`Started pushing metrics every ${intervalMs}ms`);
  }

  stop(): void {
    if (this.pushInterval) {
      clearInterval(this.pushInterval);
      this.pushInterval = null;
      this.logger.info("Stopped pushing metrics");
    }
  }
}

export { registry, httpDuration, httpRequests, MetricsPusher };
