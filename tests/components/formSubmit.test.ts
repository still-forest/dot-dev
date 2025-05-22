import { describe, expect, test, vi } from "vitest";
import { formSubmit } from "@/components/ContactForm/formSubmit";
import { CONTACT_SUBMISSION_URL } from "@/config";

describe("formSubmit", () => {
  test("submits form data to the contact submission URL", async () => {
    const fetchSpy = vi.spyOn(global, "fetch");

    const formData = { email: "test@example.test", message: "Test message" };
    const response = await formSubmit(formData);
    expect(response).toEqual({ status: "success" });

    expect(fetchSpy).toHaveBeenCalledWith(CONTACT_SUBMISSION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: "Still Forest: contact form submission",
        body: `Email: test@example.test\nMessage: Test message`,
      }),
    });
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    fetchSpy.mockRestore();
  });

  test("throws an error if the contact submission fails", async () => {
    const fetchSpy = vi.spyOn(global, "fetch");
    fetchSpy.mockRejectedValue(new Error("Failed to submit form"));

    const formData = { email: "test@example.test", message: "Test message" };
    await expect(formSubmit(formData)).rejects.toThrow("Failed to submit form");
  });
});
