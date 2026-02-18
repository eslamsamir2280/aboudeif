import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  FaHome, FaInfoCircle, FaHandsHelping, FaConciergeBell, 
  FaUsers, FaVideo, FaNewspaper, FaEnvelope, FaSignOutAlt 
} from 'react-icons/fa';

const AdminLayout = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin/hero', name: 'الواجهة الرئيسية (Hero)', icon: <FaHome /> },
    { path: '/admin/about', name: 'من نحن (About)', icon: <FaInfoCircle /> },
    { path: '/admin/whyus', name: 'لماذا نحن (Why Us)', icon: <FaHandsHelping /> },
    { path: '/admin/service', name: 'الخدمات (Services)', icon: <FaConciergeBell /> },
    { path: '/admin/team', name: 'فريق العمل (Team)', icon: <FaUsers /> },
    { path: '/admin/video', name: 'مكتبة الفيديو', icon: <FaVideo /> },
    { path: '/admin/blog', name: 'المدونة (Blog)', icon: <FaNewspaper /> },
    { path: '/admin/messages', name: 'الرسائل الواردة', icon: <FaEnvelope /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    // الحاوية الرئيسية: فليكس لتوزيع العناصر يمين ويسار، وتمنع سكرول الصفحة كلها
    <div className="flex h-screen bg-gray-100 font-cairo" dir="rtl">
      
      {/* === القائمة الجانبية (Sidebar) === */}
      {/* w-64: عرض ثابت */}
      {/* flex-shrink-0: يمنع القائمة من الانكماش */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col flex-shrink-0 shadow-xl z-20 overflow-y-auto">
        
        {/* اللوجو */}
        <div className="p-6 text-center border-b border-gray-800 bg-gray-900 sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gold-500">لوحة التحكم</h2>
          <p className="text-gray-400 text-xs mt-1">Law Firm Admin</p>
        </div>

        {/* الروابط */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded transition-all duration-200 ${
                isActive(item.path) 
                  ? 'bg-gold-500 text-black font-bold shadow-md' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* زر الخروج */}
        <div className="p-4 border-t border-gray-800 mt-auto bg-gray-900 sticky bottom-0">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-gray-800 rounded transition-colors">
            <FaSignOutAlt />
            <span>العودة للموقع</span>
          </Link>
        </div>
      </aside>

      {/* === محتوى الصفحة (Content Area) === */}
      {/* flex-1: يأخذ باقي المساحة المتاحة */}
      {/* overflow-y-auto: المحتوى فقط هو الذي يتحرك عند السكرول */}
      <main className="flex-1 bg-gray-100 overflow-y-auto relative">
        <div className="p-8 pb-20">
           <Outlet />
        </div>
      </main>

    </div>
  );
};

export default AdminLayout;