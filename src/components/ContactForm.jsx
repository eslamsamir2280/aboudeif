import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const ContactForm = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  
  // حالة النموذج
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });

  // التعامل مع الكتابة في الحقول
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // إرسال النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // تحقق بسيط
    if(!formData.name || !formData.phone || !formData.email) {
      toast.error(t('contact.error_missing_fields') || "يرجى ملء الحقول الأساسية");
      setLoading(false);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      toast.success(t('contact.success_message') || "تم استلام رسالتك بنجاح وسنتواصل معك قريباً");
      // تصفير النموذج
      setFormData({ name: '', phone: '', email: '', service: '', message: '' });
    } catch (error) {
      console.error(error);
      toast.error(t('contact.error_message') || "حدث خطأ أثناء الإرسال، حاول مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-black border-t border-white/5 relative">
      <Toaster position="bottom-center" />
      <div className="container mx-auto px-6">
        
        {/* 1. رأس السكشن */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4 font-playfair"
          >
            {t('contact.title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base font-cairo"
          >
            {t('contact.subtitle')}
          </motion.p>
        </div>

        {/* 2. حاوية النموذج */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-[#111] p-8 md:p-12 rounded-sm border border-white/5 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* الصف الأول: الاسم والهاتف */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 text-sm font-bold mb-2 font-cairo">
                  {t('contact.label_name')}
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('contact.placeholder_name')}
                  className="w-full bg-black border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors font-cairo placeholder-gray-600"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-bold mb-2 font-cairo">
                  {t('contact.label_phone')}
                </label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t('contact.placeholder_phone')}
                  className="w-full bg-black border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors font-cairo placeholder-gray-600 text-left"
                  dir="ltr" 
                />
              </div>
            </div>

            {/* الصف الثاني: البريد ونوع الخدمة */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 text-sm font-bold mb-2 font-cairo">
                  {t('contact.label_email')}
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('contact.placeholder_email')}
                  className="w-full bg-black border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors font-cairo placeholder-gray-600 text-left"
                  dir="ltr"
                />
              </div>

              <div className="relative">
                <label className="block text-gray-400 text-sm font-bold mb-2 font-cairo">
                  {t('contact.label_service')}
                </label>
                <select 
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-black border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors font-cairo appearance-none cursor-pointer"
                >
                  <option value="" disabled>{t('contact.placeholder_service')}</option>
                  <option value="التحكيم الدولي">التحكيم الدولي</option>
                  <option value="تأسيس الشركات">تأسيس الشركات</option>
                  <option value="القضايا الجنائية">القضايا الجنائية</option>
                  <option value="القضايا المدنية">القضايا المدنية</option>
                  <option value="أخرى">أخرى</option>
                </select>
                <div className="pointer-events-none absolute bottom-4 left-4 text-gold-500 text-xs">▼</div>
              </div>
            </div>

            {/* الصف الثالث: الرسالة */}
            <div>
              <label className="block text-gray-400 text-sm font-bold mb-2 font-cairo">
                {t('contact.label_message')}
              </label>
              <textarea 
                rows="4" 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('contact.placeholder_message')}
                className="w-full bg-black border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors font-cairo placeholder-gray-600 resize-none"
              ></textarea>
            </div>

            {/* زر الإرسال */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className={`w-full bg-gold-500 hover:bg-gold-400 text-black font-bold py-4 rounded-sm shadow-lg transition-all duration-300 font-cairo text-lg mt-4 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? "جاري الإرسال..." : t('contact.btn_submit')}
            </motion.button>

          </form>
        </motion.div>

      </div>
    </section>
  );
};

export default ContactForm;