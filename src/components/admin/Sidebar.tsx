import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Utensils, 
  ShoppingBag, 
  LogOut, 
  ChevronRight,
  Home
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Foods', path: '/admin/foods', icon: Utensils },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-72 bg-zinc-900 border-r border-white/5 flex flex-col h-screen sticky top-0">
      <div className="p-8">
        <div className="flex items-center space-x-3 text-white mb-10">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
            <Utensils className="text-black" size={20} />
          </div>
          <span className="text-xl font-bold tracking-tighter">INTI RUCHI <span className="text-white/40">ADMIN</span></span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) => `
                flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 group
                ${isActive 
                  ? 'bg-white text-black font-bold shadow-[0_10px_20px_rgba(255,255,255,0.1)]' 
                  : 'text-white/40 hover:bg-white/5 hover:text-white'}
              `}
            >
              <div className="flex items-center space-x-4">
                <item.icon size={20} />
                <span className="text-sm tracking-widest uppercase font-medium">{item.name}</span>
              </div>
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-8 border-t border-white/5 space-y-4">
        <NavLink 
          to="/" 
          className="flex items-center space-x-4 px-5 py-4 text-white/40 hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] font-bold"
        >
          <Home size={18} />
          <span>Back to Site</span>
        </NavLink>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center space-x-4 px-5 py-4 text-red-400 hover:bg-red-400/5 rounded-2xl transition-all uppercase tracking-[0.2em] text-[10px] font-bold"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
