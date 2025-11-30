import React from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

const Song = ({ onClose }) => {
  useGSAP(() => {
    gsap.from('.song-modal', {
      scale: 0.9,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out'
    })
    gsap.from('.song-overlay', {
      opacity: 0,
      duration: 0.3
    })
  })

  return createPortal(
    <div className="song-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="song-modal bg-[#0a0a0a] p-6 rounded-2xl border border-[#c8c8c8]/10 w-full max-w-md m-4 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white font-[font1]">🎵 Now Playing</h2>
          <button 
            onClick={onClose}
            className="text-[#c8c8c8] hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="text-[#c8c8c8]/60 font-[font2]">
          <p>Detailed view coming soon...</p>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default Song