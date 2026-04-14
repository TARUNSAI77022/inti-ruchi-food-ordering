import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

import { menuData as MENU_DATA } from '../data/menu';

const MenuCuration: React.FC = () => {
    const [activeTab, setActiveTab] = useState<keyof typeof MENU_DATA>('Starters');

    return (
        <section id="menu" className="relative z-30 py-32 bg-black/40">
            <div className="container mx-auto px-10">
                
                <div className="flex flex-col items-center mb-32 space-y-12">
                    <h2 className="text-6xl lg:text-[9rem] font-poppins font-medium tracking-tighter text-center uppercase drop-shadow-2xl">
                        The <span className="font-serif italic text-white/40 lowercase underline-offset-[1.5rem] decoration-white/10">Curation.</span>
                    </h2>
                    
                    {/* Custom Integrated Tabs */}
                    <div className="flex flex-wrap justify-center gap-4 bg-white/5 backdrop-blur-3xl p-3 lg:p-4 rounded-[4rem] border border-white/5 max-w-full overflow-x-auto no-scrollbar shadow-3xl">
                        {Object.keys(MENU_DATA).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`px-10 py-5 rounded-full text-[11px] font-bold uppercase tracking-[0.4em] transition-all duration-[1000ms] whitespace-nowrap shadow-xl ${activeTab === tab ? 'bg-white text-black scale-110' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Animated Menu Grid */}
                <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14"
                >
                    <AnimatePresence mode="popLayout">
                        {MENU_DATA[activeTab].map((item, i) => (
                            <FoodCard key={item.name} item={item} index={i} />
                        ))}
                    </AnimatePresence>
                </motion.div>
                
                {/* Visual anchor at the end of the menu */}
                <div className="mt-40 text-center space-y-4">
                   <div className="h-[1px] w-48 bg-white/10 mx-auto" />
                   <p className="text-[10px] uppercase font-bold tracking-[0.8em] text-white/20">Handcrafted Heritage</p>
                </div>
            </div>
        </section>
    );
};

const FoodCard = ({ item, index }: { item: any, index: number }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: index * 0.05, ease: "easeOut" }}
            className="group relative flex flex-col liquid-glass-strong rounded-[3rem] p-10 lg:p-14 border border-white/5 shadow-3xl tilt-card hover:border-white/20 transition-all duration-1000 overflow-hidden"
        >
            <div className="flex flex-col h-full space-y-10 relative z-10 translate-z-20">
                <div className="flex justify-between items-start">
                    <div className="space-y-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 group-hover:text-white/70 block transition-all">
                            {item.name.toLowerCase().includes('must try') ? 'Must Try' : 'Special'}
                        </span>
                        <h3 className="text-4xl lg:text-5xl font-poppins font-semibold text-white leading-none tracking-tighter group-hover:scale-105 transition-all duration-1000 origin-left uppercase drop-shadow-2xl">
                            {item.name}
                        </h3>
                    </div>
                    <div className="liquid-glass h-12 w-12 flex items-center justify-center rounded-2xl group-hover:bg-white group-hover:text-black transition-all duration-1000 shadow-2xl border border-white/10">
                        <ChevronRight size={20} />
                    </div>
                </div>

                <p className="text-sm lg:text-lg text-white/40 leading-[1.8] font-poppins line-clamp-3 transition-opacity duration-1000 group-hover:text-white/70 tracking-wide">
                    {item.description}
                </p>
                
                <div className="flex justify-between items-center mt-auto pt-10 border-t border-white/5 translate-z-40">
                    <div className="flex items-baseline space-x-2">
                        <span className="text-2xl lg:text-3xl font-poppins font-medium group-hover:scale-105 transition-transform duration-1000 tracking-tighter drop-shadow-2xl">{item.price}</span>
                    </div>
                    <button className="h-12 w-28 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all duration-1000 text-[10px] uppercase font-bold tracking-[0.4em] active:scale-90 shadow-2xl leading-none">
                        DETAILS
                    </button>
                </div>
            </div>
            
            {/* Background Texture / Hover Glow */}
            <div className="absolute -bottom-10 -right-10 h-64 w-64 bg-white/[0.03] blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000" />
            <div className="absolute inset-8 border border-white/5 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-all duration-1000 pointer-events-none" />
        </motion.div>
    );
};

export default MenuCuration;
