import React from 'react';
import { useSelection } from '../context/SelectionContext';
import { X, Check, Plus, ChefHat, Sparkles } from 'lucide-react';

export function FoodModal({ food, onClose }) {
  const { isSelected, toggleFood } = useSelection();
  if (!food) return null;

  const selected = isSelected(food.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-100 transform transition-all my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Hero Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-stone-900">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          {/* Badges on Image */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-amber-400 text-royal-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {food.category}
                </span>
                <span className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold flex items-center space-x-1.5 shadow-sm">
                  <span className={food.type === 'veg' ? 'veg-badge' : 'nonveg-badge'}></span>
                  <span className={food.type === 'veg' ? 'text-emerald-700' : 'text-red-700'}>
                    {food.type === 'veg' ? 'Pure Vegetarian' : 'Non-Vegetarian'}
                  </span>
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white drop-shadow-md">
                {food.name}
              </h2>
            </div>
            {food.price ? (
              <div className="text-right">
                <span className="text-xs text-stone-300 block">Est. Cost</span>
                <span className="text-2xl font-bold text-amber-400 font-sans">
                  ₹{food.price}
                </span>
              </div>
            ) : null}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 font-mono mb-2">
              Culinary Description
            </h4>
            <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
              {food.description}
            </p>
          </div>

          {/* Ingredients & Prep */}
          {food.ingredients && (
            <div className="bg-amber-50/60 border border-amber-200/60 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs uppercase tracking-wider mb-2">
                <ChefHat className="w-4 h-4 text-amber-700" />
                <span>Chef's Ingredients & Secret Seasonings</span>
              </div>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                {food.ingredients}
              </p>
            </div>
          )}

          {/* Catering Highlights */}
          <div className="grid grid-cols-3 gap-3 text-center border-t border-b border-stone-100 py-4">
            <div>
              <p className="text-[11px] text-stone-400">Serving Style</p>
              <p className="text-xs font-bold text-stone-800 mt-0.5">Buffet & Table</p>
            </div>
            <div>
              <p className="text-[11px] text-stone-400">Preparation</p>
              <p className="text-xs font-bold text-stone-800 mt-0.5">Fresh On-Site</p>
            </div>
            <div>
              <p className="text-[11px] text-stone-400">Spiciness</p>
              <p className="text-xs font-bold text-stone-800 mt-0.5">Customizable</p>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-sm font-semibold transition-colors"
            >
              Continue Browsing
            </button>

            <button
              onClick={() => {
                toggleFood(food);
                onClose();
              }}
              className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center space-x-2 shadow-md ${
                selected
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-royal-950 shadow-glow'
              }`}
            >
              {selected ? (
                <>
                  <X className="w-4 h-4" />
                  <span>Remove from Selection</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add to My Catering Selection</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
