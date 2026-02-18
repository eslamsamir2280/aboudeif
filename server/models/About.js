const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
      default: "/uploads/default-about.jpg", // صورة افتراضية
    },
    imageName: {
      ar: { type: String, default: "د. جمال أبوضيف" },
      en: { type: String, default: "Dr. Gamal Aboudeif" },
    },
    imageTitle: {
      ar: { type: String, default: "مؤسس وشريك إداري" },
      en: { type: String, default: "Founder & Managing Partner" },
    },
    label: {
      // النص الصغير "ABOUT US"
      ar: { type: String, default: "من نحن" },
      en: { type: String, default: "ABOUT US" },
    },
    title: {
      ar: { type: String, default: "الدرع القانوني لحماية مصالحك" },
      en: { type: String, default: "The Legal Shield For Your Interests" },
    },
    subtitle: {
      ar: { type: String, default: "شريكك الاستراتيجي في النجاح" },
      en: { type: String, default: "Your Strategic Partner in Success" },
    },
    description1: {
      // الفقرة الأولى
      ar: { type: String, default: "" },
      en: { type: String, default: "" },
    },
    description2: {
      // الفقرة الثانية
      ar: { type: String, default: "" },
      en: { type: String, default: "" },
    },
    statsYears: { type: String, default: "+45" },
    statsCases: { type: String, default: "$2B+" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("About", AboutSchema);
