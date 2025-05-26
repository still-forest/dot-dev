import cors, { type CorsOptions } from "cors";
import type { NextFunction, Request, Response } from "express";
import { isDevelopment, productionOrigins } from "../config";

type CorsCallback = (error: Error | null, allow?: boolean) => void;

const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: CorsCallback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (isDevelopment) {
      return callback(null, true);
    }

    if (productionOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`Origin ${origin} not allowed by CORS`));
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

export const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const corsHandler = cors(corsOptions);

  return corsHandler(req, res, next);
};
