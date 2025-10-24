import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Root from './pages/Root.jsx'
import Nav from './components/Nav.jsx'
import LandingPage from './components/LandingPage.jsx'

const App = () => {
  return (
      <div className='bg-gray-700 '>
        <Nav/>
        <Routes>
          <Route path='/' element={<Root />} />
        </Routes>
      </div>
  )
}

export default App
