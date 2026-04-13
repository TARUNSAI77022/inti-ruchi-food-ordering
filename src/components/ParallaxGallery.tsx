import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const GALLERY_ITEMS = [
    { 
        img: "/assets/images/andhra-thali.png", 
        label: "Andhra Thali", 
        speed: 0.1,
        subtitle: "The Ultimate Feast"
    },
    { 
        img: "/assets/images/chicken-vepudu.png", 
        label: "Spicy Chicken Fry", 
        speed: 0.2,
        subtitle: "Classic Delicacy"
    },
    { 
        img: "/assets/images/gongura-mutton.png", 
        label: "Gongura Mutton", 
        speed: 0.05,
        subtitle: "Heritage Recipe"
    },
    { 
        img: "/assets/images/paneer-biryani.png", 
        label: "Paneer Biryani", 
        speed: 0.15,
        subtitle: "Coastal Special"
    },
];

const ParallaxGallery: React.FC = () => {
    return (
        <section id="gallery" className="relative z-30 py-64">
            <div className="container mx-auto px-10 overflow-hidden">
                <div className="text-center mb-40 space-y-4">
                    <h2 className="text-6xl lg:text-[11rem] font-poppins font-medium tracking-tighter uppercase text-white drop-shadow-2xl">
                        Cinematic <br />
                        <span className="font-serif italic text-white/40 lowercase tracking-tight">Culinary Art.</span>
                    </h2>
                    <p className="text-white/30 max-w-lg mx-auto uppercase text-[11px] tracking-[0.5em] font-bold">Tradition served on every plate.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 relative z-10">
                    {GALLERY_ITEMS.map((item, i) => (
                        <ParallaxImage key={i} item={item} />
                    ))}
                </div>
            </div>
            
            {/* Background Texture Overlay */}
            <div className="absolute inset-x-0 bottom-0 py-64 opacity-20 pointer-events-none grayscale brightness-50 contrast-125">
                 <img src="/assets/images/andhra-thali.png" className="w-full h-full object-cover scale-150 blur-3xl" alt="texture" />
            </div>
        </section>
    );
};

const ParallaxImage = ({ item }: { item: any }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 250 * item.speed * 10]);

    return (
        <div ref={ref} className="relative aspect-[3/4.5] rounded-[5rem] overflow-hidden liquid-glass border border-white/5 group shadow-3xl transform transition-all duration-[2000ms] ease-out">
            <motion.div style={{ y }} className="absolute -inset-24">
                <img 
                    src={item.img} 
                    alt={item.label} 
                    className="w-full h-full object-cover grayscale brightness-50 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-[3000ms] ease-in-out" 
                />
            </motion.div>
            <div className="absolute inset-x-0 bottom-0 p-16 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end space-y-4 translate-y-12 lg:translate-y-0 group-hover:translate-y-0 lg:opacity-0 group-hover:opacity-100 transition-all duration-[1500ms] ease-out">
                <h4 className="text-5xl lg:text-6xl font-serif italic text-white lowercase tracking-tight group-hover:scale-110 transition-transform duration-1000 origin-left">{item.label}</h4>
                <p className="text-[11px] uppercase tracking-[0.5em] font-bold text-white/40">{item.subtitle}</p>
            </div>
            
            {/* Perspective Decorative Overlay */}
            <div className="absolute top-16 left-16 h-1 w-16 bg-white/20 group-hover:w-48 transition-all duration-[2000ms] ease-out border-none opacity-40 group-hover:opacity-100" />
            <div className="absolute inset-8 border border-white/5 rounded-[4rem] group-hover:rounded-[3rem] transition-all duration-[1500ms] ease-out pointer-events-none" />
        </div>
    );
};

export default ParallaxGallery;
