import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// استدعاء مكونات الموقع
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhyUs from './components/WhyUs';
import Services from './components/Services';
import Team from './components/Team';
import VideoLibrary from './components/VideoLibrary';
import CTA from './components/CTA';
import LatestBlog from './components/LatestBlog';
import ContactForm from './components/ContactForm';
import Contact from './components/Contact';
import Footer from './components/Footer';

// استدعاء مكونات لوحة التحكم
import HeroSettings from './pages/admin/HeroSettings'; // تأكد من المسار الصحيح للملف
import AboutSettings from './pages/admin/AboutSettings'; // تأكد من المسار الصحيح للملف
import WhyUsSettings from './pages/admin/WhyUsSettings'; // تأكد من المسار الصحيح للملف
import ServicesSettings from './pages/admin/ServicesSettings'; // تأكد من المسار الصحيح للملف
import TeamSettings from './pages/admin/TeamSettings'; // تأكد من المسار الصحيح للملف
import VideoSettings from './pages/admin/VideoSettings'; // تأكد من المسار الصحيح للملف
import BlogList from './pages/BlogList';
import BlogDetails from './pages/BlogDetails';
import BlogSettings from './pages/admin/BlogSettings';
import ContactMessages from './pages/admin/ContactMessages';
import AdminLayout from './pages/admin/AdminLayout'; // الملف الجديد
import Login from './pages/admin/Login';
import ProtectedRoute from './components/ProtectedRoute';
import WhatsAppBtn from './components/WhatsAppBtn';
function App() {
  return (
    <Router>
      <Routes>
        {/* المسار الرئيسي للموقع: لما حد يفتح الصفحة الرئيسية */}
        <Route path="/" element={
          <div className="bg-dark-900 min-h-screen overflow-x-hidden">
            <Navbar />
            <Hero />
            <About />
            <WhyUs />
            <Services />
            <Team />
            <VideoLibrary />
            <CTA />
            <LatestBlog />
            <ContactForm />
            <Contact />
            <Footer />
            <WhatsAppBtn />
          </div>
        } />
        <Route path="/blog" element={<BlogList />} />
<Route path="/blog/:slug" element={<BlogDetails />} />
<Route path="/login" element={<Login />} />
        {/* مسار لوحة التحكم: لما تكتب في الرابط /admin/hero */}
     <Route element={<ProtectedRoute />}>
       <Route path="/admin" element={<AdminLayout />}>
          {/* الصفحة الافتراضية للوحة التحكم (ممكن نخليها تفتح الرسائل مثلاً) */}
          <Route index element={<ContactMessages />} /> 
          
          <Route path="hero" element={<HeroSettings />} />
          <Route path="about" element={<AboutSettings />} />
          <Route path="whyus" element={<WhyUsSettings />} />
          <Route path="service" element={<ServicesSettings />} />
          <Route path="team" element={<TeamSettings />} />
          <Route path="video" element={<VideoSettings />} />
          <Route path="blog" element={<BlogSettings />} />
          <Route path="messages" element={<ContactMessages />} />
        </Route>
     </Route>
        
      </Routes>
    </Router>
  );
}

export default App;