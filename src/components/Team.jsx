import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const TeamMember = ({ image, name, job, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      viewport={{ once: true }}
      className="group text-center"
    >
      <div className="relative overflow-hidden mb-6 rounded-sm">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-[350px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500"></div>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 font-cairo group-hover:text-gold-400 transition-colors">
        {name}
      </h3>
      <p className="text-gold-500 text-sm font-medium tracking-wide font-cairo">
        {job}
      </p>
    </motion.div>
  );
};

const Team = () => {
  const { i18n } = useTranslation();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/team')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return null;

  const isArabic = i18n.language === 'ar';
  const langKey = isArabic ? 'ar' : 'en';

  return (
    <section id="team" className="py-24 bg-black border-t border-white/5">
      <div className="container mx-auto px-6">
        
        {/* رأس السكشن */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4 font-playfair"
          >
            {data.title[langKey]}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base font-cairo max-w-2xl mx-auto"
          >
            {data.subtitle[langKey]}
          </motion.p>
        </div>

        {/* شبكة الفريق */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.members.map((member, index) => (
            <TeamMember 
              key={index}
              index={index}
              name={member.name[langKey]}
              job={member.job[langKey]}
              image={member.fullImageUrl}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Team;