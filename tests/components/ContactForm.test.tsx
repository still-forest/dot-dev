import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import "@testing-library/jest-dom";

import { ContactForm } from "@/components/ContactForm/ContactForm";
import { CONTACT_SUBMISSION_URL } from "@/config";

describe("ContactForm", () => {
  test("should render with all inputs", () => {
    render(<ContactForm />);

    const openButton = screen.getByRole("button", { name: "Get in touch" });
    expect(openButton).toBeVisible();

    fireEvent.click(openButton);

    expect(openButton).not.toBeVisible();

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  test("should submit form", () => {
    const fetchSpy = vi.spyOn(global, "fetch");

    render(<ContactForm />);

    const openButton = screen.getByRole("button", { name: "Get in touch" });
    fireEvent.click(openButton);

    const emailInput = screen.getByLabelText("Email");
    expect(emailInput).toHaveValue("");
    fireEvent.change(emailInput, { target: { value: "test@test.com" } });

    const messageInput = screen.getByLabelText("Message");
    expect(messageInput).toHaveValue("");
    fireEvent.change(messageInput, { target: { value: "Hello, world!" } });

    const sendButton = screen.getByRole("button", { name: "Send" });
    fireEvent.click(sendButton);

    expect(emailInput).toHaveValue("test@test.com");
    expect(messageInput).toHaveValue("Hello, world!");

    expect(fetchSpy).toHaveBeenCalledWith(CONTACT_SUBMISSION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: "Still Forest: contact form submission",
        body: `Email: test@test.com\nMessage: Hello, world!`,
      }),
    });
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    fetchSpy.mockRestore();
  });
});
