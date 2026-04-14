import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen w-full flex items-center overflow-hidden pt-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row h-full">
        {/* Left Panel: 52% */}
        <div className="w-full lg:w-[52%] flex flex-col justify-center space-y-8 py-20 z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col space-y-4"
          >
            <div className="flex flex-wrap gap-3">
              <span className="feature-pill">Authentic Andhra Cuisine</span>
              <span className="feature-pill">Seafood Specials</span>
              <span className="feature-pill">Traditional Recipes</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl leading-[0.9] font-medium text-white tracking-tighter">
              Authentic<br />
              <span className="italic-emphasis font-light opacity-80">Andhra</span>
            </h1>
            <h2 className="text-3xl md:text-5xl font-light text-white/70 tracking-tight">
              Flavors of <span className="italic-emphasis">Inti Ruchi Bhojanam</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/50 max-w-xl leading-relaxed"
          >
            Traditional recipes crafted with spices, heritage cooking techniques, 
            and the warmth of Andhra hospitality. Experience the soul of 
            the Deccan region.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 pt-6"
          >
            <a href="#menu" className="primary-btn text-center">Explore Menu</a>
          </motion.div>
        </div>

        {/* Right Panel: 48% (Hidden on mobile) */}
        <div className="hidden lg:flex flex-1 items-center justify-center relative z-10 perspective-1000">
           <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
              className="liquid-glass-strong w-[450px] aspect-[4/5] rounded-[40px] overflow-hidden relative shadow-[0_0_100px_rgba(255,255,255,0.05)] border-white/20 p-2"
           >
              <div className="w-full h-full rounded-[36px] overflow-hidden relative">
                <img 
                  src="/assets/andhra-thali.png" 
                  alt="Andhra Thali" 
                  className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-bottom p-10">
                   <div className="mt-auto">
                      <p className="italic-emphasis text-2xl text-white">"Tradition served<br /> on every plate."</p>
                   </div>
                </div>
              </div>
           </motion.div>
           
           {/* Floating elements */}
           <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[15%] -right-[5%] liquid-glass px-6 py-4 rounded-2xl border-white/30 backdrop-blur-md"
           >
              <span className="text-white font-medium text-lg leading-tight block">50+ <br/><span className="text-white/50 text-xs uppercase tracking-widest">Traditional Dishes</span></span>
           </motion.div>

           <motion.div
              animate={{ 
                y: [0, 20, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[20%] -left-[10%] liquid-glass-strong px-6 py-4 rounded-2xl border-white/30 backdrop-blur-xl"
           >
              <span className="text-white font-medium text-lg leading-tight block">20+ <br/><span className="text-white/50 text-xs uppercase tracking-widest">Seafood Specials</span></span>
           </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
