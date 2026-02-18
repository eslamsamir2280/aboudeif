import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const CTA = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-gold-500 relative overflow-hidden">
      
      {/* زخرفة خلفية خفيفة جداً (اختياري) */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-black mb-6 font-playfair"
        >
          {t('cta.title')}
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-black/80 text-lg md:text-xl font-cairo mb-10 max-w-2xl mx-auto"
        >
          {t('cta.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a 
            href="#contact" 
            className="inline-block bg-black text-white text-lg font-bold py-4 px-10 rounded shadow-2xl hover:bg-gray-900 hover:scale-105 transition-all duration-300 font-cairo"
          >
            {t('cta.button')}
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default CTA;