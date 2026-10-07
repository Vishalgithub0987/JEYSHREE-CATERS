'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, PhoneCall, Utensils } from 'lucide-react';
import { siteConfig } from '@/data/site';

const heroBackgrounds = [
  '/images/hero1.webp',
  '/images/hero2.webp',
  '/images/hero3.webp',
];

export const HomeBanner: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % heroBackgrounds.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + heroBackgrounds.length) % heroBackgrounds.length);
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % heroBackgrounds.length);
  };

  return (
    <section id="hero" className="home-banner">
      <div className="banner-slider-wrap">
        {heroBackgrounds.map((bg, idx) => (
          <div
            key={bg}
            className="banner-bg"
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              opacity: idx === currentIdx ? 1 : 0,
              visibility: idx === currentIdx ? 'visible' : 'hidden',
              transition: 'opacity 1.2s ease-in-out, visibility 1.2s ease-in-out',
              zIndex: idx === currentIdx ? 1 : 0,
            }}
          />
        ))}

        <div className="banner-slide active" style={{ zIndex: 2, pointerEvents: 'none' }}>
          <div className="banner-content" style={{ pointerEvents: 'auto' }}>
            <span className="banner-sub">Four Generations of Trust • Decades of Taste</span>
            <h1>A Legacy of Taste, Tradition &amp; Hospitality Since the 1960s</h1>
            <div className="banner-actions">
              <a
                href="#reserve"
                className="theme-btn btn-style-one"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('reserve');
                  if (el) {
                    if ((window as any).__lenis) {
                      (window as any).__lenis.scrollTo(el, { offset: -70, duration: 1.2 });
                    } else {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
              >
                <PhoneCall size={18} style={{ marginRight: '0.45rem' }} />
                <span>Book Your Function</span>
              </a>
              <Link href="/menu" className="theme-btn btn-style-two">
                <Utensils size={18} style={{ marginRight: '0.45rem' }} />
                <span>Explore Master Menu</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation Dots */}
      <div
        className="banner-dots-wrap"
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          zIndex: 10,
        }}
      >
        {heroBackgrounds.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIdx(idx)}
            aria-label={`Switch to background image ${idx + 1}`}
            style={{
              width: idx === currentIdx ? '32px' : '10px',
              height: '8px',
              borderRadius: '999px',
              backgroundColor: idx === currentIdx ? '#E4C590' : 'rgba(255, 255, 255, 0.45)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.35s ease',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Prev / Next Controls */}
      <button
        onClick={handlePrev}
        className="banner-nav-btn banner-prev-btn"
        aria-label="Previous background image"
        style={{
          position: 'absolute',
          left: '1.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          background: 'rgba(5, 32, 32, 0.65)',
          border: '1px solid rgba(228, 197, 144, 0.3)',
          color: '#E4C590',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(5, 32, 32, 0.95)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(5, 32, 32, 0.65)')}
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={handleNext}
        className="banner-nav-btn banner-next-btn"
        aria-label="Next background image"
        style={{
          position: 'absolute',
          right: '1.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          background: 'rgba(5, 32, 32, 0.65)',
          border: '1px solid rgba(228, 197, 144, 0.3)',
          color: '#E4C590',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(5, 32, 32, 0.95)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(5, 32, 32, 0.65)')}
      >
        <ChevronRight size={22} />
      </button>
    </section>
  );
};
