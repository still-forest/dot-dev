import supertest from "supertest";
import { describe, expect, test } from "vitest";
import { app } from "../server";

describe("POST /api/contact", () => {
  test("should return 204", async () => {
    const response = await supertest(app).post("/api/contact").send({ subject: "test", body: "test" });
    expect(response.status).toBe(204);
  });
});
