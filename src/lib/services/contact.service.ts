import axios from "axios";
import { operatorEmailUrl } from "@/lib/config/server";
import { type MaybeError, parseError } from "@/lib/errors/error.parser";
import type { ContactFormInput } from "@/lib/schema/contact.schema";
import type { Result } from "@/lib/types";
import { getLogger } from "./logger.service";

const EMAIL_SUBJECT = "Still Forest: contact form submission";

interface OperatorResponse {
  status: "ok";
}

class ContactService {
  private readonly logger = getLogger("api");

  async submitContactForm(input: ContactFormInput): Promise<Result<boolean>> {
    const params = {
      subject: EMAIL_SUBJECT,
      body: this.buildEmailBody(input),
    };

    try {
      const response = await axios.post<OperatorResponse>(operatorEmailUrl, params, {
        timeout: 5000,
      });
      const ok = response.status >= 200 && response.status < 300 && response.data?.status === "ok";
      return { success: true, data: ok };
    } catch (error) {
      const parsedError = parseError(error as MaybeError);
      this.logger.error("Error submitting contact form", { error, parsedError });
      return { success: false, error: parsedError };
    }
  }

  private buildEmailBody(data: ContactFormInput): string {
    return `Email: ${data.email}\nMessage: ${data.message}`;
  }
}

export const contactService = new ContactService();
