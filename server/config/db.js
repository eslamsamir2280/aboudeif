const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // محاولة الاتصال باستخدام الرابط المخزن في ملف .env
    // Mongoose 6+ لا يحتاج لإعدادات إضافية مثل useNewUrlParser
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // في حالة حدوث خطأ، اطبعه في الكونسول
    console.error(`Error: ${error.message}`);

    // أوقف العملية بالكامل (Exit with failure)
    process.exit(1);
  }
};

module.exports = connectDB;
