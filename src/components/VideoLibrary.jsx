import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaPlay } from 'react-icons/fa';

// مكون فرعي للفيديوهات الصغيرة
const VideoThumbnail = ({ image, title, duration, link, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="group cursor-pointer"
    >
      <a href={link} target="_blank" rel="noopener noreferrer" className="block">
        <div className="relative overflow-hidden rounded-sm mb-3">
          {/* الصورة المصغرة */}
          <img 
            src={image} 
            alt={title} 
            className="w-full h-40 object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
          />
          {/* زر تشغيل صغير */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center text-black pl-1">
              <FaPlay size={12} />
            </div>
          </div>
          {/* مدة الفيديو */}
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-sans">
            {duration}
          </span>
        </div>
        <h4 className="text-gray-300 text-sm font-cairo text-center group-hover:text-gold-500 transition-colors">
          {title}
        </h4>
      </a>
    </motion.div>
  );
};

const VideoLibrary = () => {
  const { i18n } = useTranslation();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/videos')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return null;

  const isArabic = i18n.language === 'ar';
  const langKey = isArabic ? 'ar' : 'en';

  return (
    <section className="py-24 bg-black border-t border-white/5 relative">
      <div className="container mx-auto px-6">
        
        {/* 1. رأس السكشن */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4 font-playfair"
          >
            {data.sectionTitle[langKey]}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gold-500 text-sm font-cairo tracking-wide"
          >
            {data.sectionSubtitle[langKey]}
          </motion.p>
        </div>

        {/* 2. الفيديو الرئيسي الكبير */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-4xl mx-auto h-[400px] md:h-[500px] bg-dark-800 rounded-sm overflow-hidden mb-12 group cursor-pointer shadow-2xl border border-white/10"
        >
          <a href={data.mainVideo.link} target="_blank" rel="noopener noreferrer" className="block h-full w-full">
            {/* صورة الخلفية */}
            <img 
              src={data.mainVideo.fullImageUrl} 
              alt="Main Video" 
              className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

            {/* زر التشغيل الكبير */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gold-500 rounded-full animate-ping opacity-20"></div>
                <div className="w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center text-black pl-2 shadow-lg hover:scale-110 transition-transform duration-300 z-10">
                  <FaPlay size={24} />
                </div>
              </div>
            </div>

            {/* نصوص الفيديو الرئيسي */}
            <div className="absolute bottom-8 right-8 text-right z-20">
              <h3 className="text-2xl md:text-3xl font-bold text-white font-cairo mb-2">
                {data.mainVideo.title[langKey]}
              </h3>
              <p className="text-gold-500 text-sm font-cairo">
                {data.mainVideo.date[langKey]}
              </p>
            </div>
          </a>
        </motion.div>

        {/* 3. قائمة الفيديوهات الصغيرة */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.thumbnails.map((video, index) => (
            <VideoThumbnail 
              key={video._id}
              image={video.fullImageUrl} 
              title={video.title[langKey]} 
              duration={video.duration}
              link={video.link}
              delay={0.1 * (index + 1)} 
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default VideoLibrary;