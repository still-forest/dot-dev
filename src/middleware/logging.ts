import { type NextRequest, NextResponse } from "next/server";

// Generate a simple correlation ID (crypto.randomUUID not available in Edge Runtime)
function generateCorrelationId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function extractDomain(request: NextRequest, defaultDomain: string): string {
  // Priority order: header > query param > default
  return request.headers.get("x-log-domain") || request.nextUrl.searchParams.get("domain") || defaultDomain;
}

// Simple Edge-compatible logger
function logInfo(message: string, meta: Record<string, unknown> = {}) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [INFO] ${message}`, JSON.stringify(meta));
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

  // Get IP address from headers
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";

  // Log incoming request
  logInfo("Incoming request", {
    correlationId,
    domain,
    method: request.method,
    url: pathname,
    userAgent: request.headers.get("user-agent"),
    ip,
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
