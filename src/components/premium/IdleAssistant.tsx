import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLottie } from 'lottie-react';
import { ChefHat, Sparkles, X } from 'lucide-react';

// --- LOTTIE WRAPPER ---
const LottieAnim = ({ animationData, loop = true }: any) => {
  const { View } = useLottie({ animationData, loop, autoplay: true });
  return <div className="w-full h-full">{View}</div>;
};

// --- MINIMAL LOTTIE JSON FALLBACKS ---
const chefJSON = { v: "5.5.2", fr: 30, ip: 0, op: 60, w: 100, h: 100, nm: "Chef", ddd: 0, assets: [], layers: [{ ddd: 0, ind: 1, ty: 4, nm: "Chef", sr: 1, ks: { o: { a: 0, k: 100 }, r: { a: 0, k: 0 }, p: { a: 0, k: [50, 50, 0] }, a: { a: 0, k: [0, 0, 0] }, s: { a: 1, k: [{ t: 0, s: [100, 100] }, { t: 30, s: [110, 110] }, { t: 60, s: [100, 100] }] } }, shapes: [{ ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [40, 40] }, nm: "Circle", mn: "ADBE Vector Shape - Ellipse" }, { ty: "fl", c: { a: 0, k: [0.9, 0.5, 0.1, 1] }, o: { a: 0, k: 100 }, nm: "Fill" }], ip: 0, op: 60, st: 0, bm: 0 }] };

const IdleAssistant: React.FC<{ foods: any[], onSuggest: (f: any) => void }> = ({ foods, onSuggest }) => {
  const [idleTime, setIdleTime] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [stage, setStage] = useState<'chef' | 'steam' | 'serve' | 'suggest' | null>(null);

  const resetIdle = useCallback(() => {
    setIdleTime(0);
    setIsVisible(false);
    setStage(null);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIdleTime(prev => prev + 1);
    }, 1000);

    // Global interaction listeners
    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('scroll', resetIdle);
    window.addEventListener('click', resetIdle);
    window.addEventListener('keydown', resetIdle);

    return () => {
      clearInterval(timer);
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('scroll', resetIdle);
      window.removeEventListener('click', resetIdle);
      window.removeEventListener('keydown', resetIdle);
    };
  }, [resetIdle]);

  useEffect(() => {
    if (idleTime >= 35) {
      setStage('suggest');
      setIsVisible(true);
    } else if (idleTime >= 30) {
      setStage('serve');
      setIsVisible(true);
    } else if (idleTime >= 20) {
      setStage('steam');
      setIsVisible(true);
    } else if (idleTime >= 10) {
      setStage('chef');
      setIsVisible(true);
    } else {
      setIsVisible(false);
      setStage(null);
    }
  }, [idleTime]);

  const recommendedFood = foods[Math.floor(Math.random() * foods.length)];

  return (
    <AnimatePresence>
      {isVisible && stage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          className="fixed bottom-32 right-10 z-[1000] w-72"
        >
          <div className="bg-[#1A1715]/90 backdrop-blur-2xl border border-[#E67E22]/20 rounded-[2.5rem] p-6 shadow-2xl overflow-hidden relative group">
            <button onClick={resetIdle} className="absolute top-4 right-4 text-white/20 hover:text-white transition-colors">
              <X size={16} />
            </button>

            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-24 h-24 relative">
                {stage === 'chef' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <LottieAnim animationData={chefJSON} />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <ChefHat className="text-[#E67E22] w-10 h-10" />
                    </div>
                  </motion.div>
                )}
                {stage === 'steam' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center h-full">
                    <div className="relative">
                       <div className="w-16 h-12 bg-white/10 rounded-t-full border-t border-white/20" />
                       {[1,2,3].map(i => (
                         <motion.div 
                          key={i}
                          animate={{ y: [-10, -30], opacity: [0, 0.5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.4 }}
                          className="absolute -top-4 w-1 h-6 bg-white/20 rounded-full blur-[2px]"
                          style={{ left: `${i * 25}%` }}
                         />
                       ))}
                    </div>
                  </motion.div>
                )}
                {stage === 'serve' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center h-full">
                     <Sparkles className="text-[#D4AF37] w-12 h-12 animate-pulse" />
                  </motion.div>
                )}
                {stage === 'suggest' && recommendedFood && (
                   <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full">
                     <img src={recommendedFood.imageUrl} className="w-full h-32 object-cover rounded-2xl mb-4 shadow-lg" alt="Suggestion" />
                   </motion.div>
                )}
              </div>

              <div className="space-y-1">
                <h4 className="text-white font-black italic uppercase tracking-tighter text-lg leading-tight">
                  {stage === 'chef' && "Chef is Cooking..."}
                  {stage === 'steam' && "Aroma of Heritage"}
                  {stage === 'serve' && "Your Table Awaits"}
                  {stage === 'suggest' && "Chef's Recommendation"}
                </h4>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest leading-relaxed px-4">
                  {stage === 'chef' && "Fresh heritage dishes being prepared specifically for you."}
                  {stage === 'steam' && "Slow-cooked in clay pots. Experience the soul of Andhra."}
                  {stage === 'serve' && "Everything is ready. Shall we serve your feast?"}
                  {stage === 'suggest' && `Why not try our famous ${recommendedFood?.name || 'Biryani'}?`}
                </p>
              </div>

              {stage === 'suggest' && (
                <button 
                  onClick={() => onSuggest(recommendedFood)}
                  className="btn-premium py-3 px-8 text-[9px] w-full mt-2"
                >
                  Order Now
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IdleAssistant;
