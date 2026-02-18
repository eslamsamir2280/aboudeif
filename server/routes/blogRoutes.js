const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Blog = require("../models/Blog");
const { protect } = require("../middleware/authMiddleware");

// إعداد رفع الصور
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// 1. جلب كل المقالات (مع دعم Pagination اختياري)
router.get("/", async (req, res) => {
  try {
    // ترتيب تنازلي (الأحدث أولاً)
    const blogs = await Blog.find().sort({ date: -1 });

    // ضبط روابط الصور
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const blogsWithImages = blogs.map((blog) => {
      const b = blog.toObject();
      b.fullImageUrl = b.image.startsWith("http")
        ? b.image
        : `${baseUrl}${b.image}`;
      return b;
    });

    res.json(blogsWithImages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. جلب آخر 3 مقالات (للصفحة الرئيسية)
router.get("/latest", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 }).limit(3);
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const blogsWithImages = blogs.map((blog) => {
      const b = blog.toObject();
      b.fullImageUrl = b.image.startsWith("http")
        ? b.image
        : `${baseUrl}${b.image}`;
      return b;
    });
    res.json(blogsWithImages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. جلب مقال واحد بواسطة الـ Slug (لصفحة التفاصيل)
router.get("/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const b = blog.toObject();
    b.fullImageUrl = b.image.startsWith("http")
      ? b.image
      : `${baseUrl}${b.image}`;

    res.json(b);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. إضافة مقال جديد
router.post("/", protect , upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Image required" });

    const newBlog = new Blog({
      slug: req.body.slug, // يجب التأكد من الفرونت إنه فريد
      image: `/uploads/${req.file.filename}`,
      category: JSON.parse(req.body.category),
      title: JSON.parse(req.body.title),
      shortDesc: JSON.parse(req.body.shortDesc),
      content: JSON.parse(req.body.content),
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 5. حذف مقال
router.delete("/:id", protect , async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
