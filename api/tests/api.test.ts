import supertest from "supertest";
import { app } from "../src/app";
import { contactService } from "../src/services/contact.service";

jest.mock("../src/services/contact.service");
const mockedContactService = contactService as jest.Mocked<typeof contactService>;

describe("POST /api/contact", () => {
  test("temp", async () => {
    expect(true).toBe(true);
  });

  test("should return 204 on success", async () => {
    mockedContactService.submitContactForm.mockResolvedValue([true, null]);

    const response = await supertest(app).post("/api/contact").send({ subject: "test", body: "test" });
    expect(response.status).toBe(204);
  });

  test("should return 500 on error", async () => {
    mockedContactService.submitContactForm.mockResolvedValue([false, new Error("test error")]);

    const response = await supertest(app).post("/api/contact").send({ subject: "test", body: "test" });
    expect(response.status).toBe(500);
  });
});
