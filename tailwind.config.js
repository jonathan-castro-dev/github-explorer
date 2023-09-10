/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '360px',
      md: '540px',
      lg: '768px',
      xl: '1024px',
    },
    colors: {
      gray: {
        100: '#f2f2fa',
        500: '#a8a8b3',
        700: '#737380',
        800: '#3d3d4d',
        900: '#3a3a3a',
      },
      green: '#04d361',
      red: '#f7091b',
      white: '#fff'
    },
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true })
  ],
}
