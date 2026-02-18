import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import ReactQuill from 'react-quill-new';
import "react-quill-new/dist/quill.snow.css";
import { FaTrash, FaPlus, FaPen } from 'react-icons/fa';

const BlogSettings = () => {
  const [blogs, setBlogs] = useState([]);
  const [view, setView] = useState('list'); // 'list' or 'add'
  
  // نموذج إضافة المقال
  const [formData, setFormData] = useState({
    slug: '',
    category: { ar: '', en: '' },
    title: { ar: '', en: '' },
    shortDesc: { ar: '', en: '' },
    content: { ar: '', en: '' },
    imageFile: null
  });

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/blog');
      setBlogs(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleChange = (e, field, lang) => {
    if (lang) {
      setFormData({ ...formData, [field]: { ...formData[field], [lang]: e.target.value } });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // التعامل مع محرر النصوص
  const handleEditorChange = (value, lang) => {
    setFormData(prev => ({
      ...prev,
      content: { ...prev.content, [lang]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // إنشاء Slug تلقائي إذا لم يدخله المستخدم
    let finalSlug = formData.slug || formData.title.en.toLowerCase().replace(/ /g, '-');

    const data = new FormData();
    data.append('slug', finalSlug);
    data.append('image', formData.imageFile);
    data.append('category', JSON.stringify(formData.category));
    data.append('title', JSON.stringify(formData.title));
    data.append('shortDesc', JSON.stringify(formData.shortDesc));
    data.append('content', JSON.stringify(formData.content));

    try {
      await axios.post('http://localhost:5000/api/blog', data, {
        headers: { 'Content-Type': 'multipart/form-data' , 'Authorization': `Bearer ${token}` }
      });
      toast.success('تم نشر المقال بنجاح');
      setView('list');
      fetchBlogs();
      // تصفير النموذج
      setFormData({ slug: '', category: {ar:'',en:''}, title: {ar:'',en:''}, shortDesc: {ar:'',en:''}, content: {ar:'',en:''}, imageFile: null });
    } catch (error) {
      toast.error('حدث خطأ أثناء النشر');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('حذف هذا المقال؟')) {
      try {
        // 👇 1. جلب التوكن من التخزين المحلي
        const token = localStorage.getItem('adminToken');

        // 👇 2. تمرير التوكن في الهيدر (لاحظ القوس الثاني في axios.delete)
        await axios.delete(`http://localhost:5000/api/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });

        toast.success('تم الحذف');
        fetchBlogs();
      } catch (error) {
        console.error(error);
        toast.error('خطأ في الحذف (غير مصرح)');
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-cairo dir-rtl text-gray-900">
      <Toaster />
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">إدارة المدونة</h1>
          {view === 'list' ? (
            <button onClick={() => setView('add')} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
              <FaPlus /> مقال جديد
            </button>
          ) : (
            <button onClick={() => setView('list')} className="bg-gray-500 text-white px-4 py-2 rounded">
              إلغاء وعودة للقائمة
            </button>
          )}
        </div>

        {view === 'list' ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full text-right">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-4">الصورة</th>
                  <th className="p-4">العنوان</th>
                  <th className="p-4">التاريخ</th>
                  <th className="p-4">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map(blog => (
                  <tr key={blog._id} className="border-b hover:bg-gray-50">
                    <td className="p-4"><img src={blog.fullImageUrl} alt="thumb" className="w-16 h-16 object-cover rounded" /></td>
                    <td className="p-4 font-bold">{blog.title.ar}</td>
                    <td className="p-4 text-sm text-gray-500">{new Date(blog.date).toLocaleDateString('ar-EG')}</td>
                    <td className="p-4">
                      <button onClick={() => handleDelete(blog._id)} className="text-red-500 hover:text-red-700">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          // === فورم إضافة مقال ===
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-6">
            
            {/* الصورة والـ Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-bold mb-1">صورة المقال</label>
                <input type="file" onChange={e => setFormData({...formData, imageFile: e.target.files[0]})} className="block w-full border p-2 rounded" required />
              </div>
              <div>
                <label className="block font-bold mb-1">رابط المقال (Slug) - إنجليزي وبدون مسافات</label>
                <input type="text" dir="ltr" name="slug" value={formData.slug} onChange={(e) => handleChange(e)} className="block w-full border p-2 rounded" placeholder="ex: new-law-2025" />
              </div>
            </div>

            {/* العنوان والتصنيف */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <input type="text" placeholder="عنوان المقال (عربي)" value={formData.title.ar} onChange={e => handleChange(e, 'title', 'ar')} className="w-full border p-2 rounded" required />
                <input type="text" placeholder="التصنيف (عربي)" value={formData.category.ar} onChange={e => handleChange(e, 'category', 'ar')} className="w-full border p-2 rounded" required />
              </div>
              <div className="space-y-4" dir="ltr">
                <input type="text" placeholder="Article Title (En)" value={formData.title.en} onChange={e => handleChange(e, 'title', 'en')} className="w-full border p-2 rounded" required />
                <input type="text" placeholder="Category (En)" value={formData.category.en} onChange={e => handleChange(e, 'category', 'en')} className="w-full border p-2 rounded" required />
              </div>
            </div>

            {/* وصف مختصر */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <textarea placeholder="وصف مختصر للكارت (عربي)" value={formData.shortDesc.ar} onChange={e => handleChange(e, 'shortDesc', 'ar')} className="w-full border p-2 rounded h-20" required />
               <textarea dir="ltr" placeholder="Short Description (En)" value={formData.shortDesc.en} onChange={e => handleChange(e, 'shortDesc', 'en')} className="w-full border p-2 rounded h-20" required />
            </div>

            {/* المحتوى الكامل (Editor) */}
            <div>
              <label className="block font-bold mb-2 text-blue-600">المحتوى الكامل (عربي)</label>
              <ReactQuill theme="snow" value={formData.content.ar} onChange={(val) => handleEditorChange(val, 'ar')} className="h-64 mb-12" />
              
              <label className="block font-bold mb-2 text-orange-600 mt-8">Full Content (English)</label>
              <div dir="ltr">
                <ReactQuill theme="snow" value={formData.content.en} onChange={(val) => handleEditorChange(val, 'en')} className="h-64 mb-12" />
              </div>
            </div>

            <button type="submit" className="bg-green-600 text-white w-full py-3 rounded font-bold hover:bg-green-700 text-lg">نشر المقال</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BlogSettings;