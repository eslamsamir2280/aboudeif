const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const VideoLibrary = require("../models/VideoLibrary");
const { protect } = require("../middleware/authMiddleware");
// إعداد رفع الصور
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// 1. جلب البيانات
router.get("/", async (req, res) => {
  try {
    let data = await VideoLibrary.findOne();
    if (!data) data = await VideoLibrary.create({});

    // ضبط روابط الصور
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const dataObj = data.toObject();

    // ضبط صورة الفيديو الرئيسي
    if (
      dataObj.mainVideo.image &&
      !dataObj.mainVideo.image.startsWith("http")
    ) {
      dataObj.mainVideo.fullImageUrl = `${baseUrl}${dataObj.mainVideo.image}`;
    } else {
      dataObj.mainVideo.fullImageUrl = dataObj.mainVideo.image;
    }

    // ضبط صور الفيديوهات الصغيرة
    dataObj.thumbnails = dataObj.thumbnails.map((item) => ({
      ...item,
      fullImageUrl: item.image.startsWith("http")
        ? item.image
        : `${baseUrl}${item.image}`,
    }));

    res.json(dataObj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. تحديث القسم الرئيسي (العناوين + الفيديو الرئيسي)
router.put("/main", protect, upload.single("image"), async (req, res) => {
  try {
    const { sectionTitle, sectionSubtitle, mainTitle, mainDate, mainLink } =
      req.body;

    // تجهيز كائن التحديث
    const updateData = {};
    if (sectionTitle) updateData.sectionTitle = JSON.parse(sectionTitle);
    if (sectionSubtitle)
      updateData.sectionSubtitle = JSON.parse(sectionSubtitle);

    // تحديث بيانات الفيديو الرئيسي
    if (mainTitle || mainDate || mainLink) {
      updateData["mainVideo.title"] = JSON.parse(mainTitle);
      updateData["mainVideo.date"] = JSON.parse(mainDate);
      updateData["mainVideo.link"] = mainLink;
    }

    // إذا تم رفع صورة جديدة للفيديو الرئيسي
    if (req.file) {
      updateData["mainVideo.image"] = `/uploads/${req.file.filename}`;
    }

    const updated = await VideoLibrary.findOneAndUpdate(
      {},
      { $set: updateData },
      { new: true, upsert: true },
    );
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// 3. إضافة فيديو صغير جديد
router.post("/thumbnail", protect, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Image required" });

    const newThumb = {
      title: JSON.parse(req.body.title),
      duration: req.body.duration,
      link: req.body.link,
      image: `/uploads/${req.file.filename}`,
    };

    const doc = await VideoLibrary.findOne();
    doc.thumbnails.push(newThumb);
    await doc.save();

    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. حذف فيديو صغير
router.delete("/thumbnail/:id", protect, async (req, res) => {
  try {
    const doc = await VideoLibrary.findOne();
    doc.thumbnails = doc.thumbnails.filter(
      (t) => t._id.toString() !== req.params.id,
    );
    await doc.save();
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
