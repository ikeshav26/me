import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { SiBun } from 'react-icons/si';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const routes = [
  { path: '/about', label: 'About' },
  { path: '/work', label: 'Work' },
  { path: '/blogs', label: 'Blogs' },
  { path: '/guestbook', label: 'Guestbook' },
];

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <header className="absolute top-5 rounded-full inset-x-0 w-full flex justify-between items-center pt-4 pb-4 px-4 md:px-8 max-w-4xl mx-auto z-100">
        <NavLink
          to="/"
          className="p-2 transition-all duration-300 group z-101"
          title="Stats / Home"
        >
          <SiBun className={`w-7 h-7 transition-colors duration-300 ${
            location.pathname === '/' 
              ? 'text-orange-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]' 
              : 't-primary group-hover:t-secondary'
          }`} />
        </NavLink>

        <nav className="hidden md:flex items-center gap-8 md:gap-10 text-[18px] font-['JetBrains_Mono'] tracking-tight">
          {routes.map((route) => {
            const isActive = location.pathname === route.path;
            
            return (
              <NavLink
                key={route.path}
                to={route.path}
                className={`relative transition-colors duration-300 py-1 ${
                  isActive ? 't-primary' : 't-dim hover:t-secondary'
                }`}
              >
                {route.label}
                {isActive && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute -bottom-1 left-0 w-full h-[1.5px]" style={{ background: 'var(--text-primary)' }}
                    initial={false}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-4 z-101">
          <button
            onClick={toggleTheme}
            className="relative text-(--nav-inactive) hover:text-(--nav-active) transition-colors cursor-pointer p-2"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <AnimatePresence mode="wait">
              {theme === 'dark' ? (
                <motion.div key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Moon className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div key="sun" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Sun className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          
          <button 
            className="md:hidden t-dim hover:t-primary transition-colors p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-[72px] right-4 w-56 backdrop-blur-2xl rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.3)] z-90 overflow-hidden md:hidden flex flex-col p-2 gap-1" style={{ background: 'color-mix(in srgb, var(--bg-primary) 80%, transparent)', border: '1px solid var(--border-primary)' }}
          >
            {routes.map((route, i) => {
              const isActive = location.pathname === route.path;
              return (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  key={route.path}
                >
                  <NavLink
                    to={route.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? 'font-medium shadow-sm t-primary' 
                        : 't-muted hover:t-primary border border-transparent'
                    }`}
                  >
                    <span className="font-['JetBrains_Mono'] tracking-tight text-lg">{route.label}</span>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                    )}
                  </NavLink>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;