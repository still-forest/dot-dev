import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { operatorEmailUrl } from "../src/config";
import { contactService } from "../src/services/contact.service";

const mockAxios = new MockAdapter(axios);

describe("ContactService", () => {
  const email = { fromEmail: "someone@mail.test", body: "test body" };

  afterEach(() => {
    mockAxios.reset();
  });

  test("should make a request to Operator", async () => {
    mockAxios.onPost(operatorEmailUrl).reply(200, { status: "ok" });

    const result = await contactService.submitContactForm(email);
    expect(result).toEqual([true, null]);

    expect(mockAxios.history.post).toHaveLength(1);
    const mockRequest = mockAxios.history.post[0];
    expect(mockRequest.url).toBe(operatorEmailUrl);

    const expectedParams = {
      subject: "Still Forest: contact form submission",
      body: `Email: ${email.fromEmail}\nMessage: ${email.body}`,
    };

    expect(JSON.parse(mockRequest.data)).toEqual(expectedParams);
    expect(mockRequest.headers!["Content-Type"]).toBe("application/json");
  });

  test("should return an error if the fetch fails", async () => {
    mockAxios.onPost(operatorEmailUrl).reply(500, { status: "error" });

    const result = await contactService.submitContactForm(email);
    expect(result).toEqual([false, new Error("Request failed with status code 500")]);

    expect(mockAxios.history.post).toHaveLength(1);
    const mockRequest = mockAxios.history.post[0];
    expect(mockRequest.url).toBe(operatorEmailUrl);
  });

  test("handles timeout", async () => {
    mockAxios.onPost(operatorEmailUrl).timeout();

    const result = await contactService.submitContactForm(email);
    expect(result).toEqual([false, new Error("timeout of 5000ms exceeded")]);

    expect(mockAxios.history.post).toHaveLength(1);
    const mockRequest = mockAxios.history.post[0];
    expect(mockRequest.url).toBe(operatorEmailUrl);
  });

  test("handles network error", async () => {
    mockAxios.onPost(operatorEmailUrl).networkError();

    const result = await contactService.submitContactForm(email);
    expect(result).toEqual([false, new Error("Network Error")]);

    expect(mockAxios.history.post).toHaveLength(1);
    const mockRequest = mockAxios.history.post[0];
    expect(mockRequest.url).toBe(operatorEmailUrl);
  });
});
