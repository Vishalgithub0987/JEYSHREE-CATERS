import React, { useState } from 'react';
import { useSelection } from '../context/SelectionContext';
import { ShoppingBag, ChevronUp, X, Trash2, ArrowRight } from 'lucide-react';

export function MobileSelectionBar({ onReview }) {
  const { selectedFoods, removeFood, clearSelection, totalCount } = useSelection();
  const [isOpen, setIsOpen] = useState(false);

  if (totalCount === 0) return null;

  return (
    <>
      {/* Floating Bottom Pill (Mobile/Tablet only) */}
      <div className="xl:hidden fixed bottom-5 left-4 right-4 z-40 animate-bounce-subtle">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-royal-950 text-white rounded-2xl p-3.5 shadow-2xl border border-amber-500/40 flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-royal-950 flex items-center justify-center font-bold text-xs">
              {totalCount}
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-amber-300">View Selection ({totalCount})</p>
              <p className="text-[10px] text-stone-300">Tap to review your catering menu</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-amber-400 text-xs font-semibold">
            <span>Open</span>
            <ChevronUp className="w-4 h-4" />
          </div>
        </button>
      </div>

      {/* Slide-up Drawer Modal */}
      {isOpen && (
        <div className="xl:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col justify-end animate-fade-in">
          <div className="bg-white rounded-t-3xl max-h-[80vh] flex flex-col shadow-2xl border-t border-stone-200">
            {/* Drawer Header */}
            <div className="p-4 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-stone-900 text-lg">Your Catering Selection</h3>
                <p className="text-xs text-stone-500">{totalCount} dishes selected</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Item list */}
            <div className="p-4 overflow-y-auto space-y-2 flex-1">
              {selectedFoods.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-100"
                >
                  <div>
                    <p className="text-xs font-bold text-stone-800">{item.name}</p>
                    <p className="text-[10px] text-stone-400">{item.category}</p>
                  </div>
                  <button
                    onClick={() => removeFood(item.id)}
                    className="p-1.5 text-stone-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Bottom buttons */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 space-y-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onReview();
                }}
                className="w-full py-3.5 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-amber-600 text-royal-950 flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>Proceed to Review Selection ({totalCount})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex justify-between items-center px-1">
                <button
                  onClick={clearSelection}
                  className="text-xs text-stone-400 hover:text-red-600"
                >
                  Clear Selection
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-xs text-stone-500 font-medium"
                >
                  Add More Dishes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
