import { contactService } from "../src/services/contact.service";

describe("ContactService", () => {
  test("should submit a contact form", () => {
    // const fetchSpy = vi.spyOn(global, "fetch");
    // fetchSpy.mockResolvedValue({
    //   ok: true,
    //   status: 204,
    //   json: () => Promise.resolve({}),
    // });

    const result = contactService.submitContactForm({ subject: "test subject", body: "test body" });
    expect(result).toEqual([true, null]);

    // expect(fetchSpy).toHaveBeenCalledWith(CONTACT_SUBMISSION_URL, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ subject: "test subject", body: "test body" }),
    // });
  });
});
