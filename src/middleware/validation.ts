import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export function createValidationMiddleware(schema: z.ZodSchema<unknown>) {
  return async (request: NextRequest): Promise<NextResponse | null> => {
    // Only validate POST, PUT, PATCH requests
    if (!["POST", "PUT", "PATCH"].includes(request.method)) {
      return null;
    }

    try {
      const contentType = request.headers.get("content-type");

      if (!contentType?.includes("application/json")) {
        return NextResponse.json({ message: "Content-Type must be application/json" }, { status: 400 });
      }

      const body = await request.json();
      const validatedData = schema.parse(body);

      console.log("validatedData", validatedData);

      // Clone the request and add validated data as a header
      const modifiedRequest = new NextRequest(request.url, {
        method: request.method,
        headers: new Headers(request.headers),
        body: JSON.stringify(validatedData),
      });

      // Add the validated data as a header on the cloned request
      modifiedRequest.headers.set("X-Validated-Body", JSON.stringify(validatedData));

      // Forward the modified request to the next handler
      return NextResponse.next({
        request: modifiedRequest,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            message: "Validation failed",
            errors: error.errors.map((err: z.ZodIssue) => ({
              field: err.path.join("."),
              message: err.message,
            })),
          },
          { status: 400 },
        );
      }

      return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
    }
  };
}
