import { useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Utensils, Info, Phone, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const PremiumNavbar = ({ onCartClick }: { onCartClick: () => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();
  const { scrollY } = useScroll();

  // Optimized Scroll Animations with Spring for Fluidity
  const navScaleRaw = useTransform(scrollY, [0, 50], [1, 0.96]);
  const navScale = useSpring(navScaleRaw, { stiffness: 300, damping: 30 });
  
  const navBg = useTransform(scrollY, [0, 50], ['rgba(13, 13, 13, 0)', 'rgba(13, 13, 13, 0.9)']);
  const navBlur = useTransform(scrollY, [0, 50], [0, 20]);
  const navPadding = useTransform(scrollY, [0, 50], ['16px 32px', '10px 24px']);
  const navShadow = useTransform(scrollY, [0, 50], ['0 0 0 rgba(0,0,0,0)', '0 20px 50px rgba(0,0,0,0.5)']);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Menu', path: '/menu', icon: <Utensils size={18} /> },
    { name: 'About', path: '/about', icon: <Info size={18} /> },
    { name: 'Contact', path: '/contact', icon: <Phone size={18} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-4 md:p-6">
      <motion.div
        style={{ 
          backgroundColor: navBg,
          backdropFilter: useTransform(navBlur, (b) => `blur(${b}px)`),
          scale: navScale,
          padding: navPadding,
          boxShadow: navShadow
        }}
        className="w-full max-w-7xl flex items-center justify-between rounded-[2.5rem] border border-white/5 relative overflow-hidden"
      >
        {/* Border Glow Accent */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F5A623]/40 to-transparent" />
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group relative z-10">
          <motion.div 
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="w-10 h-10 bg-[#F5A623] rounded-xl flex items-center justify-center shadow-glow-primary relative overflow-hidden"
          >
            <span className="text-white font-black text-xl italic">I</span>
          </motion.div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-white tracking-tighter group-hover:text-[#F5A623] transition-colors leading-none">
              INTI <span className="text-[#F5A623]">RUCHI</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/5">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path}>
              <motion.div
                whileHover={{ background: 'rgba(245, 166, 35, 0.1)' }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all ${
                  location.pathname === link.path 
                    ? 'bg-[#F5A623] text-white font-black shadow-lg' 
                    : 'text-white/40 hover:text-white'
                }`}
              >
                <span className="font-black text-[10px] uppercase tracking-widest">{link.name}</span>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1, background: 'rgba(245, 166, 35, 0.15)' }}
            whileTap={{ scale: 0.9 }}
            onClick={onCartClick}
            className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-[#F5A623] relative group"
          >
            <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#F5A623] text-[9px] flex items-center justify-center rounded-full text-white font-black shadow-glow-primary ring-2 ring-[#0D0D0D]">
                {totalItems}
              </span>
            )}
          </motion.button>
          
          <Link to="/login" className="hidden lg:block">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(245, 166, 35, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3.5 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#F5A623] hover:text-white transition-all"
            >
              Sign In
            </motion.button>
          </Link>

          <button 
            className="md:hidden p-3 text-white/40 hover:text-white"
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-28 left-6 right-6 md:hidden bg-[#1A1A1A] border border-white/10 rounded-[2.5rem] p-8 z-50 shadow-2xl backdrop-blur-3xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)}>
                  <div className={`flex items-center justify-between p-5 rounded-2xl ${
                    location.pathname === link.path ? 'bg-[#F5A623] text-white font-black' : 'bg-white/5 text-white/40'
                  }`}>
                    <span className="font-black uppercase tracking-widest text-xs">{link.name}</span>
                    {link.icon}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default PremiumNavbar;
