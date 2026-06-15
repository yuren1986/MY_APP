import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./App.jsx",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E85D04',
        secondary: '#1B4965',
        accent: '#A7C957',
        background: '#F8F9FA',
        text: '#2D3436',
        muted: '#6C757D',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Noto Sans SC', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
