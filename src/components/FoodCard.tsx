import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Plus, Minus, Star, ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface Food {
  _id?: string;
  name: string;
  price: string | number;
  description: string;
  imageUrl: string;
  available?: boolean;
  categoryName?: string;
  mealTypeName?: string;
}

const FoodCard: React.FC<{ food: Food }> = ({ food }) => {
  const { cart, addToCart, updateQuantity } = useCart();
  const [showFeedback, setShowFeedback] = useState(false);
  const cartItem = cart.find(i => i._id === food._id);
  
  // v4.5: Refined 3D System with Shadow Depth
  const cardRef = useRef<HTMLDivElement>(null);
  const [glarePos, setGlarePos] = useState({ x: 0, y: 0 });
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 25 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);
  const shadowX = useTransform(mouseXSpring, [-0.5, 0.5], [15, -15]);
  const shadowY = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX / window.innerWidth - 0.5); // Global reference for smoother sync
    y.set(e.clientY / window.innerHeight - 0.5);
    
    const localX = (e.clientX - rect.left) / rect.width;
    const localY = (e.clientY - rect.top) / rect.height;
    setGlarePos({ x: localX * 100, y: localY * 100 });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(food);
    setShowFeedback(true);
  };

  useEffect(() => {
    if (showFeedback) {
      const timer = setTimeout(() => setShowFeedback(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showFeedback]);

  return (
    <div 
      className="perspective-1000 group relative h-[500px] w-full"
      style={{
        // @ts-ignore
        "--mouse-x": `${glarePos.x}%`,
        "--mouse-y": `${glarePos.y}%`,
      }}
    >
      {/* Interactive Shadow for Clarity/Depth */}
      <motion.div 
        style={{ x: shadowX, y: shadowY }}
        className="absolute inset-6 bg-black/50 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
      />

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY,
          rotateX,
          transformStyle: 'preserve-3d',
        }}
        className="relative h-full bg-dark-800/80 rounded-[3rem] overflow-hidden border border-white/5 group-hover:border-primary/40 transition-all duration-500 flex flex-col shadow-2xl backdrop-blur-sm"
      >
        <div className="card-glare rounded-[3rem] z-50 opacity-0 group-hover:opacity-20 transition-opacity" />

        {/* Image Stage - Increased Spacing */}
        <div 
          style={{ transform: 'translateZ(60px)', transformStyle: 'preserve-3d' }}
          className="aspect-square m-4 rounded-[2.5rem] overflow-hidden bg-dark-700 relative shadow-3d-lg"
        >
          <motion.img 
            src={food.imageUrl} 
            alt={food.name} 
            className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-115"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-transparent to-transparent" />
          
          <div 
            style={{ transform: 'translateZ(30px)' }}
            className="absolute top-5 left-5 px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-xl border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em]"
          >
            {food.categoryName}
          </div>

          <button 
            style={{ transform: 'translateZ(30px)' }}
            className="absolute top-5 right-5 p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white/50 hover:text-red-500 transition-all"
          >
            <Heart size={18} />
          </button>
        </div>

        {/* Content Section - Improved Clarity & Contrast */}
        <div 
          style={{ transform: 'translateZ(40px)' }}
          className="px-6 py-8 flex-1 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex justify-between items-start gap-4">
              <h3 className="text-2xl font-black text-white leading-tight group-hover:text-primary transition-colors tracking-tighter">
                {food.name}
              </h3>
              
              {/* Action Button - Moved to prevent title overlap */}
              <div className="relative z-20 flex-shrink-0">
                <AnimatePresence mode="wait">
                    {!cartItem ? (
                        <motion.button
                            key="add"
                            whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(245, 158, 11, 0.5)' }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleAdd}
                            className="bg-primary text-white p-4 rounded-2xl shadow-lg border border-white/10"
                        >
                            <ShoppingBag size={22} />
                        </motion.button>
                    ) : (
                        <motion.div 
                            key="qty"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-3 py-3 backdrop-blur-xl"
                        >
                            <button onClick={() => updateQuantity(food._id!, -1)} className="text-white/40 hover:text-primary transition-colors"><Minus size={16} /></button>
                            <span className="text-xs font-black tabular-nums text-white min-w-[16px] text-center">{cartItem.quantity}</span>
                            <button onClick={() => updateQuantity(food._id!, 1)} className="text-white/40 hover:text-primary transition-colors"><Plus size={16} /></button>
                        </motion.div>
                    )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
              </div>
              <span className="text-white/40 font-black uppercase tracking-[0.2em] text-[8px]">Chef's Special</span>
            </div>
            
            <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors font-medium line-clamp-2 leading-relaxed">
              {food.description}
            </p>
          </div>

          <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-6">
              <div className="flex flex-col">
                <span className="text-white/20 font-black uppercase tracking-widest text-[8px] mb-1">Price Point</span>
                <span className="text-3xl font-black text-white tracking-tighter">₹{food.price}</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.3)]" />
                 <span className="text-white/30 font-black uppercase tracking-[0.2em] text-[8px]">Handcrafted</span>
              </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FoodCard;
