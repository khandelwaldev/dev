import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        richBlack: "#011627",
        seasalt: "#f6f7f8",
        folly: "#ff3366",
        celestialBlue: "#20a4f3",
        lightSeaGreen: "#2ec4b6",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
