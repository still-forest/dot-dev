import { app } from "./app";
import { environment, port } from "./config";
import { getLogger } from "./services/logger.service";

const logger = getLogger("server");

async function startServer(): Promise<void> {
  app.listen(port, () => {
    logger.info(`Starting ${environment} server on port ${port}`);
  });
}

startServer().catch((err) => {
  logger.error("Error starting server:", err);
});
