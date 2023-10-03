/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["app/**/*.{ts,tsx}", "src/components/**/*.{ts,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
  theme: {
    extend: {
      colors: {
        darkBlue: "#A3C3D9",
        darkGreen: "#0F7173",
        lightBlue: "#E9ECF5",
        mediumBlue: "#CCD6EB",
        orange: "#e2662c",
        salsa: "#F05D5E",
      },
      fontFamily: {
        heading: ["var(--font-lilita)"],
        sans: ["var(--font-montserrat)"],
      },
    },
  },
};
