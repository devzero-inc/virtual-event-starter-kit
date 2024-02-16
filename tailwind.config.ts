import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "text-gradient": "linear-gradient(to right, #e73c9f, #a032c6, #4125f8)",
      },
      colors: {
        "cus-purple": "#0f0b29",
        "cus-purple-light": "#412666",
        "cus-text": "#bbb0ee",
      },
    },
  },
  plugins: [],
};
export default config;
