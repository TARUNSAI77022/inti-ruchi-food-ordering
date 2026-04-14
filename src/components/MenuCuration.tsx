import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const MENU_DATA = {
    'Veg Starters': [
        { name: 'Veg Manchurian', price: '₹200', tag: 'Classic', desc: 'Indo-Chinese style crispy vegetable balls in spicy sauce.' },
        { name: 'Crispy Corn', price: '₹180', tag: 'Popular', desc: 'Sweet corn kernels tossed in spicy local seasoning.' },
        { name: 'Karampodi Gobi', price: '₹200', tag: 'Spicy', desc: 'Cauliflower florets tossed with authentic handmade spice powder.' },
        { name: 'Karvepaku Gobi', price: '₹200', tag: 'Fragrant', desc: 'Signature gobi starter tempered with fresh curry leaves.' },
        { name: 'Velluli Karam Gobi', price: '₹200', tag: 'Garlic', desc: 'Andhra style garlic-chili cauliflower roast.' },
        { name: 'Jalapeno Gobi', price: '₹210', tag: 'Fusion', desc: 'A modern twist on the classic gobi starter.' },
        { name: 'Peanut Masala', price: '₹140', tag: 'Traditional', desc: 'Crunchy peanuts with onions, chilies, and lime.' },
    ],
    'Paneer Starters': [
        { name: 'Paneer 65', price: '₹230', tag: 'Signature', desc: 'Classic spiced fried paneer cubes with local tempering.' },
        { name: 'Paneer Vepudu', price: '₹240', tag: 'Roast', desc: 'Dry roasted soft paneer with authentic Andhra spices.' },
        { name: 'Jalapeno Paneer', price: '₹250', tag: 'Fusion', desc: 'Spicy jalapeno-infused paneer starter.' },
    ],
    'Chicken Starters': [
        { name: 'Karampodi Chicken', price: '₹240', tag: 'Extra Spicy', desc: 'Chicken roasted in handmade dry spice powder.' },
        { name: 'Karvepaku Chicken', price: '₹240', tag: 'Fragrant', desc: 'Heritage chicken starter with intense curry leaf flavor.' },
        { name: 'Velluli Karam Chicken', price: '₹240', tag: 'Garlic Blast', desc: 'Garlic and chili dry roasted rustic chicken.' },
        { name: 'Thagubothu Chicken', price: '₹230', tag: 'Street Style', desc: 'Signature rustic Andhra chicken starter.' },
        { name: 'Rayalaseema Kodi Vepudu', price: '₹260', tag: 'Regional', desc: 'Traditional Rayalaseema style fiery chicken fry.' },
        { name: 'Raju Gari Kodi Vepudu', price: '₹270', tag: 'Royal', desc: 'Royal heritage style chicken fry with premium spices.' },
    ],
    'Seafood Starters': [
        { name: 'Garlic Shrimp', price: '₹320', tag: 'Premium', desc: 'Exquisite grilled shrimp with buttery garlic seasoning.' },
        { name: 'Gongura Royyalu', price: '₹330', tag: 'Heritage', desc: 'Prawns cooked with tangy gongura leaf masala.' },
    ],
    'Veg Curries': [
        { name: 'Veg Korma', price: '₹220', tag: 'Mild', desc: 'Creamy vegetable curry with cashew paste base.' },
        { name: 'Paneer Lababdar', price: '₹260', tag: 'Rich', desc: 'Paneer cubes in a spicy and velvety tomato gravy.' },
        { name: 'Paneer Curry', price: '₹240', tag: 'Classic', desc: 'Simple and comforting home-style paneer gravy.' },
    ],
    'Non-Veg Curries': [
        { name: 'Deccan Leaf Egg Pulusu', price: '₹210', tag: 'Tangy', desc: 'Signature Deccan Leaf style tangy egg stew.' },
        { name: 'Gongura Chicken', price: '₹260', tag: 'Iconic', desc: 'Andhra classic chicken cooked with sour sorrel leaves.' },
        { name: 'Gongura Mutton', price: '₹320', tag: 'Must Try', desc: 'Tender mutton pieces in deep gongura masala.' },
        { name: 'Kadai Chicken', price: '₹270', tag: 'Spicy', desc: 'Wok-tossed chicken with bell peppers and spices.' },
        { name: 'Andhra Mutton Curry', price: '₹320', tag: 'Spicy', desc: 'Slow-cooked traditional fiery mutton stew.' },
    ],
    'Pulav & Rice': [
        { name: 'Veg Pulav', price: '₹240', tag: 'Healthy', desc: 'Aromatic basmati rice with mixed seasonal vegetables.' },
        { name: 'Paneer Pulav', price: '₹260', tag: 'Rich', desc: 'Light yet fragrant rice with marinated paneer chunks.' },
        { name: 'Chicken Pulav', price: '₹280', tag: 'Popular', desc: 'Spiced Andhra style chicken and aromatic rice.' },
        { name: 'Shrimp Pulav', price: '₹320', tag: 'Premium', desc: 'Seafood and rice cooked in traditional Deccan Leaf style.' },
        { name: 'Mutton Roast Pulav', price: '₹340', tag: 'Signature', desc: 'Royal mutton roast with heritage spiced rice.' },
    ],
    'Biryani': [
        { name: 'Paneer Biryani', price: '₹260', tag: 'Classic', desc: 'Layered dum biryani with marinated paneer cubes.' },
        { name: 'Paneer Gongura Biryani', price: '₹270', tag: 'Fusion', desc: 'Biryani with a tangy gongura leaf infusion.' },
        { name: 'Paneer Avakai Biryani', price: '₹270', tag: 'Signature', desc: 'Spiced mango pickle infused paneer biryani.' },
        { name: 'Shrimp Biryani', price: '₹320', tag: 'Seafood', desc: 'Fragrant dum biryani with marinated fresh prawns.' },
        { name: 'Paneer Vepudu Biryani', price: '₹280', tag: 'Dry Mix', desc: 'Biryani rice topped with spicy fried paneer.' },
    ],
    'Tiffins': [
        { name: 'Plain Dosa', price: '₹120', tag: 'Classic', desc: 'Crispy and thin traditional rice crepe.' },
        { name: 'Paneer Dosa', price: '₹150', tag: 'Rich', desc: 'Dosa stuffed with spiced scrambled paneer.' },
        { name: 'Spring Dosa', price: '₹140', tag: 'Fusion', desc: 'Crepe with vegetable and noodle filling.' },
        { name: 'Teen Maar Onion Dosa', price: '₹130', tag: 'Crunchy', desc: 'Spiced onion and spice powder infused masala dosa.' },
    ],
    'Breads': [
        { name: 'Butter Naan', price: '₹60', tag: 'Classic', desc: 'Soft and pillowy leavened bread with butter.' },
        { name: 'Plain Naan', price: '₹50', tag: 'Simple', desc: 'Authentic clay oven roasted leavened bread.' },
        { name: 'Garlic Naan', price: '₹70', tag: 'Aromatic', desc: 'Naan topped with fresh minced garlic and coriander.' },
        { name: 'Chapathi', price: '₹40', tag: 'Healthy', desc: 'Traditional whole wheat flatbread.' },
        { name: 'Hyderabadi Roti', price: '₹50', tag: 'Regional', desc: 'Square-shaped traditional flaky roti.' },
    ],
    'Beverages': [
        { name: 'Mango Lassi', price: '₹120', tag: 'Refreshing', desc: 'Thick yogurt blend with premium mango pulp.' },
        { name: 'Buttermilk', price: '₹80', tag: 'Spiced', desc: 'Heritage style digestive yogurt-based cooler.' },
        { name: 'Masala Chai', price: '₹60', tag: 'Traditional', desc: 'Spiced milk tea brewed with cardamom and ginger.' },
        { name: 'Fresh Lime Soda', price: '₹90', tag: 'Zesty', desc: 'Carbonated lemon drink with a sweet and salt balance.' },
        { name: 'Coffee', price: '₹70', tag: 'Hot', desc: 'Filter coffee brewed in traditional South Indian style.' },
    ],
    'Desserts': [
        { name: 'Gulab Jamun', price: '₹120', tag: 'Sweet', desc: 'Soft and fried dough balls in warm sugar syrup.' },
        { name: 'Rasmalai', price: '₹120', tag: 'Creamy', desc: 'Cottage cheese discs in thickened saffron milk.' },
    ],
};

