import path from "node:path";
import type { Request, Response } from "express";
import express from "express";
import { setupLogging } from "@/middleware/logging.middleware";

const app = express();
const port = process.env.PORT || 8080;
const environment = process.env.NODE_ENV || "development";
const isProduction = environment === "production";

app.use(express.json());

setupLogging(app);

app.get("/api/status", (_req: Request, res: Response) => {
  res.json({ status: "ok", environment: environment });
});

// React app
if (isProduction) {
  app.use(express.static(path.join(process.cwd(), "public")));

  app.get("/", (_req: Request, res: Response) => {
    res.sendFile(path.join(process.cwd(), "public", "index.html"));
  });
} else {
  // Development: just a simple fallback for non-API routes
  app.get("/", (_req: Request, res: Response) => {
    res.json({ message: "Dev server running - React app is on port 5173" });
  });
}

app.get("/*splat", (_req: Request, res: Response) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(port, () => {
  console.log(`Starting ${environment} server on port ${port}`);
});
