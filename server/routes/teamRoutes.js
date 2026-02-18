const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Team = require("../models/Team");
const { protect } = require("../middleware/authMiddleware");

// إعدادات رفع الصور
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// 1. جلب البيانات
router.get("/", async (req, res) => {
  try {
    let data = await Team.findOne();
    if (!data) data = await Team.create({});

    // إضافة الدومين لصور الأعضاء
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const dataObj = data.toObject();

    dataObj.members = dataObj.members.map((member) => ({
      ...member,
      fullImageUrl: member.image.startsWith("http")
        ? member.image
        : `${baseUrl}${member.image}`,
    }));

    res.json(dataObj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. تحديث العناوين فقط (Title & Subtitle)
router.put("/info", protect, async (req, res) => {
  try {
    const { title, subtitle } = req.body;
    const updated = await Team.findOneAndUpdate(
      {},
      { title, subtitle },
      { new: true, upsert: true },
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. إضافة عضو جديد (مع صورة)
router.post("/member", protect, upload.single("image"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "Image is required" });

    // البيانات النصية تأتي كـ JSON String ونحتاج لفكها
    const name = JSON.parse(req.body.name);
    const job = JSON.parse(req.body.job);
    const imagePath = `/uploads/${req.file.filename}`;

    const newMember = {
      name,
      job,
      image: imagePath,
    };

    const team = await Team.findOne();
    team.members.push(newMember);
    await team.save();

    res.json(team);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// 4. حذف عضو
router.delete("/member/:id", protect, async (req, res) => {
  try {
    const team = await Team.findOne();
    team.members = team.members.filter(
      (m) => m._id.toString() !== req.params.id,
    );
    await team.save();
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
