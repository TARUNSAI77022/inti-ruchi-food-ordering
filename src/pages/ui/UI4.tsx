import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { CATEGORIES, MEAL_TYPES, FOODS, filterFoods } from '../../data/filterDemoData';
import FoodGrid from '../../components/ui/FoodGrid';

interface SegmentedProps {
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  accent?: 'white' | 'amber';
}

const Segmented: React.FC<SegmentedProps> = ({ options, value, onChange, accent = 'white' }) => {
  const activeClass = accent === 'amber'
    ? 'bg-amber-400 text-black shadow-[0_2px_12px_rgba(251,191,36,0.4)]'
    : 'bg-white text-black shadow-[0_2px_12px_rgba(255,255,255,0.2)]';

  return (
    <div className="inline-flex p-1 bg-zinc-900 border border-white/5 rounded-2xl">
      {options.map((opt, i) => {
        const isActive = value === opt;
        const isFirst  = i === 0;
        const isLast   = i === options.length - 1;
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`relative px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-all duration-200
              ${isFirst ? 'rounded-l-xl' : ''}
              ${isLast  ? 'rounded-r-xl' : ''}
              ${!isFirst && !isLast ? '' : ''}
              ${isActive ? `${activeClass} rounded-xl z-10` : 'text-white/40 hover:text-white/70'}
            `}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
};

const UI4: React.FC = () => {
  const [category, setCategory] = useState('All');
  const [mealType, setMealType] = useState('All');
  const filtered = filterFoods(FOODS, category, mealType);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Top nav */}
      <div className="sticky top-0 z-50 border-b border-white/5 bg-[#050505]/90 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
        <Link to="/ui" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm">
          <ArrowLeft size={16} /> Back
        </Link>
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Design 04</p>
          <h1 className="text-sm font-semibold tracking-tight">Segmented Control</h1>
        </div>
        <div className="w-16" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        {/* Heading */}
        <div className="space-y-1">
          <h2 className="text-4xl font-light tracking-tighter">Explore Menu</h2>
          <p className="text-white/30 text-sm">{filtered.length} dishes available</p>
        </div>

        {/* ── FILTER PANEL ── */}
        <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 space-y-6">
          {/* Category segmented */}
          <div className="space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Category</p>
            <div className="overflow-x-auto pb-1">
              <Segmented options={CATEGORIES} value={category} onChange={setCategory} accent="white" />
            </div>
          </div>

          <div className="h-px bg-white/5" />

          {/* Meal type segmented */}
          <div className="space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Meal Type</p>
            <div className="overflow-x-auto pb-1">
              <Segmented options={MEAL_TYPES} value={mealType} onChange={setMealType} accent="amber" />
            </div>
          </div>

          {/* Reset button */}
          {(category !== 'All' || mealType !== 'All') && (
            <div className="flex justify-end">
              <button
                onClick={() => { setCategory('All'); setMealType('All'); }}
                className="text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors"
              >
                ↺ Reset filters
              </button>
            </div>
          )}
        </div>

        {/* ── STATS BAR ── */}
        <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-white/20">
          <span>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
          {category !== 'All' && (
            <><span className="text-white/10">·</span><span className="text-white/40">{category}</span></>
          )}
          {mealType !== 'All' && (
            <><span className="text-white/10">·</span><span className="text-amber-400/60">{mealType}</span></>
          )}
          <div className="flex-1 h-px bg-white/5" />
        </div>

        {/* Food grid */}
        <FoodGrid foods={filtered} animKey={`${category}-${mealType}`} />
      </div>
    </div>
  );
};

export default UI4;
