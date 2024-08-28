/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gradientColorStops: theme => ({
        'gray-100': theme('colors.gray.100'),
        'gray-300': theme('colors.gray.300'),
      }),
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'times': ['Times New Roman', 'Times', 'serif'],
      },
    },
  },
  plugins: [],
}