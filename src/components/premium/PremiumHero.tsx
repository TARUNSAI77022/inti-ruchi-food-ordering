import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, Play, Star, UtensilsCrossed } from 'lucide-react';

const PremiumHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // High-Performance Parallax
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 90]);

  // v4 Interactive Mouse Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });
  
  const heroRotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['4deg', '-4deg']);
  const heroRotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-4deg', '4deg']);

  const handleMouseMove = (e: React.MouseEvent) => {
    x.set(e.clientX / window.innerWidth - 0.5);
    y.set(e.clientY / window.innerHeight - 0.5);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-24 z-10"
    >
      {/* Background System - Integrated with Home.tsx */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="noise-bg opacity-[0.03]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Left Content - v4 Staggered Entrance */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-20 space-y-8 md:space-y-12"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-black uppercase tracking-[0.4em] shadow-xl backdrop-blur-xl"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>Award Winning Culinary Art</span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-[8rem] font-black text-white leading-[0.85] tracking-tighter"
          >
            Savor the <br />
            <span className="text-gradient drop-shadow-[0_0_50px_rgba(245,158,11,0.3)]">Dimension.</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-2xl text-white/50 max-w-xl leading-relaxed font-medium"
          >
            We don't just serve food; we craft interactive experiences that blur the line between culinary art and digital dimension.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center gap-6 md:gap-8"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(245, 158, 11, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 md:px-14 md:py-6 bg-primary text-white rounded-[2rem] font-black text-xl flex items-center gap-4 overflow-hidden shadow-3d-lg transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              Explore Menu <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, background: 'rgba(255, 255, 255, 0.05)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-5 md:px-10 md:py-6 rounded-[2rem] border border-white/10 text-white font-black text-xl flex items-center gap-4 backdrop-blur-xl transition-all group"
            >
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary transition-all">
                <Play size={24} className="fill-white ml-1" />
              </div>
              The Story
            </motion.button>
          </motion.div>

          {/* Stats Overlay */}
          <motion.div 
            variants={itemVariants}
            className="pt-10 border-t border-white/5 flex items-center gap-12"
          >
            <div className="flex flex-col">
               <span className="text-4xl font-black text-white">50k+</span>
               <span className="text-[10px] text-white/30 font-black uppercase tracking-widest mt-1">Foodies</span>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="flex flex-col">
               <span className="text-4xl font-black text-white">4.9/5</span>
               <span className="text-[10px] text-white/30 font-black uppercase tracking-widest mt-1">Rating</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Visual - v4 Interactive 3D Scene */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as any }}
          className="relative perspective-1000 hidden lg:block"
        >
          {/* Main Hero Card with Mouse Tilt */}
          <motion.div 
            style={{ 
              rotateX: heroRotateX, 
              rotateY: heroRotateY, 
              y: y1,
              transformStyle: 'preserve-3d' 
            }}
            className="relative z-10 group"
          >
            <div className="absolute inset-[-20%] bg-primary/20 blur-[150px] rounded-full scale-50 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-1000" />
            
            <div 
              style={{ transform: 'translateZ(100px)' }}
              className="w-[500px] h-[500px] xl:w-[580px] xl:h-[580px] rounded-[5rem] bg-gradient-to-tr from-white/10 to-transparent p-px shadow-[0_50px_100px_rgba(0,0,0,0.6)] relative overflow-hidden"
            >
               <div className="absolute inset-0 bg-dark-900 rounded-[5rem] overflow-hidden">
                  <motion.img 
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90" 
                    alt="Hero Dish" 
                    className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-115"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-80" />
               </div>
            </div>

            {/* Interactive Overlay Badge */}
            <motion.div 
              style={{ transform: 'translateZ(150px)' }}
              className="absolute -bottom-8 -left-8 xl:-bottom-12 xl:-left-12 p-8 xl:p-10 glass-card border-white/10 rounded-[3rem] shadow-[0_40px_80px_rgba(0,0,0,0.7)] max-w-[260px] xl:max-w-[300px]"
            >
               <div className="flex items-center gap-5 mb-4">
                 <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white shadow-glow-primary">
                    {React.cloneElement(<UtensilsCrossed />, { size: 36 } as any)}
                 </div>
                 <div>
                   <h4 className="text-2xl font-black text-white leading-none tracking-tighter">Michelin</h4>
                   <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] mt-2">Certified 2026</p>
                 </div>
               </div>
               <p className="text-white/60 text-xs leading-relaxed font-medium italic">
                 "A breathtaking fusion of modern interaction and traditional flavors."
               </p>
            </motion.div>
          </motion.div>

          {/* Floating Parallax Elements */}
          <motion.img 
            style={{ y: y2, rotate, x: useTransform(mouseXSpring, [-0.5, 0.5], [-40, 40]) }}
            src="https://pngimg.com/uploads/spinach/spinach_PNG10.png" 
            className="absolute top-0 -right-10 w-48 h-48 object-contain filter drop-shadow-[0_40px_60px_rgba(0,0,0,0.8)] z-20"
          />
          
          <motion.div
            style={{ y: y1, rotate: -15, x: useTransform(mouseXSpring, [-0.5, 0.5], [30, -30]) }}
            className="absolute top-[20%] -left-20 w-36 h-36 glass-card border-white/10 rounded-[2.5rem] flex items-center justify-center text-primary animate-float z-20 shadow-3d-lg"
          >
             <Star size={56} fill="currentColor" />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/10"
      >
        <span className="text-[10px] uppercase tracking-[0.8em] font-black">Scroll</span>
        <div className="w-[2px] h-24 bg-gradient-to-b from-primary/40 to-transparent rounded-full overflow-hidden">
           <motion.div 
              animate={{ y: [0, 96] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-8 bg-primary/60 blur-sm"
           />
        </div>
      </motion.div>
    </section>
  );
};

export default PremiumHero;
