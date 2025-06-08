import type { NextFunction, Request, Response } from "express";
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
