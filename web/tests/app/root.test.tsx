import { screen } from "@testing-library/react";
import { renderWithRouter } from "@tests/support/render";
import { describe, expect, test } from "vitest";
import "@testing-library/jest-dom";

import Root from "@/app/[root]/index";

describe("Root", () => {
  test("renders link to contact page", () => {
    renderWithRouter(<Root />);

    const link = screen.getByRole("link", { name: "Get in touch" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/contact");
  });
});
