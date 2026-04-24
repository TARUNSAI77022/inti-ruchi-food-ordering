import React, { useState, useEffect, Suspense, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { ChevronDown, ArrowRight, Star, Plus, Minus, X, ShoppingCart, Check, ShoppingBag, ArrowUpRight } from 'lucide-react';
import NavbarV2 from '../components/NavbarV2';
import CartOverlay from '../components/CartOverlay';
import api from '../services/api';
import { useCart } from '../context/CartContext';

// 1. MINI TOAST (REUSABLE)
const MicroToast = ({ message, isVisible }: { message: string, isVisible: boolean }) => (
    <AnimatePresence>
        {isVisible && (
            <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: -40, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute right-0 z-50 bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-glow-primary pointer-events-none"
            >
                {message}
            </motion.div>
        )}
    </AnimatePresence>
);

// 2. PREMIUM CINEMATIC CARD (3D TILT + INTERACTIVE)
const CinematicCard = ({ food, onAdd, onClick }: { food: any, onAdd: (f: any) => void, onClick: (f: any) => void }) => {
  const { cart, updateQuantity } = useCart();
  const cartItem = cart.find(i => i._id === food._id);
  const count = cartItem ? cartItem.quantity : 0;
  const [showToast, setShowToast] = useState(false);
  const [isPulse, setIsPulse] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAdd(food);
    setShowToast(true);
    setIsPulse(true);
    setTimeout(() => {
        setShowToast(false);
        setIsPulse(false);
    }, 2000);
  };

  const handleUpdate = (e: React.MouseEvent, delta: number) => {
    e.stopPropagation();
    updateQuantity(food._id, delta);
    if (delta > 0) {
        setIsPulse(true);
        setTimeout(() => setIsPulse(false), 500);
    }
  };

  return (
    <Tilt
        tiltMaxAngleX={8}
        tiltMaxAngleY={8}
        perspective={1500}
        scale={1.02}
        transitionSpeed={1500}
        className="h-full"
    >
        <motion.div
            layout
            animate={isPulse ? { scale: [1, 1.04, 1], boxShadow: "0 0 40px rgba(245,166,35,0.2)" } : {}}
            className="group relative h-full bg-[#111] rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all duration-500 shadow-2xl flex flex-col"
        >
            <div 
                className="relative h-[260px] overflow-hidden cursor-pointer"
                onClick={() => onClick(food)}
            >
                <motion.img 
                    animate={isPulse ? { scale: 1.15 } : {}}
                    src={food.imageUrl} 
                    alt={food.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-60" />
                
                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl px-3 py-1.5 flex items-center gap-1.5 z-10">
                    <Star size={12} className="text-amber-500 fill-amber-500" />
                    <span className="text-[10px] font-black tracking-widest">{food.rating || 4.8}</span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                        <ArrowUpRight size={24} className="text-white" />
                    </div>
                </div>
            </div>

            <div className="p-8 flex flex-col flex-grow space-y-6">
                <div className="space-y-2 flex-grow">
                    <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-tight group-hover:text-amber-500 transition-colors line-clamp-1">{food.name}</h3>
                    <p className="text-white/30 text-[10px] font-medium leading-relaxed italic line-clamp-2">{food.description}</p>
                </div>

                <div className="h-[72px] flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="text-3xl font-black italic tracking-tighter text-white">
                        ₹{food.price}
                    </div>
                    
                    <div className="relative flex justify-end min-w-[120px]">
                        <MicroToast message="Added ✓" isVisible={showToast} />

                        <AnimatePresence mode="wait">
                            {count === 0 ? (
                                <motion.button
                                    key="add-btn"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleAdd}
                                    className="bg-amber-500 text-white px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-glow-primary hover:scale-105 transition-all flex items-center gap-2"
                                >
                                    <Plus size={16} /> Add
                                </motion.button>
                            ) : (
                                <motion.div
                                    key="stepper"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ 
                                        opacity: 1, 
                                        scale: 1,
                                        boxShadow: ["0 0 0px rgba(245,166,35,0)", "0 0 20px rgba(245,166,35,0.2)", "0 0 0px rgba(245,166,35,0)"]
                                    }}
                                    transition={{ boxShadow: { duration: 0.5, repeat: 0 } }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-1 px-2"
                                >
                                    <button 
                                        onClick={(e) => handleUpdate(e, -1)}
                                        className="p-2 hover:text-amber-500 transition-colors text-white/40 hover:text-white"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="text-sm font-black w-4 text-center text-amber-500">{count}</span>
                                    <button 
                                        onClick={(e) => handleUpdate(e, 1)}
                                        className="p-2 hover:text-amber-500 transition-colors text-white/40 hover:text-white"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    </Tilt>
  );
};

// 3. PRODUCT SIDE PANEL
const ProductSidePanel = ({ food, isOpen, onClose, onAdd }: { food: any, isOpen: boolean, onClose: () => void, onAdd: (f: any) => void }) => {
    if (!food) return null;
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
                    />
                    <motion.div 
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-xl bg-[#0D0D0D] border-l border-white/5 z-[101] shadow-2xl p-12 overflow-y-auto"
                    >
                        <button onClick={onClose} className="absolute top-12 left-12 text-white/20 hover:text-white transition-colors">
                            <X size={32} />
                        </button>
                        <div className="mt-24 space-y-12">
                            <div className="aspect-square rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl">
                                <img src={food.imageUrl} alt={food.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="space-y-6">
                                <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-[0.9]">{food.name}</h2>
                                <p className="text-white/40 text-lg italic leading-relaxed">{food.description}</p>
                            </div>
                            <div className="pt-12 border-t border-white/5 flex items-center justify-between">
                                <div className="text-6xl font-black italic tracking-tighter">₹{food.price}</div>
                                <button
                                    onClick={() => {
                                        onAdd(food);
                                        onClose();
                                    }}
                                    className="bg-amber-500 text-white px-12 py-6 rounded-3xl font-black uppercase tracking-widest text-sm shadow-glow-primary hover:scale-105 active:scale-95 transition-all"
                                >
                                    Add to Order
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

// 4. PREMIUM COMPACT FLOATING CART (SCROLL-AWARE)
const FloatingCart = ({ onClick }: { onClick: () => void }) => {
    const { totalItems, totalPrice } = useCart();
    const { scrollY } = useScroll();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const direction = latest > lastScrollY ? "down" : "up";
        if (latest < 100) setIsVisible(true);
        else if (direction === "down" && isVisible) setIsVisible(false);
        else if (direction === "up" && !isVisible) setIsVisible(true);
        setLastScrollY(latest);
    });

    if (totalItems === 0) return null;

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ 
                y: isVisible ? 0 : 150, 
                opacity: isVisible ? 1 : 0 
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 w-full md:w-auto px-6 md:px-0"
        >
            <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClick}
                className="bg-amber-500/90 backdrop-blur-3xl p-4 md:p-5 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 flex items-center justify-between md:justify-start gap-6 cursor-pointer group transition-all"
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-amber-500 relative">
                        <ShoppingBag size={20} />
                        <motion.span 
                            key={totalItems}
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-amber-500 shadow-xl"
                        >
                            {totalItems}
                        </motion.span>
                    </div>
                    <div className="flex flex-col pr-4 border-r border-black/10">
                        <span className="text-[9px] font-black uppercase tracking-widest text-black/40">Checkout</span>
                        <span className="text-xl font-black italic tracking-tighter text-black">₹{totalPrice}</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-[9px] font-black uppercase tracking-widest text-black hidden md:block group-hover:pr-2 transition-all">View Cart</span>
                    <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ArrowRight size={16} className="text-amber-500" />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [foods, setFoods] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const { addToCart } = useCart();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await api.get('/foods');
        setFoods(res.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFoods();
  }, []);

  const filteredFoods = selectedCategory === 'All' 
    ? foods 
    : foods.filter(f => f.category?.toLowerCase().trim() === selectedCategory.toLowerCase().trim());

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-white font-poppins selection:bg-amber-500/30 selection:text-amber-500 overflow-x-hidden pb-80">
      <NavbarV2 onCartClick={() => setIsCartOpen(true)} />
      <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px] -translate-y-1/2" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] translate-y-1/2" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                <div className="space-y-10 order-2 lg:order-1">
                    <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } }}} className="space-y-8">
                        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }}} className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-amber-500 text-[10px] font-black uppercase tracking-[0.4em]">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" /> Authentic Andhra Heritage
                        </motion.div>
                        <div className="space-y-6">
                            <motion.h1 variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 }}} className="text-[5.5rem] md:text-[8rem] font-black italic tracking-tighter uppercase leading-[0.8] text-white">
                                Taste Andhra. <br /> <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-400 via-amber-100 to-amber-600">Feel the Fire.</span>
                            </motion.h1>
                            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }}} className="text-white/40 text-xl md:text-2xl italic font-medium leading-relaxed max-w-lg border-l-2 border-amber-500/40 pl-8">
                                From spicy curries to rich biryanis — crafted with tradition, served with love.
                            </motion.p>
                        </div>
                        <motion.div variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 }}} className="flex items-center gap-8 pt-6">
                            <button onClick={() => menuRef.current?.scrollIntoView({ behavior: 'smooth' })} className="px-12 py-5 bg-amber-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-glow-primary hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                                Explore Menu <ArrowRight size={18} />
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
                <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
                    <motion.div initial={{ opacity: 0, scale: 0.9, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0, y: [0, -20, 0] }} transition={{ opacity: { duration: 1 }, scale: { duration: 1 }, x: { duration: 1 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }} whileHover={{ scale: 1.05, rotate: -2 }} className="relative z-10">
                        <div className="relative group p-4">
                            <img src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=1200" alt="Authentic Hyderabadi Biryani" className="w-full max-w-[600px] aspect-square object-cover rounded-[5rem] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9)] border border-white/5" />
                            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute -bottom-6 -left-6 bg-[#111] border border-white/10 backdrop-blur-3xl p-6 rounded-[2.5rem] shadow-2xl hidden md:block">
                                <div className="space-y-1">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-amber-500">Legendary</div>
                                    <div className="text-xl font-black italic tracking-tighter text-white">Hyderabadi <br /> Biryani.</div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
      </section>

      <section ref={menuRef} className="relative z-10 py-32 px-6 md:px-12 container mx-auto bg-[#050505]">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px]" />
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12 relative z-10"
        >
            <div className="space-y-4">
                <div className="text-amber-500 font-black uppercase tracking-[0.6em] text-[10px] flex items-center gap-4">
                    <div className="w-12 h-[1px] bg-amber-500/30" />
                    The Heritage Series
                </div>
                <h2 className="text-[6rem] md:text-[10rem] font-black italic tracking-tighter uppercase leading-[0.8]">
                    Digital <br /> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/20 via-white/5 to-transparent italic">
                        Menu
                    </span>
                </h2>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
                {['All', 'Signature', 'Classic', 'Deluxe', 'Sweets'].map((cat) => (
                    <motion.button 
                        key={cat} 
                        onClick={() => setSelectedCategory(cat)}
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(245,166,35,0.1)', borderColor: 'rgba(245,166,35,0.3)' }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-8 py-3 rounded-2xl border transition-all backdrop-blur-xl text-[10px] font-black uppercase tracking-widest ${
                            selectedCategory === cat 
                            ? 'bg-amber-500 text-white border-amber-500 shadow-glow-primary' 
                            : 'bg-white/5 border-white/5 text-white/40 hover:text-white'
                        }`}
                    >
                        {cat}
                    </motion.button>
                ))}
            </div>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10"
        >
            {filteredFoods.map((food) => (
                <CinematicCard 
                    key={food._id} 
                    food={food} 
                    onAdd={(f) => addToCart(f)} 
                    onClick={(f) => setSelectedFood(f)}
                />
            ))}
        </motion.div>
      </section>

      <ProductSidePanel 
        food={selectedFood} 
        isOpen={!!selectedFood} 
        onClose={() => setSelectedFood(null)} 
        onAdd={(f) => addToCart(f)}
      />

      <FloatingCart onClick={() => setIsCartOpen(true)} />
      <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(245,166,35,0.05)_0%,transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-amber-500/2 rounded-full blur-[150px]" />
      </div>
    </div>
  );
};

export default Home;
