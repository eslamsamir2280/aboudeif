const mongoose = require("mongoose");

// سكيم للفيديو الصغير
const ThumbnailSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: {
    ar: { type: String, required: true },
    en: { type: String, required: true },
  },
  duration: { type: String, default: "00:00" },
  link: { type: String, default: "#" }, // رابط يوتيوب مثلاً
});

// سكيم للمكتبة ككل
const VideoLibrarySchema = new mongoose.Schema(
  {
    // إعدادات العناوين العامة للسكشن
    sectionTitle: {
      ar: { type: String, default: "مكتبة الفيديوهات" },
      en: { type: String, default: "Video Library" },
    },
    sectionSubtitle: {
      ar: { type: String, default: "أحدث الرؤى والتحليلات القانونية" },
      en: { type: String, default: "Latest Legal Insights & Analysis" },
    },
    // الفيديو الرئيسي الكبير
    mainVideo: {
      image: { type: String, default: "" },
      title: {
        ar: { type: String, default: "عنوان الفيديو الرئيسي" },
        en: { type: String, default: "Main Video Title" },
      },
      date: {
        ar: { type: String, default: "1 يناير 2025" },
        en: { type: String, default: "Jan 1, 2025" },
      },
      link: { type: String, default: "#" },
    },
    // قائمة الفيديوهات الصغيرة
    thumbnails: [ThumbnailSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model("VideoLibrary", VideoLibrarySchema);
