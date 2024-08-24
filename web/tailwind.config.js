const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['"Inter"', 'sans-serif'],
      },
      colors: {
        primary: '#0F5BA7',   // Primary color
        primaryDisable: '#85C0F4',   // Disabled state color
        primaryHover: '#103F63',   // Hover state color
        primaryOutline: '#0F5BA7', // Outline color
        branding: '#99FFFF', // Branding color
        background: '#BEDCF9', // Background color
        blueBackground: "#00182F"
      },
    },
  },
  darkMode: "class",
  plugins: [require('daisyui')],
};
