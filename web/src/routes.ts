import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  // * matches all URLs, the ? makes it optional so it will match / as well
  route("/", "pages/index.tsx"),
  route("/abroad", "pages/abroad/index.tsx"),
  route("/abroad/privacy", "pages/abroad/privacy.tsx"),
  route("/abroad/disclosures", "pages/abroad/disclosures.tsx"),
  route("/abroad/support", "pages/abroad/support.tsx"),
  route("*?", "pages/not-found.tsx"),
] satisfies RouteConfig;
