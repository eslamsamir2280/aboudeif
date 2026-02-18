const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    service: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false }, // لمعرفة هل تمت قراءة الرسالة أم لا
  },
  { timestamps: true },
);

module.exports = mongoose.model("Contact", ContactSchema);
