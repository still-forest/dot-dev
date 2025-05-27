import { rateLimit } from "express-rate-limit";

export const rateLimitMiddleware = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});
