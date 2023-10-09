/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode:'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      ...colors,
      stone: colors.warmGray,
      sky: colors.lightBlue,
      neutral: colors.trueGray,
      gray: colors.coolGray,
      slate: colors.blueGray,
      // 'white': '#ffffff',
      // 'blue': '#1fb6ff',
      // 'purple': '#7e5bef',
      // 'pink': '#ff49db',
      // 'orange': '#ff7849',
      // 'green': '#13ce66',

      // 'black':'1111111',
      // 'yellow': '#f7e93e',
      // 'yellow-dark':'#f7d300',
      // 'navy':'#391bff',
      // 'navy-dark':'#0008f3',
      // 'gray-border':'#e0e0e0',
      // 'gray-link':'#444444',

      // 'gray-dark': '#273444',
      // 'gray': '#8492a6',
      // 'gray-light': '#d3dce6',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [
  ],
}
