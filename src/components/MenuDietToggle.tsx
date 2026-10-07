'use client';

import React from 'react';
import { DietaryType } from '@/types';

interface MenuDietToggleProps {
  currentDiet: DietaryType;
  onChange: (diet: DietaryType) => void;
  vegCount?: number;
  nonVegCount?: number;
}

export const MenuDietToggle: React.FC<MenuDietToggleProps> = ({
  currentDiet,
  onChange,
  vegCount,
  nonVegCount,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.65rem',
        margin: '0 auto 2rem auto',
        width: '100%',
        maxWidth: '560px',
      }}
    >
      {/* Outer Toggle Container */}
      <div
        role="tablist"
        className="menu-diet-toggle-outer"
        aria-label="Catering Dietary Menu Selector"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.45rem',
          backgroundColor: '#FFFFFF',
          padding: '0.45rem',
          borderRadius: '9999px',
          border: '1.5px solid rgba(200, 159, 92, 0.45)',
          boxShadow: '0 8px 30px rgba(5, 32, 32, 0.08)',
          width: '100%',
          position: 'relative',
        }}
      >
        {/* VEG Button */}
        <button
          type="button"
          role="tab"
          aria-selected={currentDiet === 'veg'}
          onClick={() => onChange('veg')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.65rem',
            padding: '0.8rem 1.25rem',
            borderRadius: '9999px',
            border: currentDiet === 'veg' ? '1.5px solid #075B35' : '1px solid transparent',
            background:
              currentDiet === 'veg'
                ? 'linear-gradient(135deg, #075B35 0%, #0A7242 100%)'
                : 'transparent',
            color: currentDiet === 'veg' ? '#FFFFFF' : '#052020',
            cursor: 'pointer',
            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow:
              currentDiet === 'veg' ? '0 6px 18px rgba(7, 91, 53, 0.3)' : 'none',
          }}
        >
          {/* Authentic FSSAI Veg Symbol */}
          <span
            style={{
              width: '18px',
              height: '18px',
              border: currentDiet === 'veg' ? '2px solid #FFFFFF' : '2px solid #075B35',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '3px',
              flexShrink: 0,
              backgroundColor: currentDiet === 'veg' ? 'rgba(255, 255, 255, 0.15)' : '#FFFFFF',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: currentDiet === 'veg' ? '#FFFFFF' : '#075B35',
              }}
            />
          </span>

          <span style={{ fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.3px' }}>
            Pure Veg
          </span>

          {vegCount !== undefined && (
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.15rem 0.5rem',
                borderRadius: '999px',
                backgroundColor:
                  currentDiet === 'veg' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(7, 91, 53, 0.1)',
                color: currentDiet === 'veg' ? '#FFFFFF' : '#075B35',
              }}
            >
              {vegCount}
            </span>
          )}
        </button>

        {/* NON-VEG Button */}
        <button
          type="button"
          role="tab"
          aria-selected={currentDiet === 'non-veg'}
          onClick={() => onChange('non-veg')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.65rem',
            padding: '0.8rem 1.25rem',
            borderRadius: '9999px',
            border: currentDiet === 'non-veg' ? '1.5px solid #991B1B' : '1px solid transparent',
            background:
              currentDiet === 'non-veg'
                ? 'linear-gradient(135deg, #B91C1C 0%, #DC2626 100%)'
                : 'transparent',
            color: currentDiet === 'non-veg' ? '#FFFFFF' : '#052020',
            cursor: 'pointer',
            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow:
              currentDiet === 'non-veg' ? '0 6px 18px rgba(185, 28, 28, 0.32)' : 'none',
          }}
        >
          {/* Authentic FSSAI Non-Veg Symbol */}
          <span
            style={{
              width: '18px',
              height: '18px',
              border: currentDiet === 'non-veg' ? '2px solid #FFFFFF' : '2px solid #B91C1C',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '3px',
              flexShrink: 0,
              backgroundColor: currentDiet === 'non-veg' ? 'rgba(255, 255, 255, 0.15)' : '#FFFFFF',
            }}
          >
            {/* Non-veg Triangle */}
            <span
              style={{
                width: 0,
                height: 0,
                borderLeft: '4.5px solid transparent',
                borderRight: '4.5px solid transparent',
                borderBottom: currentDiet === 'non-veg' ? '8px solid #FFFFFF' : '8px solid #B91C1C',
              }}
            />
          </span>

          <span style={{ fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.3px' }}>
            Non-Veg
          </span>

          {nonVegCount !== undefined && (
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.15rem 0.5rem',
                borderRadius: '999px',
                backgroundColor:
                  currentDiet === 'non-veg'
                    ? 'rgba(255, 255, 255, 0.25)'
                    : 'rgba(185, 28, 28, 0.1)',
                color: currentDiet === 'non-veg' ? '#FFFFFF' : '#B91C1C',
              }}
            >
              {nonVegCount}
            </span>
          )}
        </button>
      </div>

      {/* Helpful Context Tagline */}
      <div
        style={{
          fontSize: '0.82rem',
          color: currentDiet === 'veg' ? '#075B35' : '#991B1B',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
        }}
      >
        <span>
          {currentDiet === 'veg'
            ? '🌿 Viewing Traditional Vegetarian Master Menu (Separate Sattvic Preparation)'
            : '🍗 Viewing Non-Vegetarian Master Menu (Signature Biryanis, Fries & Curries)'}
        </span>
      </div>
    </div>
  );
};
