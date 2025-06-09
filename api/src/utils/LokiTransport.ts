import type winston from "winston";
import Transport from "winston-transport";

type WinstonInfo = winston.Logform.TransformableInfo;
type SuccessInfo = { count: number };

export interface LokiTransportOptions extends Transport.TransportStreamOptions {
  host: string;
  port?: number;
  ssl?: boolean;
  path?: string;
  streamLabels?: Record<string, string>;
  timeout?: number;
  batchSize?: number;
  batchInterval?: number;
  onError?: (error: Error) => void;
  onSuccess?: (info: SuccessInfo) => void;
}

interface LokiStream {
  stream: Record<string, string>;
  values: [string, string][];
}

interface LokiPayload {
  streams: LokiStream[];
}

interface LogEntry {
  timestamp: string;
  line: string;
}

export class LokiTransport extends Transport {
  private host: string;
  private port: number;
  private ssl: boolean;
  private path: string;
  private streamLabels: Record<string, string>;
  private timeout: number;
  private batchSize: number;
  private batchInterval: number;
  private onError?: (error: Error) => void;
  private onSuccess?: (info: SuccessInfo) => void;

  // Batching properties
  private logBuffer: Array<{ info: LogEntry; stream: Record<string, string> }> = [];
  private batchTimer?: NodeJS.Timeout;

  constructor(options: LokiTransportOptions) {
    super(options);

    this.host = options.host;
    this.port = options.port || (options.ssl !== false ? 443 : 80);
    this.ssl = options.ssl !== false; // Default to true
    this.path = options.path || "/loki/api/v1/push";
    this.streamLabels = options.streamLabels || {};
    this.timeout = options.timeout || 5000;
    this.batchSize = options.batchSize || 1; // Send immediately by default
    this.batchInterval = options.batchInterval || 1000; // 1 second
    this.onError = options.onError;
    this.onSuccess = options.onSuccess;
  }

  log(info: WinstonInfo, callback: () => void): void {
    setImmediate(() => {
      this.emit("logged", info);
    });

    // Extract timestamp
    const { timestamp: _timestamp, level, message, ...metadata } = info;
    const timestamp = _timestamp ? new Date(_timestamp as string) : new Date();

    // Create stream labels
    const streamLabels = {
      ...this.streamLabels,
      level: level,
    };

    // Create log line
    const logLine = {
      message,
      level,
      timestamp: timestamp.toISOString(),
      ...metadata,
    };

    // Add to batch
    this.logBuffer.push({
      info: {
        timestamp: (timestamp.getTime() * 1000000).toString(), // nanoseconds
        line: JSON.stringify(logLine),
      },
      stream: streamLabels,
    });

    // Send if batch is full or start timer
    if (this.logBuffer.length >= this.batchSize) {
      this.flushLogs();
    } else if (!this.batchTimer) {
      this.batchTimer = setTimeout(() => {
        this.flushLogs();
      }, this.batchInterval);
    }

    callback();
  }

  private async flushLogs(): Promise<void> {
    if (this.logBuffer.length === 0) return;

    // Clear timer
    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
      this.batchTimer = undefined;
    }

    // Group logs by stream labels
    const streamMap = new Map<string, Array<[string, string]>>();

    for (const logEntry of this.logBuffer) {
      const streamKey = JSON.stringify(logEntry.stream);
      if (!streamMap.has(streamKey)) {
        streamMap.set(streamKey, []);
      }
      streamMap.get(streamKey)!.push([logEntry.info.timestamp, logEntry.info.line]);
    }

    // Create Loki payload
    const streams: LokiStream[] = [];
    for (const [streamKey, values] of streamMap) {
      streams.push({
        stream: JSON.parse(streamKey),
        values: values,
      });
    }

    const payload: LokiPayload = { streams };

    // Clear buffer
    const currentBatch = this.logBuffer.length;
    this.logBuffer = [];

    // Send to Loki
    try {
      await this.sendToLoki(payload);
      console.debug(`✅ Sent ${currentBatch} log(s) to Loki successfully`);
      if (this.onSuccess) {
        this.onSuccess({ count: currentBatch });
      }
    } catch (error) {
      console.error(`❌ Failed to send ${currentBatch} log(s) to Loki:`, error);
      if (this.onError) {
        this.onError(error as Error);
      }
      this.emit("error", error);
    }
  }

  private async sendToLoki(payload: LokiPayload): Promise<void> {
    const protocol = this.ssl ? "https" : "http";
    const url = `${protocol}://${this.host}:${this.port}${this.path}`;

    console.debug(`📡 Sending to Loki: ${url}`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "winston-loki-transport",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.debug(`📬 Loki response status: ${response.status}`);

      // Loki returns 204 No Content on success
      if (!response.ok && response.status !== 204) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === "AbortError") {
        throw new Error(`Request timeout after ${this.timeout}ms`);
      }

      throw error;
    }
  }

  // Flush any remaining logs when transport is closed
  async close(): Promise<void> {
    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
    }

    // Flush remaining logs synchronously
    if (this.logBuffer.length > 0) {
      try {
        await this.flushLogs();
      } catch (error) {
        console.error("Failed to flush remaining logs:", error);
      }
    }
  }
}

// Factory function to create the transport
export function createLokiTransport(options: LokiTransportOptions): LokiTransport {
  return new LokiTransport({
    ...options,
    streamLabels: options.streamLabels || {},
    batchSize: options.batchSize ?? 1,
    batchInterval: options.batchInterval ?? 1000,
    timeout: options.timeout ?? 5000,
    onError: options.onError || ((error) => {
      console.error("🚨 Loki transport error:", error.message);
    }),
    onSuccess: options.onSuccess || ((info) => {
      console.debug(`✨ Successfully sent ${info.count} log(s) to Loki`);
    }),
  });
}
