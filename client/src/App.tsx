import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Me from './pages/Me'
import About from './pages/About'
import Work from './pages/Work'
import Blogs from './pages/Blogs'
import Blog from './pages/Blog'
import Guestbook from './pages/Guestbook'
import Ribbons from './components/Ribbons'
import VisitorSubtle from './components/VisitorSubtle'
import ThemeContextProvider from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'

const App = () => {

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/visitor/increment`)
      .catch((err) => console.error("Error incrementing visitor count:", err));
  }, []);

  useEffect(() => {
    const pingInterval = setInterval(async () => {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}`);
      } catch (err) {
        console.error("Server ping error:", err);
      }
    }, 14 * 60 * 1000); // 14 minutes

    return () => clearInterval(pingInterval);
  }, []);

  return (
    <ThemeContextProvider>
      <AuthProvider>
        <Router>
        <div className='w-full min-h-screen flex flex-col font-sans relative overflow-hidden transition-colors duration-300' style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
          <div className="absolute inset-0 z-40 pointer-events-auto">
            <Ribbons
              baseThickness={15}
              colors={["var(--ribbon-color)"]}
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
      </AuthProvider>
    </ThemeContextProvider>
  )
}

export default App