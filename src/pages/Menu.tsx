import React from 'react';
import Navbar from '../components/Navbar';
import MenuSection from '../components/MenuSection';
import Footer from '../components/Footer';

const Menu: React.FC = () => {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="pt-24">
        <MenuSection />
      </div>
      <Footer />
    </main>
  );
};

export default Menu;
