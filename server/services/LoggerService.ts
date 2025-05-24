import * as winston from "winston";

export class LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: "debug",
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
      defaultMeta: { service: "api-service" },
      transports: [
        // Console transport
        new winston.transports.Console({
          level: "debug",
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            winston.format.colorize(),
            winston.format.printf((info) => `${info.timestamp as string} ${info.level}: ${info.message as string}`),
          ),
        }),
        // File transport for errors
        new winston.transports.File({
          filename: "logs/error.log",
          level: "error",
          format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        }),
        // File transport for all logs
        new winston.transports.File({
          filename: "logs/combined.log",
          format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        }),
      ],
    });
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
