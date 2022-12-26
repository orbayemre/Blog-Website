/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors:{
          'first': '#184e77',
          'firstHover': '#113046',
          'second' : '#ee6c4d',
          'third' : '#8ecae6',
          'story' :'#EAEAEA',
        }
      },

  },
  plugins: [],
}
