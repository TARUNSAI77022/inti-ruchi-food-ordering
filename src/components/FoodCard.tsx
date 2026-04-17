import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Check } from 'lucide-react';
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
    <motion.div
      layout
      className="group relative bg-zinc-900/60 rounded-[2rem] overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="aspect-square overflow-hidden bg-zinc-800 relative">
        <img 
          src={food.imageUrl} 
          alt={food.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
        />
        
        {/* Added ✓ Feedback Overlay */}
        <AnimatePresence>
          {showFeedback && !cartItem && (
            <motion.div 
               initial={{ opacity: 0, scale: 0.5 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-10"
            >
                <div className="bg-white text-black p-3 rounded-full flex items-center gap-2">
                    <Check size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Added</span>
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
             <h3 className="text-base font-medium leading-tight group-hover:text-white transition-colors">{food.name}</h3>
             <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">₹{food.price}</span>
          </div>
          
          {/* Action Buttons (Bottom-Right styled) */}
          <div className="relative z-20">
            <AnimatePresence mode="wait">
                {!cartItem ? (
                    <motion.button
                        key="add"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={handleAdd}
                        className="bg-white text-black px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-zinc-200 transition-all"
                    >
                        <Plus size={14} /> Add
                    </motion.button>
                ) : (
                    <motion.div 
                        key="qty"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-full px-4 py-2"
                    >
                        <button onClick={() => updateQuantity(food._id!, -1)} className="text-white hover:text-amber-400"><Minus size={14} /></button>
                        <span className="text-xs font-bold tabular-nums text-white min-w-[12px] text-center">{cartItem.quantity}</span>
                        <button onClick={() => updateQuantity(food._id!, 1)} className="text-white hover:text-amber-400"><Plus size={14} /></button>
                    </motion.div>
                )}
            </AnimatePresence>
          </div>
        </div>
        
        <p className="text-xs text-white/30 font-light line-clamp-2 group-hover:text-white/40 transition-colors flex-1">
          {food.description}
        </p>

        <div className="pt-2 border-t border-white/5 flex items-center justify-between">
            <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/20">
                {food.categoryName}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
