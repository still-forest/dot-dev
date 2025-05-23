import { randomUUID } from "node:crypto";
import type { NextFunction, Request, Response } from "express";
import type winston from "winston";

import { createLogger, type LoggingConfig } from "../core/logger";

// Extend Express Request type to include logging context
declare global {
  namespace Express {
    interface Request {
      logger: winston.Logger;
      correlationId: string;
      domain: string;
    }
  }
}

// Middleware to extract domain from various sources
function extractDomain(req: Request, defaultDomain: string): string {
  // Priority order: header > query param > route param > default
  return (
    (req.headers["x-log-domain"] as string) ||
    (req.query.domain as string) ||
    (req.params.domain as string) ||
    defaultDomain
  );
}

// Main logging middleware
export function loggingMiddleware(config: LoggingConfig = {}) {
  const { defaultDomain = "default" } = config;
  const logger = createLogger(config);

  return (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();
    const correlationId = randomUUID();
    const domain = extractDomain(req, defaultDomain);

    // Attach correlation ID and domain to request
    req.correlationId = correlationId;
    req.domain = domain;

    // Create child logger with request context
    req.logger = logger.child({
      correlationId,
      domain,
      method: req.method,
      url: req.url,
      userAgent: req.headers["user-agent"],
      ip: req.ip || req.connection.remoteAddress,
    });

    // Add correlation ID to response headers
    res.setHeader("X-Correlation-ID", correlationId);

    // Log incoming request
    req.logger.info("Incoming request", {
      httpMethod: req.method,
      httpUrl: req.url,
      httpVersion: req.httpVersion,
      headers: req.headers,
      query: req.query,
    });

    // Capture original end function
    const originalEnd = res.end;

    // Override res.end to log response
    res.end = function (chunk?: any, encoding?: any) {
      // biome-ignore lint/suspicious/noExplicitAny: WIP
      const duration = Date.now() - startTime;

      req.logger.info("Request completed", {
        httpStatusCode: res.statusCode,
        httpResponseTime: duration,
        httpContentLength: res.getHeader("content-length") || 0,
        responseHeaders: res.getHeaders(),
      });

      // Call original end function
      originalEnd.call(this, chunk, encoding);
    };

    // Handle errors
    res.on("error", (error) => {
      req.logger.error("Response error", {
        error: error.message,
        stack: error.stack,
        httpStatusCode: res.statusCode,
      });
    });

    next();
  };
}

// Error logging middleware (should be used after routes)
export function errorLoggingMiddleware() {
  return (error: Error, req: Request, res: Response, next: NextFunction) => {
    const logger = req.logger || createLogger();

    logger.error("Unhandled error", {
      error: error.message,
      stack: error.stack,
      httpMethod: req.method,
      httpUrl: req.url,
      httpStatusCode: res.statusCode || 500,
      correlationId: req.correlationId,
      domain: req.domain,
    });

    next(error);
  };
}

// Example usage and setup
export function setupLogging(app: any, config: LoggingConfig = {}) {
  // Apply logging middleware early in the stack
  app.use(loggingMiddleware(config));

  // Apply error logging middleware after routes but before error handlers
  app.use(errorLoggingMiddleware());

  return app;
}
