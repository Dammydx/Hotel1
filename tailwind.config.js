/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cozy': {
          'cream': '#FAF8F3',      // Warm cream - main background
          'taupe': '#D4C5B5',      // Soft taupe - section background / cards
          'terracotta': '#C85A3A', // Terracotta - primary CTA buttons
          'gold': '#D4AF6F',       // Muted gold - luxury accent
          'olive': '#6B7B4A',      // Olive green - secondary accent
          'charcoal': '#2C2C2C',   // Charcoal - main text
        },
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
