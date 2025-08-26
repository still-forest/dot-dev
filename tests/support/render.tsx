import { render } from "@testing-library/react";
import type { ReactNode } from "react";

export const renderWithProviders = (ui: ReactNode) => {
  return render(ui, {
    wrapper: ({ children }) => <>{children}</>,
  });
};
