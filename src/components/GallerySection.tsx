'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { galleryItems } from '@/data/gallery';
import { Sparkles, Eye, Camera } from 'lucide-react';

const CATEGORIES = ['All', 'Banana Leaf Feast', 'Weddings', 'Live Counters', 'Sweets & Desserts', 'Banquets'] as const;

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredGallery = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="section-padding" style={{ backgroundColor: '#FFFDF7' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="eyebrow eyebrow-gold">
            <Sparkles size={14} color="#B88916" />
            <span>Feast Gallery</span>
          </div>
          <h2 className="section-title">
            Moments of Culinary Grandeur
          </h2>
          <p className="section-subtitle">
            Glimpses into our grand wedding banquets, live griddles, artisanal sweet platters, and authentic banana leaf virundhu presentations.
          </p>
        </div>

        {/* Category Filters */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.65rem',
            marginBottom: '3rem',
          }}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.55rem 1.3rem',
                  borderRadius: '9999px',
                  border: isSelected ? '1.5px solid var(--green)' : '1px solid rgba(7, 91, 53, 0.15)',
                  backgroundColor: isSelected ? 'var(--green)' : '#FFFFFF',
                  color: isSelected ? '#FFFDF7' : 'var(--green-dark)',
                  fontSize: '0.85rem',
                  fontWeight: isSelected ? 700 : 600,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Editorial Masonry/Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              style={{
                position: 'relative',
                borderRadius: '1.75rem',
                overflow: 'hidden',
                aspectRatio: '16 / 12',
                backgroundColor: '#F7F3E8',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid rgba(7, 91, 53, 0.1)',
                cursor: 'pointer',
              }}
              className="gallery-item-card"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{
                  objectFit: 'cover',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="gallery-img"
              />
              <style jsx>{`
                :global(.gallery-item-card:hover .gallery-img) {
                  transform: scale(1.08);
                }
                :global(.gallery-item-card:hover .gallery-overlay) {
                  opacity: 1 !important;
                }
              `}</style>

              {/* Gradient Scrim */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 40%, rgba(3, 66, 38, 0.9) 100%)',
                }}
              />

              {/* Floating Category Tag */}
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  backgroundColor: 'rgba(255, 253, 247, 0.92)',
                  backdropFilter: 'blur(6px)',
                  color: 'var(--green-dark)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(229, 181, 42, 0.4)',
                }}
              >
                {item.category}
              </div>

              {/* Bottom Caption Overlay */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.25rem',
                  left: '1.25rem',
                  right: '1.25rem',
                  color: '#FFFFFF',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.2rem',
                    color: '#FFFDF7',
                    fontWeight: 700,
                    marginBottom: '0.3rem',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.82rem',
                    color: '#E5E0D2',
                    lineHeight: 1.45,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
