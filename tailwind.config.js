/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["app/**/*.{ts,tsx}", "src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkGreen: "#0F7173",
        salsa: "#F05D5E",
        darkBlue: "#A3C3D9",
        mediumBlue: "#CCD6EB",
        lightBlue: "#E9ECF5",
        orange: "#e2662c",
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}