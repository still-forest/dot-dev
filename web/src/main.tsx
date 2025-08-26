import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Root } from "./app/[root]";
import { DisclosuresPage as AbroadDisclosures } from "./app/abroad/disclosures";
import { Abroad } from "./app/abroad/index";
import { PrivacyPage as AbroadPrivacy } from "./app/abroad/privacy";
import { SupportPage as AbroadSupport } from "./app/abroad/support";
import Contact from "./app/contact";
import { NotFoundPage } from "./app/not-found";
import ThemeProvider from "./context/ThemeProvider";
import { THEMES } from "./context/ThemeProviderContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme={THEMES.SYSTEM} storageKey="still-forest-theme">
      <BrowserRouter>
        <Routes>
          <Route element={<Root />} path="/" />
          <Route element={<Contact />} path="/contact" />
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
