import React from 'react'
import { gsap } from 'gsap';
import {useGSAP} from '@gsap/react'

const Home = () => {
  useGSAP(()=>{
    const tl=gsap.timeline();
    const tl2=gsap.timeline();
    
    tl.to('.svg-arrow-1',{
      duration:1,
      strokeDashoffset:0,
      strokeDasharray:400,
      repeat:-1
    })

    tl.to('.svg-arrow-2',{
      duration:1,
      strokeDashoffset:0,
      strokeDasharray:400,
      repeat:-1
    })

    tl.from('.arrow',{
      yPercent:-20,
      repeat:-1,
      opacity:0.5,
      yoyo:true,
      ease:"power1.inOut",
      duration:1,
    })

  })
  return (
    <div className='h-screen relative px-6 md:px-0'>
      <div className='absolute top-1/4 md:top-1/5 left-6 md:left-1/4 w-[calc(100%-3rem)] md:w-1/3 h-auto md:h-90 flex flex-col justify-between gap-8'>

      <div className='flex flex-col text-5xl sm:text-5xl md:text-6xl lg:text-8xl font-[font1]'>
        <span className='text-[#00f050]'>FULL STACK</span>
        <span className='ml-4 md:ml-8'>DEVELOPER</span>
      </div>

      <div className='text-base sm:text-lg md:text-xl text-[#c8c8c8]/60'>
        Hi! I'm <span className='text-[#c8c8c8]'>Keshav Gilhotra</span>. A Full Stack Developer with experience of building scalable, high-performance web apps. Currently enhancing my skills in Java and DSA to strengthen my backend and problem-solving expertise.
      </div>

      <div>
        <button className='bg-[#00f050] text-black font-[font1] text-lg md:text-xl py-2 px-4 hover:bg-[#00d045] transition-colors duration-300'>Download CV</button>
      </div>
      </div>

      <div className='h-auto md:h-90 w-auto md:w-50 absolute right-6 md:right-16 bottom-12 md:bottom-1/5 flex flex-col justify-between items-end gap-6 md:gap-0'>
      <div className='flex flex-col items-end'>
        <div className='text-[#00f050] text-2xl sm:text-3xl font-[font1]'>1+</div>
        <div className='text-[#c8c8c8]/60 text-sm sm:text-base md:text-lg font-[font2]'>Years of Learning</div>
      </div>
      <div className='flex flex-col items-end'>
        <div className='text-[#00f050] text-2xl sm:text-3xl font-[font1]'>5+</div>
        <div className='text-[#c8c8c8]/60 text-sm sm:text-base md:text-lg font-[font2]'>Completed Projects</div>
      </div>
      <div className='flex flex-col items-end'>
        <div className='text-[#00f050] text-2xl sm:text-3xl font-[font1]'>2.5K+</div>
        <div className='text-[#c8c8c8]/60 text-sm sm:text-base md:text-lg font-[font2]'>Hours Worked</div>
        </div>
        </div>

      <div className='arrow absolute  bottom-8 left-1/2 -translate-x-1/2  '>
         <svg
            id="banner-arrow-svg"
            width="376"
            height="111"
            viewBox="0 0 376 111"
            fill="transparent"
            xmlns="http://www.w3.org/2000/svg"
            className="w-32 h-24 md:w-80 md:h-80 "
        >
            <path
                className="svg-arrow svg-arrow-1"
                d="M1 1V39.9286L188 110V70.6822L1 1Z"
                stroke="#2c2c2c"
                strokeWidth="3"
                fill="none"
            />
            <path
                className="svg-arrow svg-arrow-2"
                d="M375 1V39.9286L188 110V70.6822L375 1Z"
                stroke="#2c2c2c"
                strokeWidth="3"
                fill="none"
            />
        </svg>
      </div>
        
    </div>
  )
}

export default Home
