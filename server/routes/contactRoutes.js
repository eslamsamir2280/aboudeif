const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const { protect } = require("../middleware/authMiddleware");

// 1. إرسال رسالة جديدة (من الموقع)
router.post("/", async (req, res) => {
  try {
    const newMessage = new Contact(req.body);
    await newMessage.save();
    res.status(201).json({ message: "Message Sent Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. جلب جميع الرسائل (للوحة التحكم) - الأحدث أولاً
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. حذف رسالة
router.delete("/:id", protect , async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Message Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
