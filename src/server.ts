import type { Request, Response } from "express";
import express from "express";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get("/api", (_req: Request, res: Response) => {
  res.json({ message: "Hello from TypeScript Express!" });
});

// React app
app.use(express.static("dist"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
