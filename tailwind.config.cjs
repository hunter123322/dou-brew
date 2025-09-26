/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-white': '#F5EFE6',
        'brand-brown-light': '#D3C5B5',
        'brand-brown': '#A0522D',
        'brand-brown-dark': '#6B4F4F',
        'brand-tan': '#EAE0D5',
        'brand-off-white': '#FDFBF7',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
