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

  test("returns 204 on success", async () => {
    mockedContactService.submitContactForm.mockResolvedValue([true, null]);

    const response = await supertest(app).post("/api/contact").send(validInput);
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  test("returns 500 on error", async () => {
    mockedContactService.submitContactForm.mockResolvedValue([false, new Error("test error")]);

    const response = await supertest(app).post("/api/contact").send(validInput);
    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Failed to submit contact form");
  });

  test("returns 400 for missing/invalid inputs", async () => {
    const cases = [
      {}, // both missing
      { fromEmail: 123, body: "msg" }, // fromEmail wrong type
      { fromEmail: "a@b.com", body: 456 }, // body wrong type
      { fromEmail: "a@b.com" }, // body missing
      { body: "hello" }, // fromEmail missing
    ];

    for (const payload of cases) {
      const res = await supertest(app).post("/api/contact").send(payload);
      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        message: "Invalid input: fromEmail and body are required",
      });
    }
  });
});
