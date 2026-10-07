'use client';

import React from 'react';
import Image from 'next/image';
import { MenuItem } from '@/types';
import { useSelection } from '@/context/SelectionContext';
import { 
  Check, 
  Plus, 
  Info, 
  Flame, 
  Sparkles 
} from 'lucide-react';

interface FoodCardProps {
  food: MenuItem;
}

export const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  const { toggleSelectFood, isSelected, setSelectedModalFood } = useSelection();
  const selected = isSelected(food.id);

  return (
    <div
      className="card-luxury"
      style={{
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderColor: selected ? 'var(--green)' : 'var(--border-light)',
        boxShadow: selected ? '0 10px 30px rgba(7, 91, 53, 0.16)' : 'var(--shadow-sm)',
        transform: selected ? 'translateY(-2px)' : 'none',
        backgroundColor: '#FFFFFF',
        transition: 'all 0.25s ease',
      }}
    >
      <div>
        {/* Food Image with Veg/Non-Veg & Popular Badges */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 11',
            backgroundColor: '#F7F3E8',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
          onClick={() => setSelectedModalFood(food)}
        >
          <Image
            src={food.image}
            alt={food.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
            className="food-card-img"
          />
          <style jsx>{`
            :global(.food-card-img:hover) {
              transform: scale(1.06);
            }
          `}</style>

          {/* Top Badges Bar */}
          <div
            style={{
              position: 'absolute',
              top: '0.85rem',
              left: '0.85rem',
              right: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              pointerEvents: 'none',
            }}
          >
            {/* Veg / Non-Veg Indicator */}
            <div
              style={{
                width: '22px',
                height: '22px',
                border: food.type === 'veg' ? '2px solid #27AE60' : '2px solid #C0392B',
                borderRadius: '4px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              }}
              title={food.type === 'veg' ? 'Pure Vegetarian' : 'Non-Vegetarian'}
            >
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: food.type === 'veg' ? '50%' : '2px',
                  backgroundColor: food.type === 'veg' ? '#27AE60' : '#C0392B',
                }}
              />
            </div>

            {/* Popular or Traditional Tag */}
            {food.popular && (
              <div
                style={{
                  backgroundColor: 'rgba(229, 181, 42, 0.95)',
                  color: '#034226',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}
              >
                <Sparkles size={11} />
                <span>Specialty</span>
              </div>
            )}
          </div>

          {/* Subtle bottom gradient */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '35%',
              background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.45) 100%)',
            }}
          />

          {/* Price badge */}
          {food.price && (
            <div
              style={{
                position: 'absolute',
                bottom: '0.65rem',
                right: '0.85rem',
                backgroundColor: 'rgba(7, 91, 53, 0.9)',
                color: '#FFFDF7',
                padding: '0.2rem 0.65rem',
                borderRadius: '0.5rem',
                fontSize: '0.78rem',
                fontWeight: 700,
                backdropFilter: 'blur(4px)',
              }}
            >
              ₹{food.price}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div style={{ padding: '1.4rem 1.4rem 1rem 1.4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--green)',
              }}
            >
              {food.category}
            </span>

            {food.spiciness && (
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: food.spiciness === 'spicy' ? '#C0392B' : '#7c9989',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.2rem',
                }}
              >
                <Flame size={12} />
                {food.spiciness}
              </span>
            )}
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.25rem',
              color: 'var(--green-dark)',
              fontWeight: 700,
              lineHeight: 1.25,
              marginBottom: '0.55rem',
              cursor: 'pointer',
            }}
            onClick={() => setSelectedModalFood(food)}
          >
            {food.name}
          </h3>

          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              lineHeight: 1.55,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              marginBottom: '0.8rem',
            }}
          >
            {food.description}
          </p>

          {food.traditionalHighlight && (
            <p
              style={{
                fontSize: '0.78rem',
                fontStyle: 'italic',
                color: '#B88916',
                borderLeft: '2px solid #E5B52A',
                paddingLeft: '0.5rem',
                margin: '0.5rem 0',
              }}
            >
              {food.traditionalHighlight}
            </p>
          )}
        </div>
      </div>

      {/* Footer Controls: Details Button & Select / Unselect Button */}
      <div
        style={{
          padding: '0.85rem 1.4rem 1.3rem 1.4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.65rem',
          borderTop: '1px solid rgba(7, 91, 53, 0.07)',
        }}
      >
        <button
          onClick={() => setSelectedModalFood(food)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--green)',
            fontSize: '0.82rem',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            cursor: 'pointer',
            padding: '0.4rem 0.2rem',
          }}
          title="Inspect ingredients and culinary notes"
        >
          <Info size={15} />
          <span>Details</span>
        </button>

        <button
          onClick={() => toggleSelectFood(food)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.82rem',
            fontWeight: 700,
            padding: '0.5rem 1.1rem',
            borderRadius: '9999px',
            border: selected ? '1.5px solid #075B35' : '1.5px solid rgba(7, 91, 53, 0.25)',
            backgroundColor: selected ? '#075B35' : '#FFFFFF',
            color: selected ? '#FFFDF7' : '#075B35',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          aria-label={selected ? `Remove ${food.name} from selection` : `Add ${food.name} to selection`}
        >
          {selected ? (
            <>
              <Check size={14} strokeWidth={3} />
              <span>Selected</span>
            </>
          ) : (
            <>
              <Plus size={14} strokeWidth={2.5} />
              <span>Select</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
