export const CATEGORIES = ['All', 'Veg', 'Non-Veg', 'Specials'] as const;
export const MEAL_TYPES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'] as const;

export interface DemoFood {
  id: number;
  name: string;
  category: string;
  mealType: string;
  price: number;
  description: string;
  imageUrl: string;
  available: boolean;
}

export const FOODS: DemoFood[] = [
  { id: 1,  name: 'Pesarattu',          category: 'Veg',     mealType: 'Breakfast', price: 120, description: 'Crispy green moong dal crepe',          imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80', available: true  },
  { id: 2,  name: 'Chicken Curry',       category: 'Non-Veg', mealType: 'Lunch',     price: 280, description: 'Spicy Andhra-style chicken curry',        imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80', available: true  },
  { id: 3,  name: 'Gutti Vankaya',       category: 'Veg',     mealType: 'Lunch',     price: 180, description: 'Stuffed brinjal Andhra style',            imageUrl: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80', available: true  },
  { id: 4,  name: 'Mutton Biryani',      category: 'Specials',mealType: 'Lunch',     price: 380, description: 'Slow-cooked dum biryani',                 imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80', available: true  },
  { id: 5,  name: 'Idli Sambar',         category: 'Veg',     mealType: 'Breakfast', price: 80,  description: 'Steamed rice cakes with sambar',          imageUrl: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&q=80', available: true  },
  { id: 6,  name: 'Fish Fry',            category: 'Non-Veg', mealType: 'Dinner',    price: 320, description: 'Coastal-style spiced fish fry',           imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&q=80', available: true  },
  { id: 7,  name: 'Mirchi Bajji',        category: 'Veg',     mealType: 'Snacks',    price: 60,  description: 'Deep-fried chilli fritters',              imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80', available: true  },
  { id: 8,  name: 'Prawn Masala',        category: 'Specials',mealType: 'Dinner',    price: 420, description: 'King prawns in spiced coconut gravy',     imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80', available: false },
  { id: 9,  name: 'Upma',               category: 'Veg',     mealType: 'Breakfast', price: 70,  description: 'Semolina porridge with vegetables',       imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&q=80', available: true  },
  { id: 10, name: 'Egg Curry',           category: 'Non-Veg', mealType: 'Lunch',     price: 180, description: 'Boiled eggs in Andhra masala gravy',      imageUrl: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=400&q=80', available: true  },
  { id: 11, name: 'Veg Biryani',         category: 'Specials',mealType: 'Lunch',     price: 220, description: 'Aromatic basmati with seasonal veggies',  imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&q=80', available: true  },
  { id: 12, name: 'Punugulu',            category: 'Veg',     mealType: 'Snacks',    price: 50,  description: 'Fried idli batter balls with chutney',    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80', available: true  },
];

export function filterFoods(foods: DemoFood[], category: string, mealType: string) {
  return foods.filter(f => {
    const catMatch  = category  === 'All' || f.category  === category;
    const mtMatch   = mealType  === 'All' || f.mealType  === mealType;
    return catMatch && mtMatch;
  });
}
