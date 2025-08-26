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

  test("returns 400 on invalid input", async () => {
    mockedContactService.submitContactForm.mockResolvedValue([true, null]);

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

      expect(mockedContactService.submitContactForm).not.toHaveBeenCalled();
    }
  });

  test("sanitizes html in input", async () => {
    mockedContactService.submitContactForm.mockResolvedValue([true, null]);
    const response = await supertest(app)
      .post("/api/contact")
      .send({ fromEmail: "test@example.com", body: "<script>alert('test')</script>" });

    const expectedSanitizedBody = "alert(&#x27;test&#x27;)";

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
    expect(mockedContactService.submitContactForm).toHaveBeenCalledWith({
      fromEmail: "test@example.com",
      body: expectedSanitizedBody,
    });
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
