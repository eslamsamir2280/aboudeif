import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const AboutSettings = () => {
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState('');
  const [file, setFile] = useState(null);
  
  const [formData, setFormData] = useState({
    imageName: { en: '', ar: '' },
    imageTitle: { en: '', ar: '' },
    label: { en: '', ar: '' },
    title: { en: '', ar: '' },
    subtitle: { en: '', ar: '' },
    description1: { en: '', ar: '' },
    description2: { en: '', ar: '' },
    statsYears: '',
    statsCases: ''
  });

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/about');
        setFormData(res.data);
        setPreview(res.data.fullImageUrl);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  const handleChange = (e, section, lang) => {
    const value = e.target.value;
    setFormData(prev => {
      if (lang) {
        return { ...prev, [section]: { ...prev[section], [lang]: value } };
      }
      return { ...prev, [e.target.name]: value };
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = new FormData();

    if (file) dataToSend.append('image', file);
    dataToSend.append('imageName', JSON.stringify(formData.imageName));
    dataToSend.append('imageTitle', JSON.stringify(formData.imageTitle));
    dataToSend.append('label', JSON.stringify(formData.label));
    dataToSend.append('title', JSON.stringify(formData.title));
    dataToSend.append('subtitle', JSON.stringify(formData.subtitle));
    dataToSend.append('description1', JSON.stringify(formData.description1));
    dataToSend.append('description2', JSON.stringify(formData.description2));
    dataToSend.append('statsYears', formData.statsYears);
    dataToSend.append('statsCases', formData.statsCases);

    try {
      const token = localStorage.getItem('adminToken');
      await axios.put('http://localhost:5000/api/about', dataToSend, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` 
        }
      });
      toast.success('تم التحديث بنجاح');
    } catch (error) {
      toast.error('حدث خطأ');
      console.error(error);
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-900">جاري التحميل...</div>;

  return (
    // أضفنا w-full بدلاً من max-w ولون الخط غامق
    <div className="w-full font-cairo dir-rtl text-gray-900">
      <Toaster position="top-left" />
      
      <div className="w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">إعدادات قسم "من نحن" (About Section)</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* قسم الصورة */}
          <div className="border border-gray-200 p-6 rounded-lg bg-gray-50">
            <h2 className="font-bold mb-4 text-blue-600 text-lg border-b pb-2">الصورة الشخصية والبيانات المرفقة</h2>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/3">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-64 object-cover rounded shadow border border-gray-300" />
                ) : (
                  <div className="w-full h-64 bg-gray-200 rounded flex items-center justify-center text-gray-500">لا توجد صورة</div>
                )}
                <input type="file" onChange={handleFileChange} className="mt-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer"/>
              </div>
              
              <div className="w-full md:w-2/3 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputGroup label="الاسم (عربي)" value={formData.imageName.ar} onChange={(e) => handleChange(e, 'imageName', 'ar')} />
                  <InputGroup label="الاسم (إنجليزي)" value={formData.imageName.en} onChange={(e) => handleChange(e, 'imageName', 'en')} />
                  <InputGroup label="المسمى الوظيفي (عربي)" value={formData.imageTitle.ar} onChange={(e) => handleChange(e, 'imageTitle', 'ar')} />
                  <InputGroup label="المسمى الوظيفي (إنجليزي)" value={formData.imageTitle.en} onChange={(e) => handleChange(e, 'imageTitle', 'en')} />
                </div>
              </div>
            </div>
          </div>

          {/* النصوص الرئيسية */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* عربي */}
            <div className="bg-blue-50/50 p-6 rounded-lg border border-blue-100">
              <h3 className="font-bold text-center mb-6 text-blue-800 text-lg bg-blue-100 py-2 rounded">المحتوى العربي</h3>
              <InputGroup label="عنوان صغير (Label)" value={formData.label.ar} onChange={(e) => handleChange(e, 'label', 'ar')} />
              <InputGroup label="عنوان رئيسي (Title)" value={formData.title.ar} onChange={(e) => handleChange(e, 'title', 'ar')} />
              <InputGroup label="عنوان فرعي (Subtitle)" value={formData.subtitle.ar} onChange={(e) => handleChange(e, 'subtitle', 'ar')} />
              <TextAreaGroup label="الفقرة الأولى" value={formData.description1.ar} onChange={(e) => handleChange(e, 'description1', 'ar')} />
              <TextAreaGroup label="الفقرة الثانية" value={formData.description2.ar} onChange={(e) => handleChange(e, 'description2', 'ar')} />
            </div>

            {/* إنجليزي */}
            <div className="bg-orange-50/50 p-6 rounded-lg border border-orange-100" dir="ltr">
              <h3 className="font-bold text-center mb-6 text-orange-800 text-lg bg-orange-100 py-2 rounded">English Content</h3>
              <InputGroup label="Label" value={formData.label.en} onChange={(e) => handleChange(e, 'label', 'en')} />
              <InputGroup label="Main Title" value={formData.title.en} onChange={(e) => handleChange(e, 'title', 'en')} />
              <InputGroup label="Subtitle" value={formData.subtitle.en} onChange={(e) => handleChange(e, 'subtitle', 'en')} />
              <TextAreaGroup label="Paragraph 1" value={formData.description1.en} onChange={(e) => handleChange(e, 'description1', 'en')} />
              <TextAreaGroup label="Paragraph 2" value={formData.description2.en} onChange={(e) => handleChange(e, 'description2', 'en')} />
            </div>
          </div>

          {/* الإحصائيات */}
          <div className="border border-gray-200 p-6 rounded-lg bg-gray-50">
             <h2 className="font-bold mb-4 text-gray-700 text-lg border-b pb-2">أرقام وإحصائيات</h2>
             <div className="flex gap-6">
                <div className="w-1/2">
                  <label className="block text-sm font-bold mb-2 text-gray-700">سنوات الخبرة (مثال: +45)</label>
                  <input type="text" name="statsYears" value={formData.statsYears} onChange={(e) => handleChange(e)} className="w-full p-3 border border-gray-300 rounded bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none" dir="ltr" />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-bold mb-2 text-gray-700">قيمة القضايا (مثال: $2B+)</label>
                  <input type="text" name="statsCases" value={formData.statsCases} onChange={(e) => handleChange(e)} className="w-full p-3 border border-gray-300 rounded bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none" dir="ltr" />
                </div>
             </div>
          </div>

          <div className="pt-6 border-t">
            <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded font-bold hover:bg-blue-700 shadow-lg text-lg transition duration-200">
              حفظ كافة التغييرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Components مساعدة مع تثبيت لون الخط
const InputGroup = ({ label, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-bold text-gray-700 mb-1">{label}</label>
    <input 
      type="text" 
      value={value || ''} 
      onChange={onChange} 
      className="w-full p-2 border border-gray-300 rounded text-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400" 
    />
  </div>
);

const TextAreaGroup = ({ label, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-bold text-gray-700 mb-1">{label}</label>
    <textarea 
      value={value || ''} 
      onChange={onChange} 
      className="w-full p-2 border border-gray-300 rounded text-sm h-32 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400 resize-none" 
    />
  </div>
);

export default AboutSettings;