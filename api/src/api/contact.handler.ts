import type { NextFunction, Request, RequestHandler, Response } from "express";
import { isDevelopment } from "@/config";
import { contactService } from "@/services/contact.service";
import { getLogger } from "@/services/logger.service";

export const contactHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const logger = getLogger("contact");
    const { fromEmail, body } = req.body;

    if (isDevelopment) {
      logger.info("Contact form submitted in development environment", { fromEmail, body });
      res.status(204).end();
      return;
    }

    const [success, error] = await contactService.submitContactForm({ fromEmail, body });

    if (success) {
      res.status(204).end();
    } else {
      logger.error("Failed to submit contact form", { error });
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  } catch (error) {
    next(error);
  }
};
