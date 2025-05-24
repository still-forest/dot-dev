import * as winston from "winston";

export interface LoggingConfig {
  level?: string;
  defaultDomain?: string;
  enableConsole?: boolean;
  logFilePath?: string;
  serviceName: string;
  environment: string;
}

const defaultConfig: LoggingConfig = {
  level: "info",
  defaultDomain: "default",
  enableConsole: true,
  logFilePath: `logs/${process.env.NODE_ENV || "development"}.log`,
  serviceName: "still-forest-dot-dev",
  environment: process.env.NODE_ENV || "development",
};

const createLogger = (config: LoggingConfig) => {
  const { level, enableConsole, logFilePath, serviceName, environment } = config;

  const transports: winston.transport[] = [];

  if (enableConsole) {
    transports.push(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.errors({ stack: true }),
          winston.format.colorize(),
          winston.format.printf(({ timestamp, level, message, domain, correlationId, ...meta }) => {
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
    level,
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

  constructor(config: LoggingConfig = defaultConfig) {
    this.logger = createLogger(config);
  }

  child(meta: winston.Logform.Meta) {
    return this.logger.child(meta);
  }

  // biome-ignore lint/suspicious/noExplicitAny: I don't think meta is being used
  info(message: string, context?: string, meta?: any) {
    this.logger.info(message, { context, ...meta });
  }

  // biome-ignore lint/suspicious/noExplicitAny: I don't think meta is being used
  log(message: string, context?: string, meta?: any) {
    this.info(message, context, meta);
  }

  // biome-ignore lint/suspicious/noExplicitAny: I don't think meta is being used
  error(message: string, trace?: string, context?: string, meta?: any) {
    this.logger.error(message, { trace, context, ...meta });
  }

  // biome-ignore lint/suspicious/noExplicitAny: I don't think meta is being used
  warn(message: string, context?: string, meta?: any) {
    this.logger.warn(message, { context, ...meta });
  }

  // biome-ignore lint/suspicious/noExplicitAny: I don't think meta is being used
  debug(message: string, context?: string, meta?: any) {
    this.logger.debug(message, { context, ...meta });
  }

  // biome-ignore lint/suspicious/noExplicitAny: I don't think meta is being used
  verbose(message: string, context?: string, meta?: any) {
    this.logger.verbose(message, { context, ...meta });
  }
}

export const logger = new LoggerService();
