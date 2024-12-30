/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inconsolata', 'monospace'],
        mono: ['Relative Mono', 'monospace'],
        'Relative Mono': ['Relative Mono', 'monospace'],
      },
      screens: {
        'custom': '768px', // or whatever pixel value you prefer
      }
    },
  },
  plugins: [],
}