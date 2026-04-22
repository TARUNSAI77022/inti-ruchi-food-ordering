import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

interface CartOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartOverlay: React.FC<CartOverlayProps> = ({ isOpen, onClose }) => {
  const { cart, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error("Authentication required to finalize allocation.");
      navigate('/login');
      onClose();
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
        toast.success(`Success. Order ${res.data.data.orderNumber} initialized.`);
        clearCart();
        onClose();
        // Option: navigate to a success page or order history
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || "Order synchronization failed.";
      toast.error(errorMsg);
      
      if (err.response?.status === 401) {
        navigate('/login');
        onClose();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - z-30 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[30]"
          />

          {/* Sidebar Drawer - z-40, positioned below navbar (top-20/80px) */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-20 right-0 h-[calc(100vh-80px)] w-full max-w-md bg-zinc-950 border-l border-white/10 z-[40] flex flex-col shadow-2xl"
          >
            {/* Header - Non-scrollable */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-zinc-950/50 backdrop-blur-md">
              <div className="space-y-1">
                <h2 className="text-3xl font-light tracking-tighter uppercase italic">The Allocation</h2>
                <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-white/30 uppercase">
                  <ShoppingBag size={12} />
                  <span>{totalItems} Items Synchronized</span>
                </div>
              </div>
              <button 
                onClick={onClose}
                disabled={isSubmitting}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* List - Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-20">
                  <ShoppingBag size={64} strokeWidth={1} />
                  <p className="text-xs font-bold uppercase tracking-[0.4em]">Empty Protocol</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item._id} className="flex gap-4 group">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-white/5">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-medium uppercase tracking-tight leading-tight">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item._id)}
                          disabled={isSubmitting}
                          className="opacity-0 group-hover:opacity-100 text-white/20 hover:text-red-400 transition-all disabled:opacity-0"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-white/5 rounded-full px-3 py-1 border border-white/5">
                          <button onClick={() => updateQuantity(item._id, -1)} disabled={isSubmitting} className="text-white/40 hover:text-white disabled:opacity-20"><Minus size={12} /></button>
                          <span className="text-xs font-bold tabular-nums min-w-[20px] text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item._id, 1)} disabled={isSubmitting} className="text-white/40 hover:text-white disabled:opacity-20"><Plus size={12} /></button>
                        </div>
                        <p className="text-sm font-bold tracking-tight">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer - Sticky/Non-scrollable */}
            {cart.length > 0 && (
              <div className="p-8 border-t border-white/5 bg-zinc-900/60 backdrop-blur-xl mt-auto shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase leading-none mb-1">Total Valuation</p>
                    <p className="text-[9px] font-bold tracking-widest text-white/10 uppercase">Incl. Service Nodes</p>
                  </div>
                  <p className="text-4xl font-light tracking-tighter">₹{totalPrice}</p>
                </div>
                <button 
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className="w-full py-5 bg-white text-black font-bold text-[10px] tracking-[0.3em] uppercase rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>Processing <Loader2 size={14} className="animate-spin" /></>
                  ) : (
                    <>Confirm Allocation <ArrowRight size={14} /></>
                  )}
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
