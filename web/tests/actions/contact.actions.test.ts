import { beforeEach, describe, expect, test, vi } from "vitest";
import { contact } from "@/lib/actions/contact.actions";
import { ValidationError } from "@/lib/errors/ValidationError";
import type { ContactFormInput } from "@/lib/schema/contact.schema";
import { contactService } from "@/lib/services/contact.service";

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
      email: "test@example.test",
      message: "Test message",
    });
    expect(submitSpy).toHaveBeenCalledTimes(1);

    submitSpy.mockRestore();
  });

  test("validates form data", async () => {
    const submitSpy = vi.spyOn(contactService, "submitContactForm");
    submitSpy.mockResolvedValue({ success: true, data: true });

    const testCases = [
      // missing both fields
      {
        input: {},
        expectedErrors: {
          errors: [
            { field: "email", message: "Invalid input: expected string, received undefined" },
            { field: "message", message: "Invalid input: expected string, received undefined" },
          ],
          message: "Validation failed",
        },
      },
      // missing email
      {
        input: { message: "test message" },
        expectedErrors: {
          errors: [{ field: "email", message: "Invalid input: expected string, received undefined" }],
          message: "Validation failed",
        },
      },
      // missing message
      {
        input: { email: "test@example.com" },
        expectedErrors: {
          errors: [{ field: "message", message: "Invalid input: expected string, received undefined" }],
          message: "Validation failed",
        },
      },
      // invalid email
      {
        input: { email: "invalid-email@", message: "test message" },
        expectedErrors: {
          errors: [{ field: "email", message: "Invalid email address" }],
          message: "Validation failed",
        },
      },
      // invalid message (wrong type)
      {
        input: { email: "test@example.com", message: 123 },
        expectedErrors: {
          errors: [{ field: "message", message: "Invalid input: expected string, received number" }],
          message: "Validation failed",
        },
      },
      // invalid message (too short)
      {
        input: { email: "test@example.com", message: "hi" },
        expectedErrors: {
          errors: [{ field: "message", message: "Too small: expected string to have >=10 characters" }],
          message: "Validation failed",
        },
      },
      // invalid body (too long)
      {
        input: { email: "test@example.com", message: "a".repeat(1001) },
        expectedErrors: {
          errors: [{ field: "message", message: "Too big: expected string to have <=1000 characters" }],
          message: "Validation failed",
        },
      },
    ];

    for (const testCase of testCases) {
      const response = await contact(testCase.input as ContactFormInput);

      expect(response.success).toBe(false);
      expect(response.error).toBeInstanceOf(ValidationError);
      expect(response.error?.toJSON()).toEqual(testCase.expectedErrors);
      expect(response.data).toBeUndefined();

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
      email: "test@example.com",
      message: expectedSanitizedBody,
    });
  });

  test("throws an error if the service returns an error", async () => {
    const submitSpy = vi.spyOn(contactService, "submitContactForm");
    const error = new Error("Service error");
    submitSpy.mockResolvedValue({ success: false, error });

    const response = await contact(formData);
    expect(response).toEqual({ success: false, error: new Error("Failed to submit form: Service error") });

    expect(submitSpy).toHaveBeenCalledWith({
      email: "test@example.test",
      message: "Test message",
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
      email: "test@example.test",
      message: "Test message",
    });
    expect(submitSpy).toHaveBeenCalledTimes(1);

    submitSpy.mockRestore();
  });
});
