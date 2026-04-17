import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

interface Food {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  available: boolean;
  categoryName?: string;
  mealTypeName?: string;
  category?: { name: string };
  mealType?: { name: string };
}

interface FoodTableProps {
  foods: Food[];
  onEdit: (food: Food) => void;
  onDelete: (id: string) => void;
}

const FoodTable: React.FC<FoodTableProps> = ({ foods, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-[2rem] border border-white/5 bg-zinc-900/40 backdrop-blur-md">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/5">
            <th className="px-8 py-6 text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">Preview</th>
            <th className="px-8 py-6 text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">Dish Name</th>
            <th className="px-8 py-6 text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">Category</th>
            <th className="px-8 py-6 text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">Meal Type</th>
            <th className="px-8 py-6 text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">Price</th>
            <th className="px-8 py-6 text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">Status</th>
            <th className="px-8 py-6 text-[10px] uppercase tracking-[0.3em] font-bold text-white/30 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {foods.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-8 py-16 text-center text-white/20 text-[10px] uppercase tracking-widest font-bold">
                No items found in archive
              </td>
            </tr>
          ) : (
            foods.map((food) => {
              const catName = food.categoryName ?? food.category?.name ?? '—';
              const mtName = food.mealTypeName ?? food.mealType?.name ?? '—';
              return (
                <tr key={food._id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-6">
                    <div className="w-16 h-12 rounded-xl overflow-hidden border border-white/10">
                      <img src={food.imageUrl} alt={food.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-medium text-white">{food.name}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-white/40 uppercase tracking-widest">
                      {catName}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="inline-block px-3 py-1 bg-amber-400/5 border border-amber-400/20 rounded-full text-[10px] font-bold text-amber-400/60 uppercase tracking-widest">
                      {mtName}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-bold text-white/90">₹{food.price}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      food.available
                        ? 'bg-green-400/10 border border-green-400/20 text-green-400'
                        : 'bg-red-400/10 border border-red-400/20 text-red-400'
                    }`}>
                      {food.available ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => onEdit(food)}
                        className="p-3 bg-white/5 hover:bg-white text-white hover:text-black rounded-xl transition-all duration-300"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(food._id)}
                        className="p-3 bg-red-400/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all duration-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FoodTable;
