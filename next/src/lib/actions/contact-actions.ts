"use server";

import { isDevelopment } from "@/lib/config";
import type { ContactFormData } from "@/lib/schema/contact-schema";
import type { Response } from "@/lib/types";
import { contactService } from "@/services/contact.service";
import { getLogger } from "@/services/logger.service";

const submitContactForm = async (formData: ContactFormData) => {
  const { email, message } = formData;

  const [success, error] = await contactService.submitContactForm({ fromEmail: email, body: message });

  if (success) {
    return true;
  }

  throw new Error(`Failed to submit form: ${error instanceof Error ? error.message : "Unknown error"}`);
};

export const contact = async (data: ContactFormData): Promise<Response<boolean>> => {
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
