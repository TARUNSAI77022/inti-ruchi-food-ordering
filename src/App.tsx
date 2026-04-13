import React from 'react';
import Navbar from './components/Navbar';
import BackgroundVideo from './components/BackgroundVideo';
import Hero from './components/Hero';
import ScrollStory from './components/ScrollStory';
import AndhraExperience from './components/AndhraExperience';
import MenuSection from './components/MenuSection';
import SlidingFoodGallery from './components/SlidingFoodGallery';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <main className="bg-black text-white selection:bg-white/30 overflow-x-hidden min-h-screen">
      <BackgroundVideo />
      <Navbar />
      
      <div className="relative z-10">
        <Hero />
        <ScrollStory />
        <AndhraExperience />
        <MenuSection />
        <SlidingFoodGallery />
        <Testimonials />
        <Footer />
      </div>

      {/* Aesthetic Overlays */}
      <div className="fixed inset-0 pointer-events-none z-[100] border-[20px] md:border-[40px] border-black/10" />
      <div className="fixed top-0 left-0 w-full h-[100px] bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-40" />
      <div className="fixed bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-40" />
    </main>
  );
};

export default App;
