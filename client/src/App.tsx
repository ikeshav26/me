import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Me from './pages/Me'
import About from './pages/About'
import Work from './pages/Work'
import Blogs from './pages/Blogs'
import Guestbook from './pages/Guestbook'
import Ribbons from './components/Ribbons'
import ThemeContextProvider from './context/ThemeContext'

const App = () => {

  return (
    <ThemeContextProvider>
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
            <main className='flex-1 w-full max-w-4xl mx-auto p-4 md:p-10 mt-24 pointer-events-auto'>
              <Routes>
                <Route path="/" element={<Me />} />
                <Route path="/about" element={<About />} />
                <Route path="/work" element={<Work />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/guestbook" element={<Guestbook />} />
              </Routes>
              <Footer />
            </main>
          </div>
        </div>
      </Router>
    </ThemeContextProvider>
  )
}

export default App