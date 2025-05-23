import path from "node:path";
import type { Request, Response } from "express";
import express from "express";

const app = express();
const port = process.env.PORT || 8080;
const isProduction = process.env.NODE_ENV === "production";

app.use(express.json());

app.get("/api/status", (_req: Request, res: Response) => {
  res.json({ status: "ok", environment: process.env.NODE_ENV });
});

// React app
if (isProduction) {
  app.use(express.static("public"));

  app.get("/*splat", (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
} else {
  // Development: just a simple fallback for non-API routes
  app.get("/", (_req: Request, res: Response) => {
    res.json({ message: "Dev server running - React app is on port 5173" });
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
