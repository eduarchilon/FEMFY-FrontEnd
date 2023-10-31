/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        'femfy': {
          '50': '#fcf5fe',
          '100': '#f9eafd',
          '200': '#f2d4fa',
          '300': '#eab2f5',
          '400': '#de84ee',
          '500': '#cc54e1',
          '600': '#b234c5',
          '700': '#9628a3',
          '800': '#7c2385',
          '900': '#5d1e62',
          '950': '#440a48',
        },
      },
    },
  },
  daisyui: {
    darkTheme: false,
  },
  plugins: [],
};
