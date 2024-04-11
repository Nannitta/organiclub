/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: ['./src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'roboto-black': ['roboto-black', 'sans-serif'],
        'roboto-bold': ['roboto-bold', 'sans-serif'],
        'roboto-medium': ['roboto-medium', 'sans-serif'],
        'roboto-regular': ['roboto-regular', 'sans-serif'],
        'roboto-thin': ['roboto-thin', 'sans-serif']
      }
    },
    colors: {
      darkBlue: '#293B66',
      orange: '#EBAD31',
      lightBlue: '#DADFEC',
      black: '#232323',
      white: '#F5F5F5',
      backgroundTable: '#EDF0F8',
      menuNav: '#293b66bf',
      bgGray: '#D9D9D9',
      red: '#DF0E0E'
    }
  },
  plugins: []
}
