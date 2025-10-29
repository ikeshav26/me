import React, { useRef } from 'react'
import { GiTwirlyFlower } from 'react-icons/gi'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'


const Heading = ({text}) => {
  const marquee1Ref = useRef(null)
  const marquee2Ref = useRef(null)
  const iconsRef = useRef([])
  const glowRef = useRef([])

  useGSAP(() => {

    gsap.to(marquee1Ref.current, {
      xPercent: -50,
      duration: 30,
      ease: 'none',
      repeat: -1
    })


    gsap.to(marquee2Ref.current, {
      xPercent: 50,
      duration: 30,
      ease: 'none',
      repeat: -1
    })

    iconsRef.current.forEach(icon => {
      if (icon) {
        gsap.to(icon, {
          rotation: 360,
          duration: 8,
          ease: 'none',
          repeat: -1
        })
      }
    })


    glowRef.current.forEach(glow => {
      if (glow) {
        gsap.to(glow, {
          boxShadow: '0 0 40px rgba(0, 240, 80, 0.5), inset 0 0 30px rgba(0, 240, 80, 0.2)',
          duration: 1.5,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: -1
        })
      }
    })
  })

  const MarqueeContent = () => (
    <>
      <div className='flex gap-4 sm:gap-6 items-center mx-8 sm:mx-12'>
        <GiTwirlyFlower 
          ref={el => iconsRef.current.push(el)} 
          className='w-5 h-5 sm:w-6 sm:h-6 text-[#00f050]' 
        />
        <span className='whitespace-nowrap tracking-[0.3em] font-semibold'>{text}</span>
        <GiTwirlyFlower 
          ref={el => iconsRef.current.push(el)} 
          className='w-5 h-5 sm:w-6 sm:h-6 text-[#00f050]' 
        />
      </div>
    </>
  )

  return (
    <div className='relative w-full overflow-hidden py-3 sm:py-4 md:py-5 mb-6 sm:mb-8 md:mb-10'>
      
      <div className='relative mb-2 sm:mb-3 overflow-hidden'>
        <div 
          ref={el => glowRef.current[0] = el}
          className='bg-gradient-to-r from-[#1a1a1a] via-[#2c2c2c] to-[#1a1a1a] w-full h-10 sm:h-12 md:h-14 lg:h-16 -rotate-1 overflow-hidden relative border-y border-[#00f050]/30'
          style={{boxShadow: '0 0 20px rgba(0, 240, 80, 0.3), inset 0 0 20px rgba(0, 240, 80, 0.1)'}}
        >
          <div className='absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(0,240,80,0.05)_50%,transparent_100%)]'></div>
          <div className='absolute inset-0 flex items-center'>
            <div ref={marquee1Ref} className='flex font-[font1] text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-[#00f050] uppercase'>
              <MarqueeContent />
              <MarqueeContent />
              <MarqueeContent />
              <MarqueeContent />
              <MarqueeContent />
              <MarqueeContent />
              <MarqueeContent />
              <MarqueeContent />
              <MarqueeContent />
              <MarqueeContent />
            </div>
          </div>

          <div className='absolute left-0 top-0 w-16 sm:w-24 md:w-32 h-full pointer-events-none z-10' style={{background: 'linear-gradient(to right, #000000 0%, transparent 15%)'}}></div>
          <div className='absolute right-0 top-0 w-16 sm:w-24 md:w-32 h-full pointer-events-none z-10' style={{background: 'linear-gradient(to left, #000000 0%, transparent 15%)'}}></div>
        </div>
      </div>
      

      <div className='relative overflow-hidden'>
        <div 
          ref={el => glowRef.current[1] = el}
          className='bg-gradient-to-r from-[#1a1a1a] via-[#2c2c2c] to-[#1a1a1a] w-full h-10 sm:h-12 md:h-14 lg:h-16 rotate-1 overflow-hidden relative border-y border-[#00f050]/30'
          style={{boxShadow: '0 0 20px rgba(0, 240, 80, 0.3), inset 0 0 20px rgba(0, 240, 80, 0.1)'}}
        >
          <div className='absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(0,240,80,0.05)_50%,transparent_100%)]'></div>
          <div className='absolute inset-0 flex items-center'>
            <div ref={marquee2Ref} className='flex font-[font1] text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-[#00f050] uppercase' style={{transform: 'translateX(-50%)'}}>
              <MarqueeContent />
              <MarqueeContent />
              <MarqueeContent />
              <MarqueeContent />
              <MarqueeContent />
              <MarqueeContent />
              <MarqueeContent />
              <MarqueeContent />
              <MarqueeContent />
              <MarqueeContent />
            </div>
          </div>

          <div className='absolute left-0 top-0 w-16 sm:w-24 md:w-32 h-full pointer-events-none z-10' style={{background: 'linear-gradient(to right, #000000 0%, transparent 15%)'}}></div>
          <div className='absolute right-0 top-0 w-16 sm:w-24 md:w-32 h-full pointer-events-none z-10' style={{background: 'linear-gradient(to left, #000000 0%, transparent 15%)'}}></div>
        </div>
      </div>
    </div>
  )
}

export default Heading