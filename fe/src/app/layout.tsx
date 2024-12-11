import type { Metadata } from "next";
import "./globals.css";
import Header from "@/sections/Header";

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
      <body
        className={`bg-gradient-to-r from-indigo-400 to-cyan-400 min-h-screen antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
