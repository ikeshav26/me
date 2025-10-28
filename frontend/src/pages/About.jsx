import React from 'react'
import Stack from '../components/Stack'
import Git from '../components/Git'
import Heading from '../components/Heading'



const About = () => {
  
  
  return (
    <div className='min-h-screen px-6 md:px-0 py-12 sm:py-16 md:py-20'>
      <Heading text={"ABOUT ME"}/>
      <div className='max-w-7xl mx-auto h-full flex flex-col justify-center gap-10 sm:gap-12 md:gap-16'>
      
        <div className='quote w-full md:w-4/5 lg:w-3/4 mx-auto md:ml-[10%] font-light font-[font2] text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-[#c8c8c8]'>
          I believe in a user-centered development approach, ensuring every application I build delivers seamless performance, intuitive interfaces, and real value to its users.
        </div>

        <div className='w-full md:ml-[10%]'>
          <div className='font-[font2] text-base sm:text-lg md:text-xl text-[#c8c8c8]/60 mb-3 sm:mb-4'>This is me.</div>
          <div className='h-[1.2px] w-full md:w-[85vw] lg:w-[60vw] bg-[#c8c8c8]/20'></div>
        </div>

        <div className='w-full md:ml-[10%] md:mr-[5%] flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-16'>
          <div className='font-[font1] text-xl sm:text-2xl md:text-2xl lg:text-4xl text-[#c8c8c8] md:w-1/3 lg:w-2/5 shrink-0'>
            Hi, I'm <span className='text-[#00f050]'>KESHAV GILHOTRA .</span>
          </div>
          <div className='flex flex-col gap-4 md:gap-6 font-[font2] text-sm sm:text-base md:text-lg text-[#c8c8c8]/70 flex-1'>
            <span className='w-full md:w-2/3'>I'm a full stack web developer dedicated to turning ideas into scalable and impactful digital solutions. I specialize in building end-to-end web applications that combine clean design, efficient backend logic, and seamless user experiences.</span>
            <span className='w-full md:w-2/3'>My approach focuses on developing robust, high-performing systems tailored to both user needs and business goals. By emphasizing performance, security, and maintainability, I strive to deliver applications that not only engage users but also drive real-world results.</span>
          </div>
        </div>

      </div>
      <Git/>
      <Stack />
    </div>
  )
}

export default About
