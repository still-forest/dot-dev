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
    this.logger.info("Submitting contact form", { input });

    // TODO: Add validation

    try {
      await axios.post<OperatorResponse>(operatorEmailUrl, input, {
        timeout: 5000,
      });
      return [true, null];
    } catch (error) {
      return [false, error instanceof Error ? error : new Error(String(error))];
    }
  }
}

export const contactService = new ContactService();
