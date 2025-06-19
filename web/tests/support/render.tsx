import { render } from "@testing-library/react";
import type { ReactNode } from "react";
import { MemoryRouter, Route, Routes } from "react-router";

export const renderWithProviders = (ui: ReactNode) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <MemoryRouter>
        <Routes>
          <Route path="/" element={children} />
        </Routes>
      </MemoryRouter>
    ),
  });
};

export * from "@testing-library/react";
