import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import OrderTable from '../../components/admin/OrderTable';
import api from '../../services/api';
import { ShoppingBag, RefreshCcw } from 'lucide-react';
import toast from 'react-hot-toast';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get('/orders');
      setOrders(res.data.data);
    } catch (error) {
      toast.error('Sync failed with fulfillment hub');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await api.put(`/orders/${id}/status`, { status });
      toast.success('Logistics state recalibrated');
      fetchOrders();
    } catch (error) {
      toast.error('Update operation stalled');
    }
  };

  return (
    <div className="flex min-h-screen bg-[#050505] text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-12 space-y-12">
          <div className="flex justify-between items-end">
            <div className="flex items-center space-x-8">
               <div className="w-24 h-24 rounded-[2rem] bg-white/5 border border-white/5 flex items-center justify-center text-white/40">
                  <ShoppingBag size={40} />
               </div>
               <div>
                  <h1 className="text-6xl font-light tracking-tighter italic">Logistics Hub</h1>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.4em] mt-2">Active Fulfillment Cluster</p>
               </div>
            </div>
            
            <button 
               onClick={fetchOrders}
               className="px-8 h-16 border border-white/5 rounded-2xl flex items-center space-x-3 text-white/40 hover:text-white transition-all uppercase tracking-[0.2em] text-[10px] font-bold group"
            >
               <RefreshCcw size={16} className="group-hover:rotate-180 transition-transform duration-700" />
               <span>Synchronize Feed</span>
            </button>
          </div>

          <div className="grid grid-cols-4 gap-10">
             {[
               { label: 'Unchecked', count: orders.filter((o: any) => o.status === 'pending').length, color: 'text-blue-400' },
               { label: 'In Refinement', count: orders.filter((o: any) => o.status === 'preparing').length, color: 'text-yellow-400' },
               { label: 'Dispatched', count: orders.filter((o: any) => o.status === 'delivered').length, color: 'text-green-400' },
               { label: 'Nullified', count: orders.filter((o: any) => o.status === 'cancelled').length, color: 'text-red-400' },
             ].map(stat => (
               <div key={stat.label} className="bg-zinc-900/40 p-10 rounded-[2rem] border border-white/5 flex flex-col items-center space-y-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 whitespace-nowrap">{stat.label}</p>
                  <p className={`text-5xl font-light tracking-tighter ${stat.color}`}>{stat.count}</p>
               </div>
             ))}
          </div>

          {loading ? (
             <div className="h-96 flex flex-col items-center justify-center space-y-6">
                <div className="w-12 h-12 border-2 border-white/5 border-t-white rounded-full animate-spin" />
                <p className="text-[10px] font-bold tracking-[0.4em] text-white/20 uppercase">Acquiring Data Feed...</p>
             </div>
          ) : (
            <OrderTable 
              orders={orders} 
              onUpdateStatus={handleUpdateStatus} 
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Orders;
