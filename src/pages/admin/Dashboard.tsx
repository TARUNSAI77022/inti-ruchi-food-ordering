import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Utensils, ShoppingBag, TrendingUp, Users, ArrowUpRight } from 'lucide-react';
import api from '../../services/api';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';

const StatCard: React.FC<{ title: string, value: string | number, icon: any, trend: string }> = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-zinc-900/40 p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
    <div className="flex justify-between items-start relative z-10">
      <div className="space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:bg-white group-hover:text-black transition-all duration-500">
          <Icon size={28} />
        </div>
        <div className="space-y-1">
          <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">{title}</h3>
          <p className="text-5xl font-light tracking-tighter text-white">{value}</p>
        </div>
        <div className="flex items-center space-x-2 text-green-400">
           <TrendingUp size={14} />
           <span className="text-[10px] font-bold tracking-widest uppercase">{trend} GROWTH</span>
        </div>
      </div>
      <button className="p-3 rounded-full border border-white/5 text-white/20 hover:text-white hover:border-white/20 transition-all">
        <ArrowUpRight size={20} />
      </button>
    </div>
    {/* Abstract Background Element */}
    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
  </div>
);

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({ 
    totalFoods: 0, 
    totalOrders: 0, 
    totalUsers: 0, 
    pendingOrders: 0 
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, ordersRes] = await Promise.all([
          api.get('/admin/stats'),
          api.get('/orders')
        ]);
        
        // Stats are returned flat on the response body (no .data wrapper)
        const { totalFoods, totalOrders, totalUsers, pendingOrders } = statsRes.data;
        console.log("Stats acquired:", { totalFoods, totalOrders, totalUsers, pendingOrders });
        setStats({ totalFoods, totalOrders, totalUsers, pendingOrders });

        // Orders are wrapped in a .data array
        setRecentOrders((ordersRes.data.data ?? []).slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#050505] text-white selection:bg-white/30">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-12 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard title="Menu Curation" value={stats.totalFoods} icon={Utensils} trend="+12%" />
            <StatCard title="Total Volume" value={stats.totalOrders} icon={ShoppingBag} trend="+24%" />
            <StatCard title="Active Patrons" value={stats.totalUsers} icon={Users} trend="+8%" />
            <StatCard title="Awaiting" value={stats.pendingOrders} icon={TrendingUp} trend="Live" />
          </div>

          <div className="space-y-8">
            <div className="flex justify-between items-end">
              <h2 className="text-3xl font-light tracking-tighter uppercase">Recent Acquisitions</h2>
              <button className="text-[10px] font-bold tracking-widest text-white/40 hover:text-white uppercase transition-colors">View All Archive</button>
            </div>
            <div className="bg-zinc-900/40 rounded-[2.5rem] border border-white/5 overflow-hidden">
               <div className="p-10 divide-y divide-white/5">
                  {recentOrders.map((order, i) => (
                    <div key={order._id} className="py-6 first:pt-0 last:pb-0 flex items-center justify-between group">
                      <div className="flex items-center space-x-6">
                         <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center font-bold text-white/40 text-xs">0{i+1}</div>
                         <div>
                            <p className="text-sm font-medium text-white group-hover:text-white/80 transition-colors uppercase tracking-tight">{order.userId?.name || 'Guest Patron'}</p>
                            <p className="text-[10px] text-white/20 font-bold tracking-[0.2em] uppercase">{new Date(order.createdAt).toLocaleDateString()}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-sm font-bold text-white mb-1">₹{order.totalPrice}</p>
                         <span className={`text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/10 ${order.status === 'completed' ? 'text-green-400 bg-green-400/10' : 'text-blue-400 bg-blue-400/10'}`}>
                           {order.status}
                         </span>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
