import axios from "axios";
import { operatorEmailUrl } from "@/lib/config";
import type { ContactFormInput } from "@/lib/schema/contact.schema";
// import { getLogger, type LoggerService } from "@/services/logger.service";
import type { Result } from "@/lib/types";

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
      await axios.post<OperatorResponse>(operatorEmailUrl, params, {
        timeout: 5000,
      });
      return { success: true, data: true };
    } catch (error) {
      // this.logger.error("Error submitting contact form", { error });
      return { success: false, error: error instanceof Error ? error : new Error(String(error)) };
    }
  }

  private buildEmailBody(data: ContactFormInput): string {
    return `Email: ${data.email}\nMessage: ${data.message}`;
  }
}

export const contactService = new ContactService();
