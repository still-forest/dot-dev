import type { Request } from "express";
import winston from "winston";

export interface LoggingConfig {
  level?: string;
  defaultDomain?: string;
  enableConsole?: boolean;
  logFilePath?: string;
  serviceName?: string;
}

// Create the main logger instance
export function createLogger(config: LoggingConfig = {}) {
  const { level = "info", enableConsole = true, logFilePath, serviceName = "express-app" } = config;

  const transports: winston.transport[] = [];

  // Console transport for development
  if (enableConsole) {
    transports.push(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.errors({ stack: true }),
          winston.format.colorize(),
          winston.format.printf(({ timestamp, level, message, domain, correlationId, ...meta }) => {
            const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : "";
            return `${timestamp} [${level}] [${domain || "default"}] [${correlationId || "N/A"}] ${message} ${metaStr}`;
          }),
        ),
      }),
    );
  }

  // File transport for production (JSON format for Grafana/Loki)
  if (logFilePath) {
    transports.push(
      new winston.transports.File({
        filename: logFilePath,
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.errors({ stack: true }),
          winston.format.json(),
        ),
      }),
    );
  }

  return winston.createLogger({
    level,
    defaultMeta: {
      service: serviceName,
      environment: process.env.NODE_ENV || "development",
    },
    transports,
    // Don't exit on handled exceptions
    exitOnError: false,
  });
}

// Helper function to log with domain context
export function logWithDomain(req: Request, level: string, message: string, meta: any = {}) {
  const logger = req.logger || createLogger();
  logger.log(level, message, {
    ...meta,
    correlationId: req.correlationId,
    domain: req.domain,
  });
}

// Example domain-specific logging utilities
export const domainLoggers = {
  email: (req: Request, message: string, meta?: any) =>
    logWithDomain(req, "info", message, { ...meta, domain: "email" }),

  integration: (req: Request, integrationName: string, message: string, meta?: any) =>
    logWithDomain(req, "info", message, { ...meta, domain: `integration_${integrationName}` }),

  auth: (req: Request, message: string, meta?: any) => logWithDomain(req, "info", message, { ...meta, domain: "auth" }),

  payment: (req: Request, message: string, meta?: any) =>
    logWithDomain(req, "info", message, { ...meta, domain: "payment" }),
};