const MenuCuration: React.FC = () => {
    const [activeTab, setActiveTab] = useState<keyof typeof MENU_DATA>('Veg Starters');

    return (
        <section id="menu" className="relative z-30 py-32 bg-black/40">
            <div className="container mx-auto px-10">
                
                <div className="flex flex-col items-center mb-32 space-y-12">
                    <h2 className="text-6xl lg:text-[9rem] font-poppins font-medium tracking-tighter text-center uppercase drop-shadow-2xl">
                        The <span className="font-serif italic text-white/40 lowercase underline-offset-[1.5rem] decoration-white/10">Curation.</span>
                    </h2>
                    
                    {/* Custom Integrated Tabs */}
                    <div className="flex flex-wrap justify-center gap-4 bg-white/5 backdrop-blur-3xl p-3 lg:p-4 rounded-[4rem] border border-white/5 max-w-full overflow-x-auto no-scrollbar shadow-3xl">
                        {Object.keys(MENU_DATA).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`px-10 py-5 rounded-full text-[11px] font-bold uppercase tracking-[0.4em] transition-all duration-[1000ms] whitespace-nowrap shadow-xl ${activeTab === tab ? 'bg-white text-black scale-110' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Animated Menu Grid */}
                <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14"
                >
                    <AnimatePresence mode="popLayout">
                        {MENU_DATA[activeTab].map((item, i) => (
                            <FoodCard key={item.name} item={item} index={i} />
                        ))}
                    </AnimatePresence>
                </motion.div>
                
                {/* Visual anchor at the end of the menu */}
                <div className="mt-40 text-center space-y-4">
                   <div className="h-[1px] w-48 bg-white/10 mx-auto" />
                   <p className="text-[10px] uppercase font-bold tracking-[0.8em] text-white/20">Handcrafted Heritage</p>
                </div>
            </div>
        </section>
    );
};

const FoodCard = ({ item, index }: { item: any, index: number }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: index * 0.05, ease: "easeOut" }}
            className="group relative flex flex-col liquid-glass-strong rounded-[3rem] p-10 lg:p-14 border border-white/5 shadow-3xl tilt-card hover:border-white/20 transition-all duration-1000 overflow-hidden"
        >
            <div className="flex flex-col h-full space-y-10 relative z-10 translate-z-20">
                <div className="flex justify-between items-start">
                    <div className="space-y-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 group-hover:text-white/70 block transition-all">{item.tag}</span>
                        <h3 className="text-4xl lg:text-5xl font-poppins font-semibold text-white leading-none tracking-tighter group-hover:scale-105 transition-all duration-1000 origin-left uppercase drop-shadow-2xl">
                            {item.name}
                        </h3>
                    </div>
                    <div className="liquid-glass h-12 w-12 flex items-center justify-center rounded-2xl group-hover:bg-white group-hover:text-black transition-all duration-1000 shadow-2xl border border-white/10">
                        <ChevronRight size={20} />
                    </div>
                </div>

                <p className="text-sm lg:text-lg text-white/40 leading-[1.8] font-poppins line-clamp-3 transition-opacity duration-1000 group-hover:text-white/70 tracking-wide">
                    {item.desc}
                </p>
                
                <div className="flex justify-between items-center mt-auto pt-10 border-t border-white/5 translate-z-40">
                    <div className="flex items-baseline space-x-2">
                        <span className="text-5xl lg:text-6xl font-poppins font-medium group-hover:scale-110 transition-transform duration-1000 tracking-tighter drop-shadow-2xl">{item.price}</span>
                        <span className="text-[10px] uppercase font-bold text-white/20 tracking-widest">INR</span>
                    </div>
                    <button className="h-12 w-28 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all duration-1000 text-[10px] uppercase font-bold tracking-[0.4em] active:scale-90 shadow-2xl leading-none">
                        DETAILS
                    </button>
                </div>
            </div>
            
            {/* Background Texture / Hover Glow */}
            <div className="absolute -bottom-10 -right-10 h-64 w-64 bg-white/[0.03] blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000" />
            <div className="absolute inset-8 border border-white/5 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-all duration-1000 pointer-events-none" />
        </motion.div>
    );
};

export default MenuCuration;
