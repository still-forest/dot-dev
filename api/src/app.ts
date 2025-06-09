import path from "node:path";
import type { Request, Response } from "express";
import express from "express";
import { contactHandler } from "./api/contact.handler";
import { environment, isProduction, isTestEnvironment } from "./config";
import { corsMiddleware } from "./middleware/cors.middleware";
import { setupLogging } from "./middleware/logging.middleware";
import { rateLimitMiddleware } from "./middleware/rateLimit.middleware";
import { validateInputSchema } from "./middleware/schemaValidation.middleware";
import { ContactFormInputSchema } from "./schemas/ContactFormInput.schema";

const app = express();

app.use(express.json());

setupLogging(app);

app.get("/api/status", (_req: Request, res: Response) => {
  res.json({ status: "ok", environment: environment });
});

if (!isTestEnvironment) {
  app.use("/api", rateLimitMiddleware);
}
app.use(corsMiddleware);

app.post("/api/contact", validateInputSchema(ContactFormInputSchema), contactHandler);

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
