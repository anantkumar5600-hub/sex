import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        "ink-raised": "#171717",
        "ink-line": "rgba(255,255,255,0.12)",
        paper: "#F5F5F5",
        "paper-dim": "#A8A8A8",
        "paper-faint": "#6E6E6E"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"]
      },
      maxWidth: {
        shell: "1440px"
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)"
      },
      keyframes: {
        grain: {
          "0%, 100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-1%,-2%)" },
          "30%": { transform: "translate(1%,1%)" },
          "50%": { transform: "translate(-2%,1%)" },
          "70%": { transform: "translate(2%,-1%)" },
          "90%": { transform: "translate(-1%,2%)" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        grain: "grain 8s steps(10) infinite",
        marquee: "marquee 30s linear infinite"
      }
    }
  },
  plugins: []
};
export default config;
