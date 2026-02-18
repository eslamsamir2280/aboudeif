import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const About = () => {
  const { i18n } = useTranslation();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/about')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return null;

  const isArabic = i18n.language === 'ar';
  const lang = isArabic ? 'ar' : 'en';

  return (
    <section id="about" className="relative bg-dark-900 pb-20">
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-80 shadow-[0_0_15px_rgba(212,175,55,0.6)]"></div>

      <div className="container mx-auto px-6 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* قسم الصورة */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <div className="relative border border-gold-500/30 p-2 rounded-sm w-full max-w-md">
              <div className="relative overflow-hidden">
                {/* الصورة تأتي من قاعدة البيانات */}
                <img 
                  src={data.fullImageUrl} 
                  alt={data.imageName[lang]} 
                  className="w-full h-[450px] md:h-[500px] object-cover object-top hover:grayscale-0 transition-all duration-700 shadow-2xl"
                />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>
                
                <div className="absolute bottom-6 right-6 z-20 text-right">
                  <h3 className="text-white text-2xl font-bold font-cairo mb-1 drop-shadow-md">
                    {data.imageName[lang]}
                  </h3>
                  <p className="text-gray-300 text-sm font-cairo tracking-wide drop-shadow-md">
                    {data.imageTitle[lang]}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* قسم النصوص */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-right"
          >
            <span className="text-gold-500 text-sm font-bold tracking-[0.2em] uppercase mb-4 block font-cairo">
              {data.label[lang]}
            </span>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight font-playfair">
              {data.title[lang]}
            </h2>
            <h3 className="text-xl text-gray-400 mb-8 font-cairo font-light">
              {data.subtitle[lang]}
            </h3>

            <div className="space-y-6 text-gray-300 text-lg leading-relaxed font-cairo text-justify">
              <p>{data.description1[lang]}</p>
              <p>{data.description2[lang]}</p>
            </div>

            {/* الإحصائيات */}
            <div className="mt-10 pt-8 border-t border-gray-800 flex flex-wrap gap-12">
              <div>
                <span className="block text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-gold-400 to-gold-600 font-playfair">
                  {data.statsYears}
                </span>
                <span className="text-sm text-gray-400 mt-1 block font-cairo">
                  {isArabic ? 'سنوات من الخبرة' : 'Years of Experience'}
                </span>
              </div>
              <div>
                <span className="block text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-gold-400 to-gold-600 font-playfair">
                  {data.statsCases}
                </span>
                <span className="text-sm text-gray-400 mt-1 block font-cairo">
                  {isArabic ? 'قيمة القضايا' : 'Value of Cases'}
                </span>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;