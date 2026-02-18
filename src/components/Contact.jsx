import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <footer className="bg-black pt-20 border-t border-white/5 font-cairo" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* 1. الخريطة (Google Map) */}
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="w-full h-[400px] rounded-sm overflow-hidden border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 order-2 lg:order-1"
          >
            <iframe 
              src="https://maps.google.com/maps?q=30.056088,31.330141&z=15&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
              title="Office Location"
            ></iframe>
          </motion.div>

          {/* 2. بيانات الاتصال */}
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className={`flex flex-col justify-center ${isRTL ? 'text-right lg:items-start' : 'text-left lg:items-start'} order-1 lg:order-2`}
          >
            <span className="text-gold-500 text-xs font-bold tracking-widest uppercase mb-2 block">
              {t('nav.contact') || (isRTL ? "تواصل معنا" : "Contact Us")}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-playfair">
              {t('footer.title')}
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-lg">
              {t('footer.subtitle')}
            </p>

            {/* قائمة المعلومات */}
            <div className="space-y-8 w-full">
              
              {/* العنوان */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#111] rounded-sm flex items-center justify-center text-gold-500 border border-white/5 shrink-0">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 font-playfair">{t('footer.address_label')}</h4>
                  <p className="text-gray-400 text-sm font-cairo">{t('footer.address_value')}</p>
                </div>
              </div>

              {/* الهاتف */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#111] rounded-sm flex items-center justify-center text-gold-500 border border-white/5 shrink-0">
                  <FaPhoneAlt size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 font-playfair">{t('footer.phone_label')}</h4>
                  <p className="text-gray-400 text-sm font-cairo" dir="ltr">{t('footer.phone_value')}</p>
                </div>
              </div>

              {/* البريد */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#111] rounded-sm flex items-center justify-center text-gold-500 border border-white/5 shrink-0">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 font-playfair">{t('footer.email_label')}</h4>
                  <p className="text-gray-400 text-sm font-cairo">GAMALABOUDEIF@HOTMAIL.COM</p>
                </div>
              </div>

            </div>

            {/* زر الواتساب */}
            <div className={`mt-12 w-full ${isRTL ? 'text-right' : 'text-left'}`}>
              <a 
                href="https://wa.me/201001864410" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-8 rounded-sm transition-all duration-300 shadow-lg hover:shadow-green-900/50"
              >
                <FaWhatsapp size={22} />
                {t('footer.whatsapp_btn')}
              </a>
            </div>

          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;