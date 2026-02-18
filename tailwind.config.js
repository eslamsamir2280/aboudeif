/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <--- السطر ده أهم حاجة
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          400: "#E6C768",
          500: "#D4AF37",
          600: "#AA8C2C",
        },
        dark: {
          900: "#050505",
          800: "#1a1a1a",
        },
      },
      fontFamily: {
        cairo: ["Cairo", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
