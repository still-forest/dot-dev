import supertest from "supertest";
import { app } from "../src/app";
import { contactService } from "../src/services/contact.service";

jest.mock("../src/services/contact.service");
const mockedContactService = contactService as jest.Mocked<typeof contactService>;

describe("POST /api/contact", () => {
  const validInput = { fromEmail: "test@example.test", body: "test" };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return 204 on success", async () => {
    mockedContactService.submitContactForm.mockResolvedValue([true, null]);

    const response = await supertest(app).post("/api/contact").send(validInput);
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  test("should return 500 on error", async () => {
    mockedContactService.submitContactForm.mockResolvedValue([false, new Error("test error")]);

    const response = await supertest(app).post("/api/contact").send(validInput);
    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Failed to submit contact form");
  });
});
