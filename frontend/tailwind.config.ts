import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#050816",
        surface: "#0E1320",
        primary: "#FF4D4D",
        secondary: "#FF7A59",
        accent: "#6C63FF",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        "grad-warm": "linear-gradient(135deg, #FF4D4D, #FF7A59)",
        "grad-cool": "linear-gradient(135deg, #6C63FF, #9B6BFF)",
      },
      borderRadius: {
        lg2: "24px",
      },
    },
  },
  plugins: [],
};

export default config;
