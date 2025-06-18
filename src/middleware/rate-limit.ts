import { rateLimit } from "@daveyplate/next-rate-limit";
import { type NextRequest, NextResponse } from "next/server";

export async function rateLimitMiddleware(request: NextRequest) {
  const response = NextResponse.next();

  // Limit = 10 requests per minute, per session or IP address
  return await rateLimit({
    request,
    response,
    sessionLimit: 10,
    ipLimit: 10,
    sessionWindow: 60,
    ipWindow: 60,
  });
}
