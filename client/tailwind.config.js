/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-green": "#1f5014",
        "secondary-green": "#cbddd1",
      },
      fontFamily: {
        abril: ["Abril Fatface", "cursive"],
        barlow: ['Barlow', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
