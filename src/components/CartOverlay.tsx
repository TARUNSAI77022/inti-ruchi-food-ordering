import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, Loader2, UserCircle, Utensils, Flame, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import SmartAnimation from './premium/SmartAnimation';

interface CartOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartOverlay: React.FC<CartOverlayProps> = ({ isOpen, onClose }) => {
  const { cart, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // ANIMATION STATES
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showChefLogin, setShowChefLogin] = useState(false);
  const [isCooking, setIsCooking] = useState(false);

  // 2️⃣ CART OPENED LOG: "Your food is being prepared"
  useEffect(() => {
    if (isOpen) {
      console.log("Cart opened animation triggered");
    }
  }, [isOpen]);

  const handleLoginClick = () => {
    console.log("Login animation triggered");
    setShowChefLogin(true);
    
    // 3️⃣ LOGIN TRANSITION: Delayed navigation
    setTimeout(() => {
      navigate('/login');
      onClose();
      setShowChefLogin(false);
    }, 1000); 
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      handleLoginClick();
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        items: cart.map(item => ({
          foodId: item._id,
          quantity: item.quantity
        })),
        idempotencyKey: uuidv4()
      };

      const res = await api.post('/orders', payload);

      if (res.data.success) {
        // 4️⃣ COOKING STARTED ANIMATION (Steam/Flame)
        console.log("Cooking animation triggered");
        setIsCooking(true);
        
        setTimeout(() => {
           setIsCooking(false);
           clearCart();
           onClose();
        }, 900); 
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Order failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0F0D0C]/80 backdrop-blur-xl z-[110]"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#1A1715] border-l border-white/5 z-[120] flex flex-col shadow-2xl overflow-hidden"
          >
            {/* 3️⃣ LOGIN TRANSITION OVERLAY (CHEF COOKING) */}
            <AnimatePresence>
              {showChefLogin && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-2xl flex items-center justify-center p-12 text-center"
                >
                   <motion.div 
                     initial={{ scale: 0.8 }}
                     animate={{ scale: 1 }}
                     className="relative flex flex-col items-center"
                   >
                     <div className="w-[200px] h-[200px]">
                        <SmartAnimation type="idle" isVisible={true} message="" />
                     </div>
                     <motion.div 
                        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="mt-4 flex items-center gap-2 text-[#E67E22]"
                     >
                       <Flame size={14} className="fill-current" />
                       <span className="text-[10px] font-black uppercase tracking-[0.4em]">Stoking the Heritage Hearth</span>
                     </motion.div>
                   </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 2️⃣ FOOD PREPARATION (Subtle Background Loop) */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05] flex items-center justify-center">
               <motion.div 
                 animate={{ 
                   scale: [1, 1.05, 1],
                   rotate: [0, 360]
                 }}
                 transition={{ 
                   scale: { repeat: Infinity, duration: 5, ease: "easeInOut" },
                   rotate: { repeat: Infinity, duration: 30, ease: "linear" }
                 }}
                 className="relative"
               >
                 <Utensils size={400} strokeWidth={1} />
                 <motion.div 
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#E67E22]"
                 >
                    <Sparkles size={120} />
                 </motion.div>
               </motion.div>
            </div>

            {/* 4️⃣ COOKING STARTED / SUCCESS (Flame Effect) */}
            <AnimatePresence>
               {isCooking && (
                 <motion.div 
                   initial={{ opacity: 0, y: 100 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, scale: 2 }}
                   className="absolute inset-0 z-[9999] bg-[#E67E22] flex flex-col items-center justify-center p-12 text-center"
                 >
                    <motion.div 
                       animate={{ 
                         y: [0, -20, 0],
                         scale: [1, 1.2, 1]
                       }}
                       transition={{ repeat: Infinity, duration: 0.6 }}
                    >
                      <Flame size={120} className="text-white fill-current" />
                    </motion.div>
                    <div className="w-12 h-1 bg-white/30 rounded-full mt-10 mb-4" />
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white">Cooking Started</p>
                 </motion.div>
               )}
            </AnimatePresence>

            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between relative z-10">
              <div className="space-y-1">
                <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white">The Order</h2>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E67E22] animate-ping" />
                  <p className="text-[10px] font-black tracking-widest text-[#E67E22] uppercase opacity-80">
                    {totalItems} {totalItems === 1 ? 'Item' : 'Items'} Ready
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose}
                disabled={isSubmitting}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide relative z-10">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-6 opacity-10 text-center">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="text-[10px] font-black uppercase tracking-[0.4em]">Empty Selection</p>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div layout key={item._id} className="flex gap-4 group items-center">
                    <div className="w-20 h-20 rounded-[1.2rem] overflow-hidden flex-shrink-0 border border-white/5 shadow-lg">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-sm font-black italic uppercase tracking-tight text-white truncate pr-4">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item._id)}
                          disabled={isSubmitting}
                          className="text-white/10 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-white/5 rounded-full px-3 py-1.5 border border-white/5">
                          <button onClick={() => updateQuantity(item._id, -1)} disabled={isSubmitting} className="text-white/40 hover:text-white"><Minus size={12} /></button>
                          <span className="text-xs font-black tabular-nums text-[#D4AF37] min-w-[15px] text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item._id, 1)} disabled={isSubmitting} className="text-white/40 hover:text-white"><Plus size={12} /></button>
                        </div>
                        <p className="text-sm font-black italic text-white/80">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 border-t border-white/5 bg-[#0F0D0C] mt-auto flex flex-col items-center relative z-10">
                <div className="flex justify-between items-center w-full mb-6">
                  <span className="text-[10px] font-black tracking-widest text-white/30 uppercase">Final Total</span>
                  <p className="text-4xl font-black italic tracking-tighter text-white">₹{totalPrice}</p>
                </div>
                <button 
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className="w-full py-5 bg-gradient-to-r from-[#E67E22] to-[#D4AF37] text-white font-black text-[11px] tracking-[0.3em] uppercase rounded-full hover:shadow-[0_0_30px_rgba(230,126,34,0.3)] transition-all flex items-center justify-center gap-4 group overflow-hidden"
                >
                  <div className="flex items-center justify-center gap-4">
                    {isSubmitting ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <>
                        {!user && <UserCircle size={18} className="text-white/50" />}
                        {user ? 'Place Order' : 'Sign in to Order'} 
                        <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </div>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartOverlay;
