require("dotenv").config(); // استدعاء متغيرات البيئة
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // استدعاء ملف الاتصال بقاعدة البيانات
const path = require("path");
// استدعاء ملفات الـ Routes
const heroRoutes = require("./routes/heroRoutes");
const authRoutes = require("./routes/authRoutes");
const { protect } = require("./middleware/authMiddleware");

// تهيئة التطبيق
const app = express();

// --- الاتصال بقاعدة البيانات ---
connectDB();

// --- Middlewares ---
// 1. تفعيل CORS للسماح للفرونت اند (Vite) بالتحدث مع السيرفر
// يمكنك لاحقاً تحديد الـ origin ليكون رابط الموقع فقط للحماية
app.use(cors());

// 2. السماح بقراءة البيانات المرسلة بصيغة JSON
app.use(express.json());

// --- Routes (نقاط الوصول) ---

// نقطة الوصول الخاصة بـ Hero Section
app.use("/api/hero", heroRoutes);
app.use("/api/about", require("./routes/aboutRoutes"));
app.use("/api/why-us", require("./routes/whyUsRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/team", require("./routes/teamRoutes"));
app.use("/api/videos", require("./routes/videoRoutes"));
app.use("/api/blog", require("./routes/blogRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/auth", authRoutes);
// مسار اختباري للتأكد أن السيرفر يعمل
app.get("/", (req, res) => {
  res.send("API is running successfully...");
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// --- معالجة الأخطاء (Global Error Handler) ---
// أي خطأ غير متوقع سيصل هنا بدلاً من إيقاف السيرفر
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

// --- تشغيل السيرفر ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
