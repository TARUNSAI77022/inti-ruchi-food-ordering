import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxFoodGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={containerRef} className="py-40 relative z-20 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col space-y-32">
          {/* Large Parallax Row 1 */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
             <div className="w-full lg:w-[60%] h-[500px] md:h-[600px] overflow-hidden rounded-[60px] relative group liquid-glass-strong p-3">
                <motion.div style={{ y: y1 }} className="absolute inset-2 overflow-hidden rounded-[52px]">
                   <img 
                    src="/assets/andhra-thali.png" 
                    alt="Andhra Thali" 
                    className="w-full h-[140%] object-cover object-center grayscale-[0.3] group-hover:grayscale-0 transition-grayscale duration-[2s]" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-12">
                      <h4 className="text-4xl md:text-5xl font-light text-white tracking-tighter">Andhra Meals on <br/><span className="italic-emphasis">Banana Leaf</span></h4>
                      <p className="text-white/60 text-lg mt-4 max-w-sm">The soul of Andhra dining, served with tradition and love.</p>
                   </div>
                </motion.div>
             </div>
             
             <div className="w-full lg:w-[35%] h-[400px] overflow-hidden rounded-[40px] relative group liquid-glass p-2">
                <motion.div style={{ y: y2 }} className="absolute inset-1 overflow-hidden rounded-[36px]">
                   <img 
                    src="/assets/prawns-fry.png" 
                    alt="Royyala Prawns" 
                    className="w-full h-[140%] object-cover object-center grayscale-[0.4] group-hover:grayscale-0 transition-grayscale duration-[2s]" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                      <h4 className="text-2xl md:text-3xl font-light text-white tracking-tighter">Royyala (Prawns) <br/><span className="italic-emphasis">Curry</span></h4>
                   </div>
                </motion.div>
             </div>
          </div>

          {/* Large Parallax Row 2 */}
          <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-12 lg:gap-24">
             <div className="w-full lg:w-[60%] h-[500px] md:h-[600px] overflow-hidden rounded-[60px] relative group liquid-glass-strong p-3">
                <motion.div style={{ y: y2 }} className="absolute inset-2 overflow-hidden rounded-[52px]">
                   <img 
                    src="/assets/paneer-biryani.png" 
                    alt="Andhra Biryani" 
                    className="w-full h-[140%] object-cover object-center grayscale-[0.3] group-hover:grayscale-0 transition-grayscale duration-[2s]" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-12">
                      <h4 className="text-4xl md:text-5xl font-light text-white tracking-tighter">Traditional Andhra <br/><span className="italic-emphasis">Biryani</span></h4>
                      <p className="text-white/60 text-lg mt-4 max-w-sm">Aromatic basmati rice layered with spice-marinated goodness.</p>
                   </div>
                </motion.div>
             </div>
             
             <div className="w-full lg:w-[35%] h-[400px] overflow-hidden rounded-[40px] relative group liquid-glass p-2">
                <motion.div style={{ y: y1 }} className="absolute inset-1 overflow-hidden rounded-[36px]">
                   <img 
                    src="/assets/shrimp-curry.png" 
                    alt="Shrimp Curry" 
                    className="w-full h-[140%] object-cover object-center grayscale-[0.4] group-hover:grayscale-0 transition-grayscale duration-[2s]" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                      <h4 className="text-2xl md:text-3xl font-light text-white tracking-tighter">Inti Ruchi Bhojanam Spice <br/><span className="italic-emphasis">Shrimp Curry</span></h4>
                   </div>
                </motion.div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxFoodGallery;
