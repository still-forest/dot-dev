import { render } from "@testing-library/react";
import type { ReactNode } from "react";

export const renderWithRouter = (ui: ReactNode) => {
  return render(ui);
};

export * from "@testing-library/react";
