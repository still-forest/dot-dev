/**
 * @vitest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import "@testing-library/jest-dom";
import { InputError } from "@/components/ContactForm/InputError";

console.log("VITEST_PROJECT_NAME:", process.env.VITEST_PROJECT_NAME);
console.log("Test file path:", __filename);

describe("InputError", () => {
  test("renders the provided error message", () => {
    console.log("Environment check:", {
      hasDocument: typeof document !== "undefined",
      hasWindow: typeof window !== "undefined",
      environment: process.env.NODE_ENV,
    });

    const errorMessage = "This field is required";
    render(<InputError message={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
