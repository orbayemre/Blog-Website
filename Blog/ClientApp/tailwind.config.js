/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors:{
          'first': '#184e77',
          'second' : '#ee6c4d',
          'third' : '#8ecae6',
        }
      },

  },
  plugins: [],
}
