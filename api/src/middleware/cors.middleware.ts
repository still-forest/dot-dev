import cors, { type CorsOptions } from "cors";
import type { NextFunction, Request, Response } from "express";
import { isDevelopment, productionOrigins } from "../config";

type CorsCallback = (error: Error | null, allow?: boolean) => void;

// CORS middleware configuration
const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: CorsCallback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (isDevelopment) {
      // In development, allow all localhost and 127.0.0.1 origins
      if (
        origin.startsWith("http://localhost:") ||
        origin.startsWith("https://localhost:") ||
        origin.startsWith("http://127.0.0.1:") ||
        origin.startsWith("https://127.0.0.1:")
      ) {
        return callback(null, true);
      }

      // If we're in dev mode but origin doesn't match localhost patterns,
      // still allow it (for cases like local network testing)
      return callback(null, true);
    }

    // Production allowed origins
    const allowedOrigins = productionOrigins;

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Reject origin
    return callback(new Error(`Origin ${origin} not allowed by CORS: ${origin.startsWith("http://localhost:")}`));
  },
  credentials: true, // Allow cookies and credentials
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "Cache-Control",
    "X-Requested-With",
  ],
};

// Alternative: Simple development-only CORS (less secure but easier)
const devCorsOptions: CorsOptions = {
  origin: true, // Allow all origins in development
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["*"],
};

// Export the middleware function
export const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const corsHandler = process.env.NODE_ENV === "development" ? cors(devCorsOptions) : cors(corsOptions);

  return corsHandler(req, res, next);
};

// Also export the raw options for more granular control
export { corsOptions, devCorsOptions };

// Default export for convenience
export default corsMiddleware;

// Usage in your Express app:
// import corsMiddleware from './middleware/cors';
// app.use(corsMiddleware);
