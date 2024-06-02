import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: ["src/components/**/*.{js,ts,ejs,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      keyframes: {
        "rotate-one": {
          "0%": { transform: "rotateX(60deg) rotate(0deg)" },
          "100%": { transform: "rotateX(60deg) rotate(360deg)" },
        },
        rotateLoad: {
          "0%": { transform: " translate(-50%, -50%) rotate(0deg)" },
          "100%": { transform: " translate(-50%, -50%) rotate(360deg)" },
        },
        ripple: {
          "0%": {
            transform: "translate(-50%, -50%) scale(0.2)",
            opacity: "0.8",
          },
          "50%": {
            transform: "translate(-50%, -50%) scale(1)",
            opacity: "0",
          },
          "100%": {
            transform: "translate(-50%, -50%) scale(0.2)",
            opacity: "0.8",
          },
        },
      },
      animation: {
        "rotate-one": "rotate-one 1s linear infinite",
        rotateLoad: "rotateLoad 10s linear infinite",
        ripple: "ripple 2s linear infinite",
        "ripple-delay": "ripple 2s linear infinite 1s",
      },
      colors: {
        blurBg: "rgba(4, 8, 42, 0.4)",
      },
      dropShadow: {
        loader: ["0 0 2px #d9d8f0", "0 0 6px rgba(0, 0, 0, 0.4)"],
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
} satisfies Config;
