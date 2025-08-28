import type { NextFunction, Request, RequestHandler, Response } from "express";
import { getLogger } from "@/services/logger.service";
import { ValidationError } from "../../../web/src/lib/errors/ValidationError";
import { contact } from "./contact.actions";

export const contactHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const logger = getLogger("contact");

    const { success, error } = await contact(req.body);

    if (success) {
      res.status(204).end();
    } else {
      if (error instanceof ValidationError) {
        res.status(400).json(error);
      } else {
        logger.error("Failed to submit contact form", { error });
        res.status(500).json({ message: "Failed to submit contact form" });
      }
    }
  } catch (error) {
    next(error);
  }
};
