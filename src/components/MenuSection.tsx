import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuData } from '../data/menu';

const getDishImage = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('biryani') || n.includes('pulao') || n.includes('rice') || n.includes('sangati')) return '/assets/paneer-biryani.png';
  if (n.includes('mutton')) return '/assets/gongura-mutton.png';
  if (n.includes('prawn') || n.includes('royya') || n.includes('royalu')) return '/assets/prawns-fry.png';
  if (n.includes('fish') || n.includes('chepala') || n.includes('korameenu') || n.includes('chapa') || n.includes('apollo')) return '/assets/fish-pulusu.png';
  if (n.includes('chicken') || n.includes('kodi') || n.includes('natukodi')) return '/assets/chicken-vepudu.png';
  if (n.includes('paneer')) return '/assets/paneer-biryani.png';
  if (n.includes('veg') || n.includes('paneer') || n.includes('corn') || n.includes('dal') || n.includes('tomato') || n.includes('mushroom')) return '/assets/andhra-thali.png';
  return '/assets/shrimp-curry.png'; // Default fallback
};

const TiltCard: React.FC<{ name: string; price: string; description: string }> = ({ name, price, description }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const image = getDishImage(name);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      whileHover={{ y: -10, borderColor: "rgba(255,255,255,0.4)" }}
      transition={{ type: "spring", stiffness: 100, damping: 30 }}
      className="food-card perspective-1000 h-full flex flex-col items-stretch group hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-500"
    >
      <div className="tilt-inner flex flex-col space-y-4 h-full">
        {/* Top Image Thumbnail */}
        <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden relative border border-white/5 group-hover:border-white/10 transition-colors">
          <motion.img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover transition-all duration-[1500ms] ease-out grayscale-[0.2] group-hover:grayscale-0"
            whileHover={{ scale: 1.05 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        <div className="flex flex-col space-y-4 flex-1">
          <div className="flex justify-between items-start gap-4">
            <h4 className="text-xl font-medium text-white tracking-tight leading-tight group-hover:text-white transition-colors">{name}</h4>
            <span className="text-lg font-bold text-white/90 whitespace-nowrap">{price}</span>
          </div>
          <p className="text-sm text-white/40 leading-relaxed font-light group-hover:text-white/60 transition-colors">{description}</p>
          <div className="mt-auto">
             <motion.div className="w-12 h-px bg-white/20 group-hover:w-full transition-all duration-700" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const MenuSection: React.FC = () => {
  const categories = Object.keys(menuData);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <section id="menu" className="py-40 relative z-20 overflow-hidden bg-black/60">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col space-y-24">
        
        {/* Menu Header */}
        <div className="flex flex-col space-y-6 max-w-xl">
           <div className="feature-pill w-fit">Curation</div>
           <h2 className="text-5xl md:text-7xl font-light text-white tracking-tighter">
              Explore Our <br /> <span className="italic-emphasis opacity-60">Signature Menu</span>
           </h2>
        </div>

        {/* Categories Tabs */}
        <div className="flex overflow-x-auto pb-6 scrollbar-hide -mx-6 px-6">
          <div className="flex gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`menu-tab ${activeCategory === cat ? 'active' : ''}`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {menuData[activeCategory as keyof typeof menuData].map((item, idx) => (
              <TiltCard 
                key={`${activeCategory}-${idx}`} 
                name={item.name} 
                price={item.price} 
                description={item.description} 
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MenuSection;
