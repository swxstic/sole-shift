/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#080808',
        'bg-secondary': '#171717',
        'accent-red': '#FF3B30',
        'accent-lime': '#DFFF00',
        'text-primary': '#F5F5F0',
        'text-muted': '#8B8B8B',
      },
      fontFamily: {
        display: ['Barlow Condensed', 'Arial Narrow', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
