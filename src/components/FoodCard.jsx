import React from 'react';
import { useSelection } from '../context/SelectionContext';
import { Check, Plus, Trash2, Eye } from 'lucide-react';

export function FoodCard({ food, onOpenDetails }) {
  const { isSelected, toggleFood } = useSelection();
  const selected = isSelected(food.id);

  return (
    <div className={`group relative bg-white rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
      selected 
        ? 'border-amber-500 shadow-glow ring-2 ring-amber-500/20' 
        : 'border-stone-200/90 hover:border-amber-300 hover:shadow-premium'
    }`}>
      {/* Image container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 cursor-pointer" onClick={() => onOpenDetails(food)}>
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
          <button 
            type="button"
            className="text-xs text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center space-x-1 hover:bg-black/80"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Recipe & Ingredients</span>
          </button>
        </div>

        {/* Veg / Non-Veg Indicator */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md p-1.5 rounded-lg shadow-sm flex items-center space-x-1.5">
          <span className={food.type === 'veg' ? 'veg-badge' : 'nonveg-badge'} title={food.type === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}></span>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${food.type === 'veg' ? 'text-emerald-700' : 'text-red-700'}`}>
            {food.type === 'veg' ? 'Veg' : 'Non-Veg'}
          </span>
        </div>

        {/* Category Pill */}
        <div className="absolute top-3 right-3 bg-royal-950/80 backdrop-blur-md text-amber-300 text-[11px] font-medium px-2.5 py-1 rounded-full border border-amber-500/30">
          {food.category}
        </div>
      </div>

      {/* Body content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 
              onClick={() => onOpenDetails(food)}
              className="font-serif font-bold text-stone-900 text-lg hover:text-amber-700 cursor-pointer transition-colors leading-snug"
            >
              {food.name}
            </h3>
            {food.price ? (
              <span className="font-sans font-bold text-amber-700 text-sm whitespace-nowrap">
                ₹{food.price}
              </span>
            ) : null}
          </div>

          <p className="text-stone-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
            {food.description}
          </p>
        </div>

        {/* Footer actions */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          <button
            onClick={() => onOpenDetails(food)}
            className="text-xs text-stone-400 hover:text-stone-700 font-medium"
          >
            Details
          </button>

          <button
            onClick={() => toggleFood(food)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              selected
                ? 'bg-emerald-600 hover:bg-red-600 text-white shadow-sm'
                : 'bg-stone-900 hover:bg-amber-600 text-white shadow-sm'
            }`}
          >
            {selected ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span className="group-hover:hidden">Selected</span>
                <span className="hidden group-hover:inline">Remove</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Select</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
