import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2, Plus, ShoppingCart, Minus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useCart } from '../../context/CartContext';
import CartOverlay from '../../components/CartOverlay';

const CATEGORIES = ['All', 'Veg', 'Non-Veg', 'Specials'];
const MEAL_TYPES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'];

const UI2: React.FC = () => {
  const [allFoods, setAllFoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [mealType, setMealType] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, addToCart, updateQuantity, totalItems } = useCart();

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

  return (
    <div className="min-h-screen bg-black text-white p-8 lg:p-12 selection:bg-white/30">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl -mx-8 lg:-mx-12 px-8 lg:px-12 pt-6 pb-4 mb-12 border-b border-white/5 space-y-6">
        <header className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6 lg:gap-12">
              <Link to="/login" className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2">
                  Login <ArrowRight size={14} />
              </Link>
              <div className="space-y-0.5">
                  <h1 className="text-2xl font-light tracking-tighter uppercase italic">Quick Select</h1>
                  <p className="text-[9px] font-bold tracking-[0.4em] text-white/20 uppercase">Pro Curation Hub</p>
              </div>
          </div>
          <div className="flex items-center gap-4">
              <Link to="/dashboard" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-xl text-[10px] font-bold uppercase tracking-widest text-amber-400 hover:bg-amber-400/20 transition-all">
                  Premium UI
              </Link>
              <button 
                  onClick={() => setIsCartOpen(true)}
                  className="px-5 py-2.5 bg-white text-black rounded-full flex items-center gap-3 transition-all hover:bg-zinc-200"
              >
                  <ShoppingCart size={14} />
                  <motion.span 
                    key={totalItems} 
                    initial={{ scale: 1.5 }} 
                    animate={{ scale: 1 }} 
                    className="text-[10px] font-bold uppercase tracking-widest"
                  >
                    {totalItems} Allocated
                  </motion.span>
              </button>
          </div>
        </header>

        {/* Compact Single-Row Filters */}
        <div className="max-w-7xl mx-auto flex items-center overflow-x-auto scrollbar-hide gap-3 no-scrollbar">
            <div className="flex items-center gap-2">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`px-4 py-1.5 rounded-full border text-[9px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                            category === cat ? 'bg-white text-black border-white scale-105' : 'border-white/5 text-white/30 hover:border-white/20 hover:text-white'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            <div className="w-px h-3 bg-white/10 flex-shrink-0 mx-1" />
            <div className="flex items-center gap-2">
                {MEAL_TYPES.map(mt => (
                    <button
                        key={mt}
                        onClick={() => setMealType(mt)}
                        className={`px-4 py-1.5 rounded-full border text-[9px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                            mealType === mt ? 'bg-amber-400 text-black border-amber-400 scale-105' : 'border-white/5 text-white/30 hover:border-white/20 hover:text-white'
                        }`}
                    >
                        {mt}
                    </button>
                ))}
            </div>
            <div className="ml-auto pl-4 flex-shrink-0">
                <span className="text-[9px] font-bold text-white/10 uppercase tracking-[0.2em]">{filteredFoods.length} Units</span>
            </div>
        </div>
      </div>
      
      <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {loading ? (
        <div className="h-[50vh] flex flex-col items-center justify-center space-y-6">
          <Loader2 className="animate-spin text-white/10" size={48} />
          <p className="text-xs font-bold tracking-[0.5em] text-white/10 uppercase">Calibrating Flavors...</p>
        </div>
      ) : (
        <main className="max-w-7xl mx-auto space-y-12">
          <AnimatePresence mode="popLayout">
            <motion.div 
               key={`${category}-${mealType}`}
               layout
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filteredFoods.map((food, i) => (
                <motion.div
                  key={food._id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className="group relative bg-zinc-900/60 rounded-[2rem] overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500"
                >
                  <div className="aspect-square overflow-hidden bg-zinc-800">
                    <img 
                      src={food.imageUrl} 
                      alt={food.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  {/* Quick Add Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                    {!cart.find(i => i._id === food._id) ? (
                      <button 
                        onClick={() => addToCart(food)}
                        className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:scale-110 active:scale-95"
                      >
                        <Plus size={28} />
                      </button>
                    ) : (
                      <div className="flex items-center gap-4 bg-white rounded-full px-5 py-2.5 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        <button onClick={() => updateQuantity(food._id, -1)} className="text-black hover:opacity-50"><Minus size={16} /></button>
                        <span className="text-lg font-bold tabular-nums text-black min-w-[20px] text-center">{cart.find(i => i._id === food._id)?.quantity}</span>
                        <button onClick={() => updateQuantity(food._id, 1)} className="text-black hover:opacity-50"><Plus size={16} /></button>
                      </div>
                    )}
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-base font-medium leading-tight group-hover:text-white transition-colors">{food.name}</h3>
                      <span className="text-base font-bold text-white/90 whitespace-nowrap ml-4">₹{food.price}</span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-1">
                        <span className="text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-white/30 italic">
                            {food.categoryName}
                        </span>
                        {/* Mobile quick add */}
                        <button 
                            onClick={() => addToCart(food)}
                            className="sm:hidden w-8 h-8 rounded-full bg-white text-black flex items-center justify-center"
                        >
                            <Plus size={14} />
                        </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredFoods.length === 0 && (
            <div className="h-64 flex flex-col items-center justify-center space-y-4 border border-dashed border-white/5 rounded-[3rem]">
                <Search size={32} className="text-white/10" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/10">No items detected</p>
                <button onClick={() => {setCategory('All'); setMealType('All')}} className="text-xs text-white/30 underline hover:text-white transition-all">Clear Filters</button>
            </div>
          )}
        </main>
      )}
    </div>
  );
};

export default UI2;
