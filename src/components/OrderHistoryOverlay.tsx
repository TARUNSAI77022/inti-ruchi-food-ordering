import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Package } from 'lucide-react';
import api from '../services/api';

interface OrderHistoryOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrderHistoryOverlay: React.FC<OrderHistoryOverlayProps> = ({ isOpen, onClose }) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchOrders();
    }
  }, [isOpen]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get('/orders/my');
      setOrders(res.data.data ?? []);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'preparing': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'cancelled': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-20 right-0 h-[calc(100vh-80px)] w-full max-w-md bg-zinc-950 border-l border-white/10 z-[101] flex flex-col shadow-2xl"
          >
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-zinc-950/50 backdrop-blur-md">
              <div className="space-y-1">
                <h2 className="text-3xl font-light tracking-tighter uppercase italic">The History</h2>
                <p className="text-[10px] font-bold tracking-[0.4em] text-white/30 uppercase">Fulfillment Archives</p>
              </div>
              <button onClick={onClose} className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-20">
                    <Clock size={48} className="animate-pulse" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em]">Retrieving Logs...</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-20">
                  <Package size={64} strokeWidth={1} />
                  <p className="text-xs font-bold uppercase tracking-[0.4em]">No Prior Archives</p>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order._id} className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-6 group hover:border-white/20 transition-all">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-white/40 tracking-widest uppercase">{order.orderNumber}</p>
                            <p className="text-sm font-medium text-white/70">{new Date(order.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                            {order.status}
                        </span>
                    </div>

                    <div className="space-y-3">
                        {order.items.map((item: any, idx: number) => (
                            <div key={idx} className="flex justify-between items-center">
                                <span className="text-xs text-white/40 uppercase tracking-tight">{item.foodId?.name || 'Dish Item'} <span className="text-white/10">×{item.quantity}</span></span>
                                <span className="text-xs font-medium">₹{item.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4 border-t border-white/5 flex justify-between items-end">
                        <div className="space-y-1">
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20">Settlement</p>
                            <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border border-white/10 ${order.paymentStatus === 'paid' ? 'text-green-500' : 'text-amber-500'}`}>
                                {order.paymentStatus}
                            </span>
                        </div>
                        <p className="text-2xl font-light tracking-tighter">₹{order.totalAmount}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OrderHistoryOverlay;
