import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";
import { BrowserRouter, Route, Routes } from "react-router";
import ThemeProvider from "../context/ThemeProvider";
import { THEMES } from "../context/ThemeProviderContext";
import Root from "./[root]";
import AbroadDisclosures from "./abroad/disclosures";
import Abroad from "./abroad/index";
import AbroadPrivacy from "./abroad/privacy";
import AbroadSupport from "./abroad/support";
import Contact from "./contact";
import NotFoundPage from "./not-found";

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
