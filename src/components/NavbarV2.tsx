import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ShoppingBag, Menu, X, User, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const NavbarV2 = ({ onCartClick }: { onCartClick: () => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();
  const { scrollY } = useScroll();

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '#menu' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-8 pointer-events-none">
      <motion.div 
        animate={{ 
          y: isScrolled ? 0 : 0,
          scale: isScrolled ? 0.96 : 1,
          padding: isScrolled ? '1rem 1.5rem' : '1.5rem 2rem'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`container mx-auto flex justify-between items-center rounded-[2.5rem] border transition-all duration-500 pointer-events-auto ${
          isScrolled 
          ? 'bg-black/60 backdrop-blur-3xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' 
          : 'bg-transparent border-transparent'
        }`}
      >
        {/* LOGO */}
        <Link to="/" className="flex flex-col group">
          <span className="text-xl font-black italic tracking-tighter text-white leading-none group-hover:text-amber-500 transition-colors">
            INTI RUCHI
          </span>
          <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30 group-hover:text-amber-500/50 transition-colors">
            Bhojanam
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors relative group"
            >
              {link.name}
              <motion.div 
                className="absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-500 transition-all group-hover:w-full"
              />
            </Link>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          {token ? (
            <div className="hidden md:flex items-center gap-6 mr-4 border-r border-white/10 pr-6">
              {user.role === 'admin' && (
                <Link to="/admin" className="text-[9px] font-black uppercase tracking-widest text-amber-500 hover:text-amber-400">Admin</Link>
              )}
              <button onClick={handleLogout} className="text-[9px] font-black uppercase tracking-widest text-red-500/60 hover:text-red-400">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="hidden md:flex items-center gap-2 mr-4 text-white/40 hover:text-white transition-all group">
              <User size={14} className="group-hover:text-amber-500" />
              <span className="text-[9px] font-black uppercase tracking-widest">Sign In</span>
            </Link>
          )}

          <button
            onClick={onCartClick}
            className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-amber-500 relative group hover:bg-amber-500 hover:text-white transition-all"
          >
            <motion.div
              key={totalItems}
              animate={totalItems > 0 ? { scale: [1, 1.2, 1] } : {}}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            >
              <ShoppingBag size={18} />
            </motion.div>
            
            {totalItems > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 bg-white text-black text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-xl ring-2 ring-black"
              >
                {totalItems}
              </motion.span>
            )}
          </button>

          <button 
            className="md:hidden p-3.5 rounded-2xl bg-white/5 border border-white/10 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-[#050505] md:hidden flex flex-col p-12 pointer-events-auto"
          >
            <div className="flex justify-between items-center mb-24">
               <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col">
                <span className="text-2xl font-black italic tracking-tighter text-white uppercase">INTI RUCHI</span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Bhojanam</span>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-4 rounded-2xl bg-white/5 text-white">
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-12">
              {navLinks.map((link, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={link.name}
                >
                  <Link
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-5xl font-black italic uppercase tracking-tighter text-white/40 hover:text-amber-500 transition-colors flex items-center justify-between group"
                  >
                    {link.name}
                    <ChevronRight size={32} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pt-12 border-t border-white/5 flex flex-col gap-8">
               {token ? (
                <button onClick={handleLogout} className="text-2xl font-black italic uppercase tracking-tighter text-red-500/60 text-left">Logout</button>
              ) : (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black italic uppercase tracking-tighter text-white/40">Sign In</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavbarV2;
