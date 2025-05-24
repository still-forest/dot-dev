import type { Application, NextFunction, Request, Response } from "express";
import { logger } from "../services/logger.service";

const loggingMiddleware = () => {
  return (req: Request, _res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  };
};

const errorLoggingMiddleware = () => {
  return (error: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error("Unhandled error", undefined, undefined, {
      error: error.message,
      stack: error.stack,
      httpMethod: req.method,
      httpUrl: req.url,
      httpStatusCode: res.statusCode || 500,
      // correlationId: req.correlationId,
      // domain: req.domain,
    });

    next(error);
  };
};

// Example usage and setup
export function setupLogging(app: Application) {
  app.use(loggingMiddleware());
  app.use(errorLoggingMiddleware());

  return app;
}
