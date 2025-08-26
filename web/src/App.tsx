import { Route, Routes } from "react-router";
import { Root } from "./app";
import { DisclosuresPage as AbroadDisclosures } from "./pages/abroad/disclosures";
import { Abroad } from "./pages/abroad/index";
import { PrivacyPage as AbroadPrivacy } from "./pages/abroad/privacy";
import { SupportPage as AbroadSupport } from "./pages/abroad/support";
import { NotFoundPage } from "./pages/not-found";

export default function App() {
  return (
    <Routes>
      <Route element={<Root />} path="/" />
      <Route element={<Abroad />} path="/abroad" />
      <Route element={<AbroadPrivacy />} path="/abroad/privacy" />
      <Route element={<AbroadDisclosures />} path="/abroad/disclosures" />
      <Route element={<AbroadSupport />} path="/abroad/support" />
      <Route element={<NotFoundPage />} path="*" />
    </Routes>
  );
}
