import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import "@testing-library/jest-dom";
import { InputError } from "@/components/ContactForm/InputError";

describe("InputError", () => {
  test("renders the provided error message", () => {
    const errorMessage = "This field is required";
    render(<InputError message={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
