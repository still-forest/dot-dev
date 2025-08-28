import axios from "axios";
import { operatorEmailUrl } from "@/lib/config";
// import { getLogger, type LoggerService } from "@/services/logger.service";
import { type MaybeError, parseError } from "@/lib/errors/error.parser";
import type { ContactFormInput } from "@/lib/schema/contact.schema";
import type { Result } from "@/lib/types";
import { getLogger } from "./logger.service";

const EMAIL_SUBJECT = "Still Forest: contact form submission";

interface OperatorResponse {
  status: "ok";
}

class ContactService {
  async submitContactForm(input: ContactFormInput): Promise<Result<boolean>> {
    const params = {
      subject: EMAIL_SUBJECT,
      body: this.buildEmailBody(input),
    };

    try {
      const response = await axios.post<OperatorResponse>(operatorEmailUrl, params, {
        timeout: 5000,
      });
      return { success: true, data: response.status === 200 };
    } catch (error) {
      const logger = getLogger("api");
      const parsedError = parseError(error as MaybeError);
      logger.error("Error submitting contact form", { error, parsedError: parsedError });
      return { success: false, error: parsedError };
    }
  }

  private buildEmailBody(data: ContactFormInput): string {
    return `Email: ${data.email}\nMessage: ${data.message}`;
  }
}

export const contactService = new ContactService();
