import path from "node:path";
import { LoggerService } from "@server/services/LoggerService";
import type { NextFunction, Request, Response } from "express";
import express from "express";

const app = express();
const port = process.env.PORT || 8080;
const environment = process.env.NODE_ENV || "development";
const isProduction = environment === "production";

// Express does not provide a type definition for error handlers
interface ErrorWithStatus extends Error {
  status?: number;
}

app.use(express.json());

const logger = new LoggerService();

// Error logging middleware
app.use((err: ErrorWithStatus, req: Request, _res: Response, next: NextFunction) => {
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  next(err);
});

// Middleware to log requests
app.use((req, _res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.get("/api/status", (_req: Request, res: Response) => {
  res.json({ status: "ok", environment: environment });
});

// React app
if (isProduction) {
  app.use(express.static(path.join(process.cwd(), "public")));

  app.get("/*splat", (_req: Request, res: Response) => {
    res.sendFile(path.join(process.cwd(), "public", "index.html"));
  });
} else {
  // Development: just a simple fallback for non-API routes
  app.get("/", (_req: Request, res: Response) => {
    res.json({ message: "Dev server running - React app is on port 5173" });
  });
}

app.listen(port, () => {
  console.log(`Starting ${environment} server on port ${port}`);
});
