import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Dander Siegers",
    template: "%s | Dander Siegers"
  },
  description: "This is the portfolio website of Dander Siegers.",
  icons: {
    icon: '/favicon.png',
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "Dander Siegers" }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};