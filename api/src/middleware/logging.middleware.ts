import { randomUUID } from "node:crypto";
import type { Application, NextFunction, Request, Response } from "express";
import { getLogger, type LogDomain } from "../services/logger.service";

// Extend Express Request type to include logging context
declare global {
  namespace Express {
    interface Request {
      logger: ReturnType<typeof getLogger>;
      correlationId: string;
      domain: LogDomain;
    }
  }
}

// Middleware to extract domain from various sources
function extractDomain(req: Request, defaultDomain: LogDomain): LogDomain {
  // Priority order: header > query param > route param > default
  return (
    (req.headers["x-log-domain"] as LogDomain) ||
    (req.query.domain as LogDomain) ||
    (req.params.domain as LogDomain) ||
    defaultDomain
  );
}

const loggingMiddleware = () => {
  const defaultDomain = "api";
  const logger = getLogger(defaultDomain);

  return (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();
    const correlationId = randomUUID();
    const domain = extractDomain(req, defaultDomain);

    if (req.url === "/api/status") {
      next();
      return;
    }

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
      ip: (req.headers["x-forwarded-for"] as string) || req.ip || req.socket.remoteAddress,
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

    // Override res.end to log response
    const originalEnd = res.end;
    res.end = function (chunk?: unknown, encoding?: BufferEncoding | (() => void), cb?: () => void) {
      const duration = Date.now() - startTime;

      req.logger.info("Request completed", {
        httpStatusCode: res.statusCode,
        httpResponseTime: duration,
        httpContentLength: res.getHeader("content-length") || 0,
        responseHeaders: res.getHeaders(),
      });

      if (typeof encoding === "function") {
        return (originalEnd as typeof res.end).call(this, chunk, "utf8", encoding);
      }
      return (originalEnd as typeof res.end).call(this, chunk, encoding || "utf8", cb);
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
};

const errorLoggingMiddleware = () => {
  return (error: Error, req: Request, res: Response, next: NextFunction) => {
    const logger = req.logger || getLogger("api");
    logger.error("Unhandled error", {
      error: error.message,
      stack: error.stack,
      httpMethod: req.method,
      httpUrl: req.url,
      httpStatusCode: res.statusCode || 500,
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
