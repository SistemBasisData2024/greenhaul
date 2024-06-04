/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        abril: ['"Abril Fatface"', 'cursive'],
      },
      colors: {
        'custom-green': '#1f5014',
        'custom-cream': '#cbddd1',
      }
    },
  },
  plugins: [],
};
