import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const VisitorSubtle = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/visitor/count`);
        const data = await res.json();
        if (data && typeof data.visitorCount === 'number') {
          setCount(data.visitorCount);
        }
      } catch (err) {
        // Silently fail
      }
    };
    fetchCount();
  }, []);

  if (count === null) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      transition={{ duration: 2 }}
      className="fixed bottom-6 right-6 z-0 select-none pointer-events-none hidden lg:block"
    >
      <div className="flex flex-col items-end font-mono text-[10px] uppercase tracking-[0.3em] gap-1">
        <span className="opacity-50">System Logs</span>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 animate-pulse" />
          <span>VSTR_CNT: {count.toString().padStart(6, '0')}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default VisitorSubtle;
