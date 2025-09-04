"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import "@/styles/globals.css";
import { Providers } from "@/providers";
import Header from "@/components/Header";
import "@/metadata"; // Import metadata from the new file
import Layout from "@/components/Layout";

// Define paths where the Header should not be rendered
const noHeaderPaths = ["/login", "/signup"];

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className=" antialiased scroll-smooth lg:subpixel-antialiased bg-background-dark">
        <Providers>
          <Layout>
            {!noHeaderPaths.includes(pathname) && <Header />}
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
