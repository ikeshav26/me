import React from 'react'
import GitHubCalendar from 'react-github-calendar';
import { GiTwirlyFlower } from "react-icons/gi";
import { gsap } from 'gsap';
import {useGSAP} from '@gsap/react'


const Git = () => {
  const username = "ikeshav26";
  
  
  const customTheme = {
    light: [
      '#161b22',  
      '#0e4429',  
      '#006d32',  
      '#26a641',  
      '#39d353',  
    ],
    dark: [
      '#2c2c2c',  
      '#003d1a',  
      '#00662b',
      '#00a847',  
      '#00f050',  
    ],
  };

  useGSAP(()=>{
    gsap.to('.icon',{
      rotate:360,
      duration:4,
      repeat:-1,
      ease:"linear",
    })
  })

  return (
    <div className=' w-full min-h-screen py-16 sm:py-20 md:py-24 flex flex-col items-center justify-center px-6  relative'>

      <h2 className=' absolute left-1/5 top-1/4 font-[font1] text-2xl sm:text-3xl md:text-4xl lg:text-4xl text-[#c8c8c8]/80  flex gap-2 sm:gap-3 items-center'>
        <GiTwirlyFlower className='icon w-8 h-8 '/>
        <span className='whitespace-nowrap'>GITHUB</span>
        <span className='hidden sm:inline'>CONTRIBUTIONS</span>
        <span className='sm:hidden'>CONTRI</span>
      </h2>
      
      
      <div className=' w-full max-w-7xl flex flex-col items-center gap-8'>
        <div className='w-full overflow-x-auto flex justify-center px-2'>
          <div className='inline-block min-w-fit'>
            <GitHubCalendar 
              username={username}
              theme={customTheme}
              colorScheme="dark"
              blockSize={window.innerWidth < 640 ? 8 : window.innerWidth < 768 ? 10 : 12}
              blockMargin={window.innerWidth < 640 ? 3 : 4}
              fontSize={window.innerWidth < 640 ? 12 : 14}
              style={{
                color: '#c8c8c8',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Git