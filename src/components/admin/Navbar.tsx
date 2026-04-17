import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="h-24 border-b border-white/5 bg-black/40 backdrop-blur-xl px-12 flex items-center justify-between sticky top-0 z-40">
      <div className="relative w-96 group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="SEARCH ANYTHING..."
          className="w-full bg-white/5 border border-white/5 rounded-full py-3 pl-14 pr-6 text-xs tracking-widest text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10"
        />
      </div>

      <div className="flex items-center space-x-8">
        <button className="relative p-2 text-white/40 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full border-2 border-black" />
        </button>

        <div className="h-8 w-px bg-white/10" />

        <div className="flex items-center space-x-4">
          <div className="text-right flex flex-col justify-center">
            <span className="text-sm font-bold tracking-tight text-white leading-none mb-1 uppercase">{user?.name}</span>
            <span className="text-[10px] text-white/40 tracking-[0.2em] font-bold uppercase">System Admin</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-900 border border-white/10 p-0.5">
             <div className="w-full h-full rounded-[14px] bg-zinc-900 flex items-center justify-center overflow-hidden">
                <User size={24} className="text-white/20" />
             </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
