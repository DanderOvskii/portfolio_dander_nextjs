"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import "@/styles/globals.css";
import { Providers } from "@/providers";
import Header from "@/components/Header";
import "@/metadata"; // Import metadata from the new file
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";

// Define paths where the Header should not be rendered

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const pathname = usePathname();
  const noHeaderPaths = 
  pathname === "/login"|| 
  pathname === "/signup"||
  pathname.startsWith("/projects");

  const noFooterPaths = 
  pathname === "/login"|| 
  pathname === "/signup";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className=" antialiased scroll-smooth lg:subpixel-antialiased bg-background-dark">
        <Providers>
          <Layout>
            {!noHeaderPaths && <Header />}
            {children}
          </Layout>
          {!noFooterPaths && <Footer />}
        </Providers>
      </body>
    </html>
  );
}
