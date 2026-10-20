import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        background: "#FFFFFF",
        foreground: "#171A20",
        surface: "#F4F4F4",
        secondaryText: "#666B73",
        border: "#E2E3E5",
        accent: "#393C41",
        primary: {
          DEFAULT: "#171A20",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F4F4F4",
          foreground: "#171A20",
        },
        muted: {
          DEFAULT: "#F4F4F4",
          foreground: "#666B73",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
