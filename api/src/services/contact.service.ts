import { contactSubmissionUrl } from "../config";
import { getLogger, type LoggerService } from "./logger.service";

interface ContactFormInput {
  subject: string;
  body: string;
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
      const response = await fetch(contactSubmissionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      if (!response.ok) {
        console.log("response", response);
        const errorMessage = response.status
          ? `Failed to submit form: ${response.status} ${response.statusText}`
          : response.statusText;
        throw new Error(errorMessage);
      }
      return [true, null];
    } catch (error) {
      console.log("error", error);
      return [false, error instanceof Error ? error : new Error(String(error))];
    }
  }
}

export const contactService = new ContactService();
