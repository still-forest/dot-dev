import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import * as winston from "winston";
import { shouldLogToConsole } from "../config";

export type LogDomain = "default" | "api" | "server" | "contact";

type LogMeta = Record<string, unknown>;

export interface LoggingConfig {
  domain?: LogDomain;
  enableConsole?: boolean;
  logFilePath?: string;
  serviceName: string;
  environment: string;
}

const defaultConfig: LoggingConfig = {
  domain: "default",
  enableConsole: shouldLogToConsole,
  logFilePath: `logs/${process.env.NODE_ENV || "development"}.log`,
  serviceName: "still-forest-dot-dev",
  environment: process.env.NODE_ENV || "development",
};

const createLogger = (config: LoggingConfig) => {
  const { enableConsole, logFilePath, domain, serviceName, environment } = config;

  const transports: winston.transport[] = [];

  if (enableConsole) {
    transports.push(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.errors({ stack: true }),
          winston.format.colorize(),
          winston.format.printf((info: winston.Logform.TransformableInfo) => {
            const { timestamp, level, message, correlationId, ...meta } = info;
            const domainStr = domain || info.domain;
            const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : "";
            return `${timestamp} [${level}] [${domainStr}] [${correlationId || "N/A"}] ${message} ${metaStr}`;
          }),
        ),
      }),
    );
  }

  // File transport (JSON format for Grafana/Loki)
  if (logFilePath) {
    mkdirSync(dirname(logFilePath), { recursive: true });
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
    defaultMeta: {
      service: serviceName,
      domain: domain,
      environment: environment,
    },
    transports,
    // Don't exit on handled exceptions
    exitOnError: false,
  });
};

class LoggerService {
  private config: LoggingConfig;
  private logger: winston.Logger;

  constructor(config: LoggingConfig) {
    this.config = config;
    this.logger = createLogger(config);
  }

  child(meta: LogMeta) {
    const childLogger = this.logger.child(meta);
    const childService = new LoggerService(this.config);
    childService.logger = childLogger;
    return childService;
  }

  info(message: string, meta: LogMeta = {}) {
    this.logger.info(message, meta);
  }

  error(message: string, meta: LogMeta = {}) {
    this.logger.error(message, meta);
  }

  warn(message: string, meta: LogMeta = {}) {
    this.logger.warn(message, meta);
  }

  debug(message: string, meta: LogMeta = {}) {
    this.logger.debug(message, meta);
  }
}

export const getLogger = (domain: LogDomain, config: LoggingConfig = defaultConfig) => {
  return new LoggerService({ ...config, domain });
};

export const defaultLogger = getLogger("default");

export type { LoggerService };
