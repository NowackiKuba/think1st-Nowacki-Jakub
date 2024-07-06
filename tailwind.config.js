/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'text-primary': '#000853',
        background: '#F0EAF8',
        secondary: '#CBB6E5',
        'border-active': '#000853',
        primary: '#761BE4',
      },
    },
  },
  plugins: [],
};
