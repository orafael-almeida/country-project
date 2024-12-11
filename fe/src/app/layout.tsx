import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Country Finder APP",
  description: "Country Finder Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-gradient-to-r from-indigo-400 to-cyan-400 min-h-screen antialiased`}>{children}</body>
    </html>
  );
}
