import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: { 'black-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',}, // You can adjust the shadow values to achieve the desired effect }, 
      utilities: { '.no-scrollbar': { '-ms-overflow-style': 'none', /* Internet Explorer 10+ */ 'scrollbar-width': 'none', /* Firefox */ '&::-webkit-scrollbar': { display: 'none', /* Safari and Chrome */ },}},
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
