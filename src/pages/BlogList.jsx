import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BlogList = () => {
  const { i18n, t } = useTranslation();
  const [articles, setArticles] = useState([]);
  const isRTL = i18n.language === 'ar';
  const langKey = isRTL ? 'ar' : 'en';

  useEffect(() => {
    axios.get('http://localhost:5000/api/blog')
      .then(res => setArticles(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-black min-h-screen text-white font-cairo">
      <Navbar />
      
      {/* Header */}
      <div className="pt-32 pb-12 bg-dark-900 text-center">
        <h1 className="text-4xl md:text-6xl font-playfair font-bold text-gold-500 mb-4">{t('blog.section_title') || "Our Blog"}</h1>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link to={`/blog/${article.slug}`} key={article._id} className="group bg-[#0a0a0a] rounded-sm overflow-hidden border border-white/5 hover:border-gold-500/50 transition-all hover:-translate-y-2">
              <div className="h-60 overflow-hidden relative">
                <img src={article.fullImageUrl} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <span className="absolute top-4 right-4 bg-gold-500 text-black text-xs font-bold px-2 py-1 rounded">{article.category[langKey]}</span>
              </div>
              <div className="p-6">
                <div className="text-gray-500 text-xs mb-2">{new Date(article.date).toLocaleDateString()}</div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-gold-500 transition-colors">{article.title[langKey]}</h3>
                <p className="text-gray-400 text-sm line-clamp-3">{article.shortDesc[langKey]}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogList;