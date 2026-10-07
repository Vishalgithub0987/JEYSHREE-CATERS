'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, DietaryType, CustomItemInput } from '@/types';
import { CustomItemModal } from '@/components/CustomItemModal';

interface SelectionContextType {
  selectedFoods: MenuItem[];
  toggleSelectFood: (food: MenuItem) => void;
  removeFood: (foodId: string) => void;
  clearSelection: () => void;
  isSelected: (foodId: string) => boolean;
  totalCount: number;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  selectedModalFood: MenuItem | null;
  setSelectedModalFood: (food: MenuItem | null) => void;
  // Custom Item Management
  isCustomModalOpen: boolean;
  customModalDiet: DietaryType;
  editingCustomItem: MenuItem | null;
  openCustomModal: (defaultDiet?: DietaryType, itemToEdit?: MenuItem | null) => void;
  closeCustomModal: () => void;
  addCustomItem: (item: CustomItemInput) => void;
  updateCustomItem: (id: string, updates: CustomItemInput) => void;
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

export const SelectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedFoods, setSelectedFoods] = useState<MenuItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedModalFood, setSelectedModalFood] = useState<MenuItem | null>(null);

  // Custom Item Modal State
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [customModalDiet, setCustomModalDiet] = useState<DietaryType>('veg');
  const [editingCustomItem, setEditingCustomItem] = useState<MenuItem | null>(null);

  // Restore selection from localStorage if present
  useEffect(() => {
    try {
      const stored = localStorage.getItem('jayshree_selected_foods');
      if (stored) {
        setSelectedFoods(JSON.parse(stored));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('jayshree_selected_foods', JSON.stringify(selectedFoods));
    } catch {
      // Ignore
    }
  }, [selectedFoods]);

  const toggleSelectFood = (food: MenuItem) => {
    setSelectedFoods((prev) => {
      const exists = prev.some((item) => item.id === food.id);
      if (exists) {
        return prev.filter((item) => item.id !== food.id);
      } else {
        return [...prev, food];
      }
    });
  };

  const removeFood = (foodId: string) => {
    setSelectedFoods((prev) => prev.filter((item) => item.id !== foodId));
  };

  const clearSelection = () => {
    setSelectedFoods([]);
  };

  const isSelected = (foodId: string) => {
    return selectedFoods.some((item) => item.id === foodId);
  };

  const openCustomModal = (defaultDiet: DietaryType = 'veg', itemToEdit: MenuItem | null = null) => {
    if (itemToEdit) {
      setEditingCustomItem(itemToEdit);
      setCustomModalDiet(itemToEdit.type);
    } else {
      setEditingCustomItem(null);
      setCustomModalDiet(defaultDiet);
    }
    setIsCustomModalOpen(true);
  };

  const closeCustomModal = () => {
    setIsCustomModalOpen(false);
    setEditingCustomItem(null);
  };

  const addCustomItem = (input: CustomItemInput) => {
    const cleanName = input.name.trim();
    if (!cleanName) return;
    const newItem: MenuItem = {
      id: `custom-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: cleanName,
      englishName: cleanName,
      tamilName: '',
      category: 'Custom Delicacy',
      description: input.notes?.trim() || 'Custom customer requested delicacy',
      ingredients: input.notes?.trim() || '',
      type: input.type,
      image: input.type === 'veg'
        ? 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80'
        : 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80',
      isCustom: true,
      quantity: input.quantity > 0 ? input.quantity : 1,
      customNotes: input.notes?.trim(),
    };
    setSelectedFoods((prev) => [...prev, newItem]);
  };

  const updateCustomItem = (id: string, updates: CustomItemInput) => {
    const cleanName = updates.name.trim();
    if (!cleanName) return;
    setSelectedFoods((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            name: cleanName,
            englishName: cleanName,
            type: updates.type,
            quantity: updates.quantity > 0 ? updates.quantity : 1,
            customNotes: updates.notes?.trim(),
            description: updates.notes?.trim() || item.description,
            image: updates.type === 'veg'
              ? 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80'
              : 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80',
          };
        }
        return item;
      })
    );
  };

  return (
    <SelectionContext.Provider
      value={{
        selectedFoods,
        toggleSelectFood,
        removeFood,
        clearSelection,
        isSelected,
        totalCount: selectedFoods.length,
        isDrawerOpen,
        setIsDrawerOpen,
        selectedModalFood,
        setSelectedModalFood,
        isCustomModalOpen,
        customModalDiet,
        editingCustomItem,
        openCustomModal,
        closeCustomModal,
        addCustomItem,
        updateCustomItem,
      }}
    >
      {children}
      <CustomItemModal />
    </SelectionContext.Provider>
  );
};

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
};
