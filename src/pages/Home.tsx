import React from 'react';
import PremiumNavbar from '../components/premium/PremiumNavbar';
import PremiumHero from '../components/premium/PremiumHero';
import MenuSection from '../components/MenuSection';
import GlassPanel from '../components/premium/GlassPanel';
import Footer from '../components/Footer';
import { Utensils, Clock, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const features = [
    { icon: <Utensils />, title: "Master Chefs", desc: "Crafted by world-class culinary experts." },
    { icon: <Clock />, title: "Fast Delivery", desc: "Under 30 minutes or it's on us." },
    { icon: <ShieldCheck />, title: "Pure Quality", desc: "Strict hygiene and organic ingredients." },
    { icon: <Truck />, title: "Eco-Friendly", desc: "Sustainable packaging and delivery." }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-poppins selection:bg-primary/30 selection:text-primary relative overflow-x-hidden">
      {/* Background Lighting System - Persistent across all sections */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="mesh-gradient absolute inset-0 opacity-40" />
        <div className="noise-bg" />
        {/* Animated Glows */}
        <div className="absolute top-[10%] right-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[150px] animate-pulse-glow" />
        <div className="absolute bottom-[10%] left-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      {/* Navbar - Fixed at the top with highest z-index */}
      <PremiumNavbar />
      
      {/* Main Container with Padding-Top to prevent fixed navbar overlap */}
      <main className="relative z-10">
        
        {/* Requirement 1: Sections flow naturally with min-h-screen */}
        <section id="home" className="min-h-screen flex flex-col">
          <PremiumHero />
        </section>

        {/* Section Spacer ensures no gaps or overlapping */}
        <div className="relative">
          <section id="menu" className="relative z-10 scroll-mt-24">
             <MenuSection />
          </section>

          {/* Features Section - Standardized Padding */}
          <section className="py-32 md:py-48 container mx-auto px-6 relative z-10">
            <GlassPanel title="The Inti Ruchi Standard" className="border-white/5 shadow-3d-lg rounded-[3rem] md:rounded-[4rem] p-8 md:p-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mt-8">
                {features.map((f, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -15 }}
                    className="flex flex-col items-center text-center group"
                  >
                    <div className="w-20 h-20 rounded-[2rem] bg-white/5 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-glass-sm border border-white/5 group-hover:shadow-glow-primary">
                      {React.cloneElement(f.icon as React.ReactElement, { size: 36 })}
                    </div>
                    <h3 className="text-2xl font-black mb-4 tracking-tight group-hover:text-primary transition-colors">{f.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed font-medium px-4">{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </GlassPanel>
          </section>

          {/* CTA Section - Final Vertical block */}
          <section className="py-32 md:py-48 container mx-auto px-6 relative z-10 mb-20">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="rounded-[3rem] md:rounded-[4rem] bg-gradient-to-tr from-primary/20 via-accent/10 to-primary/20 p-px shadow-3d-lg"
            >
              <div className="rounded-[3rem] md:rounded-[4rem] bg-[#080808]/80 backdrop-blur-xl overflow-hidden p-12 md:p-32 text-center relative">
                <div className="absolute inset-0 bg-premium-gradient opacity-60" />
                <div className="noise-bg opacity-[0.05]" />
                
                <div className="relative z-10">
                  <motion.div
                     initial={{ opacity: 0, y: 10 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     className="flex items-center justify-center gap-3 text-primary font-black tracking-[0.4em] uppercase text-xs mb-8"
                  >
                    <Sparkles size={16} />
                    <span>Join the movement</span>
                  </motion.div>
                  <h2 className="text-4xl md:text-7xl font-black mb-10 leading-tight tracking-tighter">
                    Redefining the <br /> <span className="text-gradient">Art of Food Delivery.</span>
                  </h2>
                  <p className="text-white/50 mb-16 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
                    Every order is a masterpiece. From our kitchen to your table, experience the gold standard of taste and design.
                  </p>
                  <div className="flex flex-wrap justify-center gap-8">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(245, 158, 11, 0.4)' }}
                      whileTap={{ scale: 0.95 }}
                      className="px-12 md:px-14 py-5 md:py-6 bg-white text-black rounded-[1.5rem] md:rounded-3xl font-black text-xl md:text-2xl shadow-2xl hover:bg-primary hover:text-white transition-all"
                    >
                      Start Your Order
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </main>

      <Footer />

      {/* Decorative Fixed Border - Layered over all content but below interaction level */}
      <div className="fixed inset-0 pointer-events-none z-[40] border-[10px] md:border-[20px] border-white/5 opacity-10" />
    </div>
  );
};

export default Home;
