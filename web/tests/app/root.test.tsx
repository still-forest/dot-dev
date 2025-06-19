import { screen } from "@testing-library/react";
import { renderWithProviders } from "@tests/support/render";
import { describe, expect, test } from "vitest";
import "@testing-library/jest-dom";

import { Root } from "@/app/[root]/index";

describe("Root", () => {
  test("renders ContactForm within Root page", () => {
    renderWithProviders(<Root />);

    const form = screen.getByTestId("contact-form");
    expect(form).toBeInTheDocument();
  });
});
