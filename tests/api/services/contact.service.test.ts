import axios, { type AxiosError } from "axios";
import MockAdapter from "axios-mock-adapter";
import { afterEach, describe, expect, test } from "vitest";
import { operatorEmailUrl } from "@/config";
import { contactService } from "@/services/contact.service";

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

    const [success, error] = await contactService.submitContactForm(email);
    expect(success).toEqual(false);
    expect(error?.constructor.name).toBe("AxiosError");
    expect((error as AxiosError).response?.status).toBe(500);
    expect((error as AxiosError).response?.data).toEqual({ status: "error" });

    expect(mockAxios.history.post).toHaveLength(1);
    const mockRequest = mockAxios.history.post[0];
    expect(mockRequest.url).toBe(operatorEmailUrl);
  });

  test("handles timeout", async () => {
    mockAxios.onPost(operatorEmailUrl).timeout();

    const [success, error] = await contactService.submitContactForm(email);
    expect(success).toEqual(false);
    expect(error?.constructor.name).toBe("AxiosError");
    expect((error as AxiosError).response?.status).toBe(undefined);
    expect((error as AxiosError).message).toBe("timeout of 5000ms exceeded");

    expect(mockAxios.history.post).toHaveLength(1);
    const mockRequest = mockAxios.history.post[0];
    expect(mockRequest.url).toBe(operatorEmailUrl);
  });

  test("handles network error", async () => {
    mockAxios.onPost(operatorEmailUrl).networkError();

    const [success, error] = await contactService.submitContactForm(email);
    expect(success).toEqual(false);

    expect(error?.constructor.name).toBe("AxiosError");
    expect(error?.message).toBe("Network Error");

    expect(mockAxios.history.post).toHaveLength(1);
    const mockRequest = mockAxios.history.post[0];
    expect(mockRequest.url).toBe(operatorEmailUrl);
  });
});
