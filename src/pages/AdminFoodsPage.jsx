import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWebSocket } from '../context/WebSocketContext';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Image as ImageIcon, 
  UtensilsCrossed,
  Eye,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

const CATEGORIES = [
  'Starters',
  'Biryani / Rice',
  'Main Course',
  'Breads',
  'Side Dishes',
  'Desserts',
  'Drinks'
];

export function AdminFoodsPage({ setActivePage }) {
  const { token } = useAuth();
  const { lastEvent } = useWebSocket();

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  
  // Modal state for Add/Edit
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Starters',
    description: '',
    ingredients: '',
    type: 'veg',
    price: 150,
    image: '',
    available: true
  });
  const [saving, setSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const fetchFoods = () => {
    fetch('/api/foods')
      .then(res => res.json())
      .then(data => {
        setFoods(data);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  useEffect(() => {
    if (lastEvent && lastEvent.type === 'FOOD_UPDATED') {
      fetchFoods();
    }
  }, [lastEvent]);

  const handleOpenAdd = () => {
    setEditingFood(null);
    setFormData({
      name: '',
      category: 'Starters',
      description: '',
      ingredients: '',
      type: 'veg',
      price: 200,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      available: true
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (food) => {
    setEditingFood(food);
    setFormData({
      name: food.name,
      category: food.category,
      description: food.description || '',
      ingredients: food.ingredients || '',
      type: food.type || 'veg',
      price: food.price || 0,
      image: food.image || '',
      available: food.available !== false
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const url = editingFood ? `/api/foods/${editingFood.id}` : '/api/foods';
    const method = editingFood ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setModalOpen(false);
        fetchFoods();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/foods/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setDeleteConfirmId(null);
        fetchFoods();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleAvailability = async (food) => {
    try {
      await fetch(`/api/foods/${food.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ available: !food.available })
      });
      fetchFoods();
    } catch (e) {
      console.error(e);
    }
  };

  const filteredFoods = foods.filter(f => {
    const matchesCat = filterCat === 'All' || f.category === filterCat;
    const q = search.toLowerCase().trim();
    const matchesSearch = !q || f.name.toLowerCase().includes(q) || (f.description && f.description.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-stone-50 min-h-screen py-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-extrabold text-stone-900">
              Food Menu Management
            </h1>
            <p className="text-stone-500 text-sm mt-1">
              Add new dishes, update ingredients, modify prices, and manage buffet availability.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActivePage('admin-dashboard')}
              className="text-xs font-bold text-amber-700 hover:text-amber-800"
            >
              &larr; Admin Dashboard
            </button>
            <button
              onClick={handleOpenAdd}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-royal-950 font-bold text-xs shadow-md flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Food</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-3xl border border-stone-200/90 shadow-sm flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes by name or ingredients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0">
            {['All', ...CATEGORIES].map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  filterCat === cat 
                    ? 'bg-amber-600 text-white shadow-xs' 
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Food List Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className="h-64 bg-white rounded-3xl border border-stone-200 animate-pulse"></div>
            ))}
          </div>
        ) : filteredFoods.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-stone-200">
            <UtensilsCrossed className="w-12 h-12 text-stone-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-stone-800">No dishes matched</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFoods.map(food => (
              <div 
                key={food.id}
                className={`bg-white rounded-2xl border overflow-hidden shadow-xs flex flex-col justify-between transition-all ${
                  food.available !== false ? 'border-stone-200' : 'border-stone-200 opacity-60 bg-stone-50'
                }`}
              >
                <div>
                  <div className="relative aspect-[16/9] w-full bg-stone-100 overflow-hidden">
                    <img 
                      src={food.image} 
                      alt={food.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute top-2 left-2 bg-white/95 p-1 rounded-md shadow-xs flex items-center space-x-1">
                      <span className={food.type === 'veg' ? 'veg-badge !w-3 !h-3' : 'nonveg-badge !w-3 !h-3'}></span>
                      <span className="text-[10px] font-bold uppercase">{food.type}</span>
                    </div>
                    <div className="absolute top-2 right-2 bg-royal-950/80 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {food.category}
                    </div>
                  </div>

                  <div className="p-4 space-y-1">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-serif font-bold text-stone-900 text-sm">{food.name}</h4>
                      {food.price ? <span className="text-xs font-bold text-amber-700">₹{food.price}</span> : null}
                    </div>
                    <p className="text-[11px] text-stone-500 line-clamp-2">{food.description}</p>
                  </div>
                </div>

                {/* Card Controls */}
                <div className="p-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => toggleAvailability(food)}
                    className="text-xs font-medium flex items-center space-x-1 text-stone-600 hover:text-stone-900"
                    title="Toggle active availability"
                  >
                    <span className={`w-2 h-2 rounded-full ${food.available !== false ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                    <span className="text-[11px]">{food.available !== false ? 'Available' : 'Unavailable'}</span>
                  </button>

                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => handleOpenEdit(food)}
                      className="p-1.5 text-stone-500 hover:text-amber-600 rounded-lg hover:bg-stone-200 transition-colors"
                      title="Edit dish"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(food.id)}
                      className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-stone-200 transition-colors"
                      title="Delete dish"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Add / Edit Food */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
            <div 
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 bg-gradient-to-r from-royal-950 to-stone-900 text-white flex items-center justify-between">
                <h3 className="font-serif text-xl font-bold">
                  {editingFood ? 'Edit Food Item' : 'Add New Catering Food'}
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Food Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:ring-1 focus:ring-amber-500"
                    placeholder="e.g. Mutton Rogan Josh"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:ring-1 focus:ring-amber-500"
                    >
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Dietary Type *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="veg">Vegetarian</option>
                      <option value="non-veg">Non-Vegetarian</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Price (₹ per plate / unit)
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="flex flex-col justify-end">
                    <label className="flex items-center space-x-2 text-xs font-bold text-stone-700 cursor-pointer pt-2">
                      <input
                        type="checkbox"
                        checked={formData.available}
                        onChange={(e) => setFormData(prev => ({ ...prev, available: e.target.checked }))}
                        className="rounded text-amber-600 focus:ring-amber-500"
                      />
                      <span>Available on Live Menu</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Image Direct URL
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:ring-1 focus:ring-amber-500"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Short Description
                  </label>
                  <textarea
                    rows="2"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:ring-1 focus:ring-amber-500 resize-none"
                    placeholder="Flavour notes and serving highlights..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Chef Ingredients &amp; Spices
                  </label>
                  <input
                    type="text"
                    value={formData.ingredients}
                    onChange={(e) => setFormData(prev => ({ ...prev, ingredients: e.target.value }))}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:ring-1 focus:ring-amber-500"
                    placeholder="e.g. Kashmiri saffron, Desi ghee, Cardamom..."
                  />
                </div>

                <div className="pt-3 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-royal-950 shadow-md"
                  >
                    {saving ? 'Saving...' : 'Save Dish'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-stone-200 shadow-2xl space-y-4 text-center">
              <h3 className="font-serif font-bold text-lg text-stone-900">Delete Food Item?</h3>
              <p className="text-xs text-stone-500">
                Are you sure you want to remove this dish from the active catering database?
              </p>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 py-2 rounded-xl text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
