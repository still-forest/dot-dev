import * as winston from "winston";

export type LogDomain = "default" | "api" | "auth" | "user" | "admin" | "system";

type LogMeta = Record<string, string | number | boolean | undefined>;

export interface LoggingConfig {
  domain?: LogDomain;
  enableConsole?: boolean;
  logFilePath?: string;
  serviceName: string;
  environment: string;
}

const defaultConfig: LoggingConfig = {
  domain: "default",
  enableConsole: true,
  logFilePath: `logs/${process.env.NODE_ENV || "development"}.log`,
  serviceName: "still-forest-dot-dev",
  environment: process.env.NODE_ENV || "development",
};

const createLogger = (config: LoggingConfig) => {
  const { enableConsole, logFilePath, serviceName, environment } = config;

  const transports: winston.transport[] = [];

  if (enableConsole) {
    transports.push(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.errors({ stack: true }),
          winston.format.colorize(),
          winston.format.printf((info: winston.Logform.TransformableInfo) => {
            const { timestamp, level, message, domain, correlationId, ...meta } = info;
            const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : "";
            return `${timestamp} [${level}] [${domain}] [${correlationId || "N/A"}] ${message} ${metaStr}`;
          }),
        ),
      }),
    );
  }

  // File transport (JSON format for Grafana/Loki)
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
    defaultMeta: {
      service: serviceName,
      environment: environment,
    },
    transports,
    // Don't exit on handled exceptions
    exitOnError: false,
  });
};

class LoggerService {
  private logger: winston.Logger;

  constructor(config: LoggingConfig) {
    this.logger = createLogger(config);
  }

  child(meta: LogMeta) {
    return this.logger.child(meta);
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
