import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft, FaArrowRight, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // استخدام Link للتنقل

const BlogCard = ({ category, date, title, desc, image, delay, slug }) => {
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      className="group flex flex-col h-full bg-[#0a0a0a] rounded-sm overflow-hidden border border-white/5 hover:border-gold-500/50 transition-all duration-300 hover:-translate-y-2"
    >
      <div className="relative h-60 overflow-hidden bg-dark-800 shrink-0">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
        <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} bg-gold-500 text-black text-xs font-bold px-3 py-1 rounded-sm shadow-lg`}>
          {category}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-gray-500 text-xs font-cairo mb-3">
          <FaCalendarAlt />
          <span>{new Date(date).toLocaleDateString(isRTL ? 'ar-EG' : 'en-US')}</span>
        </div>
        
        <h3 className="text-xl font-bold text-white font-playfair mb-3 leading-snug group-hover:text-gold-500 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-400 text-sm font-cairo leading-relaxed mb-6 line-clamp-3">
          {desc}
        </p>

        <div className="mt-auto pt-4 border-t border-white/10 w-full">
          <Link 
            to={`/blog/${slug}`} 
            className="inline-flex items-center text-gold-500 text-sm font-bold hover:text-white transition-colors gap-2 group-hover:gap-3 duration-300"
          >
            {t('blog.read_more') || "Read More"}
            {isRTL ? <FaArrowLeft size={12} /> : <FaArrowRight size={12} />}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const LatestBlog = () => {
  const { t, i18n } = useTranslation();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/blog/latest')
      .then(res => setArticles(res.data))
      .catch(err => console.error(err));
  }, []);

  const isRTL = i18n.language === 'ar';
  const langKey = isRTL ? 'ar' : 'en';

  if (!articles.length) return null; // إخفاء القسم لو مفيش مقالات

  return (
    <section id="blog" className="py-24 bg-black border-t border-white/5 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6 gap-4">
          <div>
            <motion.h2 initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} className="text-3xl md:text-5xl font-bold text-white font-playfair">
              {t('blog.section_title') || "Our Insights"}
            </motion.h2>
          </div>
          <Link to="/blog" className="text-white hover:text-gold-500 transition-colors flex items-center gap-2 font-cairo text-sm font-bold border border-white/20 px-4 py-2 rounded-sm hover:border-gold-500">
            {t('blog.view_all') || "View All"}
            {isRTL ? <FaArrowLeft /> : <FaArrowRight />}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <BlogCard 
              key={article._id}
              slug={article.slug}
              title={article.title[langKey]}
              desc={article.shortDesc[langKey]}
              category={article.category[langKey]}
              date={article.date}
              image={article.fullImageUrl}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBlog;