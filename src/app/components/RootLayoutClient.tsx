"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Providers } from "@/providers";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";

export default function RootLayoutClient({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const noHeaderPaths = 
    pathname === "/login" || 
    pathname === "/signup" ||
    pathname.startsWith("/projects");

  const noFooterPaths = 
    pathname === "/login" || 
    pathname === "/signup";

  return (
    <body className="antialiased scroll-smooth lg:subpixel-antialiased bg-background-dark">
      <Providers>
        <Layout>
          {!noHeaderPaths && <Header />}
          {children}
        </Layout>
        {!noFooterPaths && <Footer />}
      </Providers>
    </body>
  );
}