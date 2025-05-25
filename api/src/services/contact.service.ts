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

  submitContactForm(input: ContactFormInput) {
    this.logger.info("Submitting contact form", { input });
    return [true, null];
  }
}

export const contactService = new ContactService();
