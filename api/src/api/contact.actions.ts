import { isDevelopment } from "@/config";
import { getLogger } from "@/services/logger.service";
import type { Result } from "@/types";
import { type ContactFormInput, contactSchema } from "./contact.schema";
import { operatorService } from "./OperatorService";
import { ValidationError } from "./ValidationError";

const submitContactForm = async (formData: ContactFormInput) => {
  const { fromEmail, body } = formData;

  const { success, error } = await operatorService.submitContactForm({ fromEmail, body });

  if (success) {
    return true;
  }

  throw new Error(`Failed to submit form: ${error instanceof Error ? error.message : "Unknown error"}`);
};

export const contact = async (rawData: ContactFormInput): Promise<Result<boolean>> => {
  const parsed = contactSchema.safeParse(rawData);
  if (!parsed.success) {
    return { success: false, error: new ValidationError("Validation failed", parsed.error.errors) };
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
