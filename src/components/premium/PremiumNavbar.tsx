import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Search, Flame } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const PremiumNavbar = ({ onCartClick }: { onCartClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HERITAGE', path: '/' },
    { name: 'CUISINE', path: '/menu' },
    { name: 'SPECIALS', path: '#specials' },
    { name: 'STORY', path: '/about' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
      isScrolled ? 'py-4 glass-nav' : 'py-8 bg-transparent'
    }`}>
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E67E22] to-[#D4AF37] flex items-center justify-center text-white shadow-lg group-hover:rotate-[360deg] transition-transform duration-1000">
            <Flame size={20} fill="currentColor" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-white uppercase italic leading-none">
              Inti <span className="text-[#E67E22]">Ruchi</span>
            </span>
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30">Bhojanam</span>
          </div>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative group ${
                location.pathname === link.path ? 'text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              {link.name}
              <motion.div 
                layoutId="nav-underline"
                className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-[#E67E22] ${
                  location.pathname === link.path ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                } transition-all duration-300`}
              />
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <button className="text-white/40 hover:text-white transition-colors">
            <Search size={20} />
          </button>
          
          <button 
            onClick={onCartClick}
            className="relative group p-2"
          >
            <ShoppingBag size={22} className="text-[#D4AF37] group-hover:scale-110 transition-transform" />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-[#E67E22] text-white text-[9px] font-black flex items-center justify-center rounded-full ring-2 ring-[#0F0D0C]"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <Link to="/login" className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 transition-all">
            <User size={16} className="text-[#E67E22]" />
            <span className="text-[9px] font-black uppercase tracking-widest">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default PremiumNavbar;
