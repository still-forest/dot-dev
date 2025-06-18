import { type NextRequest, NextResponse } from "next/server";
import { isDevelopment } from "@/config";
import { contactService } from "@/services/contact.service";
import { getLogger } from "@/services/logger.service";

export async function POST(req: NextRequest, _res: NextResponse) {
  const logger = getLogger("contact");

  try {
    const { fromEmail, body } = await req.json();

    if (isDevelopment) {
      logger.info("Contact form submitted in development environment", {
        fromEmail,
        body,
      });
      return NextResponse.json({ message: "Contact form submitted in development environment" }, { status: 204 });
    }

    const [success, error] = await contactService.submitContactForm({
      fromEmail,
      body,
    });

    if (success) {
      return NextResponse.json({ message: "Contact form submitted" }, { status: 204 });
    } else {
      logger.error("Failed to submit contact form", { error });
      return NextResponse.json({ message: "Failed to submit contact form" }, { status: 500 });
    }
  } catch (error) {
    logger.error("Failed to submit contact form", { error });
    return NextResponse.json({ message: "Failed to submit contact form" }, { status: 500 });
  }
}
