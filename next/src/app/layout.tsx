import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/context/ThemeProvider";
import { THEMES } from "@/context/ThemeProviderContext";

export const metadata: Metadata = {
  title: "Still Forest",
  description: "Still Forest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="/icon-192.png" rel="icon" type="image/png" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Forum&family=Cormorant+Unicase:wght@300;400;500;600;700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Playwrite+IN:wght@100..400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider defaultTheme={THEMES.SYSTEM} storageKey="still-forest-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
