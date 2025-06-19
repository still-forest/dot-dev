import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import { Abroad } from "./app/abroad/index.tsx";
import { PrivacyPage as AbroadPrivacy } from "./app/abroad/privacy.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/abroad" element={<Abroad />} />
        <Route path="/abroad/privacy" element={<AbroadPrivacy />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
