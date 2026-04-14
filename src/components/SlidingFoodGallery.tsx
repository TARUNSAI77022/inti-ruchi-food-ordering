import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const dishes = [
  { 
    name: "Andhra Meals on Banana Leaf", 
    desc: "The soul of Godavari — served with love and tradition.", 
    img: "/assets/andhra-thali.png",
    tag: "Most Popular"
  },
  { 
    name: "Royyala (Prawns) Curry", 
    desc: "Juicy prawns cooked in a rich, spicy masala gravy.", 
    img: "/assets/prawns-fry.png",
    tag: "Chef Special"
  },
  { 
    name: "Godavari Spice Shrimp Curry", 
    desc: "A bold, tangy coastal delicacy with fresh shrimp.", 
    img: "/assets/shrimp-curry.png",
    tag: "New"
  },
  { 
    name: "Traditional Andhra Biryani", 
    desc: "Aromatic basmati rice layered with spice-marinated goodness.", 
    img: "/assets/paneer-biryani.png",
    tag: "Signature"
  },
  { 
    name: "Gongura Mutton", 
    desc: "Tender mutton pieces infused with tangy Roselle leaves.", 
    img: "/assets/gongura-mutton.png",
    tag: "Classic"
  },
  { 
    name: "Chicken Vepudu", 
    desc: "Spicy pan-fried chicken with curry leaves and Andhra spices.", 
    img: "/assets/chicken-vepudu.png",
    tag: "Spicy"
  },
  { 
    name: "Fish Pulusu", 
    desc: "Tangy and fiery tamarind-based sea fish curry.", 
    img: "/assets/fish-pulusu.png",
    tag: "Must Try"
  },
  { 
    name: "Andhra Fish Fry", 
    desc: "Crispy-skinned fish pieces coated in a bold spice blend.", 
    img: "/assets/fish-fry.png",
    tag: "Crispy"
  },
  { 
    name: "Gongura Chicken", 
    desc: "Classic Andhra chicken curry featuring tangy gongura leaves.", 
    img: "/assets/gongura-chicken.png",
    tag: "Popular"
  },
  { 
    name: "Paneer Biryani", 
    desc: "Fragrant biryani with marinated paneer and premium spices.", 
    img: "/assets/paneer-biryani.png",
    tag: "Vegetarian"
  }
];

const FoodCard: React.FC<{ dish: typeof dishes[0] }> = ({ dish }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="flex-shrink-0 w-[85vw] md:w-[450px] aspect-[4/5] relative rounded-3xl overflow-hidden liquid-glass border border-white/20 group"
    >
      <div className="absolute inset-0 z-0">
        <motion.img
          src={dish.img}
          alt={dish.name}
          className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>
      
      <div className="absolute top-6 right-6 z-10">
        <span className="feature-pill !bg-white !text-black !text-[0.6rem] py-1 px-3">
          {dish.tag}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-8 z-10 flex flex-col space-y-2">
        <h4 className="text-2xl font-medium text-white tracking-tight">{dish.name}</h4>
        <p className="text-sm text-white/60 leading-relaxed max-w-[90%]">{dish.desc}</p>
        <div className="w-12 h-px bg-white/30 group-hover:w-full transition-all duration-700 mt-4" />
      </div>
    </motion.div>
  );
};

const SlidingFoodGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isPaused, setIsPaused] = useState(false);

  // For infinite carousel, duplicate the dishes
  const doubledDishes = [...dishes, ...dishes];

  useEffect(() => {
    const slide = async () => {
      if (!containerRef.current) return;
      const width = containerRef.current.scrollWidth / 2;
      
      // Infinite slow scroll animation
      await controls.start({
        x: -width,
        transition: {
          duration: 40,
          ease: "linear",
          repeat: Infinity,
        }
      });
    };

    if (!isPaused) {
      slide();
    } else {
      controls.stop();
    }
  }, [controls, isPaused]);

  return (
    <section className="py-40 relative z-20 bg-black/40 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 mb-16">
        <div className="flex flex-col space-y-6">
           <div className="feature-pill w-fit">Showcase</div>
           <h2 className="text-5xl md:text-7xl font-light text-white tracking-tighter">
              Signature Dishes <br /> <span className="italic-emphasis opacity-60">from Godavari</span>
           </h2>
           <p className="text-white/40 text-lg md:text-xl leading-relaxed max-w-xl">
             Authentic Andhra flavors crafted with traditional spices and heritage cooking techniques passed through generations.
           </p>
        </div>
      </div>

      {/* Slider Container */}
      <div 
        className="relative py-10 cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <motion.div
          animate={controls}
          className="flex space-x-8 px-6 md:px-24"
          drag="x"
          dragConstraints={{ left: -3000, right: 0 }}
          style={{ width: "fit-content" }}
        >
          {doubledDishes.map((dish, idx) => (
            <FoodCard key={idx} dish={dish} />
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 mt-20 text-center md:text-left flex items-center space-x-4">
         <span className="text-white/20 uppercase tracking-[0.3em] font-medium text-[0.6rem]">Swipe / Drag To Explore More</span>
         <div className="flex-1 h-px bg-white/5" />
      </div>
    </section>
  );
};

export default SlidingFoodGallery;
