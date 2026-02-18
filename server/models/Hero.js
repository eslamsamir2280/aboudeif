const mongoose = require("mongoose");

const HeroSchema = new mongoose.Schema(
  {
    backgroundImage: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/defcamc5x/image/upload/v1771151388/odrnmpew9adpsaog8app.png",
    },
    tagline: {
      en: { type: String, default: "Legal Excellence" },
      ar: { type: String, default: "التميز القانوني" },
    },
    titlePart1: {
      en: { type: String, default: "Defending Your" },
      ar: { type: String, default: "ندافع عن" },
    },
    titlePart2: {
      en: { type: String, default: "Rights & Future" },
      ar: { type: String, default: "حقوقك ومستقبلك" },
    },
    description: {
      en: { type: String, default: "We provide top-notch legal services..." },
      ar: { type: String, default: "نقدم خدمات قانونية من الطراز الأول..." },
    },
    primaryButton: {
      text: {
        en: { type: String, default: "Get Consultation" },
        ar: { type: String, default: "اطلب استشارة" },
      },
      link: { type: String, default: "/contact" },
    },
    secondaryButton: {
      text: {
        en: { type: String, default: "Learn More" },
        ar: { type: String, default: "اعرف المزيد" },
      },
      link: { type: String, default: "/about" },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Hero", HeroSchema);
