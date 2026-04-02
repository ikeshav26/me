import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Moon, Terminal } from 'lucide-react';

const routes = [
  { path: '/about', label: 'About', activeColor: 'text-white', underlineColor: 'bg-white' },
  { path: '/work', label: 'Work', activeColor: 'text-white', underlineColor: 'bg-white' },
  { path: '/blogs', label: 'Blogs', activeColor: 'text-white', underlineColor: 'bg-white' },
  { path: '/guestbook', label: 'Guestbook', activeColor: 'text-white', underlineColor: 'bg-white' },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="fixed top-0 inset-x-0 w-full flex justify-between items-center pt-10 pb-6 px-4 md:px-8 max-w-4xl mx-auto z-50">
      <NavLink
        to="/"
        className="p-2 transition-all duration-300 group"
        title="Stats / Home"
      >
        <Terminal className={`w-6 h-6 transition-colors duration-300 ${
          location.pathname === '/' 
            ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]' 
            : 'text-neutral-500 group-hover:text-neutral-200'
        }`} />
      </NavLink>

      <nav className="flex items-center gap-8 md:gap-10 text-[18px] font-['JetBrains_Mono'] tracking-tight">
        {routes.map((route) => {
          const isActive = location.pathname === route.path;
          
          return (
            <NavLink
              key={route.path}
              to={route.path}
              className={`relative transition-colors duration-300 py-1 ${
                isActive ? route.activeColor : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {route.label}
              {isActive && (
                <motion.div
                  layoutId="navbar-underline"
                  className={`absolute -bottom-1 left-0 w-full h-[1.5px] ${route.underlineColor}`}
                  initial={false}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </NavLink>
          );
        })}
      </nav>

      <button className="text-neutral-500 hover:text-white transition-colors cursor-pointer p-2">
        <Moon className="w-5 h-5" />
      </button>
      
    </header>
  );
};

export default Navbar;