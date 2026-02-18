const mongoose = require("mongoose");

const FeatureSchema = new mongoose.Schema({
  icon: { type: String, default: "FaHistory" }, // تخزين اسم الأيقونة كنص
  title: {
    ar: { type: String, default: "عنوان الميزة" },
    en: { type: String, default: "Feature Title" },
  },
  description: {
    ar: { type: String, default: "وصف الميزة هنا..." },
    en: { type: String, default: "Feature description here..." },
  },
});

const WhyUsSchema = new mongoose.Schema(
  {
    subtitle: {
      ar: { type: String, default: "لماذا تختارنا" },
      en: { type: String, default: "WHY CHOOSE US" },
    },
    title: {
      ar: { type: String, default: "نحن ملتزمون بالتميز" },
      en: { type: String, default: "We Are Committed To Excellence" },
    },
    features: [FeatureSchema], // قائمة الكروت
  },
  { timestamps: true },
);

module.exports = mongoose.model("WhyUs", WhyUsSchema);
