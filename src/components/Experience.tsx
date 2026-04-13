import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Leaf, Flame, Heart, Zap, HeartPulse, Droplets } from 'lucide-react';

const STATS = [
    { label: "Traditional Dishes", value: "50+", sub: "Authentic Andhra", icon: <Leaf size={28} /> },
    { label: "Seafood Specials", value: "20+", sub: "Fresh Daily Catch", icon: <Flame size={28} /> },
    { label: "Authentic Recipes", value: "100%", sub: "Zero Compromise", icon: <Heart size={28} /> },
    { label: "Regional Ingredients", value: "Fresh", sub: "Locally Sourced", icon: <Zap size={28} /> },
];

const Experience: React.FC = () => {
    const { scrollYProgress } = useScroll();
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
    const r1 = useTransform(scrollYProgress, [0, 1], [0, 90]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 400]);
    const r2 = useTransform(scrollYProgress, [0, 1], [0, -45]);

    return (
        <section id="experience" className="relative z-30 py-64 overflow-hidden bg-black/40">
            {/* Parallax Background Elements */}
            <motion.div style={{ y: y1, rotate: r1 }} className="absolute -left-20 top-1/4 opacity-5 pointer-events-none scale-150 text-white">
                <Leaf size={140} />
            </motion.div>
            <motion.div style={{ y: y2, rotate: r2 }} className="absolute -right-32 bottom-1/3 opacity-5 pointer-events-none scale-150 text-white">
                <Flame size={200} />
            </motion.div>

            <div className="container mx-auto px-10">
                <div className="text-center mb-40 space-y-8">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="h-3 w-28 bg-white/10 mx-auto rounded-full"
                    />
                    <motion.h2 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="text-6xl lg:text-[10rem] font-poppins font-semibold tracking-tighter uppercase leading-[0.95]"
                    >
                        Authentic Andhra <br />
                        <span className="font-serif italic text-white/40 lowercase tracking-tight">Dining Experience.</span>
                    </motion.h2>
                    <p className="text-white/30 font-poppins text-lg lg:text-2xl max-w-2xl mx-auto tracking-[0.3em] uppercase leading-relaxed font-medium">The heart of Godavari on your plate.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-48 relative z-20">
                    {STATS.map((stat, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: i * 0.15, duration: 1, ease: "easeOut" }}
                            whileHover={{ y: -15, scale: 1.05 }}
                            className="liquid-glass-strong p-12 rounded-[4rem] text-center group border border-white/5 hover:border-white/30 transition-all duration-1000 shadow-3xl overflow-hidden relative"
                        >
                            <div className="absolute inset-0 bg-white/[0.03] translate-y-full group-hover:translate-y-0 transition-transform duration-1000" />
                            
                            <div className="relative z-10 mx-auto h-20 w-20 liquid-glass flex items-center justify-center rounded-3xl mb-10 group-hover:bg-white group-hover:text-black transition-all duration-1000 shadow-2xl border border-white/10 group-hover:rotate-12 group-hover:scale-110">
                               {stat.icon}
                            </div>
                            <h3 className="relative z-10 text-6xl lg:text-7xl font-poppins font-medium mb-4 group-hover:scale-110 transition-transform duration-1000 tracking-tighter drop-shadow-2xl">{stat.value}</h3>
                            <div className="relative z-10 space-y-1">
                               <p className="text-white/60 text-[11px] uppercase tracking-[0.4em] font-bold">{stat.label}</p>
                               <p className="text-white/30 text-[9px] uppercase font-bold tracking-[0.3em] font-poppins">{stat.sub}</p>
                            </div>
                            
                            {/* Stylish border overlay on hover */}
                            <div className="absolute inset-6 border border-white/5 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-all duration-1000 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
