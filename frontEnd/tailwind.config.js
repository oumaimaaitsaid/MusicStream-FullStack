/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        spotify: '#1DB954',
        dark: '#121212',
        lightDark: '#181818',
        grayText: '#b3b3b3'
      }
    },
  },
  plugins: [],
}
