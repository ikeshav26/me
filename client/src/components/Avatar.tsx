import { useState } from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  className?: string;
}

const Avatar = ({ src, alt, className = "" }: AvatarProps) => {
  const [error, setError] = useState(false);
  
  if (error || !src) {
    return (
      <div className={`${className} flex items-center justify-center bg-orange-300 text-gray-950 font-bold text-[10px] sm:text-xs overflow-hidden`}>
        {alt.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      onError={() => setError(true)}
      referrerPolicy="no-referrer"
    />
  );
};

export default Avatar;
