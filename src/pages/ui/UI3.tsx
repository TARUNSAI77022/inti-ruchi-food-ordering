import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShoppingCart, Plus, Minus, Search, LogOut, Clock, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useCart } from '../../context/CartContext';
import CartOverlay from '../../components/CartOverlay';
import OrderHistoryOverlay from '../../components/OrderHistoryOverlay';
import { useAuth } from '../../context/AuthContext';

const MEAL_TYPES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'];
const CATEGORIES = ['All', 'Veg', 'Non-Veg', 'Specials'];

const HorizontalRow: React.FC<{ title: string, foods: any[] }> = ({ title, foods }) => {
  const { cart, addToCart, updateQuantity } = useCart();

  if (foods.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-end px-8 lg:px-20">
        <div className="space-y-1">
          <h3 className="text-3xl font-light tracking-tighter uppercase italic">{title}</h3>
          <p className="text-[10px] font-bold text-white/20 tracking-[0.4em] uppercase">Signature Curation</p>
        </div>
        <button className="flex items-center gap-2 group text-white/40 hover:text-white transition-all">
          <span className="text-[10px] font-bold tracking-widest uppercase">Explore All</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="overflow-x-auto scrollbar-hide flex gap-8 px-8 lg:px-20 pb-12">
        {foods.map((food, i) => {
          const cartItem = cart.find(item => item._id === food._id);
          return (
            <motion.div
              key={food._id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex-shrink-0 w-80 group cursor-pointer relative"
            >
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-zinc-900 border border-white/5 group-hover:border-white/20 transition-all duration-500 relative">
                 <img 
                   src={food.imageUrl} 
                   alt={food.name} 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-60 group-hover:opacity-100"
                 />
                 
                 {/* Top Controls Overlay */}
                 <div className="absolute top-8 right-8 z-20">
                    <AnimatePresence mode="wait">
                      {!cartItem ? (
                        <motion.button
                          key="add"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          onClick={(e) => { e.stopPropagation(); addToCart(food); }}
                          className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all"
                        >
                          <Plus size={24} />
                        </motion.button>
                      ) : (
                        <motion.div
                          key="controls"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-4 bg-white rounded-full px-4 py-2 shadow-2xl"
                        >
                          <button onClick={(e) => { e.stopPropagation(); updateQuantity(food._id, -1); }} className="text-black hover:opacity-50"><Minus size={16} /></button>
                          <span className="text-lg font-bold tabular-nums text-black min-w-[20px] text-center">{cartItem.quantity}</span>
                          <button onClick={(e) => { e.stopPropagation(); updateQuantity(food._id, 1); }} className="text-black hover:opacity-50"><Plus size={16} /></button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                 </div>

                 <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-amber-400 tracking-widest uppercase">{food.categoryName}</p>
                        <h4 className="text-xl font-medium tracking-tight leading-none">{food.name}</h4>
                    </div>
                 </div>
                 
                 <div className="absolute top-8 left-8 w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center font-bold text-sm">
                    ₹{food.price}
                 </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

const UI3: React.FC = () => {
  const [allFoods, setAllFoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [mealType, setMealType] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await api.get('/foods');
        setAllFoods(res.data.data ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  const filteredFoods = allFoods.filter(food => {
    const matchCat = category === 'All' || food.categoryName === category;
    const matchMt = mealType === 'All' || (food.mealTypeName || food.mealType?.name) === mealType;
    return matchCat && matchMt;
  });

  const getFoodsByMealType = (mt: string) => {
    return filteredFoods.filter(f => (f.mealTypeName || f.mealType?.name) === mt);
  };

  const activeRows = mealType === 'All' ? MEAL_TYPES.filter(m => m !== 'All') : [mealType];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white/30">
      <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <OrderHistoryOverlay isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />

      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]" />
      </div>

      <nav className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
        <div className="px-8 lg:px-20 py-8 flex justify-between items-center ">
            <div className="flex items-center gap-6 lg:gap-12">
                <div className="flex items-center gap-4 py-2 px-4 bg-white/5 border border-white/10 rounded-2xl">
                    <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-black">
                        <UserIcon size={20} />
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-xs font-bold uppercase tracking-widest text-white leading-none mb-1">{user?.name || 'Patron'}</p>
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 leading-none">Status: {user?.role || 'Verified'}</p>
                    </div>
                </div>
                <div className="space-y-1">
                    <h1 className="text-2xl lg:text-4xl font-light tracking-tighter uppercase leading-none">The <span className="opacity-30 italic">Collection</span></h1>
                </div>
            </div>
            
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => setIsCartOpen(true)}
                    className="flex items-center gap-4 px-6 lg:px-8 py-3 lg:py-4 bg-white/5 hover:bg-white hover:text-black border border-white/10 rounded-full transition-all group"
                >
                    <ShoppingCart size={18} />
                    <motion.span 
                        key={totalItems}
                        initial={{ scale: 1.5, color: '#fbbf24' }}
                        animate={{ scale: 1, color: '#ffffff' }}
                        className="text-xs font-bold uppercase tracking-widest"
                    >
                        {totalItems} Allocated
                    </motion.span>
                </button>
                <button 
                    onClick={() => setIsHistoryOpen(true)}
                    className="p-3 lg:p-4 bg-white/5 hover:bg-white hover:text-black border border-white/10 rounded-full transition-all group"
                    title="Order History"
                >
                    <Clock size={18} />
                </button>
                <button 
                    onClick={handleLogout}
                    className="p-3 lg:p-4 bg-white/5 hover:bg-red-500 hover:text-white border border-white/10 rounded-full transition-all group"
                    title="Exit Session"
                >
                    <LogOut size={18} />
                </button>
            </div>
        </div>

        {/* Filter Bar */}
        <div className="px-8 lg:px-20 pb-6 overflow-x-auto scrollbar-hide flex items-center gap-8">
            <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest mr-2">Category:</span>
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`px-5 py-2 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                            category === cat ? 'bg-white text-black border-white' : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            <div className="w-px h-4 bg-white/10 flex-shrink-0" />
            <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest mr-2">Meal Phase:</span>
                {MEAL_TYPES.map(mt => (
                    <button
                        key={mt}
                        onClick={() => setMealType(mt)}
                        className={`px-5 py-2 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                            mealType === mt ? 'bg-amber-400 text-black border-amber-400' : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white'
                        }`}
                    >
                        {mt}
                    </button>
                ))}
            </div>
            <div className="ml-auto flex-shrink-0">
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Showing {filteredFoods.length} Items</p>
            </div>
        </div>
      </nav>

      {loading ? (
        <div className="h-[50vh] flex flex-col items-center justify-center space-y-8 relative z-10">
          <div className="w-16 h-1 w-32 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
               className="h-full bg-white" 
               initial={{ x: '-100%' }}
               animate={{ x: '100%' }}
               transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <p className="text-[10px] font-bold tracking-[0.6em] text-white/20 uppercase">Syncing Culinary Nodes</p>
        </div>
      ) : (
        <main className="py-20 space-y-24 relative z-10">
          {activeRows.map(mt => (
            <HorizontalRow key={mt} title={mt} foods={getFoodsByMealType(mt)} />
          ))}
          
          {filteredFoods.length === 0 && (
            <div className="h-96 flex flex-col items-center justify-center space-y-4">
                <Search size={48} className="text-white/10" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">No items match your curation</p>
                <button onClick={() => {setCategory('All'); setMealType('All')}} className="text-xs underline text-white/40 hover:text-white transition-all">Clear Filters</button>
            </div>
          )}
        </main>
      )}
    </div>
  );
};

export default UI3;
