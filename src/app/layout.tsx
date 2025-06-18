import type { Metadata } from "next";
import "./index.css";

export const metadata: Metadata = {
  title: "Still Forest",
  description: "Still Forest is an engineering company that builds products for the web and mobile.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
