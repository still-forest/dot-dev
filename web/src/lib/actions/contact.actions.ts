"use server";

import { isDevelopment } from "@/lib/config";
import { ValidationError } from "@/lib/errors/ValidationError";
import { type ContactFormInput, contactSchema } from "@/lib/schema/contact.schema";
import { contactService } from "@/lib/services/contact.service";
import { getLogger } from "@/lib/services/logger.service";
import type { Result } from "@/lib/types";

const submitContactForm = async (formData: ContactFormInput) => {
  const { email, message } = formData;

  const { success, error } = await contactService.submitContactForm({ email, message });

  if (success) {
    return true;
  }

  throw new Error(`Failed to submit form: ${error instanceof Error ? error.message : "Unknown error"}`);
};

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

  try {
    const result = await submitContactForm(data);
    return { success: true, data: result };
  } catch (error) {
    logger.error("Failed to submit contact form", { error });
    return { success: false, error: error instanceof Error ? error : new Error(String(error)) };
  }
};
