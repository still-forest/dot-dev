import path from "node:path";
import type { Request, Response } from "express";
import express, { type RequestHandler } from "express";
import { environment, isDevelopment, isProduction } from "./config";
import { corsMiddleware } from "./middleware/cors.middleware";
import { setupLogging } from "./middleware/logging.middleware";
import { rateLimitMiddleware } from "./middleware/rateLimit.middleware";
import { contactService } from "./services/contact.service";
import { getLogger } from "./services/logger.service";

const app = express();

app.use(express.json());

setupLogging(app);

app.get("/api/status", (_req: Request, res: Response) => {
  res.json({ status: "ok", environment: environment });
});

app.use("/api", rateLimitMiddleware);
app.use(corsMiddleware);

app.post("/api/contact", (async (req: Request, res: Response) => {
  const logger = getLogger("contact");

  const { subject, body } = req.body;
  if (!subject || !body || typeof subject !== "string" || typeof body !== "string") {
    return res.status(400).json({ message: "Invalid input: subject and body are required" });
  }

  if (isDevelopment) {
    logger.info("Contact form submitted in development environment", { subject, body });
    res.status(204).end();
    return;
  }

  const [success, error] = await contactService.submitContactForm({ subject, body });

  if (success) {
    res.status(204).end();
  } else {
    logger.error("Failed to submit contact form", { error });
    res.status(500).json({ message: "Failed to submit contact form" });
  }
}) as RequestHandler);

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

export { app };
