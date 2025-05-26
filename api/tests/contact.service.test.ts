import { contactService } from "../src/services/contact.service";

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("ContactService", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  test("should send input to the configured URL", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ status: "ok" }),
    });

    const email = { subject: "test subject", body: "test body" };

    const result = await contactService.submitContactForm(email);
    expect(result).toEqual([true, null]);

    expect(mockFetch).toHaveBeenCalledWith("http://test/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    });
  });

  test("should return an error if the fetch fails", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    const email = { subject: "test subject", body: "test body" };

    const result = await contactService.submitContactForm(email);
    expect(result).toEqual([false, new Error("Failed to submit form: 500 Internal Server Error")]);

    expect(mockFetch).toHaveBeenCalled();
  });

  test.skip("handles network timeouts", async () => {
    mockFetch.mockResolvedValueOnce(new Error("Network timeout"));

    const email = { subject: "test subject", body: "test body" };

    const result = await contactService.submitContactForm(email);
    expect(result).toEqual([false, new Error("Failed to submit form: Network timeout")]);

    expect(mockFetch).toHaveBeenCalled();
  });
});
