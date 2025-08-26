"use server";

import { isDevelopment } from "@/lib/config";
import type { ContactFormData } from "@/lib/schema/contact-schema";
import { contactService } from "@/services/contact.service";
import { getLogger } from "@/services/logger.service";

const submitContactForm = async (formData: ContactFormData) => {
  const logger = getLogger("contact");
  const { email, message } = formData;

  const [success, error] = await contactService.submitContactForm({ fromEmail: email, body: message });

  if (success) {
    return true;
  }

  logger.error("Failed to submit contact form", { error });
  throw new Error(`Failed to submit form: ${error instanceof Error ? error.message : "Unknown error"}`);
};

export const contact = async (data: ContactFormData) => {
  const logger = getLogger("contact");

  if (isDevelopment) {
    logger.info("Contact form submitted in development environment", data);
    return true;
  }

  return await submitContactForm(data);
};
