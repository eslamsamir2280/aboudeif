import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// 1. استدعاء جميع الأيقونات المحتمل استخدامها
import { 
  FaHistory, FaTrophy, FaHandshake, FaUniversity, 
  FaGavel, FaBalanceScale, FaShieldAlt, FaUserTie 
} from 'react-icons/fa';

// 2. عمل خريطة لربط الاسم النصي بالمكون الفعلي
const ICON_MAP = {
  FaHistory: FaHistory,
  FaTrophy: FaTrophy,
  FaHandshake: FaHandshake,
  FaUniversity: FaUniversity,
  FaGavel: FaGavel,
  FaBalanceScale: FaBalanceScale,
  FaShieldAlt: FaShieldAlt,
  FaUserTie: FaUserTie
};

// الكارت الفردي
const FeatureCard = ({ iconName, title, description, index }) => {
  // تحديد الأيقونة بناءً على الاسم، أو استخدام أيقونة افتراضية إذا لم توجد
  const IconComponent = ICON_MAP[iconName] || FaHistory;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      className="group relative bg-[#0a0a0a] p-8 rounded-xl border border-transparent hover:border-gold-500 transition-all duration-500 hover:-translate-y-2"
    >
      <div className="w-14 h-14 bg-dark-800 rounded-lg flex items-center justify-center text-gold-500 text-2xl mb-6 group-hover:bg-gold-500 group-hover:text-black transition-colors duration-500">
        <IconComponent />
      </div>

      <h3 className="text-xl font-bold text-white mb-3 font-playfair group-hover:text-gold-400 transition-colors">
        {title}
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed font-cairo">
        {description}
      </p>

      <div className="absolute top-0 right-0 w-20 h-20 bg-gold-500/5 rounded-bl-full rounded-tr-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
    </motion.div>
  );
};

const WhyUs = () => {
  const { i18n } = useTranslation();
  const [data, setData] = useState(null);

  // جلب البيانات من الـ API
  useEffect(() => {
    axios.get('http://localhost:5000/api/why-us')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return null;

  const isArabic = i18n.language === 'ar';
  const langKey = isArabic ? 'ar' : 'en';

  return (
    <section id="why-us" className="py-24 bg-dark-900 relative">
      <div className="container mx-auto px-6">
        
        {/* رأس السكشن */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gold-500 text-xs font-bold tracking-[0.2em] uppercase font-cairo block mb-2"
          >
            {data.subtitle[langKey]}
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-white font-playfair"
          >
            {data.title[langKey]}
          </motion.h2>
        </div>

        {/* شبكة الكروت: إنشاء الكروت بناءً على البيانات القادمة من السيرفر */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.features.map((feature, index) => (
            <FeatureCard 
              key={index}
              index={index}
              iconName={feature.icon} // نرسل اسم الأيقونة (نص)
              title={feature.title[langKey]}
              description={feature.description[langKey]}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyUs;