import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isTestEnvironment } from "./config";
import { corsMiddleware } from "./middleware/cors";
import { loggingMiddleware } from "./middleware/logging";
import { rateLimitMiddleware } from "./middleware/rate-limit";
import { createValidationMiddleware } from "./middleware/validation";
import { ContactFormInputSchema } from "./schemas/ContactFormInput.schema";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next();
  const { pathname } = request.nextUrl;

  console.log("middleware", request);

  const loggingResult = await loggingMiddleware(request, response);
  if (loggingResult) response = loggingResult;

  if (pathname.startsWith("/api/")) {
    response = corsMiddleware(request, response);
  }

  if (pathname.startsWith("/api/contact") && !isTestEnvironment) {
    response = await rateLimitMiddleware(request);

    const validationMiddleware = createValidationMiddleware(ContactFormInputSchema);
    const validationResult = await validationMiddleware(request);

    if (validationResult && validationResult.status !== 200) {
      return validationResult;
    }
  }

  return response;
}

export const config = {
  matcher: ["/api/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
};
