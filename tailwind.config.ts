import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tonBlue: {
          DEFAULT: "#4ea4ff",
          600: "#3b82f6",
        },
      },
      boxShadow: {
        soft: "0 6px 20px rgba(0,0,0,0.35)",
      },
    },
    fontFamily: {
      sans: ["DM Sans", "sans-serif"],
      mona: ["Mona Sans", "sans-serif"],
    },
  },
};

export default config;
