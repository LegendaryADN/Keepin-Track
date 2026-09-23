import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: "#DD4F44",
        cream: "#EDE0D3",
        night: "#121212",
        maroon: "#2E1B18",
        brick: "#55241F",
        blush: "#D9A79A",
      },
    },
  },
  plugins: [],
};

export default config;
