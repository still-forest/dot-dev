import type { NextFunction, Request, Response } from "express";
import { PROMETHEUS_PUSH_INTERVAL_MS, prometheusConfig } from "../config";
import { type GrafanaCloudConfig, MetricsPusher } from "../services/metricsPusher.service";
import { httpDuration, httpRequests } from "../services/prometheus.service";

export const prometheusMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route?.path || req.path;

    httpDuration.labels(req.method, route, res.statusCode.toString()).observe(duration);
    httpRequests.labels(req.method, route, res.statusCode.toString()).inc();
  });

  next();
};

const metricsPusher = new MetricsPusher(prometheusConfig as GrafanaCloudConfig);
metricsPusher.startPushing(PROMETHEUS_PUSH_INTERVAL_MS);

process.on("SIGINT", () => {
  metricsPusher.stop();
  process.exit(0);
});

process.on("SIGTERM", () => {
  metricsPusher.stop();
  process.exit(0);
});
