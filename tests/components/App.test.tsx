import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import "@testing-library/jest-dom";

import App from "@/app/page";

describe("App", () => {
  test.skip("renders ContactForm within App layout", () => {
    render(<App />);

    const form = screen.getByTestId("contact-form");
    expect(form).toBeInTheDocument();
  });
});
