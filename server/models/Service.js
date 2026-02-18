const mongoose = require("mongoose");

// شكل الخدمة الواحدة
const ServiceItemSchema = new mongoose.Schema({
  icon: { type: String, default: "FaGavel" },
  title: {
    ar: { type: String, default: "عنوان الخدمة" },
    en: { type: String, default: "Service Title" },
  },
  desc: {
    ar: { type: String, default: "وصف الخدمة..." },
    en: { type: String, default: "Service description..." },
  },
});

// شكل القسم بالكامل
const ServicesSchema = new mongoose.Schema(
  {
    sectionSubtitle: {
      ar: { type: String, default: "مجالات التخصص" },
      en: { type: String, default: "Practice Areas" },
    },
    sectionTitle: {
      ar: { type: String, default: "خدماتنا القانونية" },
      en: { type: String, default: "Our Legal Services" },
    },
    sectionDesc: {
      ar: { type: String, default: "نغطي كافة الجوانب القانونية..." },
      en: { type: String, default: "We cover all legal aspects..." },
    },
    items: [ServiceItemSchema], // مصفوفة الخدمات
  },
  { timestamps: true },
);

module.exports = mongoose.model("Service", ServicesSchema);
