import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-20 relative z-20 border-t border-white/10 bg-black/60">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-12 md:space-y-0">
          
          {/* Logo & Info */}
          <div className="flex flex-col space-y-4 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
               <span className="text-xl font-bold tracking-widest text-white leading-none">DECCAN LEAF</span>
               <span className="text-[10px] tracking-[0.3em] text-white/60 font-medium">VARI VINDHU MARYADA</span>
            </div>
            <p className="text-white/30 text-xs leading-relaxed max-w-[200px]">
               Authentic Andhra cuisine celebrating the flavors of the Deccan region.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-10">
            {['Menu', 'About', 'Contact', 'Privacy'].map((link) => (
              <a key={link} href="#" className="text-sm font-medium tracking-widest text-white/50 hover:text-white transition-colors">
                 {link.toUpperCase()}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex flex-col items-center md:items-end space-y-2">
             <span className="text-white/20 text-[10px] uppercase tracking-widest">© 2026 The Deccan Leaf</span>
             <span className="text-white/10 text-[8px] uppercase tracking-widest">Designed for Fine Dining</span>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
