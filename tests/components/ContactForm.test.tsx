import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import "@testing-library/jest-dom";

import { ContactForm } from "@/components/ContactForm/ContactForm";
import { formSubmit } from "@/components/ContactForm/formSubmit";

beforeEach(() => {
  vi.mock("@/components/ContactForm/formSubmit", () => ({
    formSubmit: vi.fn().mockResolvedValue({ success: true }),
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

  test("should submit form with valid data", async () => {
    const mockedFormSubmit = vi.mocked(formSubmit);
    mockedFormSubmit.mockResolvedValue({ success: true });

    render(<ContactForm />);

    fireEvent.click(screen.getByRole("button", { name: "Get in touch" }));

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "Test message" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Send" }));

    await waitFor(() => {
      expect(formSubmit).toHaveBeenCalledWith({
        email: "test@example.com",
        message: "Test message",
      });
      expect(screen.getByRole("button", { name: "Get in touch" })).toBeVisible();
    });
  });

  test("cannot submit form with invalid data", async () => {
    const mockedFormSubmit = vi.mocked(formSubmit);
    mockedFormSubmit.mockResolvedValue({ success: true });

    render(<ContactForm />);

    fireEvent.click(screen.getByRole("button", { name: "Get in touch" }));

    fireEvent.click(screen.getByRole("button", { name: "Send" }));

    await waitFor(() => {
      expect(screen.getByText("Invalid email")).toBeInTheDocument();
      expect(screen.getByText("String must contain at least 10 character(s)")).toBeInTheDocument();
    });

    expect(formSubmit).not.toHaveBeenCalled();
  });

  test("should show error message if form submission fails", async () => {
    const mockedFormSubmit = vi.mocked(formSubmit);
    mockedFormSubmit.mockRejectedValue(new Error("You shall not pass!"));

    render(<ContactForm />);

    fireEvent.click(screen.getByRole("button", { name: "Get in touch" }));

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "Test message" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Send" }));

    await waitFor(() => {
      expect(formSubmit).toHaveBeenCalledWith({
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
});
