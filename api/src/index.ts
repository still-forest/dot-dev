import path from "node:path";
import type { Request, Response } from "express";
import express from "express";
import { environment, isProduction, port } from "./config";
import corsMiddleware from "./middleware/cors.middleware";
import { setupLogging } from "./middleware/logging.middleware";
import { contactService } from "./services/contact.service";

const app = express();

app.use(express.json());

setupLogging(app);

app.get("/api/status", (_req: Request, res: Response) => {
  res.json({ status: "ok", environment: environment });
});

app.use(corsMiddleware);

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

app.post("/api/contact", async (req: Request, res: Response) => {
  const { subject, body } = req.body;

  const [success, error] = await contactService.submitContactForm({ subject, body });

  console.log("success", success);
  console.log("error", error);

  if (success) {
    res.status(204);
  } else {
    res.status(500).json({ message: error });
  }
});

app.get("/*splat", (_req: Request, res: Response) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(port, () => {
  console.log(`Starting ${environment} server on port ${port}`);
});

export { app };
