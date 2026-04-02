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
      <div className='bg-[#000] text-neutral-200 w-full min-h-screen flex flex-col font-sans selection:bg-neutral-700 relative overflow-hidden'>
        <div className="absolute inset-0 z-40 pointer-events-auto">
          <Ribbons
            baseThickness={15}
            colors={["#ffffff"]}
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
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App