import React, { useState, useEffect } from 'react';
import { useSelection } from '../context/SelectionContext';
import { FoodCard } from '../components/FoodCard';
import { LiveSelectionSidebar } from '../components/LiveSelectionSidebar';
import { MobileSelectionBar } from '../components/MobileSelectionBar';
import { 
  Search, 
  Filter, 
  UtensilsCrossed, 
  Sparkles, 
  Leaf, 
  Flame, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Starters',
  'Biryani / Rice',
  'Main Course',
  'Breads',
  'Side Dishes',
  'Desserts',
  'Drinks'
];

export function MenuPage({ setActivePage, onOpenFoodDetails }) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('all'); // 'all' | 'veg' | 'non-veg'
  const [searchQuery, setSearchQuery] = useState('');
  
  const { totalCount } = useSelection();

  const fetchFoods = () => {
    setLoading(true);
    let url = '/api/foods?';
    if (selectedCategory !== 'All') url += `category=${encodeURIComponent(selectedCategory)}&`;
    if (selectedType !== 'all') url += `type=${selectedType}&`;
    if (searchQuery.trim()) url += `search=${encodeURIComponent(searchQuery.trim())}&`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setFoods(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching foods:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchFoods();
  }, [selectedCategory, selectedType, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedType('all');
    setSearchQuery('');
  };

  return (
    <div className="bg-stone-50 min-h-screen py-10 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 rounded-full text-amber-800 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Grand Catering Menu &bull; 40+ Authentic Specialities</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            Curate Your Event Menu
          </h1>
          <p className="text-stone-500 text-sm sm:text-base mt-3 leading-relaxed">
            Click dishes below to add them to your live selection. Filter by culinary category, dietary preferences, or search directly.
          </p>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-stone-200/90 mb-10 space-y-4">
          
          {/* Top row: Search input + Diet type toggles */}
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search food by name, gravy, spice..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all placeholder:text-stone-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs px-1.5 py-0.5 rounded"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Diet Filter Buttons (Veg / Non-Veg / All) */}
            <div className="flex items-center space-x-1.5 bg-stone-100 p-1.5 rounded-2xl shrink-0 self-start md:self-auto">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedType === 'all'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All Dietary
              </button>

              <button
                onClick={() => setSelectedType('veg')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedType === 'veg'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                <span className="veg-badge !w-3.5 !h-3.5"></span>
                <span>Pure Veg</span>
              </button>

              <button
                onClick={() => setSelectedType('non-veg')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedType === 'non-veg'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-red-700 hover:bg-red-50'
                }`}
              >
                <span className="nonveg-badge !w-3.5 !h-3.5"></span>
                <span>Non-Veg</span>
              </button>
            </div>
          </div>

          {/* Bottom row: Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    active
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80 hover:text-stone-900'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* Content Layout: Menu Cards Grid + Desktop Sticky Sidebar */}
        <div className="flex items-start gap-8">
          
          {/* Menu Cards Grid */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="h-80 bg-stone-200 rounded-2xl animate-pulse"></div>
                ))}
              </div>
            ) : foods.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200">
                <UtensilsCrossed className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <h3 className="font-serif text-lg font-bold text-stone-800">No matching dishes found</h3>
                <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                  Try adjusting your search criteria or resetting filters to see the full catering spread.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold inline-flex items-center space-x-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4 px-1">
                  <p className="text-xs text-stone-500 font-medium">
                    Showing <span className="font-bold text-stone-800">{foods.length}</span> dishes in{' '}
                    <span className="font-bold text-amber-700">{selectedCategory}</span>
                  </p>
                  {totalCount > 0 && (
                    <span className="text-xs font-bold text-emerald-700 flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{totalCount} selected so far</span>
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {foods.map((food) => (
                    <FoodCard
                      key={food.id}
                      food={food}
                      onOpenDetails={onOpenFoodDetails}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Sticky Live Selection Sidebar */}
          <LiveSelectionSidebar onReview={() => setActivePage('review-selection')} />

        </div>

      </div>

      {/* Mobile Floating Selection Pill & Drawer */}
      <MobileSelectionBar onReview={() => setActivePage('review-selection')} />

    </div>
  );
}
