import path from "node:path";
import type { Request, Response } from "express";
import express from "express";
import { domainLoggers } from "./core/logger";
import { setupLogging } from "./middleware/logging";

const app = express();
const port = process.env.PORT || 8080;
const environment = process.env.NODE_ENV || "development";
const isProduction = environment === "production";

// Setup logging
setupLogging(app, {
  level: "info",
  enableConsole: true,
  logFilePath: "./logs/app.log",
  serviceName: "still-forest-dot-dev",
  defaultDomain: "api",
});

app.use(express.json());

app.get("/api/status", (_req: Request, res: Response) => {
  res.json({ status: "ok", environment: environment });
});

app.get("/api/email", (req: Request, res: Response) => {
  domainLoggers.email(req, "Processing email send request", {
    recipient: req.body.recipient,
    template: req.body.template,
  });

  res.json({ success: true });
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
