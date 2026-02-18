import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { FaTrash, FaVideo, FaPlus } from 'react-icons/fa';

const VideoSettings = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  // حالة الفيديو الرئيسي للنموذج
  const [mainForm, setMainForm] = useState({
    sectionTitle: { ar: '', en: '' },
    sectionSubtitle: { ar: '', en: '' },
    mainTitle: { ar: '', en: '' },
    mainDate: { ar: '', en: '' },
    mainLink: '',
    imageFile: null
  });

  // حالة الفيديو الصغير الجديد
  const [newThumb, setNewThumb] = useState({
    title: { ar: '', en: '' },
    duration: '',
    link: '',
    imageFile: null
  });

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/videos');
      setData(res.data);
      // تحديث بيانات نموذج الفيديو الرئيسي
      setMainForm({
        sectionTitle: res.data.sectionTitle,
        sectionSubtitle: res.data.sectionSubtitle,
        mainTitle: res.data.mainVideo.title,
        mainDate: res.data.mainVideo.date,
        mainLink: res.data.mainVideo.link,
        imageFile: null
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // تحديث القسم الرئيسي
 // 1. تحديث القسم الرئيسي (Hero Video)
  const handleMainUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('sectionTitle', JSON.stringify(mainForm.sectionTitle));
    formData.append('sectionSubtitle', JSON.stringify(mainForm.sectionSubtitle));
    formData.append('mainTitle', JSON.stringify(mainForm.mainTitle));
    formData.append('mainDate', JSON.stringify(mainForm.mainDate));
    formData.append('mainLink', mainForm.mainLink);
    if (mainForm.imageFile) formData.append('image', mainForm.imageFile);

    try {
      // 👇 جلب التوكن
      const token = localStorage.getItem('adminToken');

      await axios.put('http://localhost:5000/api/videos/main', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` // 👇 إرسال التوكن
        }
      });
      toast.success('تم تحديث القسم الرئيسي');
      fetchData();
    } catch (error) {
      toast.error('حدث خطأ (ربما انتهت الجلسة)');
    }
  };

  // 2. إضافة فيديو صغير (Thumbnail)
  const handleAddThumb = async (e) => {
    e.preventDefault();
    if (!newThumb.imageFile) return toast.error('مطلوب صورة للفيديو');

    const formData = new FormData();
    formData.append('title', JSON.stringify(newThumb.title));
    formData.append('duration', newThumb.duration);
    formData.append('link', newThumb.link);
    formData.append('image', newThumb.imageFile);

    try {
      // 👇 جلب التوكن
      const token = localStorage.getItem('adminToken');

      await axios.post('http://localhost:5000/api/videos/thumbnail', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` // 👇 إرسال التوكن
        }
      });
      toast.success('تمت الإضافة');
      setNewThumb({ title: { ar: '', en: '' }, duration: '', link: '', imageFile: null });
      fetchData();
    } catch (error) {
      toast.error('فشل الإضافة (غير مصرح)');
    }
  };

  // 3. حذف فيديو صغير
  const handleDeleteThumb = async (id) => {
    if (window.confirm('حذف هذا الفيديو؟')) {
      try {
        // 👇 جلب التوكن
        const token = localStorage.getItem('adminToken');

        await axios.delete(`http://localhost:5000/api/videos/thumbnail/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}` // 👇 إرسال التوكن
          }
        });
        toast.success('تم الحذف');
        fetchData();
      } catch (error) {
        toast.error('حدث خطأ (غير مصرح)');
      }
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-900">جاري التحميل...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-cairo dir-rtl text-gray-900">
      <Toaster />
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">إدارة مكتبة الفيديوهات</h1>

        {/* 1. إعدادات الفيديو الرئيسي */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-bold text-blue-600 mb-4 border-b pb-2 flex items-center gap-2">
            <FaVideo /> الفيديو الرئيسي والواجهة
          </h2>
          <form onSubmit={handleMainUpdate} className="space-y-4">
            {/* عناوين السكشن */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-3 rounded">
              <input type="text" placeholder="عنوان القسم (عربي)" value={mainForm.sectionTitle.ar} onChange={e => setMainForm({...mainForm, sectionTitle: {...mainForm.sectionTitle, ar: e.target.value}})} className="w-full p-2 border rounded" />
              <input type="text" dir="ltr" placeholder="Section Title (En)" value={mainForm.sectionTitle.en} onChange={e => setMainForm({...mainForm, sectionTitle: {...mainForm.sectionTitle, en: e.target.value}})} className="w-full p-2 border rounded" />
            </div>

            {/* بيانات الفيديو الرئيسي */}
            <div className="border p-4 rounded bg-blue-50/50">
              <label className="block font-bold text-gray-700 mb-2">بيانات الفيديو الكبير</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input type="text" placeholder="عنوان الفيديو (عربي)" value={mainForm.mainTitle.ar} onChange={e => setMainForm({...mainForm, mainTitle: {...mainForm.mainTitle, ar: e.target.value}})} className="w-full p-2 border rounded" />
                <input type="text" dir="ltr" placeholder="Video Title (En)" value={mainForm.mainTitle.en} onChange={e => setMainForm({...mainForm, mainTitle: {...mainForm.mainTitle, en: e.target.value}})} className="w-full p-2 border rounded" />
                <input type="text" placeholder="التاريخ (عربي)" value={mainForm.mainDate.ar} onChange={e => setMainForm({...mainForm, mainDate: {...mainForm.mainDate, ar: e.target.value}})} className="w-full p-2 border rounded" />
                <input type="text" dir="ltr" placeholder="Date (En)" value={mainForm.mainDate.en} onChange={e => setMainForm({...mainForm, mainDate: {...mainForm.mainDate, en: e.target.value}})} className="w-full p-2 border rounded" />
              </div>
              <div className="mb-4">
                 <label className="block text-sm mb-1">رابط الفيديو (YouTube/Vimeo)</label>
                 <input type="text" dir="ltr" value={mainForm.mainLink} onChange={e => setMainForm({...mainForm, mainLink: e.target.value})} className="w-full p-2 border rounded" />
              </div>
              <div>
                 <label className="block text-sm mb-1">صورة الغلاف (تترك فارغة للإبقاء على الحالية)</label>
                 <input type="file" onChange={e => setMainForm({...mainForm, imageFile: e.target.files[0]})} className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-100 file:text-blue-700" />
                 {data.mainVideo.fullImageUrl && <img src={data.mainVideo.fullImageUrl} alt="Current" className="h-20 mt-2 rounded" />}
              </div>
            </div>

            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700 w-full">حفظ التغييرات الرئيسية</button>
          </form>
        </div>

        {/* 2. إضافة فيديو صغير */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-bold text-green-600 mb-4 border-b pb-2 flex items-center gap-2">
            <FaPlus /> إضافة فيديو للقائمة
          </h2>
          <form onSubmit={handleAddThumb} className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="عنوان الفيديو (عربي)" value={newThumb.title.ar} onChange={e => setNewThumb({...newThumb, title: {...newThumb.title, ar: e.target.value}})} className="w-full p-2 border rounded" required />
                <input type="text" dir="ltr" placeholder="Video Title (En)" value={newThumb.title.en} onChange={e => setNewThumb({...newThumb, title: {...newThumb.title, en: e.target.value}})} className="w-full p-2 border rounded" required />
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" dir="ltr" placeholder="المدة (مثال 05:30)" value={newThumb.duration} onChange={e => setNewThumb({...newThumb, duration: e.target.value})} className="w-full p-2 border rounded" />
                <input type="text" dir="ltr" placeholder="رابط الفيديو" value={newThumb.link} onChange={e => setNewThumb({...newThumb, link: e.target.value})} className="w-full p-2 border rounded" />
             </div>
             <input type="file" onChange={e => setNewThumb({...newThumb, imageFile: e.target.files[0]})} className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-green-100 file:text-green-700" required />
             
             <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded font-bold hover:bg-green-700 w-full">إضافة للقائمة</button>
          </form>
        </div>

        {/* 3. عرض القائمة والحذف */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {data.thumbnails.map(thumb => (
             <div key={thumb._id} className="bg-white p-3 rounded shadow border hover:shadow-lg relative group">
                <button onClick={() => handleDeleteThumb(thumb._id)} className="absolute top-2 left-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition z-10">
                  <FaTrash />
                </button>
                <img src={thumb.fullImageUrl} alt="thumb" className="w-full h-32 object-cover rounded mb-2" />
                <h4 className="font-bold text-gray-800 text-sm mb-1">{thumb.title.ar}</h4>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded">{thumb.duration}</span>
             </div>
           ))}
        </div>

      </div>
    </div>
  );
};

export default VideoSettings;