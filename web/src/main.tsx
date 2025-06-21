import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Root } from "./app/[root]";
import { DisclosuresPage as AbroadDisclosures } from "./app/abroad/disclosures";
import { Abroad } from "./app/abroad/index";
import { PrivacyPage as AbroadPrivacy } from "./app/abroad/privacy";
import { SupportPage as AbroadSupport } from "./app/abroad/support";
import { NotFoundPage } from "./app/not-found";
import ThemeProvider from "./context/ThemeProvider";
import { THEMES } from "./context/ThemeProviderContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme={THEMES.SYSTEM} storageKey="still-forest-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/abroad" element={<Abroad />} />
          <Route path="/abroad/privacy" element={<AbroadPrivacy />} />
          <Route path="/abroad/disclosures" element={<AbroadDisclosures />} />
          <Route path="/abroad/support" element={<AbroadSupport />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
