/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
      },
      backgroundColor: {
        'custom-dark': '#0E0E12',
        'main' : "#2B2D34"
      },
      colors: {
        'spotify-primary': '#1DB954', 
        'spotify-secondary': '#191414', 
        'spotify-accent': '#1ED760', 
        'text':'#0E0E12'
      },
      animation:{
        wiggle : "wiggle 3s linear infinite"
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { color : "green" },
          '50%': {color :"red"},
          '75%': {color: "blue"},
          // '25%' : {color: "white"}
        },
      }
    },
  },
  plugins: [ function ({ addUtilities }) {
    addUtilities({
      '.scrollbar-hide': {
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        '-ms-overflow-style': 'none', /* IE 10+ */
        'scrollbar-width': 'none', /* Firefox */
      },
    });
    },
],
}