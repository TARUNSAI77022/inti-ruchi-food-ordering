import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ShoppingCart, Menu, X, Home, Utensils, Info, Phone, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const PremiumNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();
  const { scrollY } = useScroll();

  // v4: Smooth values for scaling and blur
  const navScale = useTransform(scrollY, [0, 100], [1, 0.95]);
  const navBlur = useTransform(scrollY, [0, 100], [0, 10]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Menu', path: '/menu', icon: <Utensils size={18} /> },
    { name: 'About', path: '/about', icon: <Info size={18} /> },
    { name: 'Contact', path: '/contact', icon: <Phone size={18} /> },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-nav transition-all duration-700 flex justify-center p-4 ${isScrolled ? 'pt-2' : 'pt-6'}`}>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ scale: navScale }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full max-w-6xl flex items-center justify-between px-6 py-3 rounded-[2rem] border border-white/5 shadow-2xl transition-all duration-500 relative overflow-hidden ${
          isScrolled ? 'bg-dark-900/40 backdrop-blur-2xl' : 'bg-transparent backdrop-blur-sm'
        }`}
      >
        {/* Animated Background Pulse */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 opacity-50" />

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group relative z-10">
          <motion.div 
            whileHover={{ rotate: 180, scale: 1.1 }}
            className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-glow-primary overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
            <span className="text-white font-black text-xl italic">I</span>
          </motion.div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-white tracking-tighter group-hover:text-primary transition-colors leading-none">
              INTI <span className="text-primary-light">RUCHI</span>
            </span>
            <span className="text-[8px] font-black text-white/20 tracking-[0.4em] uppercase leading-none mt-1">Bhojanam</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 relative z-10 bg-white/5 p-1 rounded-2xl border border-white/5 backdrop-blur-xl">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path}>
              <motion.div
                whileHover={{ y: -1, background: 'rgba(255,255,255,0.05)' }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-300 ${
                  location.pathname === link.path 
                    ? 'bg-white text-dark-900 font-black shadow-lg' 
                    : 'text-white/40 hover:text-white'
                }`}
              >
                <span className="font-bold text-xs uppercase tracking-widest">{link.name}</span>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 relative z-10">
          <motion.button
            whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/50 hover:text-white transition-all"
          >
            <Search size={18} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, background: 'rgba(245, 158, 11, 0.1)' }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/50 hover:text-primary transition-all relative"
          >
            <ShoppingCart size={18} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-[10px] flex items-center justify-center rounded-full text-white font-black shadow-lg ring-2 ring-dark-900">
                {totalItems}
              </span>
            )}
          </motion.button>
          
          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(245, 158, 11, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white text-dark-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hidden md:block hover:bg-primary hover:text-white transition-all"
            >
              Sign In
            </motion.button>
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-3 text-white/50 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute top-28 left-4 right-4 md:hidden glass-card border-white/10 rounded-[2.5rem] overflow-hidden p-6 z-40 shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className={`flex items-center justify-between p-4 rounded-2xl transition-all ${
                    location.pathname === link.path ? 'bg-primary text-white font-black' : 'bg-white/5 text-white/40 hover:bg-white/10'
                  }`}>
                    <span className="font-bold uppercase tracking-widest">{link.name}</span>
                    {link.icon}
                  </div>
                </Link>
              ))}
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="mt-4 p-5 bg-white text-dark-900 rounded-2xl text-center font-black uppercase tracking-widest shadow-lg">
                  Sign In
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default PremiumNavbar;
