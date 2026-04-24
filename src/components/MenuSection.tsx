import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Search, ShoppingBag, ArrowRight } from 'lucide-react';
import api from '../services/api';
import FoodCard from './FoodCard';
import { useCart } from '../context/CartContext';
import CartOverlay from './CartOverlay';

const CATEGORIES = ['All', 'Veg', 'Non-Veg', 'Specials'] as const;
const MEAL_TYPES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'] as const;

const MenuSection: React.FC = () => {
  const [allFoods, setAllFoods]     = useState<any[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState('');
  const [category, setCategory]     = useState('All');
  const [mealType, setMealType]     = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems, totalPrice } = useCart();
  const prevParams = useRef('');

  const buildParams = useCallback(() => {
    const p: Record<string, string> = {};
    if (category !== 'All') p.category = category;
    if (mealType !== 'All') p.mealType = mealType;
    return p;
  }, [category, mealType]);

  useEffect(() => {
    const params = buildParams();
    const key = JSON.stringify(params);
    if (key === prevParams.current) return;
    prevParams.current = key;

    const fetch = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get('/foods', { params });
        setAllFoods(res.data.data ?? []);
      } catch {
        setError('Failed to load menu items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [buildParams]);

  const reset = () => { setCategory('All'); setMealType('All'); };

  return (
    <section 
        id="menu" 
        className={`min-h-screen relative z-10 py-20 md:py-24 transition-all duration-500 ease-in-out bg-black/10 backdrop-blur-[2px] ${isCartOpen ? 'lg:pr-[400px]' : 'pr-0'}`}
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 space-y-12">
        
        {/* ── Section Header ── */}
        <div className="space-y-8">
          <div className="space-y-4">
             <div className="feature-pill w-fit">Curation</div>
             <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-white uppercase italic">
               Explore Our <span className="opacity-30">Signature Menu</span>
             </h2>
          </div>

          {/* ── UI2 Style Filters ── */}
          <div className="flex items-center overflow-x-auto scrollbar-hide gap-4 pb-4 no-scrollbar">
              <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] mr-2">Category</span>
                  {CATEGORIES.map(cat => (
                      <button
                          key={cat}
                          onClick={() => setCategory(cat)}
                          className={`px-5 py-2.5 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                              category === cat ? 'bg-white text-black border-white scale-105' : 'border-white/5 text-white/30 hover:border-white/20 hover:text-white'
                          }`}
                      >
                          {cat}
                      </button>
                  ))}
              </div>
              <div className="w-px h-4 bg-white/10 flex-shrink-0 mx-2" />
              <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] mr-2">Meal Phase</span>
                  {MEAL_TYPES.map(mt => (
                      <button
                          key={mt}
                          onClick={() => setMealType(mt)}
                          className={`px-5 py-2.5 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                              mealType === mt ? 'bg-amber-400 text-black border-amber-400 scale-105' : 'border-white/5 text-white/30 hover:border-white/20 hover:text-white'
                          }`}
                      >
                          {mt}
                      </button>
                  ))}
              </div>
              <div className="ml-auto pl-4 flex-shrink-0">
                  <span className="text-[10px] font-bold text-white/10 uppercase tracking-[0.2em]">{allFoods.length} Items Found</span>
              </div>
          </div>
        </div>

        {/* ── Grid Container ── */}
        <div className="relative min-h-[400px]">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
              <Loader2 size={40} className="text-white/10 animate-spin" />
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/10">Inhaling the aroma...</p>
            </div>
          )}

          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-32 space-y-3">
              <p className="text-white/30 font-light">{error}</p>
              <button onClick={reset} className="text-xs text-white/20 underline hover:text-white transition-colors">Try again</button>
            </div>
          )}

          {!loading && !error && (
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`${category}-${mealType}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8"
              >
                {allFoods.map((item, i) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <FoodCard food={item} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {!loading && !error && allFoods.length === 0 && (
            <div className="h-96 flex flex-col items-center justify-center space-y-6">
                <Search size={48} className="text-white/10" strokeWidth={1} />
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">No culinary matches detected</p>
                <button onClick={reset} className="text-xs text-white/20 underline hover:text-white transition-all">Clear Filters</button>
            </div>
          )}
        </div>
      </div>

      <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* ── Fixed Floating Cart Button (Bottom-Right) ── */}
      <AnimatePresence>
        {totalItems > 0 && !isCartOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 50 }}
            className="fixed bottom-10 right-10 z-50"
          >
             <button 
               onClick={() => setIsCartOpen(true)}
               className="bg-black text-white pl-8 pr-6 py-4 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-white/10 flex items-center gap-6 group hover:scale-[1.05] transition-all hover:bg-zinc-900 ring-4 ring-white/5"
             >
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <ShoppingBag size={22} className="text-amber-400 group-hover:scale-110 transition-transform" />
                        <motion.span 
                            key={totalItems}
                            initial={{ scale: 1.5 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-3 -right-3 w-6 h-6 bg-white text-black text-[10px] font-black rounded-full flex items-center justify-center shadow-xl border-2 border-black"
                        >
                            {totalItems}
                        </motion.span>
                    </div>
                </div>
                <div className="flex flex-col items-start pr-4 border-r border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 leading-none mb-1.5">View Allocation</span>
                    <span className="text-lg font-bold tabular-nums">₹{totalPrice}</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-black transition-all">
                    <ArrowRight size={18} />
                </div>
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MenuSection;
