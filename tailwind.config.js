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
        'inter': ['Inter', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'inconsolata': ['Inconsolata', 'monospace'],
        'playfair': ['Playfair Display', 'serif'],
        'vt323': ['VT323', 'monospace'],
        'xanh': ['Xanh Mono', 'monospace'],
        sans: ['Inconsolata', 'monospace'],
      },
      screens: {
        'custom': '768px', // or whatever pixel value you prefer
      }
    },
  },
  plugins: [],
}