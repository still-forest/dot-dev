import axios from "axios";
import { registry } from "./prometheus.service";

export interface GrafanaCloudConfig {
  pushUrl: string;
  username: string;
  password: string;
  jobName: string;
}

class MetricsPusher {
  private config: GrafanaCloudConfig;
  private pushInterval: NodeJS.Timeout | null = null;

  constructor(config: GrafanaCloudConfig) {
    this.config = config;
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

      console.log("Metrics pushed successfully", { status: response.status });
    } catch (error) {
      console.error("Failed to push metrics:", error);

      if (axios.isAxiosError(error)) {
        console.error("Response data:", error.response?.data);
        console.error("Response status:", error.response?.status);
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

    console.log(`Started pushing metrics every ${intervalMs}ms`);
  }

  stop(): void {
    if (this.pushInterval) {
      clearInterval(this.pushInterval);
      this.pushInterval = null;
      console.log("Stopped pushing metrics");
    }
  }
}

export { MetricsPusher };
