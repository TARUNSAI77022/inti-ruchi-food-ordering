import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Star, ShoppingBag } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { useCart } from '../context/CartContext';

interface Food {
  _id?: string;
  name: string;
  price: string | number;
  description: string;
  imageUrl: string;
  available?: boolean;
}

const FoodCard: React.FC<{ food: Food }> = ({ food }) => {
  const { cart, addToCart, updateQuantity } = useCart();
  const cartItem = cart.find(i => i._id === food._id);

  return (
    <Tilt
      perspective={1000}
      glareEnable={true}
      glareMaxOpacity={0.15}
      scale={1.04}
      tiltMaxAngleX={12}
      tiltMaxAngleY={12}
      transitionSpeed={1500}
      className="transform-gpu h-full"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, rotateX: 10 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-[#1A1A1A] rounded-[2.5rem] overflow-hidden border border-white/5 group hover:border-[#F5A623]/30 transition-all duration-500 shadow-2xl h-full flex flex-col relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Dynamic Inner Shadow/Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#F5A623]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div 
          className="aspect-square overflow-hidden relative m-4 rounded-3xl"
          style={{ transform: 'translateZ(40px)' }}
        >
          <motion.img 
            src={food.imageUrl} 
            alt={food.name} 
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800&sig=${food.name}`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4">
            <span className="text-2xl font-black text-white tracking-tighter drop-shadow-lg">₹{food.price}</span>
          </div>
        </div>

        <div className="p-6 pt-2 space-y-4 flex-1 flex flex-col" style={{ transform: 'translateZ(20px)' }}>
          <div className="flex justify-between items-start gap-4">
            <h3 className="text-xl font-black text-white group-hover:text-[#F5A623] transition-colors line-clamp-1 tracking-tight">
              {food.name}
            </h3>
            <div className="flex items-center gap-1.5 text-[#F5A623]">
              <Star size={14} fill="currentColor" />
              <span className="text-xs font-black">4.9</span>
            </div>
          </div>
          
          <p className="text-xs text-white/40 line-clamp-2 leading-relaxed font-medium">
            {food.description}
          </p>

          <div className="pt-4 flex items-center justify-between mt-auto" style={{ transform: 'translateZ(50px)' }}>
            <AnimatePresence mode="wait">
              {!cartItem ? (
                <motion.button
                  key="add-btn"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(245, 166, 35, 0.4)' }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  onClick={() => addToCart(food)}
                  className="flex-1 bg-white text-black py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#F5A623] hover:text-white transition-all flex items-center justify-center gap-3 shadow-lg"
                >
                  <ShoppingBag size={14} /> Add to Cart
                </motion.button>
              ) : (
                <motion.div 
                  key="qty-ctrl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex-1 flex items-center justify-between bg-white/5 rounded-2xl p-1.5 border border-white/10 backdrop-blur-xl"
                >
                  <button 
                    onClick={() => updateQuantity(food._id!, -1)}
                    className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-sm font-black text-white tabular-nums">{cartItem.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(food._id!, 1)}
                    className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
};

export default FoodCard;
