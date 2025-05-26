import { app } from "./app";
import { environment } from "./config";

async function startServer(): Promise<void> {
  const port = process.env.PORT ? Number(process.env.PORT) : 3100;

  app.listen(port, () => {
    console.log(`Starting ${environment} server on port ${port}`);
  });
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
