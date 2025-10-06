import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./app/**/*.{ts,tsx}", "./app/**/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  // Docs - https://v3.tailwindcss.com/docs/plugins
  plugins: [typography],
} satisfies Config;
