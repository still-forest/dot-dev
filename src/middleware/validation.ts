import { type NextRequest, NextResponse } from "next/server";
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

      // Store validated data in headers (as JSON string) for API routes
      const response = NextResponse.next();
      response.headers.set("X-Validated-Body", JSON.stringify(validatedData));

      return response;
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
