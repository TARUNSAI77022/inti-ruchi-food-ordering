import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const messages = [
    { text: "The taste of the Godavari region.", delay: 0 },
    { text: "Recipes passed through generations.", delay: 0.2 },
    { text: "Spices roasted with tradition.", delay: 0.4 },
    { text: "A feast that celebrates Andhra heritage.", delay: 0.6 },
  ];

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);

  return (
    <section id="story" ref={containerRef} className="py-40 relative z-20 overflow-hidden bg-black/40">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-24">
           {/* Message Column */}
           <div className="flex flex-col space-y-24 max-w-2xl">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="flex flex-col"
                >
                  <h3 className="text-4xl md:text-5xl lg:text-7xl font-light text-white/90 italic-emphasis leading-tight tracking-tighter">
                     {msg.text}
                  </h3>
                  <div className="w-20 h-px bg-white/20 mt-6" />
                </motion.div>
              ))}
           </div>

           {/* Floating Images Column */}
           <div className="relative w-full lg:w-1/2 h-[800px] hidden md:block">
              <motion.div
                style={{ y: y1 }}
                className="absolute top-[10%] right-[10%] w-[350px] aspect-[3/4] rounded-[40px] overflow-hidden liquid-glass-strong p-2 border-white/20"
              >
                  <img 
                    src="/assets/chicken-vepudu.png" 
                    alt="Spicy Chicken" 
                    className="w-full h-full object-cover rounded-[32px] grayscale-[0.5] hover:grayscale-0 transition-grayscale duration-[2s]"
                  />
              </motion.div>

              <motion.div
                 style={{ y: y2 }}
                 className="absolute top-[40%] left-[10%] w-[250px] aspect-square rounded-[30px] overflow-hidden liquid-glass p-2 border-white/30"
              >
                  <img 
                    src="/assets/gongura-mutton.png" 
                    alt="Gongura Mutton" 
                    className="w-full h-full object-cover rounded-[24px] grayscale-[0.3] hover:grayscale-0 transition-grayscale duration-[2s]"
                  />
              </motion.div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollStory;
