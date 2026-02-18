const express = require("express");
const router = express.Router();
const {
  getHeroData,
  updateHeroData,
} = require("../controllers/heroController");
const { protect } = require("../middleware/authMiddleware");

// router.get('/', getHeroData);
// router.put('/', updateHeroData); // لاحقاً سنضيف Middleware للتحقق من الأدمن هنا

// دمجناهم في مسار واحد حسب نوع الطلب
router.route("/").get(getHeroData).put(protect, updateHeroData);

module.exports = router;
