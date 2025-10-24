import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div className='flex gap-20 fixed top-0 left-1/2 text-white'>
      <Link to="/">Home</Link>
      <Link to="/#about">About</Link>
      <Link to="/#projects">Projects</Link>
      <Link to="/#contact">Contact</Link>
    </div>
  )
}

export default Nav
