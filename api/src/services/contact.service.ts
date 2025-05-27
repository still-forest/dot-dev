import axios from "axios";
import { operatorEmailUrl } from "../config";
import { getLogger, type LoggerService } from "./logger.service";

const EMAIL_SUBJECT = "Still Forest: contact form submission";

interface ContactFormInput {
  fromEmail: string;
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

    const params = {
      subject: EMAIL_SUBJECT,
      body: this.buildEmailBody(input),
    };

    try {
      await axios.post<OperatorResponse>(operatorEmailUrl, params, {
        timeout: 5000,
      });
      return [true, null];
    } catch (error) {
      this.logger.error("Error submitting contact form", { error });
      return [false, error instanceof Error ? error : new Error(String(error))];
    }
  }

  validateInputs(input: ContactFormInput): [boolean, Error | null] {
    if (!input.fromEmail || !input.body || typeof input.fromEmail !== "string" || typeof input.body !== "string") {
      return [false, new Error("Invalid input: fromEmail and body are required")];
    }
    return [true, null];
  }

  private buildEmailBody(data: ContactFormInput): string {
    return `Email: ${data.fromEmail}\nMessage: ${data.body}`;
  }
}

export const contactService = new ContactService();
