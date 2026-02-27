import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0a0e14",
          secondary: "#121820",
          card: "#1a2030",
          elevated: "#222d3d",
        },
        text: {
          primary: "#e8e8e8",
          secondary: "#8899aa",
          muted: "#556677",
        },
        accent: {
          gold: "#f5c542",
          green: "#55ff55",
          red: "#ff5555",
          blue: "#5555ff",
          purple: "#aa55ff",
        },
        rarity: {
          normal: "#cccccc",
          unique: "#ffff55",
          rare: "#ff55ff",
          legendary: "#55ffff",
          fabled: "#ff5555",
          mythic: "#aa00aa",
          set: "#00aa00",
        },
        class: {
          warrior: "#cc4444",
          mage: "#44cccc",
          archer: "#44cc44",
          assassin: "#cccc44",
          shaman: "#cc44cc",
        },
      },
      fontFamily: {
        heading: ["Rajdhani", "Exo 2", "system-ui", "sans-serif"],
        body: ["Inter", "-apple-system", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        minecraft: ["'Press Start 2P'", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        glow: "glow 2s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glow: {
          "0%": { textShadow: "0 0 10px #f5c542, 0 0 20px #f5c542" },
          "100%": { textShadow: "0 0 20px #f5c542, 0 0 40px #f5c542, 0 0 60px #f5c542" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-pattern":
          "linear-gradient(135deg, rgba(10,14,20,0.95) 0%, rgba(18,24,32,0.8) 50%, rgba(10,14,20,0.95) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
