const Hero = require("../models/Hero");

// @desc    Get Hero Data
// @route   GET /api/hero
// @access  Public
exports.getHeroData = async (req, res) => {
  try {
    // نبحث عن أول وثيقة، إذا لم توجد ننشئ واحدة افتراضية
    let hero = await Hero.findOne();
    if (!hero) {
      hero = await Hero.create({});
    }
    res.json(hero);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update Hero Data
// @route   PUT /api/hero
// @access  Private (Admin)
exports.updateHeroData = async (req, res) => {
  try {
    const {
      backgroundImage,
      tagline,
      titlePart1,
      titlePart2,
      description,
      primaryButton,
      secondaryButton,
    } = req.body;

    // upsert: true تعني لو مش موجود انشئه، لو موجود حدثه
    // هذا يضمن وجود وثيقة واحدة فقط للـ Hero
    const updatedHero = await Hero.findOneAndUpdate(
      {},
      {
        backgroundImage,
        tagline,
        titlePart1,
        titlePart2,
        description,
        primaryButton,
        secondaryButton,
      },
      { new: true, upsert: true },
    );

    res.json(updatedHero);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
