import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        sunrisers: {
          DEFAULT: "#FF4B03",
          fire: "#FF6B00",
          bright: "#FF7D19",
          amber: "#FE9A2A",
          gold: "#F59E0B",
          dark: "#B83800",
          navy: "#0A0E1A",
          obsidian: "#070A12",
          card: "#0E1526"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      fontFamily: {
        sans: ["var(--font-forma)", "sans-serif"],
        heading: ["var(--font-redzone)", "sans-serif"],
        redzone: ["var(--font-redzone)", "sans-serif"],
        forma: ["var(--font-forma)", "sans-serif"],
        mono: ["var(--font-redzone)", "sans-serif"]
      },
      boxShadow: {
        sports: "0 10px 30px -10px rgba(255, 75, 3, 0.4)",
        glow: "0 0 30px -5px rgba(255, 107, 0, 0.45)",
        flame: "0 0 50px rgba(255, 75, 3, 0.3)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
