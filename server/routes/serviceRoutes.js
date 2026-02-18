const express = require("express");
const router = express.Router();
const Service = require("../models/Service");
const { protect } = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {
  try {
    let data = await Service.findOne();
    if (!data) {
      // إنشاء بيانات افتراضية لو أول مرة
      data = await Service.create({
        items: [
          {
            icon: "FaGlobeAmericas",
            title: { ar: "تحكيم دولي", en: "Arbitration" },
            desc: { ar: "...", en: "..." },
          },
          {
            icon: "FaBuilding",
            title: { ar: "شركات", en: "Corporate" },
            desc: { ar: "...", en: "..." },
          },
        ],
      });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/", protect , async (req, res) => {
  try {
    const updatedData = await Service.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.json(updatedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
