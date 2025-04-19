import { type Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"
import { PluginAPI } from "tailwindcss/plugin"

import screens from "./src/config/screens"

export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens,
    },
    screens,
    extend: {
      zIndex: {
        100: "100",
      },
      width: {
        "half-screen": "50vw",
      },
      height: {
        "half-screen": "50vh",
      },
      colors: {
        highlight: {
          DEFAULT: "#3b82f6",
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar))",
          foreground: "hsl(var(--sidebar-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...defaultTheme.fontFamily.mono],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.5)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.6)",
          },
          "100%": {
            transform: "tranlate(0px, 0px) scale(1)",
          },
        },
        line: {
          "0%": {
            left: "-40%",
          },
          "50%": {
            left: "20%",
            width: "80%",
          },
          "100%": {
            left: "100%",
            width: "100%",
          },
        },
      },
      animation: {
        line: "line 1.5s linear infinite",
        blob: "blob 7s infinite",
        marquee: "marquee 25s linear infinite",
        marquee2: "marquee2 25s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    function ({ matchUtilities, theme }: PluginAPI) {
      matchUtilities(
        {
          "flexible-text": (value: string) => ({
            fontSize: `clamp(${value}/1.4,5vw,${value})`,
          }),
        },
        { values: theme("width", {}) }
      )
    },
    function ({ addUtilities }: PluginAPI) {
      const newUtilities = {
        ".text-shadow-sm": {
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
        },
        ".text-shadow": {
          textShadow: "2px 2px 3px rgba(0, 0, 0, 0.5)",
        },
        ".text-shadow-md": {
          textShadow: "3px 3px 6px rgba(0, 0, 0, 0.6)",
        },
        ".text-shadow-lg": {
          textShadow: "4px 4px 10px rgba(0, 0, 0, 0.8)",
        },
      }

      addUtilities(newUtilities)
    },
  ],
} satisfies Config
