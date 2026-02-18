import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppBtn = () => {
  // رقم الواتساب الخاص بالمكتب (من الـ CV)
  const phoneNumber = "201001864410"; 

  return (
    <motion.a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      // التنسيق:
      // fixed bottom-8 right-8: تثبيت المكان في الأسفل يمين
      // z-50: عشان يظهر فوق أي عنصر تاني في الصفحة
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-all duration-300"
      
      // أنيميشن الدخول (يظهر ببطء)
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      
      // أنيميشن عند الهافر (يكبر شوية)
      whileHover={{ scale: 1.1, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* الأيقونة */}
      <FaWhatsapp size={35} />
      
      {/* تأثير نبض (Pulse) عشان يلفت الانتباه */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-20 animate-ping"></span>
    </motion.a>
  );
};

export default WhatsAppBtn;