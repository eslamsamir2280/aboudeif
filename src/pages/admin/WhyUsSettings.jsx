import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { 
  FaHistory, FaTrophy, FaHandshake, FaUniversity, 
  FaGavel, FaBalanceScale, FaShieldAlt, FaUserTie, FaSave 
} from 'react-icons/fa';

// قائمة الأيقونات المتاحة
const AVAILABLE_ICONS = [
  { value: 'FaHistory', label: 'تاريخ / ساعة (History)' },
  { value: 'FaTrophy', label: 'كأس / جائزة (Trophy)' },
  { value: 'FaHandshake', label: 'مصافحة / ثقة (Handshake)' },
  { value: 'FaUniversity', label: 'محكمة / بنك (University)' },
  { value: 'FaGavel', label: 'مطرقة القاضي (Gavel)' },
  { value: 'FaBalanceScale', label: 'ميزان العدالة (Scale)' },
  { value: 'FaShieldAlt', label: 'درع الحماية (Shield)' },
  { value: 'FaUserTie', label: 'محامي / شخص (User)' },
];

// خريطة الأيقونات للعرض (Preview)
const ICON_MAP = {
  FaHistory, FaTrophy, FaHandshake, FaUniversity,
  FaGavel, FaBalanceScale, FaShieldAlt, FaUserTie
};

const WhyUsSettings = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    subtitle: { ar: '', en: '' },
    title: { ar: '', en: '' },
    features: []
  });

  // جلب البيانات عند التحميل
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/why-us');
        setFormData(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error('فشل جلب البيانات');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 1. معالجة تغيير العناوين الرئيسية
  const handleMainChange = (e, field, lang) => {
    setFormData(prev => ({
      ...prev,
      [field]: { ...prev[field], [lang]: e.target.value }
    }));
  };

  // 2. معالجة تغيير بيانات الكروت (الميزات)
  const handleFeatureChange = (index, field, value, lang = null) => {
    const newFeatures = [...formData.features];
    if (lang) {
      newFeatures[index][field][lang] = value;
    } else {
      newFeatures[index][field] = value;
    }
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  // 3. الحفظ (مع الحماية وإرسال التوكن)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // جلب التوكن من التخزين المحلي
      const token = localStorage.getItem('adminToken');

      // إرسال الطلب مع التوكن في الهيدر
      await axios.put(
        'http://localhost:5000/api/why-us', 
        formData, 
        {
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        }
      );

      toast.success('تم الحفظ بنجاح');
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        toast.error('انتهت صلاحية الجلسة، يرجى تسجيل الدخول');
      } else {
        toast.error('حدث خطأ أثناء الحفظ');
      }
    }
  };

  // مكون لمعاينة الأيقونة
  const IconPreview = ({ iconName }) => {
    const Icon = ICON_MAP[iconName] || FaHistory;
    return <Icon className="text-2xl text-gold-600" />;
  };

  if (loading) return <div className="p-10 text-center text-gray-900">جاري التحميل...</div>;

  return (
    <div className="w-full font-cairo dir-rtl text-gray-900">
      <Toaster position="top-left" />
      
      <div className="w-full bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h1 className="text-2xl font-bold text-gray-800">إعدادات قسم "لماذا نحن"</h1>
            <button 
                onClick={handleSubmit} 
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition font-bold shadow"
            >
                <FaSave /> حفظ التعديلات
            </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* === 1. العناوين الرئيسية === */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-bold text-blue-600 mb-4 border-b border-gray-300 pb-2">العناوين الرئيسية للقسم</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* عربي */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">العنوان الفرعي (عربي)</label>
                <input 
                  type="text" 
                  value={formData.subtitle.ar} 
                  onChange={(e) => handleMainChange(e, 'subtitle', 'ar')} 
                  className="w-full p-2 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-500 outline-none mb-3" 
                />
                
                <label className="block text-sm font-bold text-gray-700 mb-1">العنوان الرئيسي (عربي)</label>
                <input 
                  type="text" 
                  value={formData.title.ar} 
                  onChange={(e) => handleMainChange(e, 'title', 'ar')} 
                  className="w-full p-2 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-500 outline-none" 
                />
              </div>

              {/* إنجليزي */}
              <div dir="ltr">
                <label className="block text-sm font-bold text-gray-700 mb-1">Subtitle (English)</label>
                <input 
                  type="text" 
                  value={formData.subtitle.en} 
                  onChange={(e) => handleMainChange(e, 'subtitle', 'en')} 
                  className="w-full p-2 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-500 outline-none mb-3" 
                />
                
                <label className="block text-sm font-bold text-gray-700 mb-1">Main Title (English)</label>
                <input 
                  type="text" 
                  value={formData.title.en} 
                  onChange={(e) => handleMainChange(e, 'title', 'en')} 
                  className="w-full p-2 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-500 outline-none" 
                />
              </div>
            </div>
          </div>

          {/* === 2. الكروت (Features) === */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-800">إدارة الميزات (Cards)</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {formData.features.map((feature, index) => (
                <div key={index} className="bg-white p-5 rounded-lg shadow border border-gray-200 hover:shadow-md transition">
                  
                  {/* رأس الكارت واختيار الأيقونة */}
                  <div className="flex items-center gap-4 mb-4 bg-gray-50 p-3 rounded border border-gray-100">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gold-200">
                        <IconPreview iconName={feature.icon} />
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs font-bold text-gray-500 mb-1">أيقونة الكارت #{index + 1}:</label>
                        <select 
                        value={feature.icon} 
                        onChange={(e) => handleFeatureChange(index, 'icon', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white cursor-pointer"
                        >
                        {AVAILABLE_ICONS.map(icon => (
                            <option key={icon.value} value={icon.value}>{icon.label}</option>
                        ))}
                        </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* عربي */}
                    <div>
                      <input 
                        type="text" 
                        placeholder="عنوان الميزة (عربي)" 
                        value={feature.title.ar} 
                        onChange={(e) => handleFeatureChange(index, 'title', e.target.value, 'ar')}
                        className="w-full p-2 border border-gray-300 rounded text-sm mb-2 font-bold focus:border-blue-500 outline-none"
                      />
                      <textarea 
                        placeholder="الوصف (عربي)" 
                        value={feature.description.ar} 
                        onChange={(e) => handleFeatureChange(index, 'description', e.target.value, 'ar')}
                        className="w-full p-2 border border-gray-300 rounded text-sm h-20 focus:border-blue-500 outline-none resize-none"
                      />
                    </div>

                    {/* إنجليزي */}
                    <div dir="ltr" className="pt-2 border-t border-gray-100">
                      <input 
                        type="text" 
                        placeholder="Feature Title (English)" 
                        value={feature.title.en} 
                        onChange={(e) => handleFeatureChange(index, 'title', e.target.value, 'en')}
                        className="w-full p-2 border border-gray-300 rounded text-sm mb-2 font-bold focus:border-blue-500 outline-none"
                      />
                      <textarea 
                        placeholder="Description (English)" 
                        value={feature.description.en} 
                        onChange={(e) => handleFeatureChange(index, 'description', e.target.value, 'en')}
                        className="w-full p-2 border border-gray-300 rounded text-sm h-20 focus:border-blue-500 outline-none resize-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t">
            <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700 transition shadow-lg text-lg">
                حفظ كافة التغييرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WhyUsSettings;