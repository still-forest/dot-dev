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
