import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: "#0B0F19",
        card: "#111827",
        border: "#1F2937",
        beige: "#F5F5DC",
        "green-primary": "#14532D",
        "green-light": "#166534",
        "green-muted": "#14532D33",
        orange: {
          DEFAULT: "#F97316",
          hover: "#EA6D0E",
          muted: "#F9731620",
        },
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
          950: "#030712",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Poppins", "Inter", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #0B0F19 0%, #14532D22 50%, #0B0F19 100%)",
        "card-gradient": "linear-gradient(145deg, #111827, #0B0F19)",
        "green-gradient": "linear-gradient(135deg, #14532D, #166534)",
        "orange-gradient": "linear-gradient(135deg, #F97316, #EA6D0E)",
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.4)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.6)",
        green: "0 4px 24px rgba(20,83,45,0.3)",
        orange: "0 4px 24px rgba(249,115,22,0.3)",
        glow: "0 0 40px rgba(20,83,45,0.2)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out both",
        "slide-in": "slide-in 0.5s ease-out both",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
