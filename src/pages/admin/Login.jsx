import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      
      // حفظ التوكن في LocalStorage
      localStorage.setItem('adminToken', res.data.token);
      
      toast.success('تم الدخول بنجاح');
      // التوجيه للوحة التحكم
      setTimeout(() => navigate('/admin/messages'), 1000);
      
    } catch (error) {
      toast.error('بيانات الدخول خاطئة');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 font-cairo" dir="rtl">
      <Toaster />
      <div className="bg-white p-10 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">تسجيل دخول الأدمن</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block mb-2 font-bold text-gray-700">اسم المستخدم</label>
            <input 
              type="text" 
              className="w-full p-3 border rounded focus:ring-2 focus:ring-gold-500 outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 font-bold text-gray-700">كلمة المرور</label>
            <input 
              type="password" 
              className="w-full p-3 border rounded focus:ring-2 focus:ring-gold-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-gold-500 text-black font-bold py-3 rounded hover:bg-gold-400 transition">
            دخول
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;