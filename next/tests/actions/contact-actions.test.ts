import { beforeEach, describe, expect, test, vi } from "vitest";
import { contact } from "@/lib/actions/contact-actions";
import { contactService } from "@/services/contact.service";

describe("contact", () => {
  const formData = { email: "test@example.test", message: "Test message" };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("submits form data successfully", async () => {
    const submitSpy = vi.spyOn(contactService, "submitContactForm");
    submitSpy.mockResolvedValue([true, null]);

    const response = await contact(formData);
    expect(response).toEqual({ success: true, data: true });

    expect(submitSpy).toHaveBeenCalledWith({
      fromEmail: "test@example.test",
      body: "Test message",
    });
    expect(submitSpy).toHaveBeenCalledTimes(1);

    submitSpy.mockRestore();
  });

  // test("returns 400 on invalid input", async () => {
  //   const submitSpy = vi.spyOn(contactService, "submitContactForm");
  //   submitSpy.mockResolvedValue([true, null]);

  //   const testCases = [
  //     // missing both fields
  //     {
  //       input: {},
  //       expectedErrors: [
  //         { field: "fromEmail", message: "Required" },
  //         { field: "body", message: "Required" },
  //       ],
  //     },
  //     // missing fromEmail
  //     {
  //       input: { fromEmail: "test@example.com" },
  //       expectedErrors: [{ field: "body", message: "Required" }],
  //     },
  //     // missing body
  //     {
  //       input: { body: "test message" },
  //       expectedErrors: [{ field: "fromEmail", message: "Required" }],
  //     },
  //     // invalid fromEmail
  //     {
  //       input: { fromEmail: "invalid-email@", body: "test message" },
  //       expectedErrors: [{ field: "fromEmail", message: "Invalid email" }],
  //     },
  //     // invalid body (wrong type)
  //     {
  //       input: { fromEmail: "test@example.com", body: 123 },
  //       expectedErrors: [{ field: "body", message: "Expected string, received number" }],
  //     },
  //     // invalid body (too short)
  //     {
  //       input: { fromEmail: "test@example.com", body: "hi" },
  //       expectedErrors: [{ field: "body", message: "String must contain at least 10 character(s)" }],
  //     },
  //     // invalid body (too long)
  //     {
  //       input: { fromEmail: "test@example.com", body: "a".repeat(1001) },
  //       expectedErrors: [{ field: "body", message: "String must contain at most 1000 character(s)" }],
  //     },
  //   ];

  //   for (const testCase of testCases) {
  //     const response = await contact(formData);
  //     if (response.status !== 400) {
  //       console.debug(
  //         "Test failed with unexpected status",
  //         response.status,
  //         "and response:",
  //         response.body,
  //         "; input was:",
  //         testCase.input,
  //       );
  //     }
  //     expect(response.status).toBe(400);
  //     expect(response.body).toEqual({
  //       message: "Validation failed",
  //       errors: testCase.expectedErrors,
  //     });

  //     expect(mockedContactService.submitContactForm).not.toHaveBeenCalled();
  //   }
  // });

  test("throws an error if the service returns an error", async () => {
    const submitSpy = vi.spyOn(contactService, "submitContactForm");
    const error = new Error("Service error");
    submitSpy.mockResolvedValue([false, error]);

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
    submitSpy.mockResolvedValue([false, new Error("Unknown error")]);

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
