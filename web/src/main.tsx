import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Root } from "./app/[root]";
import { DisclosuresPage as AbroadDisclosures } from "./app/abroad/disclosures.tsx";
import { Abroad } from "./app/abroad/index.tsx";
import { PrivacyPage as AbroadPrivacy } from "./app/abroad/privacy.tsx";
import ThemeProvider from "./context/ThemeProvider.tsx";
import { THEMES } from "./context/ThemeProviderContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme={THEMES.SYSTEM} storageKey="still-forest-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/abroad" element={<Abroad />} />
          <Route path="/abroad/privacy" element={<AbroadPrivacy />} />
          <Route path="/abroad/disclosures" element={<AbroadDisclosures />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
