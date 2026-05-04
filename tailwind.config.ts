// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        vyse: {
          black: "#0D0D0D",
          accent: "#CCFF00", // Le vert lime de tes images
          soft: "#F5F5F7",   // Gris très clair pour le fond
        }
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      }
    },
  },
  plugins: [],
};
export default config;