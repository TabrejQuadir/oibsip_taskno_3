/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [  "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      backdropBlur: {
        'none': '0',
        'sm': '4px',
        'md': '10px',
        'lg': '20px',
        'xl': '40px',
      },
    },
  },
  plugins: [],
}

