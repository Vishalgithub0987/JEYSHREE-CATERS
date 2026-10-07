'use strict';
import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'dark' | 'light' | 'gold';
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'dark',
  showSubtitle = true,
  size = 'md',
}) => {
  const isLight = variant === 'light';
  const isGold = variant === 'gold';

  const primaryColor = isLight ? '#FFFDF7' : isGold ? '#F4D98A' : '#075B35';
  const goldColor = '#E5B52A';
  const subtitleColor = isLight ? '#F4D98A' : isGold ? '#FFFDF7' : '#173B2A';

  const dimensions = {
    sm: { width: 160, height: 42, iconSize: 34, titleSize: '1.05rem', subSize: '0.6rem' },
    md: { width: 220, height: 56, iconSize: 46, titleSize: '1.4rem', subSize: '0.68rem' },
    lg: { width: 280, height: 72, iconSize: 58, titleSize: '1.75rem', subSize: '0.78rem' },
    hero: { width: 340, height: 88, iconSize: 72, titleSize: '2.2rem', subSize: '0.9rem' },
  }[size];

  return (
    <div
      className={`brand-logo-container ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.85rem',
        textDecoration: 'none',
        userSelect: 'none',
      }}
    >
      {/* Traditional South Indian Sacred Kalash / Deepam Emblem */}
      <svg
        width={dimensions.iconSize}
        height={dimensions.iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, filter: 'drop-shadow(0 2px 8px rgba(229, 181, 42, 0.3))' }}
        aria-hidden="true"
      >
        {/* Kolam Solar Ring */}
        <circle cx="50" cy="50" r="46" stroke={goldColor} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
        <circle cx="50" cy="50" r="42" stroke={primaryColor} strokeWidth="1" opacity="0.4" />

        {/* Banana Leaf / Sacred Mango Leaf Arcs */}
        <path
          d="M50 20C42 32 36 40 34 50C44 48 48 42 50 20Z"
          fill="#075B35"
          stroke={goldColor}
          strokeWidth="1"
        />
        <path
          d="M50 20C58 32 64 40 66 50C56 48 52 42 50 20Z"
          fill="#075B35"
          stroke={goldColor}
          strokeWidth="1"
        />

        {/* Sacred Coconut / Center Purna Kumbha Top */}
        <circle cx="50" cy="38" r="9" fill={goldColor} stroke="#B88916" strokeWidth="1.5" />

        {/* Auspicious Deepam Flame */}
        <path
          d="M50 14C47 22 53 26 50 30C47 26 53 22 50 14Z"
          fill="#FFB300"
          filter="drop-shadow(0 0 4px #FFD54F)"
        />

        {/* Brass Kalash Vessel */}
        <path
          d="M38 52C34 58 32 64 36 72C40 80 60 80 64 72C68 64 66 58 62 52H38Z"
          fill="url(#goldGradientLogo)"
          stroke="#996F0E"
          strokeWidth="1.5"
        />

        {/* Traditional Kumkum Swastik / Dot */}
        <circle cx="50" cy="62" r="3.5" fill="#C0392B" />

        {/* Kalash Base Pedestal */}
        <path
          d="M42 78H58L62 84H38L42 78Z"
          fill="#B88916"
          stroke={goldColor}
          strokeWidth="1"
        />

        {/* Gold Gradients */}
        <defs>
          <linearGradient id="goldGradientLogo" x1="34" y1="52" x2="66" y2="82" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDE68A" />
            <stop offset="0.45" stopColor="#E5B52A" />
            <stop offset="1" stopColor="#B48116" />
          </linearGradient>
        </defs>
      </svg>

      {/* Brand Typography */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: dimensions.titleSize,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: primaryColor,
          }}
        >
          JayShree
        </span>
        {showSubtitle && (
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: dimensions.subSize,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: subtitleColor,
              marginTop: '0.15rem',
            }}
          >
            Caters • Estd 2012
          </span>
        )}
      </div>
    </div>
  );
};
