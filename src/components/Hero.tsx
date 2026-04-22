import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, Star, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax Scroll Values
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  // v4 Interactive Mouse Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 25 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

  const handleMouseMove = (e: React.MouseEvent) => {
    x.set(e.clientX / window.innerWidth - 0.5);
    y.set(e.clientY / window.innerHeight - 0.5);
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const staggerItem = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex items-center overflow-hidden pt-12 pb-20"
    >
      {/* Background Lighting System */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50" />
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="noise-bg opacity-[0.03]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row h-full relative z-10">
        {/* Left Panel - Staggered v4 Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="w-full lg:w-[55%] flex flex-col justify-center space-y-10 py-20 z-20"
        >
          <motion.div variants={staggerItem} className="flex flex-wrap gap-4">
            <div className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
              <Sparkles size={14} className="animate-pulse" />
              <span>Andhra Heritage</span>
            </div>
          </motion.div>
          
          <motion.div variants={staggerItem} className="space-y-4">
            <h1 className="text-7xl md:text-[6.5rem] leading-[0.85] font-black text-white tracking-tighter">
              Authentic<br />
              <span className="text-gradient drop-shadow-[0_0_30px_rgba(245,158,11,0.2)] italic font-light">Andhra</span>
            </h1>
            <h2 className="text-3xl md:text-5xl font-light text-white/50 tracking-tight">
              Flavors of <span className="text-white font-bold">Inti Ruchi Bhojanam</span>
            </h2>
          </motion.div>

          <motion.p variants={staggerItem} className="text-lg md:text-xl text-white/40 max-w-xl leading-relaxed font-medium">
            Traditional recipes crafted with spices, heritage cooking techniques, 
            and the warmth of Andhra hospitality. Experience the soul of 
            the Deccan region.
          </motion.p>

          <motion.div variants={staggerItem} className="flex flex-wrap gap-8 pt-4">
            <motion.a 
              href="#menu" 
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(245, 158, 11, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white text-dark-900 rounded-2xl font-black text-lg tracking-widest uppercase shadow-2xl flex items-center gap-3 hover:bg-primary hover:text-white transition-all"
            >
              Explore Menu <ArrowRight size={20} />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Panel - v4 Interactive 3D Visual */}
        <div className="hidden lg:flex flex-1 items-center justify-center relative perspective-1000">
           <motion.div
              style={{ rotateX, rotateY, y: y1, transformStyle: 'preserve-3d' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
           >
              {/* Background Glow */}
              <div className="absolute inset-[-10%] bg-primary/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div 
                style={{ transform: 'translateZ(80px)' }}
                className="w-[480px] aspect-[4/5] rounded-[4rem] bg-gradient-to-tr from-white/10 to-transparent p-px shadow-3d-lg relative overflow-hidden"
              >
                 <div className="w-full h-full rounded-[4rem] bg-dark-900 overflow-hidden relative border border-white/5">
                   <img 
                     src="/assets/andhra-thali.png" 
                     alt="Andhra Thali" 
                     className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-125"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-80" />
                   
                   <div className="absolute bottom-12 left-12 right-12">
                      <p className="text-3xl font-light text-white leading-tight italic drop-shadow-lg">
                        "Tradition served<br /> on every plate."
                      </p>
                   </div>
                 </div>
              </div>

              {/* v4 Floating Badges with High Depth */}
              <motion.div
                 style={{ y: y2, transform: 'translateZ(120px)' }}
                 animate={{ y: [0, -15, 0] }}
                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute -top-10 -right-10 p-8 glass-card border-white/10 rounded-[2.5rem] shadow-2xl backdrop-blur-2xl"
              >
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-glow-primary">
                       <Star size={24} fill="currentColor" />
                    </div>
                    <div>
                       <span className="text-2xl font-black text-white">50+</span>
                       <span className="text-[10px] text-white/30 font-black uppercase tracking-widest block mt-1">Dishes</span>
                    </div>
                 </div>
              </motion.div>

              <motion.div
                 style={{ y: y1, transform: 'translateZ(100px)' }}
                 animate={{ y: [0, 15, 0] }}
                 transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                 className="absolute bottom-20 -left-16 p-8 glass-card border-white/10 rounded-[2.5rem] shadow-2xl backdrop-blur-2xl"
              >
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-white">
                       <Sparkles size={24} />
                    </div>
                    <div>
                       <span className="text-2xl font-black text-white">20+</span>
                       <span className="text-[10px] text-white/30 font-black uppercase tracking-widest block mt-1">Specials</span>
                    </div>
                 </div>
              </motion.div>
           </motion.div>
        </div>
      </div>
      
      {/* v4 Scroll Progress Line */}
      <motion.div 
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/10"
      >
        <span className="text-[8px] font-black uppercase tracking-[1em]">Explore</span>
        <div className="w-px h-16 bg-gradient-to-b from-primary/40 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
