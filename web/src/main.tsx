import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { DisclosuresPage as AbroadDisclosures } from "../../next/src/app/abroad/disclosures/page";
import { PrivacyPage as AbroadPrivacy } from "../../next/src/app/abroad/privacy/page";
import { SupportPage as AbroadSupport } from "../../next/src/app/abroad/support/page";
import { Root } from "./app/[root]";
import { Abroad } from "./app/abroad/index";
import { NotFoundPage } from "./app/not-found";
import ThemeProvider from "./context/ThemeProvider";
import { THEMES } from "./context/ThemeProviderContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme={THEMES.SYSTEM} storageKey="still-forest-theme">
      <BrowserRouter>
        <Routes>
          <Route element={<Root />} path="/" />
          <Route element={<Abroad />} path="/abroad" />
          <Route element={<AbroadPrivacy />} path="/abroad/privacy" />
          <Route element={<AbroadDisclosures />} path="/abroad/disclosures" />
          <Route element={<AbroadSupport />} path="/abroad/support" />
          <Route element={<NotFoundPage />} path="*" />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
