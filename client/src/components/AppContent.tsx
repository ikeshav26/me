import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Me from '../pages/Me'
import About from '../pages/About'
import Work from '../pages/Work'
import Blogs from '../pages/Blogs'
import Blog from '../pages/Blog'
import Guestbook from '../pages/Guestbook'
import Ribbons from './Ribbons'
import VisitorSubtle from './VisitorSubtle'
import { useTheme } from '../context/ThemeContext'

const AppContent = () => {
  const { theme } = useTheme();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/visitor/increment`)
      .catch((err) => console.error("Error incrementing visitor count:", err));
  }, []);

  const ribbonColors = useMemo(() => {
    return [theme === 'dark' ? '#ffffff' : '#171717'];
  }, [theme]);

  // useEffect(() => {
  //   const pingInterval = setInterval(async () => {
  //     // ...
  //   }, 14 * 60 * 1000); 
  //   return () => clearInterval(pingInterval);
  // }, []);

  return (
    <Router>
      <div className='w-full min-h-screen flex flex-col font-sans relative overflow-hidden transition-colors duration-300' style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <div className="absolute inset-0 z-40 pointer-events-auto">
          <Ribbons
            baseThickness={15}
            colors={ribbonColors}
            speedMultiplier={0.5}
            maxAge={500}
            enableFade={false}
            enableShaderEffect={false}
          />
        </div>

        <div className="relative z-50 flex flex-col w-full h-full pointer-events-none">
          <div className="pointer-events-auto">
            <Navbar />
          </div>
          <VisitorSubtle />
          <main className='flex-1 w-full max-w-4xl mx-auto p-4 md:p-10 mt-24 pointer-events-auto'>
            <Routes>
              <Route path="/" element={<Me />} />
              <Route path="/about" element={<About />} />
              <Route path="/work" element={<Work />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:id" element={<Blog />} />
              <Route path="/guestbook" element={<Guestbook />} />
            </Routes>
            <Footer />
          </main>
        </div>
      </div>
    </Router>
  )
}

export default AppContent;