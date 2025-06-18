import request from "supertest";
import { describe, expect, type Mock, test, vi } from "vitest";
import { POST } from "@/app/api/contact/route";
import { contactService } from "@/services/contact.service";
import { createTestServer } from "../../support/test-server";

vi.mock("@/services/contact.service", () => ({
  contactService: {
    submitContactForm: vi.fn(),
  },
}));

describe("POST /api/contact", () => {
  const server = createTestServer(POST);
  const mockSubmitContactForm = contactService.submitContactForm as Mock<typeof contactService.submitContactForm>;

  const validInput = {
    fromEmail: "test@example.com",
    body: "test message",
  };

  test("returns 204 on successful contact form submission", async () => {
    mockSubmitContactForm.mockResolvedValue([true, null]);

    const response = await request(server).post("/api/contact").send(validInput);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "Contact form submitted" });

    expect(mockSubmitContactForm).toHaveBeenCalledWith(validInput);
  });

  test("returns 500 on failed contact form submission", async () => {
    mockSubmitContactForm.mockResolvedValue([false, new Error("test error")]);

    const response = await request(server).post("/api/contact").send(validInput);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Failed to submit contact form" });

    expect(mockSubmitContactForm).toHaveBeenCalledWith(validInput);
  });

  test("returns 400 on invalid input", async () => {
    mockSubmitContactForm.mockResolvedValue([true, null]);

    const testCases = [
      // missing both fields
      {
        input: {},
        expectedErrors: [
          { field: "fromEmail", message: "Required" },
          { field: "body", message: "Required" },
        ],
      },
      // missing fromEmail
      {
        input: { fromEmail: "test@example.com" },
        expectedErrors: [{ field: "body", message: "Required" }],
      },
      // missing body
      {
        input: { body: "test message" },
        expectedErrors: [{ field: "fromEmail", message: "Required" }],
      },
      // invalid fromEmail
      {
        input: { fromEmail: "invalid-email@", body: "test message" },
        expectedErrors: [{ field: "fromEmail", message: "Invalid email" }],
      },
      // invalid body (wrong type)
      {
        input: { fromEmail: "test@example.com", body: 123 },
        expectedErrors: [{ field: "body", message: "Expected string, received number" }],
      },
      // invalid body (too short)
      {
        input: { fromEmail: "test@example.com", body: "hi" },
        expectedErrors: [
          {
            field: "body",
            message: "String must contain at least 10 character(s)",
          },
        ],
      },
      // invalid body (too long)
      {
        input: { fromEmail: "test@example.com", body: "a".repeat(1001) },
        expectedErrors: [
          {
            field: "body",
            message: "String must contain at most 1000 character(s)",
          },
        ],
      },
    ];

    for (const testCase of testCases) {
      const response = await request(server).post("/api/contact").send(testCase.input);
      if (response.status !== 400) {
        console.debug(
          "Test failed with unexpected status",
          response.status,
          "and response:",
          response.body,
          "; input was:",
          testCase.input,
        );
      }
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "Validation failed",
        errors: testCase.expectedErrors,
      });

      expect(mockSubmitContactForm).not.toHaveBeenCalled();
    }
  });

  test("sanitizes html in input", async () => {
    mockSubmitContactForm.mockResolvedValue([true, null]);
    const response = await request(server).post("/api/contact").send({
      fromEmail: "test@example.com",
      body: "<script>alert('test')</script>",
    });

    const expectedSanitizedBody = "alert(&#x27;test&#x27;)";

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "Contact form submitted" });
    expect(mockSubmitContactForm).toHaveBeenCalledWith({
      fromEmail: "test@example.com",
      body: expectedSanitizedBody,
    });
  });

  // test("does not send requests in development", async () => {
  //   jest.resetModules();
  //   jest.mock("@/config", () => ({
  //     isDevelopment: true,
  //     shouldLogToConsole: false,
  //   }));

  //   // Re-import app after mocking
  //   const { app: devApp } = await import("../api/src/app");
  //   const response = await supertest(devApp).post("/api/contact").send(validInput);
  //   expect(response.status).toBe(204);
  //   expect(response.body).toEqual({});

  //   expect(mockSubmitContactForm).not.toHaveBeenCalled();
  // });
});
