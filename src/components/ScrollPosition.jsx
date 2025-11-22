import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const ScrollPosition = ({ locomotiveScroll }) => {
    const [height, setHeight] = useState(0);

    useEffect(() => {
      if (!locomotiveScroll) return;

      const updateProgress = (obj) => {
        const scrollProgress = (obj.scroll.y / obj.limit.y) * 100;
        setHeight(Math.min(Math.max(scrollProgress, 0), 100));
      };

      locomotiveScroll.on('scroll', updateProgress);

      return () => {
        locomotiveScroll.off('scroll', updateProgress);
      };
    }, [locomotiveScroll]);

  return (
    <div className='fixed w-2 h-32 rounded-full top-1/2 -translate-y-1/2 right-7 bg-[#2c2c2c] z-10 overflow-hidden'>
        <div className='bg-[#00f050] w-full rounded-full transition-[height] duration-100 ease-out' style={{ height: `${height}%` }}></div>
    </div>
  )
}

export default ScrollPosition