import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumNavbar from '../components/premium/PremiumNavbar';
import CartOverlay from '../components/CartOverlay';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { Hero, FoodCard, CategoryNav } from '../components/premium/ModularRedesign';
import SmartAnimation from '../components/premium/SmartAnimation';
import DeliveryFlyer from '../components/premium/DeliveryFlyer';
import type { FlyerType } from '../components/premium/DeliveryFlyer';
import IdleAssistant from '../components/premium/IdleAssistant';
import { ShoppingBag } from 'lucide-react';

const getCurrentMeal = () => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 11) return "Breakfast";
  if (hour >= 11 && hour < 16) return "Lunch";
  if (hour >= 16 && hour < 19) return "Snacks";
  if (hour >= 19 && hour < 23) return "Dinner";
  return "Lunch";
};

const getMealHeading = (meal: string) => {
  switch (meal) {
    case 'Breakfast': return { text: "Breakfast Specials ☀️", color: 'rgba(255, 215, 0, 0.1)' };
    case 'Lunch': return { text: "Lunch Combos 🍛", color: 'rgba(230, 126, 34, 0.1)' };
    case 'Snacks': return { text: "Evening Snacks 🍟", color: 'rgba(251, 191, 36, 0.1)' };
    case 'Dinner': return { text: "Dinner Feast 🔥", color: 'rgba(220, 38, 38, 0.1)' };
    default: return { text: "Chef's Specials", color: 'rgba(230, 126, 34, 0.1)' };
  }
};

const Home: React.FC = () => {
  const [foods, setFoods] = useState<any[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<string>(getCurrentMeal());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToCart, totalItems, totalPrice } = useCart();
  const cartRef = useRef<HTMLDivElement>(null);

  const [smartAnim, setSmartAnim] = useState<{
    type: 'mixing' | 'success' | 'loading' | 'idle' | 'suggestion';
    isVisible: boolean;
    message: string;
  }>({ type: 'loading', isVisible: true, message: "Cooking something delicious..." });

  const [itemsAddedCount, setItemsAddedCount] = useState(0);
  const [flyers, setFlyers] = useState<any[]>([]);
  const mealInfo = useMemo(() => getMealHeading(selectedMeal), [selectedMeal]);
  
  useEffect(() => {
    const fetchFoods = async () => {
      setSmartAnim({ type: 'loading', isVisible: true, message: "Sourcing heritage ingredients..." });
      try {
        const res = await api.get('/foods');
        const FOOD_IMAGES = [
            "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800"
        ];
        const data = (res.data.data || []).map((food: any, idx: number) => ({
          ...food,
          imageUrl: FOOD_IMAGES[idx % FOOD_IMAGES.length]
        }));
        setFoods(data);
        setTimeout(() => setSmartAnim(prev => ({ ...prev, isVisible: false })), 1000);
      } catch (err) { console.error(err); }
    };
    fetchFoods();
  }, []);

  const handleAddToCart = async (food: any, e?: React.MouseEvent) => {
    if (e) {
      const startRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const endRect = cartRef.current?.getBoundingClientRect() || { left: window.innerWidth - 60, top: window.innerHeight - 60 };
      
      const weightedList: FlyerType[] = ["bike", "bike", "bike", "scooter", "scooter", "swoosh"];
      const randomType = weightedList[Math.floor(Math.random() * weightedList.length)];
      
      const shouldShowFull = itemsAddedCount < 3 || Math.random() < 0.4;
      const type: FlyerType = shouldShowFull ? randomType : 'swoosh';

      setFlyers(prev => [...prev, {
        id: Date.now().toString(),
        start: { x: startRect.left, y: startRect.top },
        end: { x: endRect.left, y: endRect.top },
        imageUrl: food.imageUrl,
        type: type
      }]);
    }
    
    addToCart(food);
    setItemsAddedCount(prev => prev + 1);
  };

  const categories = ['Breakfast', 'Lunch', 'Snacks', 'Dinner'];
  const filteredFoods = useMemo(() => {
    return foods.filter(f => (f.mealTypeName || '').toLowerCase() === selectedMeal.toLowerCase());
  }, [foods, selectedMeal]);

  return (
    <div className="bg-[#0F0D0C] min-h-screen text-white relative overflow-hidden">
      <AnimatePresence>
        {smartAnim.isVisible && smartAnim.type === 'loading' && (
           <SmartAnimation type="loading" isVisible={true} message={smartAnim.message} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {flyers.map(flyer => (
          <DeliveryFlyer key={flyer.id} {...flyer} onComplete={() => setFlyers(prev => prev.filter(f => f.id !== flyer.id))} />
        ))}
      </AnimatePresence>

      {/* Smart Idle Assistant - Hidden when cart is open for a distraction-free experience */}
      {!isCartOpen && <IdleAssistant foods={foods} onSuggest={(f) => handleAddToCart(f)} />}

      <motion.div animate={{ backgroundColor: mealInfo.color }} className="fixed inset-0 pointer-events-none transition-colors duration-1000 z-0" />
      <PremiumNavbar onCartClick={() => setIsCartOpen(true)} />
      <Hero />

      <div className="relative z-10">
        <CategoryNav categories={categories} active={selectedMeal} onChange={(cat) => setSelectedMeal(cat)} />

        <section className="py-20 px-6 md:px-12 container mx-auto">
          <motion.div key={selectedMeal} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-20 text-center">
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white">{mealInfo.text}</h2>
            <div className="w-20 h-1 bg-[#E67E22] mx-auto mt-4" />
          </motion.div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode="popLayout">
              {filteredFoods.map((food) => (
                <FoodCard key={food._id} food={food} onAdd={(f, e) => handleAddToCart(f, e)} />
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      </div>

      <footer className="py-20 border-t border-white/5 opacity-40 text-center">
        <div className="text-[10px] font-black uppercase tracking-[0.6em]">Inti Ruchi Bhojanam © 2026</div>
      </footer>

      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div initial={{ y: 100, scale: 0.5, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 100, scale: 0.5, opacity: 0 }} className="fixed bottom-10 right-10 z-[100]" ref={cartRef}>
            <button onClick={() => setIsCartOpen(true)} className="bg-[#1A1715]/80 backdrop-blur-3xl p-4 rounded-full border border-[#E67E22]/30 shadow-2xl flex items-center gap-4 group">
              <motion.div 
                key={totalItems} 
                animate={{ 
                  scale: [1, 1.25, 1],
                  rotate: [0, 5, -5, 0] 
                }} 
                transition={{ duration: 0.3 }}
                className="w-12 h-12 bg-gradient-to-r from-[#E67E22] to-[#D4AF37] rounded-full flex items-center justify-center text-white shrink-0 shadow-lg"
              >
                <ShoppingBag size={22} />
              </motion.div>
              <div className="pr-4 border-l border-white/10 pl-4 flex flex-col items-start">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#E67E22]">{totalItems} Items</span>
                <span className="text-xl font-black italic tracking-tighter text-white">₹{totalPrice}</span>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Home;
