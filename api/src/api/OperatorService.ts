import axios from "axios";
import { getLogger, type LoggerService } from "@/services/logger.service";
import type { Result } from "@/types";
import { operatorEmailUrl } from "../config";
import type { ContactFormInput } from "./contact.schema";

const EMAIL_SUBJECT = "Still Forest: contact form submission";

interface OperatorResponse {
  status: "ok";
}

class OperatorService {
  private readonly logger: LoggerService;

  constructor() {
    this.logger = getLogger("contact");
  }

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
      this.logger.error("Error submitting contact form", { error });
      return { success: false, error: error instanceof Error ? error : new Error(String(error)) };
    }
  }

  private buildEmailBody(data: ContactFormInput): string {
    return `Email: ${data.fromEmail}\nMessage: ${data.body}`;
  }
}

export const operatorService = new OperatorService();
