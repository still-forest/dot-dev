import type { Application } from "express";
import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10, // Limit each IP to N requests per `window`
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export const rateLimitMiddleware = (app: Application) => {
  app.use(limiter);
};
