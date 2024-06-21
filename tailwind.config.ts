import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  darkMode: "class",
  theme: {
    fontFamily: {
      poppins: ["Poppins", "ui-sans-serif"],
    },
    extend: {
      colors: {
        "primary-dark": "#202224",
        "primary-blue": "#4880FF",
      },
    },
  },
  plugins: [],
};
export default config;
