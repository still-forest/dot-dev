"use server";

import { isDevelopment } from "@/lib/config";
import { ValidationError } from "@/lib/errors/ValidationError";
import { type ContactFormInput, contactSchema } from "@/lib/schema/contact.schema";
import { contactService } from "@/lib/services/contact.service";
import { getLogger } from "@/lib/services/logger.service";
import type { Result } from "@/lib/types";

export const contact = async (rawData: ContactFormInput): Promise<Result<boolean>> => {
  const parsed = contactSchema.safeParse(rawData);
  if (!parsed.success) {
    return { success: false, error: new ValidationError("Validation failed", parsed.error.issues) };
  }
  const data = parsed.data;

  const logger = getLogger("contact");

  if (isDevelopment) {
    logger.info("Contact form submitted in development environment", data);
    return { success: true, data: true };
  }

  const { email, message } = data;
  const { success, error } = await contactService.submitContactForm({ email, message });

  logger.debug("Contact form submitted", { success, error });

  if (success) {
    return { success, data: true };
  }

  logger.error("Failed to submit contact form", { error });
  return { success: false, error };
};
