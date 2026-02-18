const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  // التأكد من وجود التوكن في الهيدر
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // استخراج التوكن (Bearer <token>)
      token = req.headers.authorization.split(" ")[1];

      // فك تشفير التوكن
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // إضافة بيانات المستخدم للطلب (اختياري)
      req.user = decoded.id;

      next(); // السماح بالمرور
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
