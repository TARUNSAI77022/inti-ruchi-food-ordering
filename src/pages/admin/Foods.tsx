import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import FoodTable from '../../components/admin/FoodTable';
import FoodForm from '../../components/admin/FoodForm';
import api from '../../services/api';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const Foods: React.FC = () => {
  const [foods, setFoods] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [mealTypes, setMealTypes] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedFood, setSelectedFood] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [foodsRes, catsRes, mealTypesRes] = await Promise.all([
        api.get('/admin/foods'),
        api.get('/categories'),
        api.get('/meal-types'),
      ]);
      setFoods(foodsRes.data.data ?? []);
      setCategories(catsRes.data.data ?? []);
      setMealTypes(mealTypesRes.data.data ?? []);
    } catch (error) {
      toast.error('Sync failure with inventory grid');
    } finally {
      setLoading(false);
    }
  };

  const filteredFoods = foods.filter(food => {
    const term = searchTerm.toLowerCase();
    const name = (food.name ?? '').toLowerCase();
    const cat = (food.categoryName ?? food.category?.name ?? '').toLowerCase();
    const mt = (food.mealTypeName ?? food.mealType?.name ?? '').toLowerCase();
    return name.includes(term) || cat.includes(term) || mt.includes(term);
  });

  const handleCreateOrUpdate = async (formData: any) => {
    setFormLoading(true);
    try {
      if (selectedFood) {
        await api.put(`/foods/${selectedFood._id}`, formData);
        toast.success('Dish updated successfully');
      } else {
        await api.post('/foods', formData);
        toast.success('New dish added to archive');
      }
      setShowForm(false);
      setSelectedFood(null);
      fetchData();
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Operation failed';
      toast.error(msg);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('IRREVERSIBLE DATA ERASE: PROCEED?')) {
      try {
        await api.delete(`/foods/${id}`);
        toast.success('Dish removed from archive');
        fetchData();
      } catch (err: any) {
        toast.error(err.response?.data?.message || 'Delete failed');
      }
    }
  };

  const openForm = (food: any = null) => {
    setSelectedFood(food);
    setShowForm(true);
  };

  return (
    <div className="flex min-h-screen bg-[#050505] text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-12 space-y-12">
          {/* Page Header */}
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-6xl font-light tracking-tighter mb-4 italic">Culinary Archive</h1>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.4em]">Managing {foods.length} archived specimens</p>
            </div>

            <div className="flex items-center space-x-6">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="SEARCH ARCHIVE..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/5 border border-white/5 rounded-2xl px-8 h-16 w-80 text-[10px] tracking-[0.2em] uppercase font-bold text-white focus:outline-none focus:border-white/20 transition-all"
                />
              </div>
              <button
                onClick={() => openForm()}
                className="px-10 h-16 bg-white text-black rounded-2xl flex items-center space-x-4 hover:bg-white/90 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] group"
              >
                <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                <span className="uppercase tracking-[0.2em] text-xs font-bold leading-none mt-1">Archive Entry</span>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="h-96 flex flex-col items-center justify-center space-y-6">
              <div className="w-12 h-12 border-2 border-white/5 border-t-white rounded-full animate-spin" />
              <p className="text-[10px] font-bold tracking-[0.4em] text-white/20 uppercase">Decoding Archive Cluster...</p>
            </div>
          ) : (
            <FoodTable
              foods={filteredFoods}
              onEdit={openForm}
              onDelete={handleDelete}
            />
          )}
        </main>
      </div>

      {showForm && (
        <FoodForm
          initialData={selectedFood}
          categories={categories}
          mealTypes={mealTypes}
          onSubmit={handleCreateOrUpdate}
          onCancel={() => { setShowForm(false); setSelectedFood(null); }}
          loading={formLoading}
        />
      )}
    </div>
  );
};

export default Foods;
