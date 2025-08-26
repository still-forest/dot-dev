import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { ContactForm } from "@/components/ContactForm";
import { useRateLimit } from "@/hooks/useRateLimit";
import { contact } from "@/lib/actions/contact-actions";

beforeEach(() => {
  vi.mock("@/lib/actions/contact-actions", () => ({
    contact: vi.fn().mockResolvedValue({ success: true }),
  }));

  vi.mock("@/hooks/useRateLimit", () => ({
    useRateLimit: vi.fn().mockReturnValue({
      execute: (callback: () => void) => callback(),
      canExecute: vi.fn().mockReturnValue(true),
    }),
  }));
});

afterEach(() => {
  vi.clearAllMocks();
});

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

  test("can submit form with valid data", async () => {
    const mockedContact = vi.mocked(contact);
    mockedContact.mockResolvedValue(true);

    const mockedUseRateLimit = vi.mocked(useRateLimit);
    mockedUseRateLimit.mockReturnValue({
      execute: (callback: () => void) => callback(),
      canExecute: vi.fn().mockReturnValue(true),
    });

    render(<ContactForm />);

    fireEvent.click(screen.getByRole("button", { name: "Get in touch" }));
    expect(screen.queryByTestId("contacted-recently-message")).not.toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: "Send" });
    expect(submitButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "Test message" },
    });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Message sent successfully.")).toBeInTheDocument();
    });
    expect(mockedContact).toHaveBeenCalledWith({
      email: "test@example.com",
      message: "Test message",
    });
    expect(screen.queryByRole("button", { name: "Get in touch" })).not.toBeInTheDocument();
  });

  test("cannot submit form with invalid data", async () => {
    const mockedContact = vi.mocked(contact);
    mockedContact.mockResolvedValue(true);

    render(<ContactForm />);

    fireEvent.click(screen.getByRole("button", { name: "Get in touch" }));

    const submitButton = screen.getByRole("button", { name: "Send" });
    expect(submitButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "Test message" },
    });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "Test " },
    });

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });

    expect(mockedContact).not.toHaveBeenCalled();
  });

  test("should show error message if form submission fails", async () => {
    const mockedContact = vi.mocked(contact);
    mockedContact.mockRejectedValue(new Error("You shall not pass!"));

    render(<ContactForm />);

    fireEvent.click(screen.getByRole("button", { name: "Get in touch" }));

    const submitButton = screen.getByRole("button", { name: "Send" });

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "Test message" },
    });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedContact).toHaveBeenCalledWith({
        email: "test@example.com",
        message: "Test message",
      });
    });

    expect(screen.getByText("You shall not pass!")).toBeInTheDocument();
  });

  test("cancels to close the form", async () => {
    render(<ContactForm />);

    const openButton = screen.getByRole("button", { name: "Get in touch" });
    expect(openButton).toBeVisible();

    fireEvent.click(openButton);

    expect(openButton).not.toBeVisible();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(screen.getByRole("button", { name: "Get in touch" })).toBeVisible();
    expect(screen.queryByLabelText("Email")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Message")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Send" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Cancel" })).not.toBeInTheDocument();
  });

  test("should show rate limit error message if form is submitted too quickly", async () => {
    const mockedUseRateLimit = vi.mocked(useRateLimit);
    mockedUseRateLimit.mockReturnValue({
      execute: (callback: () => void) => callback(),
      canExecute: vi.fn().mockReturnValueOnce(true).mockReturnValueOnce(false),
    });

    render(<ContactForm />);

    fireEvent.click(screen.getByRole("button", { name: "Get in touch" }));

    const submitButton = screen.getByRole("button", { name: "Send" });

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "Test message" },
    });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("You are sending messages too quickly. Please try again later.")).toBeInTheDocument();
    });
    expect(screen.queryByTestId("contacted-recently-message")).not.toBeInTheDocument();
  });

  test("should show a generic message when recently submitted", async () => {
    const mockedUseRateLimit = vi.mocked(useRateLimit);
    mockedUseRateLimit.mockReturnValue({
      execute: (callback: () => void) => callback(),
      canExecute: vi.fn().mockReturnValue(false),
    });

    render(<ContactForm />);

    expect(screen.getByText("Welcome back.")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Get in touch" })).not.toBeInTheDocument();
  });
});
