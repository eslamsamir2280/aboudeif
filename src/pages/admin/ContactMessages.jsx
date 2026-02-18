import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { FaTrash, FaEnvelope, FaPhone, FaUser, FaClock } from 'react-icons/fa';

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/contact');
      setMessages(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الرسالة؟')) {
      try {
        await axios.delete(`http://localhost:5000/api/contact/${id}`);
        toast.success('تم الحذف بنجاح');
        fetchMessages(); // إعادة تحميل القائمة
      } catch (error) {
        toast.error('حدث خطأ');
      }
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-900">جاري التحميل...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-cairo dir-rtl text-gray-900">
      <Toaster />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4 flex items-center gap-2">
           <FaEnvelope className="text-blue-600" /> البريد الوارد ({messages.length})
        </h1>

        {messages.length === 0 ? (
          <div className="text-center py-20 bg-white rounded shadow text-gray-500">
            لا توجد رسائل جديدة
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {messages.map((msg) => (
              <div key={msg._id} className="bg-white p-6 rounded-lg shadow border-r-4 border-blue-500 relative hover:shadow-md transition">
                
                {/* زر الحذف */}
                <button 
                  onClick={() => handleDelete(msg._id)}
                  className="absolute top-4 left-4 text-gray-400 hover:text-red-500 transition"
                  title="حذف الرسالة"
                >
                  <FaTrash size={18} />
                </button>

                {/* رأس الرسالة */}
                <div className="flex flex-col md:flex-row justify-between mb-4 border-b pb-2">
                  <div className="flex items-center gap-2 mb-2 md:mb-0">
                    <FaUser className="text-gray-400" />
                    <span className="font-bold text-lg text-gray-800">{msg.name}</span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded mr-2">
                      {msg.service}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FaClock />
                    <span>{new Date(msg.createdAt).toLocaleString('ar-EG')}</span>
                  </div>
                </div>

                {/* تفاصيل الاتصال */}
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded">
                    <FaPhone className="text-green-600" />
                    <span dir="ltr">{msg.phone}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded">
                    <FaEnvelope className="text-orange-500" />
                    <span>{msg.email}</span>
                  </div>
                </div>

                {/* نص الرسالة */}
                <div className="bg-gray-50 p-4 rounded text-gray-700 leading-relaxed whitespace-pre-wrap border border-gray-100">
                  {msg.message}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactMessages;