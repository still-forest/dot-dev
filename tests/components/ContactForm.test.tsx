import { render } from "@testing-library/react";
import { describe } from "vitest";
import "@testing-library/jest-dom";

import { ContactForm } from "@/components/ContactForm/ContactForm";

describe("ContactForm", () => {
  it("should render", () => {
    render(<ContactForm />);
  });
});
