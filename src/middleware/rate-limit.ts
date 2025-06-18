import { rateLimit } from "@daveyplate/next-rate-limit";
import { type NextRequest, NextResponse } from "next/server";

export async function rateLimitMiddleware(request: NextRequest) {
  const response = NextResponse.next();

  return await rateLimit({
    request,
    response,
    sessionLimit: 30,
    ipLimit: 120,
    sessionWindow: 10,
    ipWindow: 10,
  });
}
