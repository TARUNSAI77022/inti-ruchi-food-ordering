import React from 'react';
import { motion } from 'framer-motion';
import PremiumNavbar from '../../components/premium/PremiumNavbar';
import PremiumHero from '../../components/premium/PremiumHero';
import ThreeDCard from '../../components/premium/ThreeDCard';
import GlassPanel from '../../components/premium/GlassPanel';
import { Utensils, Clock, ShieldCheck, Truck, Sparkles } from 'lucide-react';

const PremiumDemo = () => {
  const foodItems = [
    {
      title: "Royal Thali",
      price: "$24.99",
      rating: 4.9,
      category: "Traditional",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Spicy Ramen",
      price: "$18.50",
      rating: 4.8,
      category: "Japanese",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Gourmet Burger",
      price: "$15.99",
      rating: 4.7,
      category: "Western",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Avocado Salad",
      price: "$12.99",
      rating: 4.9,
      category: "Healthy",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const features = [
    { icon: <Utensils />, title: "Master Chefs", desc: "Crafted by world-class culinary experts." },
    { icon: <Clock />, title: "Fast Delivery", desc: "Under 30 minutes or it's on us." },
    { icon: <ShieldCheck />, title: "Pure Quality", desc: "Strict hygiene and organic ingredients." },
    { icon: <Truck />, title: "Eco-Friendly", desc: "Sustainable packaging and delivery." }
  ];

  return (
    <div className="min-h-screen bg-dark-900 text-white font-poppins selection:bg-primary/30 selection:text-primary relative overflow-x-hidden">
      {/* Page-wide Layered Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="mesh-gradient absolute inset-0 opacity-40" />
        <div className="noise-bg" />
        <div className="absolute top-[20%] right-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <PremiumNavbar />
      
      <main className="relative z-10">
        <PremiumHero />

        {/* Featured Section */}
        <section className="py-32 container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 text-primary font-black tracking-[0.3em] uppercase text-xs mb-4"
              >
                <Sparkles size={16} />
                <span>Curated Selection</span>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-6xl font-black tracking-tighter"
              >
                Discover Our <span className="text-gradient">Specialties</span>
              </motion.h2>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05, background: 'rgba(255, 255, 255, 0.05)' }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-2xl border border-white/5 glass-effect hover:border-primary/20 transition-all font-bold text-sm tracking-widest uppercase"
            >
              Full Menu
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {foodItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <ThreeDCard {...item} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <GlassPanel title="The Inti Ruchi Standard" className="border-white/5 shadow-3d-lg rounded-[4rem] p-16">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mt-8">
                {features.map((f, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -15 }}
                    className="flex flex-col items-center text-center group"
                  >
                    <div className="w-20 h-20 rounded-[2rem] bg-white/5 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-glass-sm border border-white/5 group-hover:shadow-glow-primary">
                    {React.cloneElement(f.icon as React.ReactElement<any>, { size: 36 })}
                    </div>
                    <h3 className="text-2xl font-black mb-4 tracking-tight group-hover:text-primary transition-colors">{f.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed font-medium px-4">{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </GlassPanel>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 container mx-auto px-6 mb-20">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="rounded-[4rem] bg-gradient-to-tr from-primary/20 via-accent/10 to-primary/20 p-px shadow-3d-lg"
          >
            <div className="rounded-[4rem] bg-dark-900 overflow-hidden p-16 md:p-32 text-center relative">
              <div className="absolute inset-0 bg-premium-gradient opacity-80" />
              <div className="noise-bg opacity-[0.04]" />
              
              <div className="relative z-10">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-7xl font-black mb-10 leading-tight tracking-tighter"
                >
                  Join the <span className="text-gradient">3D Revolution</span> <br /> of Fine Dining.
                </motion.h2>
                <p className="text-white/40 mb-16 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
                  Experience a new era of food ordering. Premium ingredients, immersive design, and lightning-fast delivery.
                </p>
                <div className="flex flex-wrap justify-center gap-8">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(245, 158, 11, 0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    className="px-14 py-6 bg-white text-dark-900 rounded-3xl font-black text-2xl shadow-2xl hover:bg-primary hover:text-white transition-all"
                  >
                    Get Started
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 relative z-10 bg-dark-900/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-3xl font-black text-white tracking-tighter">
            Inti <span className="text-primary">Ruchi</span>
          </div>
          <div className="text-white/30 text-sm font-bold tracking-widest uppercase">
            © 2026 Inti Ruchi • Crafted for Excellence
          </div>
          <div className="flex gap-10 text-white/40 font-black text-xs uppercase tracking-[0.2em]">
            <span className="hover:text-primary cursor-pointer transition-colors">Instagram</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Twitter</span>
            <span className="hover:text-primary cursor-pointer transition-colors">LinkedIn</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PremiumDemo;
