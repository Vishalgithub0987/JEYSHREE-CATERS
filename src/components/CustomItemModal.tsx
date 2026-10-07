'use client';

import React, { useState, useEffect } from 'react';
import { useSelection } from '@/context/SelectionContext';
import { DietaryType } from '@/types';
import { X, Sparkles, Check, AlertCircle } from 'lucide-react';

export const CustomItemModal: React.FC = () => {
  const {
    isCustomModalOpen,
    closeCustomModal,
    customModalDiet,
    editingCustomItem,
    addCustomItem,
    updateCustomItem,
    setIsDrawerOpen,
  } = useSelection();

  const [name, setName] = useState('');
  const [diet, setDiet] = useState<DietaryType>('veg');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  // Sync state whenever modal opens or editing item changes
  useEffect(() => {
    if (isCustomModalOpen) {
      if (editingCustomItem) {
        setName(editingCustomItem.name || '');
        setDiet(editingCustomItem.type || 'veg');
        setQuantity(editingCustomItem.quantity || 1);
        setNotes(editingCustomItem.customNotes || '');
      } else {
        setName('');
        setDiet(customModalDiet || 'veg');
        setQuantity(1);
        setNotes('');
      }
      setError('');
    }
  }, [isCustomModalOpen, editingCustomItem, customModalDiet]);

  // Handle ESC key press & background scroll lock
  useEffect(() => {
    if (!isCustomModalOpen) return;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    if ((window as any).__lenis) {
      (window as any).__lenis.stop();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCustomModalOpen) {
        closeCustomModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if ((window as any).__lenis) {
        (window as any).__lenis.start();
      }
    };
  }, [isCustomModalOpen, closeCustomModal]);

  if (!isCustomModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) {
      setError('Please enter the dish or delicacy name.');
      return;
    }

    const finalQty = quantity < 1 ? 1 : quantity;

    if (editingCustomItem) {
      updateCustomItem(editingCustomItem.id, {
        name: cleanName,
        type: diet,
        quantity: finalQty,
        notes: notes.trim() || undefined,
      });
    } else {
      addCustomItem({
        name: cleanName,
        type: diet,
        quantity: finalQty,
        notes: notes.trim() || undefined,
      });
      // Open drawer so the customer immediately sees their added custom delicacy
      setIsDrawerOpen(true);
    }

    closeCustomModal();
  };

  const themeColor = diet === 'veg' ? '#075B35' : '#B91C1C';
  const themeBgLight = diet === 'veg' ? '#F5FBF7' : '#FEF2F2';
  const themeBorder = diet === 'veg' ? '#075B35' : '#B91C1C';

  const quickSuggestions =
    diet === 'veg'
      ? ['Filter Kaapi', 'Elaneer Payasam', 'Karuveppilai Rice', 'Ghee Podi Idli']
      : ['Mutton Chukka', 'Nattu Kozhi Soup', 'Vanjaram Fish Fry', 'Chicken 65'];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        backgroundColor: 'rgba(5, 32, 32, 0.65)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={closeCustomModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="custom-modal-title"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          backgroundColor: '#FFFDF7',
          borderRadius: '1.25rem',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)',
          border: '1.5px solid rgba(200, 159, 92, 0.4)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid rgba(200, 159, 92, 0.25)',
            backgroundColor: '#FAF7EE',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.72rem',
                fontWeight: 800,
                color: '#B88916',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginBottom: '0.25rem',
              }}
            >
              <Sparkles size={13} color="#B88916" />
              <span>Personalized Feast Request</span>
            </div>
            <h2
              id="custom-modal-title"
              style={{
                fontSize: '1.35rem',
                fontWeight: 800,
                color: '#052020',
                margin: 0,
              }}
            >
              {editingCustomItem ? 'Edit Custom Dish' : 'Add a Custom Dish'}
            </h2>
            <p
              style={{
                fontSize: '0.82rem',
                color: '#556960',
                margin: '0.25rem 0 0',
                lineHeight: 1.4,
              }}
            >
              Have a special family recipe, dessert, or dish not in the master list? Add it directly to your feast selection.
            </p>
          </div>

          <button
            type="button"
            onClick={closeCustomModal}
            style={{
              background: 'none',
              border: '1px solid rgba(200, 159, 92, 0.3)',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#052020',
              flexShrink: 0,
              transition: 'background-color 0.2s ease',
            }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            padding: '1.5rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          {error && (
            <div
              style={{
                backgroundColor: '#FEF2F2',
                border: '1px solid #FCA5A5',
                color: '#991B1B',
                padding: '0.65rem 0.85rem',
                borderRadius: '0.5rem',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          {/* Dish / Item Name */}
          <div>
            <label
              htmlFor="custom-dish-name"
              style={{
                display: 'block',
                fontSize: '0.88rem',
                fontWeight: 700,
                color: '#052020',
                marginBottom: '0.4rem',
              }}
            >
              Dish or Delicacy Name <span style={{ color: '#B91C1C' }}>*</span>
            </label>
            <input
              id="custom-dish-name"
              type="text"
              required
              autoFocus
              placeholder="e.g. Mutton Chukka, Filter Kaapi, Special Parotta, Karuveppilai Rice"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              style={{
                width: '100%',
                padding: '0.75rem 0.9rem',
                fontSize: '0.92rem',
                borderRadius: '0.65rem',
                border: '1.5px solid rgba(200, 159, 92, 0.35)',
                backgroundColor: '#FFFFFF',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s ease',
              }}
            />

            {/* Quick Suggestions */}
            <div
              style={{
                marginTop: '0.55rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                flexWrap: 'wrap',
              }}
            >
              <span style={{ fontSize: '0.74rem', color: '#7c9989', fontWeight: 600 }}>
                Popular:
              </span>
              {quickSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => {
                    setName(suggestion);
                    if (error) setError('');
                  }}
                  style={{
                    padding: '0.2rem 0.55rem',
                    borderRadius: '999px',
                    border: '1px solid rgba(200, 159, 92, 0.35)',
                    backgroundColor: '#FAF7EE',
                    color: '#052020',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  + {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Dietary Selection (Veg vs Non-Veg) */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.88rem',
                fontWeight: 700,
                color: '#052020',
                marginBottom: '0.45rem',
              }}
            >
              Dietary Preference
            </label>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.75rem',
              }}
            >
              {/* Veg Option */}
              <button
                type="button"
                onClick={() => setDiet('veg')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.55rem',
                  padding: '0.65rem 0.9rem',
                  borderRadius: '0.65rem',
                  border: diet === 'veg' ? '2px solid #075B35' : '1.5px solid rgba(200, 159, 92, 0.3)',
                  backgroundColor: diet === 'veg' ? '#F5FBF7' : '#FFFFFF',
                  color: diet === 'veg' ? '#075B35' : '#4A5568',
                  fontWeight: diet === 'veg' ? 700 : 500,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <span
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '3px',
                    border: '1.5px solid #075B35',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      backgroundColor: '#075B35',
                    }}
                  />
                </span>
                <span>Pure Vegetarian</span>
              </button>

              {/* Non-Veg Option */}
              <button
                type="button"
                onClick={() => setDiet('non-veg')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.55rem',
                  padding: '0.65rem 0.9rem',
                  borderRadius: '0.65rem',
                  border: diet === 'non-veg' ? '2px solid #B91C1C' : '1.5px solid rgba(200, 159, 92, 0.3)',
                  backgroundColor: diet === 'non-veg' ? '#FEF2F2' : '#FFFFFF',
                  color: diet === 'non-veg' ? '#B91C1C' : '#4A5568',
                  fontWeight: diet === 'non-veg' ? 700 : 500,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <span
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '3px',
                    border: '1.5px solid #B91C1C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <span
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: '4px solid transparent',
                      borderRight: '4px solid transparent',
                      borderBottom: '7px solid #B91C1C',
                    }}
                  />
                </span>
                <span>Non-Vegetarian</span>
              </button>
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.4rem',
              }}
            >
              <label
                htmlFor="custom-quantity"
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: '#052020',
                }}
              >
                Quantity / Portions
              </label>
              <span style={{ fontSize: '0.75rem', color: '#7c9989' }}>
                Batches or custom servings
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                flexWrap: 'wrap',
              }}
            >
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '0.5rem',
                  border: '1.5px solid rgba(200, 159, 92, 0.4)',
                  backgroundColor: '#FAF7EE',
                  color: '#052020',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
                aria-label="Decrease quantity"
              >
                −
              </button>

              <input
                id="custom-quantity"
                type="number"
                min={1}
                max={999}
                value={quantity === 0 ? '' : quantity}
                onChange={(e) => {
                  const raw = e.target.value;
                  if (raw === '') {
                    setQuantity(0);
                    return;
                  }
                  const val = parseInt(raw, 10);
                  if (!isNaN(val)) {
                    setQuantity(Math.min(999, Math.max(0, val)));
                  }
                }}
                onBlur={() => {
                  if (quantity < 1) {
                    setQuantity(1);
                  }
                }}
                style={{
                  width: '75px',
                  height: '40px',
                  textAlign: 'center',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#052020',
                  borderRadius: '0.5rem',
                  border: '1.5px solid rgba(200, 159, 92, 0.4)',
                  backgroundColor: '#FFFFFF',
                  outline: 'none',
                }}
              />

              <button
                type="button"
                onClick={() => setQuantity((q) => (q < 1 ? 1 : q + 1))}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '0.5rem',
                  border: '1.5px solid rgba(200, 159, 92, 0.4)',
                  backgroundColor: '#FAF7EE',
                  color: '#052020',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
                aria-label="Increase quantity"
              >
                +
              </button>

              {/* Quick Preset Buttons */}
              <div style={{ display: 'flex', gap: '0.4rem', marginLeft: 'auto' }}>
                {[1, 2, 5, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setQuantity(num)}
                    style={{
                      padding: '0.35rem 0.65rem',
                      borderRadius: '0.4rem',
                      border:
                        quantity === num
                          ? `1.5px solid ${themeBorder}`
                          : '1px solid rgba(200, 159, 92, 0.25)',
                      backgroundColor: quantity === num ? themeBgLight : '#FFFFFF',
                      color: quantity === num ? themeColor : '#556960',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Special Instructions / Notes */}
          <div>
            <label
              htmlFor="custom-notes"
              style={{
                display: 'block',
                fontSize: '0.88rem',
                fontWeight: 700,
                color: '#052020',
                marginBottom: '0.4rem',
              }}
            >
              Special Preparation Notes{' '}
              <span style={{ fontSize: '0.75rem', color: '#7c9989', fontWeight: 400 }}>
                (Optional)
              </span>
            </label>
            <textarea
              id="custom-notes"
              rows={2}
              placeholder="e.g. Mild spice, Chettinadu style, serve hot with coconut chutney, traditional recipe..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                fontSize: '0.88rem',
                borderRadius: '0.65rem',
                border: '1.5px solid rgba(200, 159, 92, 0.35)',
                backgroundColor: '#FFFFFF',
                outline: 'none',
                boxSizing: 'border-box',
                resize: 'none',
                fontFamily: 'inherit',
              }}
            />
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              marginTop: '0.5rem',
            }}
          >
            <button
              type="button"
              onClick={closeCustomModal}
              style={{
                flex: 1,
                padding: '0.75rem',
                borderRadius: '0.65rem',
                border: '1.5px solid rgba(200, 159, 92, 0.4)',
                backgroundColor: '#FAF7EE',
                color: '#4A5568',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              style={{
                flex: 2,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                borderRadius: '0.65rem',
                border: 'none',
                backgroundColor: themeColor,
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                boxShadow: `0 4px 14px ${
                  diet === 'veg' ? 'rgba(7, 91, 53, 0.3)' : 'rgba(185, 28, 28, 0.3)'
                }`,
                transition: 'transform 0.15s ease, opacity 0.2s ease',
              }}
            >
              <Check size={18} />
              <span>{editingCustomItem ? 'Update Custom Dish' : 'Add to Feast Cart'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
