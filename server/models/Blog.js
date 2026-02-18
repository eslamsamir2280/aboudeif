const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true }, // رابط المقال (مثال: new-law-2025)
    image: { type: String, required: true },
    category: {
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },
    title: {
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },
    shortDesc: {
      // وصف مختصر للكارت
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },
    content: {
      // المحتوى الكامل (HTML من المحرر)
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Blog", BlogSchema);
