import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import axios from 'axios'; // تأكد أنك مثبت axios في المشروع الرئيسي

const Hero = () => {
  const { i18n } = useTranslation();
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. جلب البيانات من السيرفر
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        // نستخدم الرابط الخاص بالسيرفر
        const res = await axios.get('http://localhost:5000/api/hero');
        setHeroData(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hero data:", error);
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // تحديد اللغة الحالية
  const isArabic = i18n.language === 'ar';
  const langKey = isArabic ? 'ar' : 'en'; // مفتاح للوصول للكائن { ar: '...', en: '...' }
  const headingFont = isArabic ? 'font-cairo' : 'font-playfair';

  // 2. عرض شاشة تحميل بسيطة أو إخفاء السكشن لحين وصول البيانات
  if (loading) {
    return <div className="h-screen w-full bg-black flex items-center justify-center text-gold-500">Loading...</div>;
  }

  // في حالة عدم وجود بيانات (احتياطي)
  if (!heroData) return null;

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      
      {/* Background Image: الآن تأتي من قاعدة البيانات */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url('${heroData.backgroundImage}')` }}
      >
        <div className="absolute inset-0 bg-black/70 bg-gradient-to-t from-black via-transparent to-black/60"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        
        {/* Tagline */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-block border border-gold-500/50 rounded-full px-4 py-1 mb-6 backdrop-blur-sm"
        >
          <span className="text-gold-400 text-xs md:text-sm tracking-wider uppercase font-bold font-cairo">
            {/* عرض النص بناءً على اللغة المختارة */}
            {heroData.tagline[langKey]}
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`text-5xl md:text-7xl font-bold text-white mb-6 leading-tight ${headingFont}`}
        >
          <span className="block mb-4"> 
            {heroData.titlePart1[langKey]}
          </span>

          <span className="text-gold-500">
            {heroData.titlePart2[langKey]}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto font-cairo"
        >
          {heroData.description[langKey]}
        </motion.p>

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 font-cairo"
        >
          {/* Primary Button */}
          <a 
            href={heroData.primaryButton.link} 
            className="w-full md:w-auto px-8 py-3 bg-gold-500 text-black font-bold text-lg rounded hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/20 text-center cursor-pointer"
          >
            {heroData.primaryButton.text[langKey]}
          </a>
          
          {/* Secondary Button */}
          <a 
            href={heroData.secondaryButton.link}
            className="w-full md:w-auto px-8 py-3 border border-white/30 text-white font-bold text-lg rounded hover:bg-white/10 transition-all backdrop-blur-sm text-center cursor-pointer"
          >
            {heroData.secondaryButton.text[langKey]}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;