import React, { createContext, useContext, useState, useEffect } from 'react';

const SelectionContext = createContext(null);

export function SelectionProvider({ children }) {
  const [selectedFoods, setSelectedFoods] = useState(() => {
    try {
      const saved = localStorage.getItem('royal_feast_selection');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('royal_feast_selection', JSON.stringify(selectedFoods));
    } catch (e) {
      console.error('Failed to sync selection to localStorage', e);
    }
  }, [selectedFoods]);

  const isSelected = (foodId) => {
    return selectedFoods.some(item => item.id === foodId);
  };

  const toggleFood = (food) => {
    setSelectedFoods(prev => {
      const exists = prev.some(item => item.id === food.id);
      if (exists) {
        return prev.filter(item => item.id !== food.id);
      } else {
        return [...prev, {
          id: food.id,
          name: food.name,
          category: food.category,
          type: food.type,
          price: food.price || 0,
          image: food.image
        }];
      }
    });
  };

  const removeFood = (foodId) => {
    setSelectedFoods(prev => prev.filter(item => item.id !== foodId));
  };

  const clearSelection = () => {
    setSelectedFoods([]);
  };

  const totalCount = selectedFoods.length;

  const categoryCounts = selectedFoods.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  const estimatedTotal = selectedFoods.reduce((sum, item) => sum + (item.price || 0), 0);

  const value = {
    selectedFoods,
    toggleFood,
    removeFood,
    clearSelection,
    isSelected,
    totalCount,
    categoryCounts,
    estimatedTotal
  };

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}

export function useSelection() {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
}
