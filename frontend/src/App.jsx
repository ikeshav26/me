import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Root from './pages/Root.jsx'
import Nav from './components/Nav.jsx'

const App = () => {
  return (
    <div className=' '>
      <Nav/>
      <Routes>
        <Route path='/' element={<Root />} />
      </Routes>
    </div>
  )
}

export default App
