const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// إنشاء أدمن لأول مرة (يمكنك حذفه لاحقاً أو استخدامه مرة واحدة)
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  // تشفير الباسورد
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ username, password: hashedPassword });
  res.json(user);
});

// تسجيل الدخول
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // البحث عن المستخدم
  const user = await User.findOne({ username });

  // التحقق من الباسورد
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "بيانات الدخول غير صحيحة" });
  }
});

// دالة مساعدة لإنشاء التوكن
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // صلاحية التوكن 30 يوم
  });
};

module.exports = router;
