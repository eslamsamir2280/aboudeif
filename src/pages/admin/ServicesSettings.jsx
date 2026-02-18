import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { FaPlus, FaTrash } from 'react-icons/fa'; // أيقونات للتحكم

// قائمة الأيقونات المتاحة
const AVAILABLE_ICONS = [
  { value: 'FaGavel', label: 'مطرقة (جنائي)' },
  { value: 'FaGlobeAmericas', label: 'كرة أرضية (دولي)' },
  { value: 'FaBuilding', label: 'مبنى (شركات)' },
  { value: 'FaBalanceScale', label: 'ميزان (مدني)' },
  { value: 'FaLandmark', label: 'مبنى حكومي (دستورية/نقض)' },
  { value: 'FaUsers', label: 'أشخاص (أسرة)' },
  { value: 'FaFileContract', label: 'عقود' },
  { value: 'FaBriefcase', label: 'حقيبة أعمال' },
];

const ServicesSettings = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    sectionSubtitle: { ar: '', en: '' },
    sectionTitle: { ar: '', en: '' },
    sectionDesc: { ar: '', en: '' },
    items: []
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/services')
      .then(res => {
        setFormData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // تحديث بيانات القسم الرئيسية
  const handleMainChange = (e, field, lang) => {
    setFormData(prev => ({
      ...prev,
      [field]: { ...prev[field], [lang]: e.target.value }
    }));
  };

  // تحديث بيانات خدمة معينة
  const handleItemChange = (index, field, value, lang = null) => {
    const newItems = [...formData.items];
    if (lang) {
      newItems[index][field][lang] = value;
    } else {
      newItems[index][field] = value;
    }
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  // إضافة خدمة جديدة
  const addNewService = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { 
        icon: 'FaGavel', 
        title: { ar: 'خدمة جديدة', en: 'New Service' }, 
        desc: { ar: '', en: '' } 
      }]
    }));
  };

  // حذف خدمة
  const removeService = (index) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
      const newItems = formData.items.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, items: newItems }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. جلب التوكن من الـ LocalStorage
      const token = localStorage.getItem('adminToken');

      // 2. إرسال الطلب مع الهيدر (Headers)
      // لاحظ: في الـ PUT، الـ Headers تكون المعامل الثالث
      await axios.put(
        'http://localhost:5000/api/services', 
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
      toast.error('حدث خطأ (ربما انتهت الجلسة)');
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-900">جاري التحميل...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-cairo dir-rtl text-gray-900">
      <Toaster />
      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">إدارة الخدمات القانونية</h1>
          <button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-bold shadow">
            حفظ التغييرات
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* 1. إعدادات رأس القسم */}
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h2 className="text-lg font-bold text-blue-600 mb-4 border-b pb-2">رأس القسم (Header)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* عربي */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">العنوان الفرعي (عربي)</label>
                <input type="text" value={formData.sectionSubtitle.ar} onChange={(e) => handleMainChange(e, 'sectionSubtitle', 'ar')} className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 mb-3 focus:ring-2 focus:ring-blue-500 outline-none" />
                
                <label className="block text-sm font-bold text-gray-700 mb-1">العنوان الرئيسي (عربي)</label>
                <input type="text" value={formData.sectionTitle.ar} onChange={(e) => handleMainChange(e, 'sectionTitle', 'ar')} className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 mb-3 focus:ring-2 focus:ring-blue-500 outline-none" />
                
                <label className="block text-sm font-bold text-gray-700 mb-1">الوصف العام (عربي)</label>
                <textarea value={formData.sectionDesc.ar} onChange={(e) => handleMainChange(e, 'sectionDesc', 'ar')} className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 h-20 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>

              {/* إنجليزي */}
              <div dir="ltr">
                <label className="block text-sm font-bold text-gray-700 mb-1">Subtitle (English)</label>
                <input type="text" value={formData.sectionSubtitle.en} onChange={(e) => handleMainChange(e, 'sectionSubtitle', 'en')} className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 mb-3 focus:ring-2 focus:ring-blue-500 outline-none" />
                
                <label className="block text-sm font-bold text-gray-700 mb-1">Main Title (English)</label>
                <input type="text" value={formData.sectionTitle.en} onChange={(e) => handleMainChange(e, 'sectionTitle', 'en')} className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 mb-3 focus:ring-2 focus:ring-blue-500 outline-none" />
                
                <label className="block text-sm font-bold text-gray-700 mb-1">Description (English)</label>
                <textarea value={formData.sectionDesc.en} onChange={(e) => handleMainChange(e, 'sectionDesc', 'en')} className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 h-20 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
          </div>

          {/* 2. قائمة الخدمات */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">قائمة الخدمات ({formData.items.length})</h2>
              <button type="button" onClick={addNewService} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow transition">
                <FaPlus /> إضافة خدمة
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {formData.items.map((item, index) => (
                <div key={index} className="bg-white p-5 rounded-lg shadow border border-gray-200 relative group">
                  
                  {/* زر الحذف */}
                  <button 
                    type="button" 
                    onClick={() => removeService(index)}
                    className="absolute top-4 left-4 text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition"
                    title="حذف الخدمة"
                  >
                    <FaTrash />
                  </button>

                  <div className="mb-4 pl-10">
                    <label className="text-sm font-bold text-gray-600 ml-2">الأيقونة:</label>
                    <select 
                      value={item.icon} 
                      onChange={(e) => handleItemChange(index, 'icon', e.target.value)}
                      className="p-1 border border-gray-300 rounded bg-gray-50 text-gray-900"
                    >
                      {AVAILABLE_ICONS.map(icon => (
                        <option key={icon.value} value={icon.value}>{icon.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-4">
                    {/* عربي */}
                    <div>
                      <input 
                        type="text" 
                        placeholder="اسم الخدمة (عربي)" 
                        value={item.title.ar} 
                        onChange={(e) => handleItemChange(index, 'title', e.target.value, 'ar')}
                        className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 mb-2 focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                      <textarea 
                        placeholder="الوصف (عربي)" 
                        value={item.desc.ar} 
                        onChange={(e) => handleItemChange(index, 'desc', e.target.value, 'ar')}
                        className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 h-16 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    {/* إنجليزي */}
                    <div dir="ltr">
                      <input 
                        type="text" 
                        placeholder="Service Name (English)" 
                        value={item.title.en} 
                        onChange={(e) => handleItemChange(index, 'title', e.target.value, 'en')}
                        className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 mb-2 focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                      <textarea 
                        placeholder="Description (English)" 
                        value={item.desc.en} 
                        onChange={(e) => handleItemChange(index, 'desc', e.target.value, 'en')}
                        className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 h-16 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ServicesSettings;