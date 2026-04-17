import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DemoFood } from '../../data/filterDemoData';

interface FoodGridProps {
  foods: DemoFood[];
  animKey: string;
}

const FoodGrid: React.FC<FoodGridProps> = ({ foods, animKey }) => {
  if (foods.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl">🍽️</div>
        <p className="text-white/30 text-xs font-bold uppercase tracking-widest">No dishes found</p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={animKey}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
      >
        {foods.map((food, i) => (
          <motion.div
            key={food.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
            className={`group bg-zinc-900/60 border rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 ${
              food.available ? 'border-white/5' : 'border-white/5 opacity-50'
            }`}
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src={food.imageUrl}
                alt={food.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {!food.available && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 border border-white/20 px-3 py-1 rounded-full">Unavailable</span>
                </div>
              )}
              <span className={`absolute top-2 left-2 text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border ${
                food.category === 'Veg'
                  ? 'bg-green-400/20 border-green-400/30 text-green-400'
                  : food.category === 'Non-Veg'
                  ? 'bg-red-400/20 border-red-400/30 text-red-400'
                  : 'bg-amber-400/20 border-amber-400/30 text-amber-400'
              }`}>
                {food.category}
              </span>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-start gap-2">
                <h4 className="text-sm font-semibold text-white leading-tight">{food.name}</h4>
                <span className="text-sm font-bold text-white/80 whitespace-nowrap">₹{food.price}</span>
              </div>
              <p className="text-[11px] text-white/40 leading-relaxed">{food.description}</p>
              <span className="inline-block text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/30">
                {food.mealType}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default FoodGrid;
