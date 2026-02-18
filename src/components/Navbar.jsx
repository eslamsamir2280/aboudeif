import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // 1. لمعرفة الصفحة الحالية
import { HashLink } from 'react-router-hash-link'; // 2. للربط بين الصفحات والسكرول
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // المسار الحالي

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // تعديل الروابط لتعمل مع HashLink
  // نستخدم `/#section` بدلاً من `#section` فقط لضمان العودة للصفحة الرئيسية
  const navLinks = [
    { name: t('nav.home'), to: '/#top' }, // نفترض أن بداية الصفحة لها id="top"
    { name: t('nav.about'), to: '/#about' },
    { name: t('nav.services'), to: '/#services' },
    { name: t('nav.why_us'), to: '/#why-us' },
    { name: t('nav.blog'), to: '/blog' }, // هذا رابط صفحة منفصلة
    { name: t('nav.contact'), to: '/#contact' },
  ];

  // دالة لتحديد ما إذا كان الرابط نشطًا (اختياري للتنسيق)
  const isActive = (path) => location.pathname + location.hash === path;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-cairo ${
        isScrolled || location.pathname !== '/' ? 'bg-black/95 shadow-lg py-3' : 'bg-transparent py-5'
      }`}
      // ملاحظة: جعلنا الخلفية سوداء دائماً إذا لم نكن في الصفحة الرئيسية
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <HashLink smooth to="/#top" className="text-2xl font-bold text-white tracking-wide cursor-pointer">
          <span className="text-gold-500">{i18n.language === 'ar' ? 'د.' : 'Dr.'}</span> {i18n.language === 'ar' ? 'جمال أبو ضيف' : 'Gamal Aboudeif'}
        </HashLink>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <HashLink
              key={index}
              smooth // تفعيل السكرول الناعم
              to={link.to}
              className={`text-sm font-medium transition-colors ${
                isActive(link.to) ? 'text-gold-500' : 'text-gray-300 hover:text-gold-400'
              }`}
            >
              {link.name}
            </HashLink>
          ))}
          
          {/* Language Switcher Button */}
          <button 
            onClick={toggleLanguage}
            className="text-white border border-white/30 px-3 py-1 rounded-full text-xs hover:bg-white/10 transition"
          >
            {i18n.language === 'ar' ? 'English' : 'العربية'}
          </button>
        </div>

        {/* Call to Action */}
        <div className="hidden md:block">
          {/* يمكن جعل هذا أيضاً HashLink */}
          <HashLink
            smooth
            to="/#contact" // غيرتها لـ contact بدلاً من consultation لتتناسق مع الروابط
            className="px-6 py-2 bg-gold-500 text-black font-bold text-sm rounded hover:bg-gold-400 transition-all"
          >
            {t('nav.book_consultation')}
          </HashLink>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-white text-2xl cursor-pointer flex gap-4 items-center">
             <button 
                onClick={toggleLanguage}
                className="text-white text-sm font-bold"
            >
                {i18n.language === 'ar' ? 'EN' : 'عربي'}
            </button>
            <button onClick={() => setIsOpen(true)}>
              <HiMenuAlt3 />
            </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: i18n.language === 'ar' ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: i18n.language === 'ar' ? '-100%' : '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed top-0 ${i18n.language === 'ar' ? 'left-0' : 'right-0'} h-full w-[75%] bg-dark-900 shadow-2xl z-50 flex flex-col items-center justify-center space-y-8 md:hidden border-l border-white/10`}
          >
            <div className="absolute top-6 right-6 text-white text-3xl cursor-pointer hover:text-red-500 transition" onClick={() => setIsOpen(false)}>
              <HiX />
            </div>
            
            {navLinks.map((link, index) => (
              <HashLink
                key={index}
                smooth
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="text-xl text-gray-200 hover:text-gold-500 transition-colors font-semibold"
              >
                {link.name}
              </HashLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;