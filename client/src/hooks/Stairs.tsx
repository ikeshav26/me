import React from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { useTheme } from '../context/ThemeContext'

const LandingPage = ({children}: {children: React.ReactNode}) => {
    const {theme}=useTheme()

    useGSAP(()=>{
      const tl = gsap.timeline()

      tl.from('.name', {
          opacity: 0,
          y: 100,
          scale: 0.8,
          stagger: {
            each: 0.05,
            from: "center" 
          },
          duration: 0.8,
          ease: 'expo.out'
      })


      tl.to('.name', {
           opacity: 0,
           y: -50,
           scale: 0.9,
           stagger: {
             each: 0.04,
             from: "center"
           },
           duration: 0.4,
           ease: 'power2.in'
      }, "+=0.4") 
        

      tl.to('.stair', {
          yPercent: 100,
          stagger: {
            each: 0.05,
            from: "start" 
          },
          duration: 0.7,
          ease: 'power4.inOut'
      }, "<0.2") 


      tl.to('.main', {
         opacity: 0,
         duration: 0.1,
         display: 'none'
      })
    })

  return (
    <>
    <div className='main fixed inset-0 z-100 flex overflow-hidden'>
      <div className={theme === 'dark' ? 'group z-60 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[15vw] font-bold text-black' : 'group z-60 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[15vw] font-bold text-white'}>
      <span className='name'>K</span>
      <span className='name'>E</span>
      <span className='name'>S</span>
      <span className='name'>H</span>
      <span className='name'>A</span>
      <span className='name'>V</span>
      </div>
      <div className={`stair h-screen w-[20vw] md:w-[10vw] ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}></div>
      <div className={`stair h-screen w-[20vw] md:w-[10vw] ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}></div>
      <div className={`stair h-screen w-[20vw] md:w-[10vw] ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}></div>
      <div className={`stair h-screen w-[20vw] md:w-[10vw] ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}></div>
      <div className={`stair h-screen w-[20vw] md:w-[10vw] ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}></div>
      <div className={`stair h-screen hidden md:block w-[10vw] ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}></div>
      <div className={`stair h-screen hidden md:block w-[10vw] ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}></div>
      <div className={`stair h-screen hidden md:block w-[10vw] ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}></div>
      <div className={`stair h-screen hidden md:block w-[10vw] ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}></div>
      <div className={`stair h-screen hidden md:block w-[10vw] ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}></div>
    </div>
    <div>
        {children}
    </div>
    </>
  )
}

export default LandingPage