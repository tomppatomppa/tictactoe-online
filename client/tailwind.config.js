/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'background-pattern': "url('./assets/app_background.jpg')",
      },
    },
  },
  plugins: [],
}
