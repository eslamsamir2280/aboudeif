const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: {
    ar: { type: String, required: true },
    en: { type: String, required: true },
  },
  job: {
    ar: { type: String, required: true },
    en: { type: String, required: true },
  },
});

const TeamSchema = new mongoose.Schema(
  {
    title: {
      ar: { type: String, default: "فريق العمل" },
      en: { type: String, default: "Meet The Team" },
    },
    subtitle: {
      ar: { type: String, default: "نخبة من المستشارين..." },
      en: { type: String, default: "Our experts..." },
    },
    members: [MemberSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Team", TeamSchema);
