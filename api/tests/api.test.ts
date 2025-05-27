import supertest from "supertest";
import { app } from "../src/app";
import { contactService } from "../src/services/contact.service";

jest.mock("../src/services/contact.service");

const mockedContactService = contactService as jest.Mocked<typeof contactService>;

describe("POST /api/contact", () => {
  const validInput = {
    fromEmail: "test@example.com",
    body: "test message",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns 204 on successful contact form submission", async () => {
    mockedContactService.submitContactForm.mockResolvedValue([true, null]);

    const response = await supertest(app).post("/api/contact").send(validInput);
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});

    expect(mockedContactService.submitContactForm).toHaveBeenCalledWith(validInput);
  });

  test("returns 500 on failed contact form submission", async () => {
    mockedContactService.submitContactForm.mockResolvedValue([false, new Error("test error")]);

    const response = await supertest(app).post("/api/contact").send(validInput);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Failed to submit contact form" });

    expect(mockedContactService.submitContactForm).toHaveBeenCalledWith(validInput);
  });

  test("returns 400 on invalid input", async () => {
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
      // {
      //   input: { fromEmail: "invalid-email", body: "test message" },
      //   expectedErrors: [{ field: "fromEmail", message: "Invalid email" }],
      // },
      // invalid fromEmail (wrong type)
      {
        input: { fromEmail: 123, body: "This is a valid message" },
        expectedErrors: [{ field: "fromEmail", message: "Expected string, received number" }],
      },
      // invalid fromEmail (too short)
      {
        input: { fromEmail: "a@b.c", body: "This is a valid message" },
        expectedErrors: [{ field: "fromEmail", message: "String must contain at least 10 character(s)" }],
      },
      // invalid fromEmail (too long)
      {
        input: { fromEmail: "a".repeat(101), body: "This is a valid message" },
        expectedErrors: [{ field: "fromEmail", message: "String must contain at most 100 character(s)" }],
      },
      // invalid body (wrong type)
      {
        input: { fromEmail: "test@example.com", body: 123 },
        expectedErrors: [{ field: "body", message: "Expected string, received number" }],
      },
      // invalid body (too short)
      {
        input: { fromEmail: "test@example.com", body: "hi" },
        expectedErrors: [{ field: "body", message: "String must contain at least 10 character(s)" }],
      },
      // invalid body (too long)
      {
        input: { fromEmail: "test@example.com", body: "a".repeat(1001) },
        expectedErrors: [{ field: "body", message: "String must contain at most 1000 character(s)" }],
      },
    ];

    for (const testCase of testCases) {
      const response = await supertest(app).post("/api/contact").send(testCase.input);
      if (response.status !== 400) {
        console.debug(
          "Test failed with status:",
          response.status,
          "input:",
          testCase.input,
          "and response:",
          response.body,
        );
      }
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "Validation failed",
        errors: testCase.expectedErrors,
      });

      expect(mockedContactService.submitContactForm).not.toHaveBeenCalled();
    }
  });

  test("does not send requests in development", async () => {
    jest.resetModules();
    jest.mock("@/config", () => ({ isDevelopment: true, shouldLogToConsole: false }));

    // Re-import app after mocking
    const { app: devApp } = await import("../src/app");
    const response = await supertest(devApp).post("/api/contact").send(validInput);
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});

    expect(mockedContactService.submitContactForm).not.toHaveBeenCalled();
  });
});
