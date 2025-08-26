import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "pages/index.tsx"),
  route("/contact", "pages/contact/index.tsx"),
  route("/abroad", "pages/abroad/index.tsx"),
  route("/abroad/privacy", "pages/abroad/privacy.tsx"),
  route("/abroad/disclosures", "pages/abroad/disclosures.tsx"),
  route("/abroad/support", "pages/abroad/support.tsx"),
  route("*?", "pages/not-found.tsx"),
] satisfies RouteConfig;
