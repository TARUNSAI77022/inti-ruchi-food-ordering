import React, { useState, useEffect } from 'react';
import { X, Save, Box } from 'lucide-react';

interface FoodFormProps {
  initialData?: any;
  categories: any[];
  mealTypes: any[];
  onSubmit: (data: any) => void;
  onCancel: () => void;
  loading: boolean;
}

const FoodForm: React.FC<FoodFormProps> = ({ initialData, categories, mealTypes, onSubmit, onCancel, loading }) => {
  // Track the original imageUrl so we only send it when changed
  const [originalImageUrl, setOriginalImageUrl] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    mealType: '',
    description: '',
    imageUrl: '',
    available: true,
  });

  useEffect(() => {
    if (initialData) {
      const existingImageUrl = initialData.imageUrl ?? '';
      setOriginalImageUrl(existingImageUrl);
      setFormData({
        name: initialData.name ?? '',
        price: String(initialData.price ?? ''),
        category: initialData.categoryName ?? initialData.category?.name ?? initialData.category ?? '',
        mealType: initialData.mealTypeName ?? initialData.mealType?.name ?? initialData.mealType ?? '',
        description: initialData.description ?? '',
        imageUrl: existingImageUrl,
        available: initialData.available ?? true,
      });
    } else {
      setOriginalImageUrl('');
      setFormData({ name: '', price: '', category: '', mealType: '', description: '', imageUrl: '', available: true });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = {
      name: formData.name,
      price: Number(formData.price),
      category: formData.category,
      mealType: formData.mealType,
      description: formData.description,
      available: formData.available,
    };
    // Only include imageUrl if it was actually changed, or if this is a new item
    if (!initialData || formData.imageUrl !== originalImageUrl) {
      payload.imageUrl = formData.imageUrl;
    }
    onSubmit(payload);
  };

  const field = (label: string, key: keyof typeof formData, type = 'text', placeholder = '') => (
    <div className="space-y-3">
      <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30 ml-1">{label}</label>
      <input
        type={type}
        value={formData[key] as string}
        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
        className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 text-sm tracking-wide text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10"
        placeholder={placeholder}
        required
      />
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-end">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative w-full max-w-xl h-screen bg-zinc-900 border-l border-white/5 shadow-2xl flex flex-col p-12 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-white/40">
              <Box size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-light tracking-tighter text-white">{initialData ? 'Update Dish' : 'New Creation'}</h2>
              <p className="text-[10px] text-white/40 tracking-[0.2em] font-bold uppercase mt-1">Refining the menu selection</p>
            </div>
          </div>
          <button onClick={onCancel} className="p-3 bg-white/5 hover:bg-white/10 text-white/40 hover:text-white rounded-full transition-all">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10 flex-1">
          {/* Dish Name */}
          {field('Dish Name', 'name', 'text', 'AUTHENTIC ANDHRA MEALS')}

          {/* Price + Available */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30 ml-1">Price (₹)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 text-sm tracking-wide text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10"
                placeholder="299"
                required
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30 ml-1">Availability</label>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, available: !formData.available })}
                className={`w-full h-[58px] rounded-2xl border font-bold text-xs tracking-widest uppercase transition-all duration-300 ${
                  formData.available
                    ? 'bg-green-400/10 border-green-400/30 text-green-400'
                    : 'bg-red-400/10 border-red-400/20 text-red-400'
                }`}
              >
                {formData.available ? '● Available' : '○ Unavailable'}
              </button>
            </div>
          </div>

          {/* Category + MealType Dropdowns */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30 ml-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-zinc-800 border border-white/5 rounded-2xl px-6 py-5 text-sm text-white focus:outline-none focus:border-white/20 transition-all appearance-none uppercase tracking-wider"
                required
              >
                <option value="">Choose Category</option>
                {categories.map((cat: any) => (
                  <option key={cat._id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30 ml-1">Meal Type</label>
              <select
                value={formData.mealType}
                onChange={(e) => setFormData({ ...formData, mealType: e.target.value })}
                className="w-full bg-zinc-800 border border-white/5 rounded-2xl px-6 py-5 text-sm text-white focus:outline-none focus:border-white/20 transition-all appearance-none uppercase tracking-wider"
                required
              >
                <option value="">Choose Meal Type</option>
                {mealTypes.map((mt: any) => (
                  <option key={mt._id} value={mt.name}>{mt.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Image URL — optional on edit, pre-filled from existing data */}
          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30 ml-1">
              Image URL {initialData && <span className="text-white/20 normal-case tracking-normal font-normal">(leave unchanged to keep current)</span>}
            </label>
            {/* Show current image preview when editing */}
            {initialData && formData.imageUrl && (
              <div className="w-full h-32 rounded-2xl overflow-hidden border border-white/10 mb-2">
                <img src={formData.imageUrl} alt="Current" className="w-full h-full object-cover" />
              </div>
            )}
            <input
              type="text"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 text-sm tracking-wide text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10"
              placeholder={initialData ? 'Leave blank to keep current image' : 'HTTPS://CLOUDINARY.COM/...'}
              required={!initialData}
            />
          </div>

          {/* Description */}
          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30 ml-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 text-sm text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10 resize-none"
              placeholder="DESCRIBE THE FLAVOR PALETTE..."
              required
            />
          </div>

          {/* Actions */}
          <div className="pt-10 flex space-x-6 sticky bottom-0 bg-zinc-900 py-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-white text-black font-bold h-16 rounded-2xl hover:bg-white/90 transition-all tracking-[0.2em] uppercase text-xs flex items-center justify-center space-x-3 shadow-[0_20px_40px_rgba(255,255,255,0.1)] disabled:opacity-50"
            >
              <Save size={18} />
              <span>{loading ? 'Processing...' : (initialData ? 'Update Collection' : 'Archive Entry')}</span>
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-10 h-16 border border-white/5 text-white/40 font-bold rounded-2xl hover:bg-white/5 hover:text-white transition-all tracking-[0.2em] uppercase text-[10px]"
            >
              Discard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoodForm;
