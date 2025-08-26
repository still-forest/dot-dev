import { describe, expect, test, vi } from "vitest";
import { formSubmit } from "@/components/ContactForm/formSubmit";
import type { FormData } from "@/components/ContactForm/schema";
import { CONTACT_SUBMISSION_URL } from "@/lib/config";

describe("formSubmit", () => {
  const formData: FormData = { email: "test@example.test", message: "Test message" };

  test("submits form data to the contact submission URL", async () => {
    const fetchSpy = vi.spyOn(global, "fetch");

    const response = await formSubmit(formData);
    expect(response).toEqual(true);

    expect(fetchSpy).toHaveBeenCalledWith(CONTACT_SUBMISSION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fromEmail: "test@example.test",
        body: "Test message",
      }),
    });
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    fetchSpy.mockRestore();
  });

  test("throws an error if the contact submission fails", async () => {
    const fetchSpy = vi.spyOn(global, "fetch");
    fetchSpy.mockRejectedValue(new Error("Failed to submit form"));

    await expect(formSubmit(formData)).rejects.toThrow("Failed to submit form");
  });

  test("throws an error if the server returns an error response", async () => {
    const fetchSpy = vi.spyOn(global, "fetch");
    fetchSpy.mockResolvedValue({
      ok: false,
      status: 400,
      statusText: "Bad Request",
      json: vi.fn(),
    } as unknown as Response);

    await expect(formSubmit(formData)).rejects.toThrow("Failed to submit form: 400 Bad Request");
    fetchSpy.mockRestore();
  });
});
