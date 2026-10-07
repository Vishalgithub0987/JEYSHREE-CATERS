'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useSelection } from '@/context/SelectionContext';
import { 
  X, 
  Check, 
  Plus, 
  Flame, 
  Sparkles, 
  ShieldCheck, 
  Utensils 
} from 'lucide-react';

export const FoodModal: React.FC = () => {
  const { selectedModalFood, setSelectedModalFood, toggleSelectFood, isSelected } = useSelection();

  // Escape key closes modal & lock background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedModalFood(null);
    };
    if (selectedModalFood) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if ((window as any).__lenis) {
        (window as any).__lenis.stop();
      }
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if ((window as any).__lenis) {
        (window as any).__lenis.start();
      }
    };
  }, [selectedModalFood, setSelectedModalFood]);

  if (!selectedModalFood) return null;

  const selected = isSelected(selectedModalFood.id);
  const ingredientsList = selectedModalFood.ingredients
    ? selectedModalFood.ingredients.split(',').map((s) => s.trim())
    : [];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(3, 66, 38, 0.65)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={() => setSelectedModalFood(null)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-food-title"
    >
      <div
        style={{
          backgroundColor: '#FFFDF7',
          borderRadius: '1.75rem',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
          border: '1.5px solid rgba(229, 181, 42, 0.4)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedModalFood(null)}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 10,
            backgroundColor: 'rgba(255, 253, 247, 0.9)',
            border: '1px solid rgba(7, 91, 53, 0.2)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--green-dark)',
          }}
          aria-label="Close details"
        >
          <X size={20} />
        </button>

        {/* Modal Hero Image */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            backgroundColor: '#F7F3E8',
          }}
        >
          <Image
            src={selectedModalFood.image}
            alt={selectedModalFood.name}
            fill
            sizes="680px"
            style={{ objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent 50%, rgba(3, 66, 38, 0.8) 100%)',
            }}
          />

          <div
            style={{
              position: 'absolute',
              bottom: '1rem',
              left: '1.5rem',
              right: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span
              style={{
                backgroundColor: selectedModalFood.type === 'veg' ? '#27AE60' : '#C0392B',
                color: '#FFFFFF',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              {selectedModalFood.type === 'veg' ? 'Pure Vegetarian' : 'Non-Vegetarian'}
            </span>

            {selectedModalFood.price && (
              <span
                style={{
                  backgroundColor: '#E5B52A',
                  color: '#034226',
                  padding: '0.25rem 0.85rem',
                  borderRadius: '9999px',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                }}
              >
                ₹{selectedModalFood.price} / portion
              </span>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '2rem' }}>
          <span
            style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#B88916',
            }}
          >
            {selectedModalFood.category}
          </span>

          <h2
            id="modal-food-title"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.85rem',
              color: 'var(--green-dark)',
              fontWeight: 800,
              marginTop: '0.25rem',
              marginBottom: '1rem',
            }}
          >
            {selectedModalFood.name}
          </h2>

          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
            {selectedModalFood.description}
          </p>

          {/* Traditional Culinary Notes */}
          {selectedModalFood.traditionalHighlight && (
            <div
              style={{
                backgroundColor: 'rgba(229, 181, 42, 0.12)',
                borderLeft: '4px solid #E5B52A',
                padding: '0.85rem 1.2rem',
                borderRadius: '0 0.85rem 0.85rem 0',
                marginBottom: '1.8rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#B88916', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.2rem' }}>
                <Sparkles size={15} />
                <span>Heritage Banquet Highlight</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text)', fontStyle: 'italic', margin: 0 }}>
                {selectedModalFood.traditionalHighlight}
              </p>
            </div>
          )}

          {/* Key Ingredients */}
          {ingredientsList.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--green-dark)', marginBottom: '0.75rem' }}>
                Key Ingredients &amp; Tempered Spices
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {ingredientsList.map((item, idx) => (
                  <span
                    key={idx}
                    style={{
                      backgroundColor: 'rgba(7, 91, 53, 0.07)',
                      color: 'var(--green-dark)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      padding: '0.35rem 0.85rem',
                      borderRadius: '9999px',
                      border: '1px solid rgba(7, 91, 53, 0.15)',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Quality Guarantees */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              paddingTop: '1.2rem',
              borderTop: '1px solid rgba(7, 91, 53, 0.1)',
              marginBottom: '1.8rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <ShieldCheck size={16} color="#075B35" />
              <span>Prepared in Hygienic Commercial Kitchen</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <Utensils size={16} color="#075B35" />
              <span>Served Piping Hot at Venue</span>
            </div>
          </div>

          {/* Modal Action CTA */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => toggleSelectFood(selectedModalFood)}
              className={selected ? 'btn btn-secondary' : 'btn btn-primary'}
              style={{ flex: 1, padding: '0.9rem' }}
            >
              {selected ? (
                <>
                  <Check size={18} />
                  <span>Remove from Selection</span>
                </>
              ) : (
                <>
                  <Plus size={18} />
                  <span>Add to Catering Selection</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
