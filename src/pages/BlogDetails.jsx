import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BlogDetails = () => {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/blog/${slug}`)
      .then(res => setArticle(res.data))
      .catch(err => console.error(err));
  }, [slug]);

  if (!article) return <div className="bg-black min-h-screen text-white flex items-center justify-center">Loading...</div>;

  const isRTL = i18n.language === 'ar';
  const langKey = isRTL ? 'ar' : 'en';

  return (
    <div className="bg-black min-h-screen text-white font-cairo">
      <Navbar />
      
      {/* Cover Image */}
      <div className="relative h-[50vh] w-full">
        <img src={article.fullImageUrl} alt="" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 pb-12 container mx-auto">
          <span className="bg-gold-500 text-black px-3 py-1 text-sm font-bold rounded mb-4 inline-block">{article.category[langKey]}</span>
          <h1 className="text-3xl md:text-5xl font-bold font-playfair leading-tight max-w-4xl">{article.title[langKey]}</h1>
          <p className="text-gray-400 mt-2">{new Date(article.date).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div 
          className="prose prose-invert prose-lg max-w-none prose-headings:font-playfair prose-a:text-gold-500"
          dangerouslySetInnerHTML={{ __html: article.content[langKey] }} 
        />
      </div>

      <Footer />
    </div>
  );
};

export default BlogDetails;