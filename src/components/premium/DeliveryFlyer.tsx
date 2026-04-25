import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bike, Navigation } from 'lucide-react';

export type FlyerType = 'bike' | 'scooter' | 'swoosh';

interface DeliveryFlyerProps {
  id: string;
  start: { x: number; y: number };
  end: { x: number; y: number };
  imageUrl: string;
  type: FlyerType;
  onComplete: () => void;
}

const DeliveryFlyer: React.FC<DeliveryFlyerProps> = ({ id, start, end, imageUrl, type, onComplete }) => {
  const isSwoosh = type === 'swoosh';

  useEffect(() => {
    console.log("Delivery animation triggered");
  }, []);
  
  return (
    <motion.div
      key={id}
      initial={{ 
        x: start.x, 
        y: start.y, 
        scale: 1, 
        opacity: 0,
        rotate: 0 
      }}
      animate={{ 
        // 1️⃣ Cinematic Curved Path (X/Y arc)
        x: [start.x, (start.x + end.x) / 2 - 100, end.x], 
        y: [start.y, start.y - 200, end.y], 
        scale: [1, 1.4, 0.5],
        opacity: [0, 1, 1, 0],
        rotate: type === 'bike' ? [0, 20, -20, 0] : type === 'scooter' ? [0, 10, -10, 0] : 0
      }}
      transition={{ 
        duration: isSwoosh ? 0.6 : 1.1, // Optimal visible storytelling time
        ease: [0.4, 0, 0.2, 1] 
      }}
      onAnimationComplete={onComplete}
      className="fixed top-0 left-0 z-[9999] pointer-events-none" // Force high z-index
    >
      <div className="relative flex items-center justify-center">
        {/* Road shadow (Depth feel) */}
        {!isSwoosh && (
          <motion.div 
            animate={{ scale: [1, 1.3, 0.9], opacity: [0.2, 0.5, 0.1] }}
            className="absolute top-12 w-20 h-5 bg-black/60 blur-xl rounded-full -z-20" 
          />
        )}

        {/* Floating food thumbnail (Picked up) */}
        <motion.div 
           initial={{ scale: 0 }}
           animate={{ scale: 1, y: [0, -8, 0] }}
           transition={{ y: { repeat: Infinity, duration: 0.4 } }}
           className="absolute -top-14 z-10 w-14 h-14 rounded-full border-2 border-white/30 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-[#1A1715]"
        >
          <img src={imageUrl} className="w-full h-full object-cover" alt="food" />
        </motion.div>

        {/* Vehicle Persona */}
        {!isSwoosh && (
          <div className="bg-[#E67E22] p-6 rounded-full shadow-[0_20px_50px_rgba(230,126,34,0.6)] text-white relative">
            {type === 'bike' ? <Bike size={32} /> : <Navigation size={32} className="rotate-45" />}
            
            {/* Trail / Speed Effect */}
            <AnimatePresence>
               {[1, 2, 3].map((i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0.6, scale: 0.5, x: 0 }}
                   animate={{ opacity: 0, scale: 2.5, x: -40 * i }}
                   transition={{ repeat: Infinity, duration: 0.3, delay: i * 0.1 }}
                   className="absolute inset-0 bg-[#E67E22]/30 blur-2xl rounded-full -z-10"
                 />
               ))}
            </AnimatePresence>
          </div>
        )}
        
        {/* Rapid Swoosh (Fallback) */}
        {isSwoosh && (
          <div className="w-8 h-8 bg-[#E67E22] rounded-full shadow-[0_0_40px_rgba(230,126,34,0.8)]" />
        )}
      </div>
    </motion.div>
  );
};

export default DeliveryFlyer;
