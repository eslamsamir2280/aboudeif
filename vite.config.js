import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // ده بيسمح للسيرفر يشتغل على IP الشبكة مش بس localhost
    port: 5173, // (اختياري) لو عايز تثبت البورت
  },
  theme: {
    extend: {
      colors: {
        gold: {
          400: "#E6C768", // ذهبي فاتح
          500: "#D4AF37", // ذهبي أساسي (زي الصورة)
          600: "#AA8C2C", // ذهبي غامق للهوفر
        },
        dark: {
          900: "#050505", // أسود غامق للخلفيات
          800: "#1a1a1a", // درجة أفتح قليلاً
        },
      },
      fontFamily: {
        cairo: ["Cairo", "sans-serif"],
      },
    },
  },
});
