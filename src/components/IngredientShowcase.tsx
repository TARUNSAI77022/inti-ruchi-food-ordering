import React from 'react';
import { motion } from 'framer-motion';

const INGREDIENTS = [
    { 
        name: "Guntur Chillies", 
        img: "/assets/images/guntur-chillies.png", 
        desc: "Famous for their intense heat and deep red color, these are the heart of Andhra's legendary spice palate.",
        tag: "Intense Heat"
    },
    { 
        name: "Gongura Leaves", 
        img: "/assets/images/gongura-leaves.png", 
        desc: "Native sorel leaves that provide the characteristic tangy, sour flavor signature to many Deccan Leaf delicacies.",
        tag: "Tangy Core"
    },
    { 
        name: "Deccan Fish", 
        img: "/assets/images/godavari-fish.png", 
        desc: "Fresh daily catch from the Deccan rivers, delivered straight to our kitchen for the perfect fish pulusu.",
        tag: "Fresh Catch"
    },
    { 
        name: "Andhra Spices", 
        img: "/assets/images/andhra-spices.png", 
        desc: "Hand-ground spices including mustard seeds, fenugreek, and cumin roasted with heritage techniques.",
        tag: "House Blend"
    },
];

const IngredientShowcase: React.FC = () => {
    return (
        <section id="ingredients" className="relative z-30 py-32 bg-black/40">
            <div className="container mx-auto px-10">
                <div className="flex flex-col lg:flex-row justify-between items-end mb-32 space-y-12 lg:space-y-0 text-center lg:text-left">
                    <div className="space-y-6">
                        <h2 className="text-5xl lg:text-[7.5rem] font-poppins font-medium tracking-tighter text-white uppercase drop-shadow-2xl">
                            Premium <br />
                            <span className="font-serif italic text-white/40 lowercase tracking-tight">Ingredients.</span>
                        </h2>
                        <p className="text-white/30 font-poppins text-lg lg:text-2xl max-w-sm tracking-[0.3em] uppercase leading-relaxed font-medium">The Essence of Authenticity.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">
                    {INGREDIENTS.map((item, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: i * 0.15, duration: 1.2, ease: "easeOut" }}
                            className="relative group overflow-hidden rounded-[4rem] liquid-glass aspect-[3/4.5] border border-white/5 hover:border-white/20 transition-all duration-[1000ms] ease-out shadow-3xl"
                        >
                            <img 
                                src={item.img} 
                                className="w-full h-full object-cover grayscale brightness-50 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-125 transition-all duration-[3000ms] ease-in-out" 
                                alt={item.name}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-12 space-y-6 transform transition-all duration-[2000ms] ease-out group-hover:translate-y-[-20px]">
                                <div className="space-y-2">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 block mb-2">{item.tag}</span>
                                    <h4 className="text-4xl lg:text-5xl font-poppins font-semibold text-white group-hover:scale-105 transition-transform duration-1000 origin-left tracking-tight drop-shadow-2xl">{item.name}</h4>
                                </div>
                                <p className="text-sm lg:text-lg text-white/50 leading-relaxed font-poppins transition-all duration-1000 opacity-60 group-hover:opacity-100 group-hover:text-white/80 line-clamp-3">
                                  {item.desc}
                                </p>
                            </div>
                            
                            {/* Stylized Border Layer */}
                            <div className="absolute inset-4 lg:inset-8 border border-white/10 rounded-[3rem] group-hover:rounded-[2rem] opacity-0 group-hover:opacity-100 transition-all duration-1000 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default IngredientShowcase;
