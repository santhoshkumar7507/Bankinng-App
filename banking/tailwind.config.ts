import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./constants/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        fill: { 1: "rgba(255, 255, 255, 0.10)" },
        bankGradient: "#0179FE",
        indigo: { 500: "#6172F3", 700: "#3538CD" },
        success: { 25: "#F6FEF9", 50: "#ECFDF3", 100: "#D1FADF", 600: "#039855", 700: "#027A48", 900: "#054F31" },
        pink: { 25: "#FEF6FB", 100: "#FCE7F6", 500: "#EE46BC", 600: "#DD2590", 700: "#C11574", 900: "#851651" },
        blue: { 25: "#F5FAFF", 100: "#D1E9FF", 500: "#2E90FA", 600: "#1570EF", 700: "#175CD3", 900: "#194185" },
        sky: { 1: "#F3F9FF" },
        black: { 1: "#00214F", 2: "#344054" },
        gray: { 25: "#FCFCFD", 200: "#EAECF0", 300: "#D0D5DD", 500: "#667085", 600: "#475467", 700: "#344054", 900: "#101828" },
        cyan: { 400: "#22d3ee", 500: "#06b6d4" },
        neon: { blue: "#0179FE", purple: "#6C5CE7", cyan: "#00D4FF", green: "#00F5A0" },
      },
      backgroundImage: {
        "bank-gradient": "linear-gradient(135deg, #0179FE 0%, #6C5CE7 50%, #4893FF 100%)",
        "bank-gradient-reverse": "linear-gradient(135deg, #6C5CE7 0%, #0179FE 100%)",
        "gradient-mesh": "url('/icons/gradient-mesh.svg')",
        "bank-green-gradient": "linear-gradient(135deg, #00B09B 0%, #01797A 100%)",
        "card-gradient-1": "linear-gradient(135deg, #0a0f2e 0%, #0d1b4b 40%, #0f3460 100%)",
        "card-gradient-2": "linear-gradient(135deg, #1a0533 0%, #3d1a6e 60%, #0d0d2b 100%)",
        "card-gradient-3": "linear-gradient(135deg, #003545 0%, #005f73 60%, #001a22 100%)",
        "card-gradient-4": "linear-gradient(135deg, #1a1a0a 0%, #3d3d00 50%, #1a1200 100%)",
        "hero-gradient": "radial-gradient(ellipse at top, #0a0f2e 0%, #03050F 60%)",
        "glow-blue": "radial-gradient(circle, rgba(1,121,254,0.25) 0%, transparent 70%)",
        "glow-purple": "radial-gradient(circle, rgba(108,92,231,0.25) 0%, transparent 70%)",
        "shimmer": "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
        "sidebar-active": "linear-gradient(135deg, rgba(1,121,254,0.15) 0%, rgba(108,92,231,0.1) 100%)",
        "transaction-row": "linear-gradient(90deg, rgba(255,255,255,0.02) 0%, transparent 100%)",
      },
      boxShadow: {
        form: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        chart: "0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)",
        profile: "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
        creditCard: "8px 10px 16px 0px rgba(0, 0, 0, 0.05)",
        "glow-blue": "0 0 30px rgba(1, 121, 254, 0.5), 0 0 60px rgba(1, 121, 254, 0.2)",
        "glow-blue-sm": "0 0 15px rgba(1, 121, 254, 0.4)",
        "glow-purple": "0 0 30px rgba(108, 92, 231, 0.5), 0 0 60px rgba(108, 92, 231, 0.2)",
        "glow-cyan": "0 0 30px rgba(0, 212, 255, 0.5), 0 0 60px rgba(0, 212, 255, 0.2)",
        "glow-green": "0 0 20px rgba(0, 245, 160, 0.4)",
        "card-glow": "0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(1,121,254,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
        "card-glow-hover": "0 30px 80px rgba(0,0,0,0.7), 0 0 60px rgba(1,121,254,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
        "inner-glow": "inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.2)",
        "inner-blue": "inset 0 0 30px rgba(1,121,254,0.1)",
        "glass": "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
        "neon-blue": "0 0 5px #0179FE, 0 0 20px rgba(1,121,254,0.5), 0 0 40px rgba(1,121,254,0.2)",
        "neon-purple": "0 0 5px #6C5CE7, 0 0 20px rgba(108,92,231,0.5), 0 0 40px rgba(108,92,231,0.2)",
      },
      fontFamily: {
        inter: "var(--font-inter)",
        "ibm-plex-serif": "var(--font-ibm-plex-serif)",
      },
      fontSize: {
        "15": ["15px", { lineHeight: "20px" }],
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(1,121,254,0.3)" },
          "50%": { boxShadow: "0 0 50px rgba(1,121,254,0.7), 0 0 100px rgba(1,121,254,0.2)" },
        },
        "pulse-glow-green": {
          "0%, 100%": { boxShadow: "0 0 8px rgba(0,245,160,0.4)" },
          "50%": { boxShadow: "0 0 20px rgba(0,245,160,0.8)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "50%": { transform: "translateY(-16px) scale(1.02)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-left": {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.9)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "card-shine": {
          "0%": { left: "-100%" },
          "100%": { left: "200%" },
        },
        "border-glow": {
          "0%, 100%": { borderColor: "rgba(1,121,254,0.2)" },
          "50%": { borderColor: "rgba(1,121,254,0.6)" },
        },
        "count-up": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "ripple": {
          "0%": { transform: "scale(0)", opacity: "1" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
        "chart-appear": {
          from: { opacity: "0", transform: "scale(0.7) rotate(-15deg)" },
          to: { opacity: "1", transform: "scale(1) rotate(0deg)" },
        },
        "slide-right": {
          from: { width: "0%" },
          to: { width: "var(--progress-width, 100%)" },
        },
        "badge-pop": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "70%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "number-roll": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "active-ping": {
          "0%": { transform: "scale(1)", opacity: "0.8" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
        "pulse-glow-green": "pulse-glow-green 2s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "float": "float 4s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "fade-in-left": "fade-in-left 0.5s ease-out forwards",
        "scale-in": "scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "spin-slow": "spin-slow 10s linear infinite",
        "card-shine": "card-shine 0.6s ease-in-out",
        "border-glow": "border-glow 2s ease-in-out infinite",
        "chart-appear": "chart-appear 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "slide-right": "slide-right 1s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "badge-pop": "badge-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "gradient-shift": "gradient-shift 4s ease infinite",
        "active-ping": "active-ping 1.5s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
