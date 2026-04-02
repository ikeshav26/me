import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Me from './pages/Me'
import About from './pages/About'
import Work from './pages/Work'
import Blogs from './pages/Blogs'
import Guestbook from './pages/Guestbook'
import Ribbons from './components/Ribbons'

const App = () => {
  return (
    <Router>
      <div className='bg-[#0a0a0a] text-neutral-200 w-full min-h-screen flex flex-col font-sans selection:bg-neutral-700 relative overflow-hidden'>
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <Ribbons
            baseThickness={15}
            colors={["#ffffff"]}
            speedMultiplier={0.5}
            maxAge={400}
            enableFade={true}
            enableShaderEffect={true}
          />
        </div>

        <div className="relative z-10 flex flex-col w-full h-full pointer-events-none">
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
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App