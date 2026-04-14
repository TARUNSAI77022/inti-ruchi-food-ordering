import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, MapPin, Award } from 'lucide-react';

const stats = [
  { icon: Heart, count: "50+", label: "Traditional Dishes" },
  { icon: Star, count: "20+", label: "Seafood Specials" },
  { icon: Award, count: "100%", label: "Authentic Recipes" },
  { icon: MapPin, count: "Fresh", label: "Regional Ingredients" }
];

const ingredients = [
  { name: "Guntur Chillies", desc: "Sun-dried fiery red chillies providing the signature Andhra heat.", icon: "🔥" },
  { name: "Gongura Leaves", desc: "Tangy Roselle leaves used in legendary meat and vegetable curries.", icon: "🌿" },
  { name: "Deccan Fish", desc: "Freshly caught local river fish prepared with secret spice blends.", icon: "🐟" },
  { name: "Andhra Spices", desc: "Hand-ground spices including coriander, cumin, and clove aromatic blends.", icon: "✨" }
];

const AndhraExperience: React.FC = () => {
  return (
    <section className="py-40 relative z-20 bg-black/50 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col space-y-40">
        
        {/* Experience Header */}
        <div className="flex flex-col items-center text-center space-y-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center space-y-6"
          >
            <div className="feature-pill">The Experience</div>
            <h2 className="text-5xl md:text-7xl font-light text-white tracking-tighter">
              Authentic Andhra <br /> <span className="italic-emphasis opacity-60">Dining Experience</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="liquid-glass-strong p-8 rounded-[40px] border-white/20 flex flex-col items-center justify-center space-y-4 hover:border-white/40 transition-colors group"
              >
                 <stat.icon className="w-8 h-8 text-white/50 group-hover:text-white transition-colors" />
                 <span className="text-4xl font-bold text-white tracking-widest">{stat.count}</span>
                 <span className="text-xs text-white/40 uppercase tracking-[0.2em] font-medium text-center">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ingredient Showcase */}
        <div className="flex flex-col space-y-24">
          <div className="flex flex-col space-y-6 max-w-xl">
             <h3 className="text-4xl md:text-5xl font-light text-white/80 tracking-tighter">
                Crafted with the <br /> <span className="italic-emphasis">Finest Ingredients</span>
             </h3>
             <p className="text-white/40 leading-relaxed max-w-sm">
                Our kitchen breathes life into traditional recipes through meticulously sourced, regional ingredients from the heart of Andhra Pradesh.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ingredients.map((ing, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="food-card flex flex-col space-y-6 group"
              >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl group-hover:bg-white/10 group-hover:scale-110 transition-all duration-500">
                     {ing.icon}
                  </div>
                  <div className="flex flex-col space-y-3">
                     <h4 className="text-xl font-medium text-white group-hover:text-white transition-colors tracking-tight">{ing.name}</h4>
                     <p className="text-sm text-white/40 leading-relaxed font-light">{ing.desc}</p>
                  </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AndhraExperience;
