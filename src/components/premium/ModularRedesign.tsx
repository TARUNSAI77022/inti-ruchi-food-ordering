import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Plus, Minus, Flame, Sparkles, Utensils, Zap, Coffee } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import SteamEffect from './SteamEffect';

// --- ANIMATION VARIANTS ---
const itemVariants: any = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

// --- HELPER: CATEGORY STYLE CONFIG ---
const getCategoryStyles = (category: string) => {
  const cat = (category || 'Dinner').toLowerCase();
  if (cat.includes('breakfast')) return { icon: <Coffee size={14} />, glow: "rgba(255, 215, 0, 0.4)", text: "Preparing Fresh...", miniEffect: "☁️" };
  if (cat.includes('lunch')) return { icon: <Utensils size={14} />, glow: "rgba(230, 126, 34, 0.4)", text: "Cooking Meal...", miniEffect: "🍽️" };
  if (cat.includes('snacks')) return { icon: <Zap size={14} />, glow: "rgba(251, 191, 36, 0.4)", text: "Hot & Crispy!", miniEffect: "🍟" };
  return { icon: <Flame size={14} />, glow: "rgba(220, 38, 38, 0.4)", text: "Slow Cooking...", miniEffect: "🔥" };
};

// --- COMPONENT: FOOD CARD ---
export const FoodCard = ({ food, onAdd }: { food: any, onAdd: (f: any, e?: React.MouseEvent) => void }) => {
  const { cart, updateQuantity } = useCart();
  const cartItem = cart.find(i => i._id === food._id);
  const count = cartItem ? cartItem.quantity : 0;
  const [isExpanded, setIsExpanded] = useState(false);
  const [microEffect, setMicroEffect] = useState<string | null>(null);

  const styles = useMemo(() => getCategoryStyles(food.categoryName || food.category?.name || 'Dinner'), [food]);

  const handleAdd = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // 1. Instant Response (Lift + Glow)
    setMicroEffect('scale');
    setTimeout(() => setMicroEffect(null), 300);

    // 2. Global Add
    onAdd(food, e);
  };

  return (
    <motion.div
      layout
      variants={itemVariants}
      animate={microEffect === 'scale' ? { 
        scale: [1, 1.02, 1],
        boxShadow: "0 0 40px rgba(230,126,34,0.2)"
      } : {}}
      className="premium-card group h-full flex flex-col p-6 bg-[#1A1715] border border-white/5 rounded-[2.5rem] relative overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
    >
      {/* Image Area */}
      <div 
        className={`relative overflow-hidden rounded-[2rem] cursor-pointer mb-6 transition-all duration-700 ${isExpanded ? 'scale-110 shadow-2xl' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <motion.img 
          src={food.imageUrl} 
          alt={food.name} 
          className="w-full aspect-square object-cover" 
          animate={{ 
            scale: isExpanded ? 1.2 : 1,
            y: microEffect ? -8 : 0 // FOOD LIFT EFFECT
          }} 
        />
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0'}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0D0C] via-transparent to-transparent opacity-80" />
        
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-3 py-1 flex items-center gap-1.5 z-10">
          <Star size={10} className="text-[#D4AF37] fill-[#D4AF37]" />
          <span className="text-[10px] font-bold text-white">{food.rating || 4.8}</span>
        </div>
      </div>

      <div className="flex flex-col flex-grow">
        <div className="space-y-2 flex-grow mb-6">
          <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.3em] text-[#E67E22]">
            {styles.icon} {typeof food.category === 'object' ? food.category.name : (food.category || 'Traditional')}
          </div>
          <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-tight group-hover:text-[#E67E22] transition-colors text-white">
            {food.name}
          </h3>
          {!isExpanded && <p className="text-white/30 text-[10px] font-medium leading-relaxed italic line-clamp-1">{food.description}</p>}
          <AnimatePresence>
            {isExpanded && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-white/40 text-xs font-medium leading-relaxed italic"
              >
                {food.description}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[8px] font-black uppercase tracking-widest text-white/20">Valuation</span>
            <span className="text-2xl font-black italic tracking-tighter text-white">₹{food.price}</span>
          </div>
          
          <div className="h-[54px] flex items-center justify-end min-w-[120px]">
            <AnimatePresence mode="wait">
              {count === 0 ? (
                <motion.button
                  key="add"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdd}
                  className="bg-gradient-to-r from-[#E67E22] to-[#D4AF37] text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center relative overflow-hidden transition-all hover:scale-110 active:scale-95"
                >
                  <Plus size={20} />
                </motion.button>
              ) : (
                <motion.div
                  key="stepper"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/5 border border-white/10 rounded-full flex items-center overflow-hidden"
                >
                  <button onClick={(e) => { e.stopPropagation(); updateQuantity(food._id, -1); }} className="p-4 text-white/40 hover:text-white transition-colors">
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-black w-6 text-center text-[#E67E22]">{count}</span>
                  <button onClick={(e) => { e.stopPropagation(); updateQuantity(food._id, 1); }} className="p-4 text-white/40 hover:text-white transition-colors">
                    <Plus size={14} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- COMPONENT: DYNAMIC SMART HERO ---
export const Hero = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const headingWords = "THE ART OF DUM.".split(" ");

  // --- TIME-BASED IMAGE GROUPS ---
  const heroData = useMemo(() => {
    const hour = new Date().getHours();
    
    // Morning (6AM–11AM)
    if (hour >= 6 && hour < 11) return {
      category: 'Morning',
      images: [
        { url: "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&q=80&w=1200", title: "Fluffy Idli", sub: "Start fresh with the classics." },
        { url: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=1200", title: "Crispy Dosa", sub: "Gently golden, perfectly thin." },
        { url: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?auto=format&fit=crop&q=80&w=1200", title: "Filter Coffee", sub: "The aroma of heritage." }
      ],
      effect: <motion.div animate={{ y: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute inset-0 bg-white/5 pointer-events-none" />
    };
    
    // Lunch (12PM–4PM)
    if (hour >= 11 && hour < 16) return {
      category: 'Lunch',
      images: [
        { url: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=1200", title: "Grand Thali", sub: "The complete midday feast." },
        { url: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=1200", title: "Signature Biryani", sub: "The heartbeat of Andhra." },
        { url: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=1200", title: "Traditional Curries", sub: "Spice, soul, and fire." }
      ],
      effect: <div className="absolute inset-0 pointer-events-none opacity-40"><SteamEffect /></div>
    };
    
    // Evening (4PM–7PM)
    if (hour >= 16 && hour < 19) return {
      category: 'Evening',
      images: [
        { url: "https://images.unsplash.com/photo-1594631252845-29fc4586c567?auto=format&fit=crop&q=80&w=1200", title: "Masala Chai", sub: "Warmth in every sip." },
        { url: "https://images.unsplash.com/photo-1601050638917-3f048d79730a?auto=format&fit=crop&q=80&w=1200", title: "Golden Samosa", sub: "Perfectly crispy, perfectly spiced." },
        { url: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=1200", title: "Medu Vada", sub: "The evening crunch." }
      ],
      effect: <motion.div animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute inset-0 bg-[#E67E22]/10 blur-3xl pointer-events-none" />
    };
    
    // Night (7PM–11PM)
    return {
      category: 'Night',
      images: [
        { url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=1200", title: "Handi Biryani", sub: "Slow-cooked for the soul." },
        { url: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&q=80&w=1200", title: "Premium Curries", sub: "Cinema on a plate." },
        { url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=1200", title: "Midnight Plating", sub: "Heritage after dark." }
      ],
      effect: <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute inset-0 bg-red-900/10 blur-[100px] pointer-events-none" />
    };
  }, []);

  // --- AUTOMATIC ROTATION ---
  useEffect(() => {
    const timer = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % heroData.images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroData.images.length]);

  const currentHero = heroData.images[imageIndex];

  return (
    <section className="min-h-[95vh] flex items-center pt-32 pb-20 px-6 md:px-12 container mx-auto overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl bg-radial-gradient from-[#E67E22]/10 to-transparent blur-[120px] pointer-events-none" />
      
      <div className="grid lg:grid-cols-2 gap-20 items-center w-full relative z-10">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-12">
          <motion.div variants={itemVariants} className="flex items-center gap-4 text-[#D4AF37] text-[11px] font-black uppercase tracking-[0.6em]">
            <Sparkles size={14} className="animate-pulse" /> {heroData.category} Selection • Inti Ruchi
          </motion.div>
          <div className="overflow-hidden">
            <h1 className="text-8xl md:text-[10rem] font-black italic tracking-[-0.05em] uppercase leading-[0.75] text-white flex flex-wrap gap-x-6">
              {headingWords.map((word, i) => (
                <motion.span key={i} initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }} className="inline-block">{word}</motion.span>
              ))}
            </h1>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={imageIndex} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4 max-w-lg">
              <p className="text-white/60 text-3xl font-light italic leading-relaxed tracking-wide">{currentHero.title}</p>
              <p className="text-[#E67E22] text-sm font-black uppercase tracking-[0.2em]">{currentHero.sub}</p>
            </motion.div>
          </AnimatePresence>
          <motion.div variants={itemVariants} className="flex items-center gap-8 pt-4">
            <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(230,126,34,0.4)" }} whileTap={{ scale: 0.95 }} className="btn-premium px-12 py-5">Order Now</motion.button>
            <button className="text-white/40 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors flex items-center gap-3 group">Our Legacy <div className="w-12 h-[1px] bg-white/10 group-hover:w-20 transition-all duration-500" /></button>
          </motion.div>
        </motion.div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[650px] aspect-square flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={imageIndex}
                initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="relative w-full h-full"
              >
                <img 
                  src={currentHero.url} 
                  alt={currentHero.title} 
                  className="w-full h-full object-cover rounded-[5rem] shadow-2xl border border-white/5" 
                />
                <div className="absolute inset-0 rounded-[5rem] overflow-hidden pointer-events-none">
                  {heroData.effect}
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Carousel Indicators */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
              {heroData.images.map((_, i) => (
                <div key={i} className={`h-1 transition-all duration-500 rounded-full ${i === imageIndex ? 'w-12 bg-[#E67E22]' : 'w-4 bg-white/10'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- COMPONENT: CATEGORY NAV ---
export const CategoryNav = ({ categories, active, onChange }: { categories: string[], active: string, onChange: (c: string) => void }) => {
  return (
    <div className="sticky top-20 z-50 py-10 bg-[#0F0D0C]/80 backdrop-blur-md">
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-center gap-4 overflow-x-auto scrollbar-hide pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 border whitespace-nowrap ${
              active === cat 
                ? 'bg-[#E67E22] border-[#E67E22] text-white shadow-[0_0_25px_rgba(230,126,34,0.4)] scale-110' 
                : 'bg-white/5 border-white/10 text-white/40 hover:border-white/30 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};
