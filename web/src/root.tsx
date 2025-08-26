import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import ThemeProvider from "./context/ThemeProvider";
import { THEMES } from "./context/ThemeProviderContext";
import "./index.css";

const links = [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Forum&family=Cormorant+Unicase:wght@300;400;500;600;700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Playwrite+IN:wght@100..400&display=swap",
  },
];

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider defaultTheme={THEMES.SYSTEM} storageKey="still-forest-theme">
      {children}
    </ThemeProvider>
  );
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <link href="/icon-192.png" rel="icon" type="image/png" />
        {links.map((link) => (
          <link key={link.href} {...link} />
        ))}
        <Meta />
        <Links />
        <title>Still Forest</title>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export default function App() {
  return (
    <AppProviders>
      <Outlet />
    </AppProviders>
  );
}
