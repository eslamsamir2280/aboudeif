const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const About = require("../models/About");
const { protect } = require("../middleware/authMiddleware");

// --- إعدادات Multer لرفع الصور ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // مكان الحفظ
  },
  filename: function (req, file, cb) {
    // تسمية الملف: التاريخ + الاسم الأصلي (لمنع تكرار الأسماء)
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// --- Controllers ---

// 1. جلب البيانات
router.get("/", async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) about = await About.create({});

    // إضافة الدومين لرابط الصورة ليظهر في الفرونت
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    // نتأكد هل هي رابط خارجي (Cloudinary) أم ملف محلي
    const imageUrl = about.image.startsWith("http")
      ? about.image
      : `${baseUrl}${about.image}`;

    // نرسل البيانات مع رابط الصورة المعدل
    const responseData = about.toObject();
    responseData.fullImageUrl = imageUrl;

    res.json(responseData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. تحديث البيانات (يدعم رفع ملف)
router.put("/", protect, upload.single("image"), async (req, res) => {
  try {
    // البيانات النصية تأتي كـ Strings داخل الـ body
    // نحتاج لتحليلها (Parsing) لأنها ستصل كـ JSON Strings إذا أرسلناها بـ FormData
    const data = req.body;

    const updateData = {
      imageName: JSON.parse(data.imageName),
      imageTitle: JSON.parse(data.imageTitle),
      label: JSON.parse(data.label),
      title: JSON.parse(data.title),
      subtitle: JSON.parse(data.subtitle),
      description1: JSON.parse(data.description1),
      description2: JSON.parse(data.description2),
      statsYears: data.statsYears,
      statsCases: data.statsCases,
    };

    // إذا تم رفع صورة جديدة، قم بتحديث المسار
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedAbout = await About.findOneAndUpdate({}, updateData, {
      new: true,
      upsert: true,
    });

    res.json(updatedAbout);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
