import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import "@testing-library/jest-dom";

import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import { useRateLimit } from "@/hooks/useRateLimit";
import { contact } from "@/lib/actions/contact.actions";

beforeEach(() => {
  vi.mock("@/lib/actions/contact.actions", () => ({
    contact: vi.fn().mockResolvedValue({ success: true }),
  }));

  vi.mock(import("next/navigation"), async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useRouter: vi.fn(),
    };
  });

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

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  test("can submit form with valid data", async () => {
    const mockedFormSubmit = vi.mocked(contact);
    mockedFormSubmit.mockResolvedValue({ success: true, data: true });

    const mockedUseRateLimit = vi.mocked(useRateLimit);
    mockedUseRateLimit.mockReturnValue({
      execute: (callback: () => void) => callback(),
      canExecute: vi.fn().mockReturnValue(true),
    });

    render(<ContactForm />);

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
      expect(screen.getByText(/Message sent successfully/)).toBeInTheDocument();
    });
    expect(contact).toHaveBeenCalledWith({
      email: "test@example.com",
      message: "Test message",
    });
    expect(screen.getByRole("link", { name: "Back" })).toHaveAttribute("href", "/");
  });

  test("cannot submit form with invalid data", async () => {
    const mockedFormSubmit = vi.mocked(contact);
    mockedFormSubmit.mockResolvedValue({ success: true, data: true });

    render(<ContactForm />);

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

    expect(contact).not.toHaveBeenCalled();
  });

  test("should show error message if form submission fails", async () => {
    const mockedFormSubmit = vi.mocked(contact);
    mockedFormSubmit.mockResolvedValue({
      success: false,
      error: new Error("You shall not pass!"),
    });

    render(<ContactForm />);

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
      expect(contact).toHaveBeenCalledWith({
        email: "test@example.com",
        message: "Test message",
      });
    });

    expect(screen.getByText("You shall not pass!")).toBeInTheDocument();
  });

  test("cancels to close the form", async () => {
    const mockRouter = {
      push: vi.fn(),
    } as unknown as AppRouterInstance;
    const mockUseRouter = vi.mocked(useRouter);
    mockUseRouter.mockReturnValue(mockRouter);

    render(<ContactForm />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(mockRouter.push).toHaveBeenCalledWith("/");
  });

  test("should show rate limit error message if form is submitted too quickly", async () => {
    const mockedUseRateLimit = vi.mocked(useRateLimit);
    mockedUseRateLimit.mockReturnValue({
      execute: (callback: () => void) => callback(),
      canExecute: vi.fn().mockReturnValue(false),
    });

    render(<ContactForm />);

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
});
