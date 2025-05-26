import supertest from "supertest";
import { app } from "../src/app";

describe("POST /api/contact", () => {
  test("temp", async () => {
    expect(true).toBe(true);
  });

  test("should return 204", async () => {
    const response = await supertest(app).post("/api/contact").send({ subject: "test", body: "test" });
    expect(response.status).toBe(204);
  });
});
