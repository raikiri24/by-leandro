import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"]
      },
      colors: {
        background: "#000000",
        foreground: "#FFFFFF",
        surface: "#0A0A0A",
        secondaryText: "#B5B5B5",
        border: "#242424",
        accent: "#E2E8F0", // subtle cool gray
        primary: {
          DEFAULT: "#FFFFFF",
          foreground: "#000000"
        },
        secondary: {
          DEFAULT: "#1A1A1A",
          foreground: "#FFFFFF"
        },
        muted: {
          DEFAULT: "#111111",
          foreground: "#B5B5B5"
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem"
      }
    }
  },
  plugins: [tailwindcssAnimate]
};

export default config;
