import React from 'react'
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { GiTwirlyFlower } from "react-icons/gi";
import Skill from './Skill';
import { frontend, backend, database, tools } from '../assets/assets';

const Stack = () => {
    useGSAP(()=>{
    gsap.to('.icon',{
      rotate:360,
      duration:4,
      repeat:-1,
      ease:"linear",
    })
  })
  return (
    <div className='w-full min-h-screen py-16 md:py-20 flex flex-col items-center justify-center px-6  relative'>
        <h2 className=' font-[font1] absolute left-1/5 top-0 text-3xl sm:text-4xl md:text-3xl lg:text-3xl text-[#c8c8c8]/80 mb-12 sm:mb-16 md:mb-20 flex gap-2 items-center'><GiTwirlyFlower className='icon w-8 h-8 '/>MY STACK</h2>
        
        <div className='w-full max-w-6xl flex flex-col gap-10 sm:gap-12 md:gap-16'>
          
          
          <div className='w-full flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-10 items-start md:items-center'>
            <div className='w-full md:w-1/3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[font1] text-[#c8c8c8]/80'>FRONTEND</div>
            <div className='flex flex-wrap gap-3 sm:gap-4 md:gap-6 font-[font2] w-full md:w-2/3'>
              {frontend.map((item,index)=>(
                <Skill key={index} name={item.name} logo={item.logo}/>
              ))}
            </div>
          </div>

          <div className='w-full flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-10 items-start md:items-center'>
            <div className='w-full md:w-1/3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[font1] text-[#c8c8c8]/80'>BACKEND</div>
            <div className='flex flex-wrap gap-3 sm:gap-4 md:gap-6 font-[font2] w-full md:w-2/3'>
              {backend.map((item,index)=>(
                <Skill key={index} name={item.name} logo={item.logo} icon={item.icon} iconColor={item.iconColor}/>
              ))}
            </div>
          </div>

          <div className='w-full flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-10 items-start md:items-center'>
            <div className='w-full md:w-1/3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[font1] text-[#c8c8c8]/80'>DATABASE</div>
            <div className='flex flex-wrap gap-3 sm:gap-4 md:gap-6 font-[font2] w-full md:w-2/3'>
              {database.map((item,index)=>(
                <Skill key={index} name={item.name} logo={item.logo}/>
              ))}
            </div>
          </div>

          <div className='w-full flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-10 items-start md:items-center'>
            <div className='w-full md:w-1/3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[font1] text-[#c8c8c8]/80'>TOOLS</div>
            <div className='flex flex-wrap gap-3 sm:gap-4 md:gap-6 font-[font2] w-full md:w-2/3'>
              {tools.map((item,index)=>(
                <Skill key={index} name={item.name} logo={item.logo} icon={item.icon} iconColor={item.iconColor}/>
              ))}
            </div>
          </div>

        </div>
      </div>
  )
}

export default Stack