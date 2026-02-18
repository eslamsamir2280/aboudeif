import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { FaTrash, FaUserPlus } from 'react-icons/fa';

const TeamSettings = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ title: { ar: '', en: '' }, subtitle: { ar: '', en: '' }, members: [] });
  
  // حالة النموذج لإضافة عضو جديد
  const [newMember, setNewMember] = useState({
    name: { ar: '', en: '' },
    job: { ar: '', en: '' },
    file: null
  });

  const fetchTeam = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/team');
      setData(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => { fetchTeam(); }, []);

  // تحديث العناوين الرئيسية
  // 1. تحديث العناوين
  const handleInfoUpdate = async () => {
    try {
      const token = localStorage.getItem('adminToken'); // جلب التوكن

      await axios.put('http://localhost:5000/api/team/info', {
        title: data.title,
        subtitle: data.subtitle
      }, {
        headers: {
          'Authorization': `Bearer ${token}` // إرساله في الهيدر
        }
      });
      toast.success('تم تحديث العناوين بنجاح');
    } catch (error) {
      toast.error('حدث خطأ (ربما انتهت الجلسة)');
    }
  };

  // 2. إضافة عضو جديد
  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!newMember.file) return toast.error('يرجى اختيار صورة');

    const formData = new FormData();
    formData.append('image', newMember.file);
    formData.append('name', JSON.stringify(newMember.name));
    formData.append('job', JSON.stringify(newMember.job));

    try {
      const token = localStorage.getItem('adminToken'); // جلب التوكن

      await axios.post('http://localhost:5000/api/team/member', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` // إرساله بجانب نوع المحتوى
        }
      });
      toast.success('تم إضافة العضو بنجاح');
      fetchTeam(); 
      setNewMember({ name: { ar: '', en: '' }, job: { ar: '', en: '' }, file: null });
    } catch (error) {
      toast.error('فشل الإضافة (غير مصرح)');
      console.error(error);
    }
  };

  // 3. حذف عضو
  const handleDeleteMember = async (id) => {
    if (window.confirm('هل أنت متأكد من الحذف؟')) {
      try {
        const token = localStorage.getItem('adminToken'); // جلب التوكن

        await axios.delete(`http://localhost:5000/api/team/member/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}` // إرساله في الهيدر
          }
        });
        toast.success('تم الحذف');
        fetchTeam();
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
        <h1 className="text-3xl font-bold text-gray-800">إدارة فريق العمل</h1>

        {/* 1. قسم العناوين */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-bold text-blue-600 mb-4 border-b pb-2">عناوين القسم</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
             <div>
               <label className="block text-sm font-bold mb-1">العنوان الرئيسي (عربي)</label>
               <input type="text" value={data.title.ar} onChange={e => setData({...data, title: {...data.title, ar: e.target.value}})} className="w-full p-2 border rounded" />
             </div>
             <div dir="ltr">
               <label className="block text-sm font-bold mb-1">Main Title (English)</label>
               <input type="text" value={data.title.en} onChange={e => setData({...data, title: {...data.title, en: e.target.value}})} className="w-full p-2 border rounded" />
             </div>
             <div>
               <label className="block text-sm font-bold mb-1">الوصف (عربي)</label>
               <input type="text" value={data.subtitle.ar} onChange={e => setData({...data, subtitle: {...data.subtitle, ar: e.target.value}})} className="w-full p-2 border rounded" />
             </div>
             <div dir="ltr">
               <label className="block text-sm font-bold mb-1">Subtitle (English)</label>
               <input type="text" value={data.subtitle.en} onChange={e => setData({...data, subtitle: {...data.subtitle, en: e.target.value}})} className="w-full p-2 border rounded" />
             </div>
          </div>
          <button onClick={handleInfoUpdate} className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700">حفظ العناوين</button>
        </div>

        {/* 2. إضافة عضو جديد */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-bold text-green-600 mb-4 border-b pb-2 flex items-center gap-2">
            <FaUserPlus /> إضافة عضو جديد
          </h2>
          <form onSubmit={handleAddMember} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* عربي */}
              <div className="bg-gray-50 p-3 rounded">
                <input type="text" placeholder="الاسم (عربي)" value={newMember.name.ar} onChange={e => setNewMember({...newMember, name: {...newMember.name, ar: e.target.value}})} className="w-full p-2 border rounded mb-2" required />
                <input type="text" placeholder="الوظيفة (عربي)" value={newMember.job.ar} onChange={e => setNewMember({...newMember, job: {...newMember.job, ar: e.target.value}})} className="w-full p-2 border rounded" required />
              </div>
              {/* إنجليزي */}
              <div className="bg-gray-50 p-3 rounded" dir="ltr">
                <input type="text" placeholder="Name (English)" value={newMember.name.en} onChange={e => setNewMember({...newMember, name: {...newMember.name, en: e.target.value}})} className="w-full p-2 border rounded mb-2" required />
                <input type="text" placeholder="Job Title (English)" value={newMember.job.en} onChange={e => setNewMember({...newMember, job: {...newMember.job, en: e.target.value}})} className="w-full p-2 border rounded" required />
              </div>
            </div>
            {/* رفع الصورة */}
            <div>
              <label className="block text-sm font-bold mb-1">صورة العضو</label>
              <input type="file" onChange={e => setNewMember({...newMember, file: e.target.files[0]})} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-green-50 file:text-green-700 hover:file:bg-green-100" required />
            </div>
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700">إضافة للقائمة</button>
          </form>
        </div>

        {/* 3. قائمة الأعضاء الحاليين */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.members.map((member) => (
            <div key={member._id} className="bg-white p-4 rounded shadow border hover:shadow-lg transition relative group">
              <button onClick={() => handleDeleteMember(member._id)} className="absolute top-2 left-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition shadow">
                <FaTrash />
              </button>
              <div className="h-48 overflow-hidden rounded mb-3 bg-gray-200">
                <img src={member.fullImageUrl} alt={member.name.ar} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-center text-gray-800">{member.name.ar}</h3>
              <p className="text-sm text-center text-gray-500">{member.job.ar}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TeamSettings;