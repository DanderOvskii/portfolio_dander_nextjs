import { sub } from "framer-motion/client";
import { text } from "stream/consumers";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "background-dark": "var(--background-dark)",
        "background": "var(--background)",
        "background-light": "var(--background-light)",
        "header-color": "var(--header-color)",
        "just-white": "var(--just-white)",
        "foreground": "var(--foreground)",
        "foreground-light": "var(--foreground-light)",
        "c-primary": "#3F3D56",
        "c-secondary": "#7b5fc3",
      },
      fontFamily: {
        custom:['jose','play','mont'],
      },
      fontSize: {
        title:"var(--title)",
        subtitle:"var(--subtitle)",
        text:"var(--text)",
        small:"var(--small)",
      },
      spacing: {
        "align-left": "var(--align-left)",
      },
    },
  },
};
export default config;
