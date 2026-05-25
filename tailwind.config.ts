import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
    "./three/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        primary: "hsl(var(--primary))",
        cyan: {
          glow: "#48f4ff"
        },
        acid: "#d7ff5b",
        bile: "#65f58b",
        protein: "#ff7474",
        lipid: "#ffd15c"
      },
      boxShadow: {
        glow: "0 0 48px rgba(72, 244, 255, 0.18)",
        "acid-glow": "0 0 60px rgba(215, 255, 91, 0.22)"
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "SFMono-Regular", "monospace"]
      },
      backgroundImage: {
        "radial-grid": "radial-gradient(circle at 20% 20%, rgba(72,244,255,0.16), transparent 28%), radial-gradient(circle at 78% 12%, rgba(101,245,139,0.12), transparent 24%), linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
