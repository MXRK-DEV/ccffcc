import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      utilities: { '.no-scrollbar': { '-ms-overflow-style': 'none', /* Internet Explorer 10+ */ 'scrollbar-width': 'none', /* Firefox */ '&::-webkit-scrollbar': { display: 'none', /* Safari and Chrome */ },}},
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
