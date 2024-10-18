/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      
      colors: {
        blue: "#2997FF",
        gray: {
          DEFAULT: "#86868b",
          100: "#aba290",
          200: "#afafaf",
          300: "#42424570",
        },
        zinc: "#101010",
      },
    },
    plugins: [],
  },
};
