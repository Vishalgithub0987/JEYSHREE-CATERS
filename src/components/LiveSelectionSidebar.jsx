import React from 'react';
import { useSelection } from '../context/SelectionContext';
import { Check, Trash2, ArrowRight, Sparkles, Utensils } from 'lucide-react';

export function LiveSelectionSidebar({ onReview }) {
  const { selectedFoods, removeFood, clearSelection, totalCount, categoryCounts } = useSelection();

  return (
    <aside className="hidden xl:block w-80 shrink-0 sticky top-28 self-start bg-white rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-royal-950 to-stone-900 text-white p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="font-serif font-bold text-lg text-white">Your Selection</h3>
          </div>
          <span className="text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
            {totalCount} {totalCount === 1 ? 'Item' : 'Items'}
          </span>
        </div>
        <p className="text-[11px] text-stone-400 mt-1">Live catering menu draft</p>
      </div>

      {/* Selected Items List */}
      <div className="p-4 max-h-[calc(100vh-360px)] overflow-y-auto space-y-2.5">
        {totalCount === 0 ? (
          <div className="py-12 px-4 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-amber-50 flex items-center justify-center text-amber-600 mb-3">
              <Utensils className="w-6 h-6 stroke-[1.5]" />
            </div>
            <p className="text-sm font-semibold text-stone-700">No dishes selected yet</p>
            <p className="text-xs text-stone-400 mt-1">
              Browse dishes below and click "Select" to start building your catering feast.
            </p>
          </div>
        ) : (
          <>
            {/* Category summary tags */}
            <div className="flex flex-wrap gap-1.5 pb-2 border-b border-stone-100">
              {Object.entries(categoryCounts).map(([cat, count]) => (
                <span key={cat} className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md font-medium">
                  {cat}: <b>{count}</b>
                </span>
              ))}
            </div>

            {/* List */}
            <div className="space-y-1.5 pt-1">
              {selectedFoods.map((item) => (
                <div
                  key={item.id}
                  className="group flex items-center justify-between p-2 rounded-xl bg-stone-50 hover:bg-amber-50/60 border border-stone-100 transition-colors"
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <span className="text-emerald-600 font-bold text-xs shrink-0">✓</span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-stone-800 truncate leading-tight">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-stone-400 truncate">
                        {item.category} {item.price ? `• ₹${item.price}` : ''}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFood(item.id)}
                    className="text-stone-300 hover:text-red-500 p-1 rounded-lg transition-colors shrink-0"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Footer Actions */}
      {totalCount > 0 && (
        <div className="p-4 bg-stone-50 border-t border-stone-100 space-y-2.5">
          <button
            onClick={onReview}
            className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-royal-950 shadow-md hover:shadow-glow flex items-center justify-center space-x-2 transition-all"
          >
            <span>Review Selection ({totalCount})</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={clearSelection}
            className="w-full text-center text-[11px] text-stone-400 hover:text-stone-700 transition-colors py-1"
          >
            Clear All Selections
          </button>
        </div>
      )}
    </aside>
  );
}
