/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'WelcomeB': '385px',
        'navbar': '833px'
      },
    },
  },
  plugins: [],
}
