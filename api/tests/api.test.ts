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
    const response = await supertest(app).post("/api/contact").send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Invalid input: fromEmail and body are required" });

    expect(mockedContactService.submitContactForm).not.toHaveBeenCalled();
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
