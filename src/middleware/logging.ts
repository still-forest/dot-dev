// lib/middlewares/logging.ts
import { type NextRequest, NextResponse } from "next/server";
import { getLogger, type LogDomain } from "../services/logger.service";

// Generate a simple correlation ID (crypto.randomUUID not available in Edge Runtime)
function generateCorrelationId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function extractDomain(request: NextRequest, defaultDomain: LogDomain): LogDomain {
  // Priority order: header > query param > default
  return (
    (request.headers.get("x-log-domain") as LogDomain) ||
    (request.nextUrl.searchParams.get("domain") as LogDomain) ||
    defaultDomain
  );
}

export async function loggingMiddleware(request: NextRequest, _response: NextResponse): Promise<NextResponse | null> {
  const startTime = Date.now();
  const { pathname } = request.nextUrl;

  // Skip logging for status endpoint
  if (pathname === "/api/status") {
    return null;
  }

  const correlationId = generateCorrelationId();
  const defaultDomain = "api";
  const domain = extractDomain(request, defaultDomain);

  // Create logger with request context
  const logger = getLogger(domain).child({
    correlationId,
    domain,
    method: request.method,
    url: pathname,
    userAgent: request.headers.get("user-agent"),
    ip: request.headers.get("x-forwarded-for") || request.ip || "unknown",
  });

  // Log incoming request
  logger.info("Incoming request", {
    httpMethod: request.method,
    httpUrl: pathname,
    headers: Object.fromEntries(request.headers.entries()),
    query: Object.fromEntries(request.nextUrl.searchParams.entries()),
  });

  // Clone the response and add correlation ID header
  const newResponse = NextResponse.next();
  newResponse.headers.set("X-Correlation-ID", correlationId);

  // Store logging context in headers for API routes to access
  newResponse.headers.set("X-Log-Correlation-ID", correlationId);
  newResponse.headers.set("X-Log-Domain", domain);
  newResponse.headers.set("X-Log-Start-Time", startTime.toString());

  return newResponse;
}
