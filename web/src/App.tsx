import { Route, Routes } from "react-router";
import AbroadDisclosures from "./pages/abroad/disclosures";
import Abroad from "./pages/abroad/index";
import AbroadPrivacy from "./pages/abroad/privacy";
import AbroadSupport from "./pages/abroad/support";
import Contact from "./pages/contact";
import Root from "./pages/index";
import NotFoundPage from "./pages/not-found";

export default function App() {
  return (
    <Routes>
      <Route element={<Root />} path="/" />
      <Route element={<Contact />} path="/contact" />
      <Route element={<Abroad />} path="/abroad" />
      <Route element={<AbroadPrivacy />} path="/abroad/privacy" />
      <Route element={<AbroadDisclosures />} path="/abroad/disclosures" />
      <Route element={<AbroadSupport />} path="/abroad/support" />
      <Route element={<NotFoundPage />} path="*" />
    </Routes>
  );
}
