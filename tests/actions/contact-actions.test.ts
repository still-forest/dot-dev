import { beforeEach, describe, expect, test, vi } from "vitest";
import { contact } from "@/lib/actions/contact-actions";
import type { ContactFormData } from "@/lib/schema/contact-schema";
import { contactService } from "@/services/contact.service";

describe("contact", () => {
  const formData = { email: "test@example.test", message: "Test message" };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("submits form data successfully", async () => {
    const submitSpy = vi.spyOn(contactService, "submitContactForm");
    submitSpy.mockResolvedValue({ success: true, data: true });

    const response = await contact(formData);
    expect(response).toEqual({ success: true, data: true });

    expect(submitSpy).toHaveBeenCalledWith({
      fromEmail: "test@example.test",
      body: "Test message",
    });
    expect(submitSpy).toHaveBeenCalledTimes(1);

    submitSpy.mockRestore();
  });

  test("validates form data", async () => {
    const submitSpy = vi.spyOn(contactService, "submitContactForm");
    submitSpy.mockResolvedValue([true, null]);

    const testCases = [
      // missing both fields
      {
        input: {},
        expectedErrors: { fieldErrors: { email: ["Required"], message: ["Required"] }, formErrors: [] },
      },
      // missing email
      {
        input: { message: "test message" },
        expectedErrors: { fieldErrors: { email: ["Required"] }, formErrors: [] },
      },
      // missing message
      {
        input: { email: "test@example.com" },
        expectedErrors: { fieldErrors: { message: ["Required"] }, formErrors: [] },
      },
      // invalid email
      {
        input: { email: "invalid-email@", message: "test message" },
        expectedErrors: { fieldErrors: { email: ["Invalid email"] }, formErrors: [] },
      },
      // invalid message (wrong type)
      {
        input: { email: "test@example.com", message: 123 },
        expectedErrors: { fieldErrors: { message: ["Expected string, received number"] }, formErrors: [] },
      },
      // invalid message (too short)
      {
        input: { email: "test@example.com", message: "hi" },
        expectedErrors: { fieldErrors: { message: ["String must contain at least 10 character(s)"] }, formErrors: [] },
      },
      // invalid body (too long)
      {
        input: { email: "test@example.com", message: "a".repeat(1001) },
        expectedErrors: { fieldErrors: { message: ["String must contain at most 1000 character(s)"] }, formErrors: [] },
      },
    ];

    for (const testCase of testCases) {
      const response = await contact(testCase.input as ContactFormData);

      expect(response).toEqual({
        success: false,
        error: new Error("Validation failed", { cause: testCase.expectedErrors }),
      });
      expect(submitSpy).not.toHaveBeenCalled();
    }
  });

  test("sanitizes html in input", async () => {
    const submitSpy = vi.spyOn(contactService, "submitContactForm");
    submitSpy.mockResolvedValue({ success: true, data: true });

    const response = await contact({ email: "test@example.com", message: "<script>alert('test')</script>" });

    const expectedSanitizedBody = "alert(&#x27;test&#x27;)";

    expect(response).toEqual({ success: true, data: true });
    expect(submitSpy).toHaveBeenCalledWith({
      fromEmail: "test@example.com",
      body: expectedSanitizedBody,
    });
  });

  test("throws an error if the service returns an error", async () => {
    const submitSpy = vi.spyOn(contactService, "submitContactForm");
    const error = new Error("Service error");
    submitSpy.mockResolvedValue({ success: false, error });

    const response = await contact(formData);
    expect(response).toEqual({ success: false, error: new Error("Failed to submit form: Service error") });

    expect(submitSpy).toHaveBeenCalledWith({
      fromEmail: "test@example.test",
      body: "Test message",
    });
    expect(submitSpy).toHaveBeenCalledTimes(1);

    submitSpy.mockRestore();
  });

  test("throws an error if the service returns unknown error", async () => {
    const submitSpy = vi.spyOn(contactService, "submitContactForm");
    submitSpy.mockResolvedValue({ success: false, error: new Error("Unknown error") });

    const response = await contact(formData);
    expect(response).toEqual({ success: false, error: new Error("Failed to submit form: Unknown error") });

    expect(submitSpy).toHaveBeenCalledWith({
      fromEmail: "test@example.test",
      body: "Test message",
    });
    expect(submitSpy).toHaveBeenCalledTimes(1);

    submitSpy.mockRestore();
  });
});
