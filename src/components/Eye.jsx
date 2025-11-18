import React, { useState, useRef } from 'react'

const Eye = () => {
  const [leftEye, setLeftEye] = useState({ x: 0, y: 0 })
  const [rightEye, setRightEye] = useState({ x: 0, y: 0 })
  const leftEyeRef = useRef(null)
  const rightEyeRef = useRef(null)

  const mouseHandler = (e, eyeRef, setEye) => {
    if (!eyeRef.current) return
    
    const eye = eyeRef.current.getBoundingClientRect()
    const eyeCenterX = eye.left + eye.width / 2
    const eyeCenterY = eye.top + eye.height / 2
    
    const mouseX = e.clientX
    const mouseY = e.clientY
    
    const deltaX = mouseX - eyeCenterX
    const deltaY = mouseY - eyeCenterY
    
    const angle = Math.atan2(deltaY, deltaX)
    const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), eye.width / 4)
    
    const maxDistance = eye.width / 4
    const limitedDistance = Math.min(distance, maxDistance)
    
    const x = Math.cos(angle) * limitedDistance
    const y = Math.sin(angle) * limitedDistance
    
    setEye({ x, y })
  }

  return (
    <div 
      onMouseMove={(e) => {
        mouseHandler(e, leftEyeRef, setLeftEye)
        mouseHandler(e, rightEyeRef, setRightEye)
      }} 
      className='w-1/2 h-screen flex items-center justify-center'
    >
      <div className='relative flex flex-col items-center gap-6'>
        <div className='absolute -top-44 left-1/2 -translate-x-1/2 z-10'>
          <div className='relative'>
            <div className='w-72 h-30 bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-lg border-2 border-gray-700 shadow-lg'></div>
            <div className='w-88 h-6 bg-gradient-to-b from-gray-900 to-black rounded-full shadow-xl border-2 border-gray-800 -mt-1'></div>
            <div className='absolute top-14 left-0 w-72 h-5 bg-[#00f050] shadow-[0_0_10px_rgba(0,240,80,0.5)]'></div>
          </div>
        </div>


        <div className='flex gap-6'>
          <div 
            ref={leftEyeRef}
            className='bg-white h-50 w-50 rounded-full flex items-center justify-center relative overflow-hidden shadow-lg'
          >
            <div 
              className='bg-black h-6 w-6 rounded-full transition-transform duration-100 ease-out' 
              style={{ transform: `translate(${leftEye.x}px, ${leftEye.y}px)` }}
            ></div>
          </div>
          <div 
            ref={rightEyeRef}
            className='bg-white h-50 w-50 rounded-full flex items-center justify-center relative overflow-hidden shadow-lg'
          >
            <div 
              className='bg-black h-6 w-6 rounded-full transition-transform duration-100 ease-out' 
              style={{ transform: `translate(${rightEye.x}px, ${rightEye.y}px)` }}
            ></div>
          </div>
        </div>
    
      </div>
    </div>
  )
}

export default Eye