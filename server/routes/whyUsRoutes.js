const express = require("express");
const router = express.Router();
const WhyUs = require("../models/WhyUs");
const { protect } = require("../middleware/authMiddleware");
// جلب البيانات
router.get("/", async (req, res) => {
  try {
    let data = await WhyUs.findOne();
    if (!data) {
      // إنشاء بيانات افتراضية إذا لم توجد
      data = await WhyUs.create({
        features: [
          {
            icon: "FaHistory",
            title: { ar: "خبرة عريقة", en: "History" },
            description: { ar: "...", en: "..." },
          },
          {
            icon: "FaTrophy",
            title: { ar: "سجل حافل", en: "Awards" },
            description: { ar: "...", en: "..." },
          },
          {
            icon: "FaHandshake",
            title: { ar: "ثقة متبادلة", en: "Trust" },
            description: { ar: "...", en: "..." },
          },
          {
            icon: "FaUniversity",
            title: { ar: "معرفة قانونية", en: "Legal" },
            description: { ar: "...", en: "..." },
          },
        ],
      });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// تحديث البيانات
router.put("/", protect, async (req, res) => {
  try {
    const updatedData = await WhyUs.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.json(updatedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
