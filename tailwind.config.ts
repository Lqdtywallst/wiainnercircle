import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lime: "#D6FF00",
        black: "#050505",
        "white-dim": "rgba(255,255,255,0.5)",
      },
      fontFamily: {
        bebas: ["'Bebas Neue'", "sans-serif"],
        inter: ["'Inter'", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(72px,10vw,148px)", { lineHeight: "0.88" }],
        "display-lg": ["clamp(56px,7vw,96px)", { lineHeight: "0.9" }],
        "display-md": ["clamp(40px,5vw,72px)", { lineHeight: "0.92" }],
        "label":      ["10px", { letterSpacing: "0.3em" }],
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};

export default config;
