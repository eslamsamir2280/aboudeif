import { useTranslation } from 'react-i18next';
import { FaInstagram, FaLinkedinIn, FaTwitter, FaFacebookF } from 'react-icons/fa';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const quickLinks = [
    { name: t('nav.home'), href: '#' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.blog'), href: '#blog' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  const servicesLinks = [
    { name: t('services.criminal_title'), href: '#' },
    { name: t('services.civil_title'), href: '#' },
    { name: t('services.corporate_title'), href: '#' },
    { name: t('services.arbitration_title'), href: '#' },
    { name: t('services.family_title'), href: '#' },
  ];

  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-white/5" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* 1. شعار المكتب ونبذة عنه */}
          <div className="space-y-6">
            <div className="text-2xl font-bold tracking-wider">
              <span className="text-gold-500">AD</span> Law Firm
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {isRTL 
                ? "مكتب أبو ضيف للمحاماة والاستشارات القانونية، شريكك القانوني الموثوق للدفاع عن حقوقك وتحقيق العدالة بخبرة واحترافية." 
                : "Abou Deif Law Firm for Advocacy and Legal Consultations, your trusted legal partner to defend your rights and achieve justice with expertise."}
            </p>
            <div className="flex gap-4">
              {[FaInstagram, FaLinkedinIn, FaTwitter, FaFacebookF].map((Icon, index) => (
                <a key={index} href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold-500 hover:border-gold-500 transition-all">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* 2. روابط سريعة */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-playfair">{isRTL ? "روابط سريعة" : "Quick Links"}</h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-gold-500 text-sm transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. الخدمات */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-playfair">{isRTL ? "الخدمات" : "Services"}</h4>
            <ul className="space-y-4">
              {servicesLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-gold-500 text-sm transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. تواصل معنا - بيانات حقيقية من الـ CV */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-playfair">{isRTL ? "تواصل معنا" : "Contact Us"}</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex gap-3">
                <span className="text-gold-500 font-bold">{isRTL ? "العنوان:" : "Address:"}</span>
                <span>{isRTL ? "53 شارع مصطفى النحاس، مدينة نصر، القاهرة" : "53 Mostafa El-Nahas St, Nasr City, Cairo"}</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold-500 font-bold">{isRTL ? "الهاتف:" : "Phone:"}</span>
                <span dir="ltr">+20 100 186 4410</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold-500 font-bold">{isRTL ? "البريد:" : "Email:"}</span>
                <span className="break-all">GAMALABOUDEIF@HOTMAIL.COM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* حقوق الملكية مع إضافة شركة Horizonya */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            {isRTL 
              ? "© 2026 مكتب الدكتور جمال أبو ضيف للمحاماة - جميع الحقوق محفوظة" 
              : "© 2026 Dr. Gamal Abou Deif Law Firm - All Rights Reserved"}
          </p>
          <p className="text-gray-500 text-xs">
            {isRTL ? "تم التطوير بواسطة " : "Developed by "}
            <a 
              href="https://Horizonya.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gold-500 hover:text-white transition-colors font-bold"
            >
              Horizonya
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;