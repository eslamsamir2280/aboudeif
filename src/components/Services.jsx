import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  FaGavel, FaGlobeAmericas, FaBuilding, FaBalanceScale, 
  FaLandmark, FaUsers, FaFileContract, FaBriefcase 
} from 'react-icons/fa';

// خريطة الأيقونات
const ICON_MAP = {
  FaGavel: FaGavel,
  FaGlobeAmericas: FaGlobeAmericas,
  FaBuilding: FaBuilding,
  FaBalanceScale: FaBalanceScale,
  FaLandmark: FaLandmark,
  FaUsers: FaUsers,
  FaFileContract: FaFileContract,
  FaBriefcase: FaBriefcase
};

const ServiceCard = ({ iconName, title, description, index }) => {
  // جلب الأيقونة من الخريطة
  const Icon = ICON_MAP[iconName] || FaGavel;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-[#0a0a0a] p-8 rounded-sm border border-white/5 hover:border-gold-500/50 transition-all duration-300 hover:-translate-y-2 h-full"
    >
      <div className="flex justify-center mb-6">
        <Icon className="text-5xl text-gold-500 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 drop-shadow-lg" />
      </div>

      <h3 className="text-xl md:text-2xl font-bold text-white mb-4 text-center font-playfair group-hover:text-gold-400 transition-colors">
        {title}
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed text-center font-cairo group-hover:text-gray-300">
        {description}
      </p>
    </motion.div>
  );
};

const Services = () => {
  const { i18n } = useTranslation();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/services')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return null;

  const isArabic = i18n.language === 'ar';
  const langKey = isArabic ? 'ar' : 'en';

  return (
    <section id="services" className="py-24 bg-black relative border-t border-white/5">
      <div className="container mx-auto px-6">
        
        {/* === رأس السكشن === */}
        <div className="text-center mb-20 max-w-4xl mx-auto"> 
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-gold-500 text-xs font-bold tracking-[0.2em] uppercase mb-4 block font-cairo"
          >
            {data.sectionSubtitle[langKey]}
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-8 font-playfair"
          >
            {data.sectionTitle[langKey]}
          </motion.h2>
          
          <div className="w-20 h-1 bg-gold-500 mx-auto mb-8 rounded-full"></div>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg font-cairo leading-relaxed max-w-2xl mx-auto"
          >
            {data.sectionDesc[langKey]}
          </motion.p>
        </div>

        {/* === شبكة الخدمات === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((service, index) => (
            <ServiceCard 
              key={index}
              index={index}
              iconName={service.icon}
              title={service.title[langKey]}
              description={service.desc[langKey]}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;