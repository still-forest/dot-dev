import { beforeEach, describe, expect, test, vi } from "vitest";
import { contact } from "@/lib/actions/contact-actions";
import { contactService } from "@/services/contact.service";

// Mock the config to ensure we're not in development mode
vi.mock("@/lib/config", () => ({
  ...vi.importActual("@/lib/config"),
  environment: "test",
  isProduction: false,
  isDevelopment: false,
  operatorEmailUrl: "https://example.com/api/email",
  shouldLogToConsole: false,
  lokiConfig: {
    url: "https://example.com/api/loki",
    username: "test",
    password: "test",
  },
}));

describe("contact", () => {
  const formData = { email: "test@example.test", message: "Test message" };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("submits form data successfully", async () => {
    const submitSpy = vi.spyOn(contactService, "submitContactForm");
    submitSpy.mockResolvedValue([true, null]);

    const response = await contact(formData);
    expect(response).toEqual(true);

    expect(submitSpy).toHaveBeenCalledWith({
      fromEmail: "test@example.test",
      body: "Test message",
    });
    expect(submitSpy).toHaveBeenCalledTimes(1);

    submitSpy.mockRestore();
  });

  test("throws an error if the service returns an error", async () => {
    const submitSpy = vi.spyOn(contactService, "submitContactForm");
    const error = new Error("Service error");
    submitSpy.mockResolvedValue([false, error]);

    await expect(contact(formData)).rejects.toThrow("Failed to submit form: Service error");

    expect(submitSpy).toHaveBeenCalledWith({
      fromEmail: "test@example.test",
      body: "Test message",
    });
    expect(submitSpy).toHaveBeenCalledTimes(1);

    submitSpy.mockRestore();
  });

  test("throws an error if the service returns unknown error", async () => {
    const submitSpy = vi.spyOn(contactService, "submitContactForm");
    submitSpy.mockResolvedValue([false, "Unknown error" as any]);

    await expect(contact(formData)).rejects.toThrow("Failed to submit form: Unknown error");

    expect(submitSpy).toHaveBeenCalledWith({
      fromEmail: "test@example.test",
      body: "Test message",
    });
    expect(submitSpy).toHaveBeenCalledTimes(1);

    submitSpy.mockRestore();
  });
});
