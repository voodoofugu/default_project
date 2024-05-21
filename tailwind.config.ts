import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: ["src/components/**/*.{js,ts,ejs,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {},
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
