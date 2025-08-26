import { describe, expect, test, vi } from "vitest";
import { contact } from "@/lib/actions/contact-actions";
import { operatorEmailUrl } from "@/lib/config";

describe("formSubmit", () => {
  const formData = { email: "test@example.test", message: "Test message" };

  test("submits form data to the contact submission URL", async () => {
    const fetchSpy = vi.spyOn(global, "fetch");

    const response = await contact(formData);
    expect(response).toEqual(true);

    expect(fetchSpy).toHaveBeenCalledWith(operatorEmailUrl, {
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

    await expect(contact(formData)).rejects.toThrow("Failed to submit form");
  });

  test("throws an error if the server returns an error response", async () => {
    const fetchSpy = vi.spyOn(global, "fetch");
    fetchSpy.mockResolvedValue({
      ok: false,
      status: 400,
      statusText: "Bad Request",
      json: vi.fn(),
    } as unknown as Response);

    await expect(contact(formData)).rejects.toThrow("Failed to submit form: 400 Bad Request");
    fetchSpy.mockRestore();
  });
});
