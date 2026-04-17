import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu as MenuIcon, X, MapPin, Phone, User, ShoppingBag } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    console.log("User logging out. Clearing session...");
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload(); // Force reload to clear all states
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Menu', href: '/#menu' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'py-4 backdrop-blur-lg bg-black/40 border-b border-white/10' : 'py-8 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="flex flex-col">
          <span className="text-xl font-bold tracking-widest text-white leading-none">INTI RUCHI BHOJANAM</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-sm font-medium tracking-widest text-white/80 hover:text-white transition-colors"
            >
              {link.name.toUpperCase()}
            </Link>
          ))}
          
          {token ? (
            <div className="flex items-center space-x-6 border-l border-white/10 pl-12">
              {user.role === 'admin' && (
                <Link to="/admin" className="text-sm font-bold tracking-widest text-white hover:text-white/80 transition-colors uppercase">Admin</Link>
              )}
              <button onClick={handleLogout} className="text-sm font-medium tracking-widest text-red-400 hover:text-red-300 transition-colors uppercase">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center space-x-2 text-sm font-medium tracking-widest text-white/60 hover:text-white transition-colors">
              <User size={16} />
              <span className="uppercase">Login</span>
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-white/10 py-12 px-6 md:hidden flex flex-col space-y-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-light tracking-widest text-white/70 hover:text-white uppercase"
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pt-8 border-t border-white/10 flex flex-col space-y-6">
              {token ? (
                <>
                  {user.role === 'admin' && <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold tracking-widest text-white">ADMIN</Link>}
                  <button onClick={handleLogout} className="text-2xl font-light tracking-widest text-red-400 text-left">LOGOUT</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-light tracking-widest text-white/70">LOGIN</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

