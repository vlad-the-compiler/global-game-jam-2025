import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    fontFamily: {
      'schoolbell': ['"Schoolbell"', 'cursive', 'sans-serif'],
    },
    animation: {
      jiggle: "jiggle 4s infinite",
      float: "float 6s infinite",
    },
    keyframes: {
      jiggle: {
        "0%": { transform: "rotate(0.4deg)" },
        "24%": { transform: "rotate(0.4deg)" },
        "25%": { transform: "rotate(1.5deg)" },
        "49%": { transform: "rotate(1.5deg)" },
        "50%": { transform: "rotate(-1.2deg)" },
        "74%": { transform: "rotate(-1.2deg)" },
        "75%": { transform: "rotate(0.8deg)" },
        "99%": { transform: "rotate(0.8deg)" },
        "100%": { transform: "rotate(0.4deg)" },
      },
      float: {
        '0%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-8px)' },
        '100%': { transform: 'translateY(0)' },
      },
    },
  },

  plugins: [],
} satisfies Config;
