import React from 'react'
import { GiTwirlyFlower } from 'react-icons/gi'


const Heading = ({text}) => {
  const MarqueeContent = () => (
    <>
      <div className='flex gap-4 sm:gap-6 items-center mx-8 sm:mx-12'>
        <div className='w-2 h-2 bg-[#00f050] rounded-full animate-pulse'></div>
        <GiTwirlyFlower className='icon w-5 h-5 sm:w-6 sm:h-6 text-[#00f050] drop-shadow-[0_0_8px_rgba(0,240,80,0.5)]' />
        <span className='whitespace-nowrap tracking-[0.3em] font-semibold'>{text}</span>
        <GiTwirlyFlower className='icon w-5 h-5 sm:w-6 sm:h-6 text-[#00f050] drop-shadow-[0_0_8px_rgba(0,240,80,0.5)]' />
        <div className='w-2 h-2 bg-[#00f050] rounded-full animate-pulse'></div>
      </div>
    </>
  )

  return (
    <div className='relative w-full overflow-hidden py-4 sm:py-6 mb-6 sm:mb-8'>
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        @keyframes glow-pulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(0, 240, 80, 0.3), inset 0 0 20px rgba(0, 240, 80, 0.1);
          }
          50% {
            box-shadow: 0 0 40px rgba(0, 240, 80, 0.5), inset 0 0 30px rgba(0, 240, 80, 0.2);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 30s linear infinite;
        }
        .marquee-glow {
          animation: glow-pulse 3s ease-in-out infinite;
        }
        .marquee-gradient-left {
          background: linear-gradient(to right, #000000 0%, transparent 15%);
        }
        .marquee-gradient-right {
          background: linear-gradient(to left, #000000 0%, transparent 15%);
        }
        .icon {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      
      <div className='relative mb-3 sm:mb-4 overflow-hidden'>
        <div className='bg-gradient-to-r from-[#1a1a1a] via-[#2c2c2c] to-[#1a1a1a] w-full h-14 sm:h-16 md:h-18 -rotate-1 overflow-hidden relative marquee-glow border-y border-[#00f050]/30 backdrop-blur-sm'>
          <div className='absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(0,240,80,0.05)_50%,transparent_100%)]'></div>
          <div className='absolute inset-0 flex items-center'>
            <div className='flex animate-marquee font-[font1] text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#00f050] uppercase'>
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

          <div className='absolute left-0 top-0 w-32 h-full marquee-gradient-left pointer-events-none z-10'></div>
          <div className='absolute right-0 top-0 w-32 h-full marquee-gradient-right pointer-events-none z-10'></div>
        </div>
      </div>
      

      <div className='relative overflow-hidden'>
        <div className='bg-gradient-to-r from-[#1a1a1a] via-[#2c2c2c] to-[#1a1a1a] w-full h-14 sm:h-16 md:h-18 rotate-1 overflow-hidden relative marquee-glow border-y border-[#00f050]/30 backdrop-blur-sm'>
          <div className='absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(0,240,80,0.05)_50%,transparent_100%)]'></div>
          <div className='absolute inset-0 flex items-center'>
            <div className='flex animate-marquee-reverse font-[font1] text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#00f050] uppercase'>
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

          <div className='absolute left-0 top-0 w-32 h-full marquee-gradient-left pointer-events-none z-10'></div>
          <div className='absolute right-0 top-0 w-32 h-full marquee-gradient-right pointer-events-none z-10'></div>
        </div>
      </div>
    </div>
  )
}

export default Heading