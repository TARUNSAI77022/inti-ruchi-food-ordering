import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Star, ShoppingCart, Heart } from 'lucide-react';

interface ThreeDCardProps {
  image: string;
  title: string;
  price: string;
  rating: number;
  category: string;
}

const ThreeDCard: React.FC<ThreeDCardProps> = ({ image, title, price, rating, category }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mX = e.clientX - rect.left;
    const mY = e.clientY - rect.top;
    
    const xPct = mX / width - 0.5;
    const yPct = mY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
    
    // For glare effect
    setMouseX((mX / width) * 100);
    setMouseY((mY / height) * 100);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      className="perspective-1000 group relative"
      style={{
        // @ts-ignore
        "--mouse-x": `${mouseX}%`,
        "--mouse-y": `${mouseY}%`,
      }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY,
          rotateX,
          transformStyle: 'preserve-3d',
        }}
        className="relative h-[420px] w-72 rounded-[2.5rem] bg-dark-800 border border-white/5 p-4 transition-shadow duration-500 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(245,158,11,0.1)]"
      >
        {/* Real 3D Glare Effect */}
        <div className="card-glare rounded-[2.5rem] z-50" />

        {/* Content Container with depth */}
        <div
          style={{
            transform: 'translateZ(60px)',
            transformStyle: 'preserve-3d',
          }}
          className="absolute inset-4 rounded-[2rem] bg-dark-700 shadow-3d-lg overflow-hidden group-hover:shadow-glow-primary transition-all duration-500"
        >
          <motion.img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
          
          {/* Category Badge - High Depth */}
          <div 
            style={{ transform: 'translateZ(80px)' }}
            className="absolute top-5 left-5 px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-xl border border-primary/30 text-primary text-[10px] font-black uppercase tracking-[0.2em] shadow-lg"
          >
            {category}
          </div>

          {/* Favorite Button */}
          <button 
            style={{ transform: 'translateZ(80px)' }}
            className="absolute top-5 right-5 p-2.5 rounded-full glass-effect border-white/10 text-white/50 hover:text-red-500 hover:bg-white/10 transition-all shadow-lg"
          >
            <Heart size={18} fill="none" />
          </button>
        </div>

        {/* Bottom Text - Medium Depth */}
        <div
          style={{
            transform: 'translateZ(40px)',
          }}
          className="absolute bottom-8 left-8 right-8"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={i < Math.floor(rating) ? "text-primary fill-primary" : "text-white/20"} size={12} />
              ))}
            </div>
            <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">{rating} (2.4k reviews)</span>
          </div>
          
          <h3 className="text-white font-black text-2xl mb-2 group-hover:text-primary transition-colors leading-tight">{title}</h3>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-white/40 font-bold uppercase">Price</span>
              <span className="text-2xl font-black text-white tracking-tighter">{price}</span>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1, rotate: -5, boxShadow: '0 0 20px rgba(245, 158, 11, 0.5)' }}
              whileTap={{ scale: 0.9 }}
              className="p-4 bg-primary text-white rounded-2xl shadow-lg transition-all"
            >
              <ShoppingCart size={20} />
            </motion.button>
          </div>
        </div>

        {/* Decorative Internal Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-[2.5rem] pointer-events-none" />
      </motion.div>

      {/* External Shadow Glow */}
      <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 -z-10" />
    </div>
  );
};

export default ThreeDCard;
