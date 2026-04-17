import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, SlidersHorizontal, ChevronRight, Loader2, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import FoodCard from '../../components/FoodCard';
import { useCart } from '../../context/CartContext';
import CartOverlay from '../../components/CartOverlay';

const CATEGORIES = ['All', 'Veg', 'Non-Veg', 'Specials'];
const MEAL_TYPES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'];

const UI1: React.FC = () => {
  const [foods, setFoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [mealType, setMealType] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      try {
        const params: any = {};
        if (category !== 'All') params.category = category;
        if (mealType !== 'All') params.mealType = mealType;
        
        const res = await api.get('/foods', { params });
        setFoods(res.data.data ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, [category, mealType]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">
      {/* Top Nav */}
      <nav className="border-b border-white/5 px-8 h-20 flex items-center justify-between sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl">
        <Link to="/ui" className="flex items-center gap-2 text-white/40 hover:text-white transition-all group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Sandbox</span>
        </Link>
        <h1 className="text-sm font-bold uppercase tracking-[0.4em] text-white/20">Design 01: Split Screen</h1>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all group"
        >
          <ShoppingCart size={14} />
          <span className="text-[10px] font-bold uppercase tracking-widest">{totalItems}</span>
        </button>
      </nav>
      <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-72 border-r border-white/5 p-8 space-y-10 hidden lg:block overflow-y-auto max-h-[calc(100vh-80px)] sticky top-20">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white/40">
              <SlidersHorizontal size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Filters</span>
            </div>
            <div className="h-px bg-white/5 w-full" />
          </div>

          {/* Category */}
          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">Category</p>
            <div className="space-y-1">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all flex items-center justify-between group ${
                    category === cat ? 'bg-white/10 text-white font-medium' : 'text-white/40 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {cat}
                  {category === cat && <ChevronRight size={14} />}
                </button>
              ))}
            </div>
          </div>

          {/* Meal Type */}
          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">Meal Type</p>
            <div className="space-y-1">
              {MEAL_TYPES.map(mt => (
                <button
                  key={mt}
                  onClick={() => setMealType(mt)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all flex items-center justify-between group ${
                    mealType === mt ? 'bg-amber-400/10 text-amber-400 font-medium border border-amber-400/20' : 'text-white/40 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {mt}
                  {mealType === mt && <ChevronRight size={14} />}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 lg:p-12">
          {loading ? (
            <div className="h-96 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="animate-spin text-white/20" size={32} />
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 text-center">Inhaling the aroma...</p>
            </div>
          ) : (
            <div className="space-y-12">
              <div className="space-y-2">
                <h2 className="text-4xl font-light tracking-tighter uppercase italic">{category} Selection</h2>
                <p className="text-xs text-white/30 tracking-widest uppercase">{foods.length} items found</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {foods.map((food, i) => (
                  <motion.div
                    key={food._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <FoodCard food={food} />
                  </motion.div>
                ))}
              </div>
              
              {foods.length === 0 && (
                <div className="h-64 flex flex-col items-center justify-center text-white/20 space-y-4 border border-dashed border-white/5 rounded-[3rem]">
                   <p className="uppercase text-[10px] font-bold tracking-widest">No culinary matches found</p>
                   <button onClick={() => {setCategory('All'); setMealType('All')}} className="text-xs underline">Clear Filters</button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UI1;
