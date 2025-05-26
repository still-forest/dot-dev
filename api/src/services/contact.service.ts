import axios from "axios";
import { operatorEmailUrl } from "../config";
import { getLogger, type LoggerService } from "./logger.service";

interface ContactFormInput {
  subject: string;
  body: string;
}

interface OperatorResponse {
  status: "ok";
}

class ContactService {
  private readonly logger: LoggerService;

  constructor() {
    this.logger = getLogger("contact");
  }

  async submitContactForm(input: ContactFormInput): Promise<[boolean, Error | null]> {
    const [valid, error] = this.validateInputs(input);
    if (!valid) {
      return [false, error];
    }

    try {
      await axios.post<OperatorResponse>(operatorEmailUrl, input, {
        timeout: 5000,
      });
      return [true, null];
    } catch (error) {
      this.logger.error("Error submitting contact form", { error });
      return [false, error instanceof Error ? error : new Error(String(error))];
    }
  }

  validateInputs(input: ContactFormInput): [boolean, Error | null] {
    if (!input.subject || !input.body || typeof input.subject !== "string" || typeof input.body !== "string") {
      return [false, new Error("Invalid input: subject and body are required")];
    }
    return [true, null];
  }
}

export const contactService = new ContactService();
