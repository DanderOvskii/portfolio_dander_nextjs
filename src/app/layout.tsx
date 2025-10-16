import { ReactNode } from "react";
import "@/styles/globals.css";
import { metadata } from "./metadata";
import RootLayoutClient from "./components/RootLayoutClient";
export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <RootLayoutClient>{children}</RootLayoutClient>
    </html>
  );
}