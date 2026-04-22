import React from 'react';
import { Package } from 'lucide-react';

interface Order {
  _id: string;
  userId: { name: string; email: string };
  items: Array<{ foodId: { name: string }; quantity: number }>;
  totalAmount: number;
  status: string;
  createdAt: string;
}

interface OrderTableProps {
  orders: Order[];
  onUpdateStatus: (id: string, status: string) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, onUpdateStatus }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'preparing': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'cancelled': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    }
  };

  return (
    <div className="overflow-x-auto rounded-[2.5rem] border border-white/5 bg-zinc-900/40 backdrop-blur-md">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/5">
            <th className="px-8 py-8 text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">Order Details</th>
            <th className="px-8 py-8 text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">Customer</th>
            <th className="px-8 py-8 text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">Amount</th>
            <th className="px-8 py-8 text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">Update Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {orders.map((order) => (
            <tr key={order._id} className="group hover:bg-white/[0.01] transition-colors">
              <td className="px-8 py-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all">
                    <Package size={20} className="text-white/40 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white mb-1 uppercase tracking-tight">#{order._id.slice(-6)}</div>
                    <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{order.items.length} ITEMS PLACED</div>
                  </div>
                </div>
              </td>
              <td className="px-8 py-8">
                 <div className="text-sm font-medium text-white mb-1">{order.userId?.name}</div>
                 <div className="text-xs text-white/30 font-light">{order.userId?.email}</div>
              </td>
              <td className="px-8 py-8 text-sm font-bold text-white/90">
                ₹{order.totalAmount}
              </td>
              <td className="px-8 py-8">
                <select 
                  value={order.status}
                  onChange={(e) => onUpdateStatus(order._id, e.target.value)}
                  className={`
                    px-6 py-2.5 rounded-xl border text-[10px] font-bold uppercase tracking-widest outline-none transition-all cursor-pointer
                    ${getStatusColor(order.status)}
                  `}
                >
                  <option value="pending">Pending</option>
                  <option value="preparing">Preparing</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
