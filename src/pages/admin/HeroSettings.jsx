import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const HeroSettings = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    backgroundImage: '',
    tagline: { en: '', ar: '' },
    titlePart1: { en: '', ar: '' },
    titlePart2: { en: '', ar: '' },
    description: { en: '', ar: '' },
    primaryButton: { text: { en: '', ar: '' }, link: '' },
    secondaryButton: { text: { en: '', ar: '' }, link: '' },
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/hero');
        setFormData(prev => ({ ...prev, ...res.data }));
        setLoading(false);
      } catch (error) {
        toast.error('فشل في جلب البيانات');
        setLoading(false);
      }
    };
    fetchHeroData();
  }, []);

  const handleChange = (e, section, language = null, subField = null) => {
    const value = e.target.value;
    setFormData(prev => {
      if (!section) return { ...prev, [e.target.name]: value };
      if (subField) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [subField]: {
              ...prev[section][subField],
              [language]: value
            }
          }
        };
      }
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [language]: value
        }
      };
    });
  };

  const handleLinkChange = (e, buttonType) => {
    setFormData(prev => ({
      ...prev,
      [buttonType]: { ...prev[buttonType], link: e.target.value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(
        'http://localhost:5000/api/hero', 
        formData, 
        {
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        }
      );
      toast.success('تم تحديث البيانات بنجاح!');
    } catch (error) {
      toast.error('حدث خطأ أثناء التحديث');
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-900">جاري التحميل...</div>;

  return (
    // أضفنا w-full ولون النص الغامق للصفحة كلها احتياطياً
    <div className="w-full font-cairo dir-rtl text-gray-900">
      <Toaster position="top-left" />
      
      <div className="w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">إعدادات قسم الواجهة (Hero Section)</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* قسم الصورة الخلفية */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="font-bold text-lg mb-3 text-blue-600 border-b pb-2">خلفية القسم</h2>
            <label className="block text-sm font-bold text-gray-700 mb-2">رابط الصورة (URL)</label>
            <input
              type="text"
              name="backgroundImage"
              value={formData.backgroundImage}
              onChange={(e) => handleChange(e)}
              // أضفنا text-gray-900 و bg-white ولون placeholder
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-400"
              dir="ltr"
              placeholder="https://example.com/image.jpg"
            />
            {formData.backgroundImage && (
              <img src={formData.backgroundImage} alt="Preview" className="mt-4 h-48 w-full object-cover rounded border border-gray-300 shadow-sm" />
            )}
          </div>

          {/* العناوين والنصوص */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* القسم العربي */}
            <div className="bg-blue-50/50 p-6 rounded-lg border border-blue-100">
              <h3 className="font-bold text-center mb-6 text-blue-800 text-lg bg-blue-100 py-2 rounded">المحتوى العربي</h3>
              
              <InputGroup label="العنوان الفرعي (Tagline)" value={formData.tagline.ar} onChange={(e) => handleChange(e, 'tagline', 'ar')} />
              <InputGroup label="عنوان رئيسي (جزء 1)" value={formData.titlePart1.ar} onChange={(e) => handleChange(e, 'titlePart1', 'ar')} />
              <InputGroup label="عنوان رئيسي (جزء 2 - ذهبي)" value={formData.titlePart2.ar} onChange={(e) => handleChange(e, 'titlePart2', 'ar')} />
              
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-1">الوصف</label>
                <textarea
                  value={formData.description.ar}
                  onChange={(e) => handleChange(e, 'description', 'ar')}
                  className="w-full p-3 border border-gray-300 rounded h-24 focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 resize-none"
                />
              </div>

              <h4 className="font-bold mt-6 mb-3 text-sm text-gray-700 border-b pb-1">نصوص الأزرار</h4>
              <div className="grid grid-cols-2 gap-4">
                  <InputGroup label="الزر الرئيسي" value={formData.primaryButton.text.ar} onChange={(e) => handleChange(e, 'primaryButton', 'ar', 'text')} />
                  <InputGroup label="الزر الثانوي" value={formData.secondaryButton.text.ar} onChange={(e) => handleChange(e, 'secondaryButton', 'ar', 'text')} />
              </div>
            </div>

            {/* القسم الإنجليزي */}
            <div className="bg-orange-50/50 p-6 rounded-lg border border-orange-100" dir="ltr">
              <h3 className="font-bold text-center mb-6 text-orange-800 text-lg bg-orange-100 py-2 rounded">English Content</h3>
              
              <InputGroup label="Tagline" value={formData.tagline.en} onChange={(e) => handleChange(e, 'tagline', 'en')} />
              <InputGroup label="Main Title (Part 1)" value={formData.titlePart1.en} onChange={(e) => handleChange(e, 'titlePart1', 'en')} />
              <InputGroup label="Main Title (Part 2 - Gold)" value={formData.titlePart2.en} onChange={(e) => handleChange(e, 'titlePart2', 'en')} />
              
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description.en}
                  onChange={(e) => handleChange(e, 'description', 'en')}
                  className="w-full p-3 border border-gray-300 rounded h-24 focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 resize-none"
                />
              </div>

              <h4 className="font-bold mt-6 mb-3 text-sm text-gray-700 border-b pb-1">Buttons Text</h4>
              <div className="grid grid-cols-2 gap-4">
                  <InputGroup label="Primary Button" value={formData.primaryButton.text.en} onChange={(e) => handleChange(e, 'primaryButton', 'en', 'text')} />
                  <InputGroup label="Secondary Button" value={formData.secondaryButton.text.en} onChange={(e) => handleChange(e, 'secondaryButton', 'en', 'text')} />
              </div>
            </div>
          </div>

          {/* روابط الأزرار */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
               <label className="block text-sm font-bold text-gray-700 mb-2">رابط الزر الرئيسي (افتراضي: /contact)</label>
               <input type="text" value={formData.primaryButton.link} onChange={(e) => handleLinkChange(e, 'primaryButton')} className="w-full p-3 border border-gray-300 rounded text-left bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none" dir="ltr" />
             </div>
             <div>
               <label className="block text-sm font-bold text-gray-700 mb-2">رابط الزر الثانوي (افتراضي: /about)</label>
               <input type="text" value={formData.secondaryButton.link} onChange={(e) => handleLinkChange(e, 'secondaryButton')} className="w-full p-3 border border-gray-300 rounded text-left bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none" dir="ltr" />
             </div>
          </div>

          {/* زر الحفظ */}
          <div className="pt-6 border-t">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded shadow-lg text-lg transition duration-200"
            >
              حفظ كافة التغييرات
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

// InputGroup مع تثبيت ألوان الخط والخلفية
const InputGroup = ({ label, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-bold text-gray-700 mb-1">{label}</label>
    <input
      type="text"
      value={value || ''}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-400"
    />
  </div>
);

export default HeroSettings;