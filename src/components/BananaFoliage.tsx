'use client';

import React from 'react';

interface BananaFoliageProps {
  leftBgRef: React.RefObject<HTMLDivElement>;
  leftMidRef: React.RefObject<HTMLDivElement>;
  leftFgRef: React.RefObject<HTMLDivElement>;
  rightBgRef: React.RefObject<HTMLDivElement>;
  rightMidRef: React.RefObject<HTMLDivElement>;
  rightFgRef: React.RefObject<HTMLDivElement>;
}

/**
 * Botanical Realistic Banana Tree Leaf Layers
 * Designed with authentic South Indian plantain leaf curves, central midribs,
 * lateral veins, and three depth layers for cinematic parallax.
 *
 * NOTE FOR USERS: If you prefer using your own transparent PNG cutouts,
 * simply place:
 * - public/images/landing/banana-left-fg.png
 * - public/images/landing/banana-left-mid.png
 * - public/images/landing/banana-left-bg.png
 * (and matching right side images).
 */
export const BananaFoliage: React.FC<BananaFoliageProps> = ({
  leftBgRef,
  leftMidRef,
  leftFgRef,
  rightBgRef,
  rightMidRef,
  rightFgRef,
}) => {
  return (
    <>
      {/* ============================================================== */}
      {/* LEFT SIDE FOLIAGE (3 DEPTH LAYERS)                             */}
      {/* ============================================================== */}

      {/* Layer 1: Left Background (Deeper shadows, furthest depth) */}
      <div
        ref={leftBgRef}
        className="banana-layer banana-layer-bg-left"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 'clamp(280px, 35vw, 540px)',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 10,
          transformOrigin: 'left center',
          filter: 'brightness(0.7) contrast(1.1) drop-shadow(6px 12px 24px rgba(0,0,0,0.5))',
          willChange: 'transform',
        }}
      >
        <svg
          viewBox="0 0 500 1000"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <defs>
            <linearGradient id="bgLeafStemL" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E4D2B" />
              <stop offset="100%" stopColor="#0B2615" />
            </linearGradient>
            <linearGradient id="bgLeafShadeL" x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#1B5E33" />
              <stop offset="50%" stopColor="#124424" />
              <stop offset="100%" stopColor="#0A2A16" />
            </linearGradient>
          </defs>

          {/* Background Banana Trunk */}
          <path d="M 0 0 L 70 0 Q 80 500 60 1000 L 0 1000 Z" fill="url(#bgLeafStemL)" />

          {/* High arching background leaf */}
          <path
            d="M 60 150 Q 220 120 380 260 Q 420 310 400 340 Q 280 280 60 210 Z"
            fill="url(#bgLeafShadeL)"
          />
          {/* Mid background leaf */}
          <path
            d="M 65 420 Q 280 380 430 520 Q 460 570 420 590 Q 270 530 65 480 Z"
            fill="url(#bgLeafShadeL)"
          />
          {/* Lower background leaf */}
          <path
            d="M 60 700 Q 250 670 410 810 Q 430 860 380 870 Q 240 800 60 750 Z"
            fill="url(#bgLeafShadeL)"
          />
        </svg>
      </div>

      {/* Layer 2: Left Midground (Vibrant natural plantain green) */}
      <div
        ref={leftMidRef}
        className="banana-layer banana-layer-mid-left"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 'clamp(260px, 32vw, 500px)',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 12,
          transformOrigin: 'left center',
          filter: 'drop-shadow(8px 16px 28px rgba(0,0,0,0.45))',
          willChange: 'transform',
        }}
      >
        <svg
          viewBox="0 0 500 1000"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <defs>
            <linearGradient id="midLeafL1" x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#3A8A4D" />
              <stop offset="50%" stopColor="#256E3B" />
              <stop offset="100%" stopColor="#144623" />
            </linearGradient>
            <linearGradient id="midLeafVeinL" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8CC665" />
              <stop offset="100%" stopColor="#559938" />
            </linearGradient>
          </defs>

          {/* Main Plantain Tree Trunk */}
          <path
            d="M 0 0 L 50 0 Q 65 500 45 1000 L 0 1000 Z"
            fill="#1E522C"
          />

          {/* Grand top banana leaf */}
          <path
            d="M 45 100 C 180 60, 320 110, 440 230 C 470 270, 450 300, 390 280 C 270 230, 160 170, 45 140 Z"
            fill="url(#midLeafL1)"
          />
          {/* Leaf Midrib / spine */}
          <path
            d="M 45 120 C 180 80, 310 130, 440 230"
            stroke="url(#midLeafVeinL)"
            strokeWidth="4"
            fill="none"
          />

          {/* Grand center banana leaf */}
          <path
            d="M 50 340 C 210 300, 360 380, 470 510 C 490 550, 460 570, 400 540 C 270 480, 160 410, 50 380 Z"
            fill="url(#midLeafL1)"
          />
          <path
            d="M 50 360 C 210 320, 350 395, 470 510"
            stroke="url(#midLeafVeinL)"
            strokeWidth="4.5"
            fill="none"
          />

          {/* Lower middle banana leaf */}
          <path
            d="M 45 620 C 200 580, 340 660, 440 780 C 460 820, 420 840, 370 810 C 260 740, 150 680, 45 660 Z"
            fill="url(#midLeafL1)"
          />
          <path
            d="M 45 640 C 190 600, 320 670, 440 780"
            stroke="url(#midLeafVeinL)"
            strokeWidth="4"
            fill="none"
          />
        </svg>
      </div>

      {/* Layer 3: Left Foreground (Closest to camera, lush highlights, organic cuts) */}
      <div
        ref={leftFgRef}
        className="banana-layer banana-layer-fg-left"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 'clamp(240px, 28vw, 450px)',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 15,
          transformOrigin: 'left center',
          filter: 'drop-shadow(10px 20px 32px rgba(0,0,0,0.5))',
          willChange: 'transform',
        }}
      >
        <svg
          viewBox="0 0 500 1000"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <defs>
            <linearGradient id="fgLeafL" x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#4BB565" />
              <stop offset="30%" stopColor="#32964C" />
              <stop offset="80%" stopColor="#1E6E36" />
              <stop offset="100%" stopColor="#104A22" />
            </linearGradient>
            <linearGradient id="fgVeinL" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B3E67A" />
              <stop offset="100%" stopColor="#76B84A" />
            </linearGradient>
          </defs>

          {/* Foreground Upper Leaf drooping into view */}
          <path
            d="M 0 200 C 150 170, 290 260, 400 390 C 415 425, 385 440, 340 410 C 230 350, 120 280, 0 250 Z"
            fill="url(#fgLeafL)"
          />
          <path
            d="M 0 225 C 145 195, 275 270, 400 390"
            stroke="url(#fgVeinL)"
            strokeWidth="5"
            fill="none"
          />

          {/* Foreground Center Leaf */}
          <path
            d="M 0 490 C 160 450, 300 540, 420 670 C 435 700, 395 720, 350 680 C 240 610, 120 545, 0 535 Z"
            fill="url(#fgLeafL)"
          />
          <path
            d="M 0 510 C 150 470, 285 550, 420 670"
            stroke="url(#fgVeinL)"
            strokeWidth="5"
            fill="none"
          />

          {/* Foreground Bottom Leaf */}
          <path
            d="M 0 770 C 140 730, 280 820, 380 930 C 390 955, 355 970, 310 940 C 210 870, 110 820, 0 810 Z"
            fill="url(#fgLeafL)"
          />
        </svg>
      </div>

      {/* ============================================================== */}
      {/* RIGHT SIDE FOLIAGE (3 DEPTH LAYERS - MIRRORED)                */}
      {/* ============================================================== */}

      {/* Layer 1: Right Background */}
      <div
        ref={rightBgRef}
        className="banana-layer banana-layer-bg-right"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 'clamp(280px, 35vw, 540px)',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 10,
          transformOrigin: 'right center',
          filter: 'brightness(0.7) contrast(1.1) drop-shadow(-6px 12px 24px rgba(0,0,0,0.5))',
          willChange: 'transform',
        }}
      >
        <svg
          viewBox="0 0 500 1000"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block', transform: 'scaleX(-1)' }}
        >
          <defs>
            <linearGradient id="bgLeafStemR" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E4D2B" />
              <stop offset="100%" stopColor="#0B2615" />
            </linearGradient>
            <linearGradient id="bgLeafShadeR" x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#1B5E33" />
              <stop offset="50%" stopColor="#124424" />
              <stop offset="100%" stopColor="#0A2A16" />
            </linearGradient>
          </defs>

          <path d="M 0 0 L 70 0 Q 80 500 60 1000 L 0 1000 Z" fill="url(#bgLeafStemR)" />
          <path
            d="M 60 150 Q 220 120 380 260 Q 420 310 400 340 Q 280 280 60 210 Z"
            fill="url(#bgLeafShadeR)"
          />
          <path
            d="M 65 420 Q 280 380 430 520 Q 460 570 420 590 Q 270 530 65 480 Z"
            fill="url(#bgLeafShadeR)"
          />
          <path
            d="M 60 700 Q 250 670 410 810 Q 430 860 380 870 Q 240 800 60 750 Z"
            fill="url(#bgLeafShadeR)"
          />
        </svg>
      </div>

      {/* Layer 2: Right Midground */}
      <div
        ref={rightMidRef}
        className="banana-layer banana-layer-mid-right"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 'clamp(260px, 32vw, 500px)',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 12,
          transformOrigin: 'right center',
          filter: 'drop-shadow(-8px 16px 28px rgba(0,0,0,0.45))',
          willChange: 'transform',
        }}
      >
        <svg
          viewBox="0 0 500 1000"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block', transform: 'scaleX(-1)' }}
        >
          <defs>
            <linearGradient id="midLeafR1" x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#3A8A4D" />
              <stop offset="50%" stopColor="#256E3B" />
              <stop offset="100%" stopColor="#144623" />
            </linearGradient>
            <linearGradient id="midLeafVeinR" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8CC665" />
              <stop offset="100%" stopColor="#559938" />
            </linearGradient>
          </defs>

          <path d="M 0 0 L 50 0 Q 65 500 45 1000 L 0 1000 Z" fill="#1E522C" />
          <path
            d="M 45 100 C 180 60, 320 110, 440 230 C 470 270, 450 300, 390 280 C 270 230, 160 170, 45 140 Z"
            fill="url(#midLeafR1)"
          />
          <path
            d="M 45 120 C 180 80, 310 130, 440 230"
            stroke="url(#midLeafVeinR)"
            strokeWidth="4"
            fill="none"
          />

          <path
            d="M 50 340 C 210 300, 360 380, 470 510 C 490 550, 460 570, 400 540 C 270 480, 160 410, 50 380 Z"
            fill="url(#midLeafR1)"
          />
          <path
            d="M 50 360 C 210 320, 350 395, 470 510"
            stroke="url(#midLeafVeinR)"
            strokeWidth="4.5"
            fill="none"
          />

          <path
            d="M 45 620 C 200 580, 340 660, 440 780 C 460 820, 420 840, 370 810 C 260 740, 150 680, 45 660 Z"
            fill="url(#midLeafR1)"
          />
          <path
            d="M 45 640 C 190 600, 320 670, 440 780"
            stroke="url(#midLeafVeinR)"
            strokeWidth="4"
            fill="none"
          />
        </svg>
      </div>

      {/* Layer 3: Right Foreground */}
      <div
        ref={rightFgRef}
        className="banana-layer banana-layer-fg-right"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 'clamp(240px, 28vw, 450px)',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 15,
          transformOrigin: 'right center',
          filter: 'drop-shadow(-10px 20px 32px rgba(0,0,0,0.5))',
          willChange: 'transform',
        }}
      >
        <svg
          viewBox="0 0 500 1000"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block', transform: 'scaleX(-1)' }}
        >
          <defs>
            <linearGradient id="fgLeafR" x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#4BB565" />
              <stop offset="30%" stopColor="#32964C" />
              <stop offset="80%" stopColor="#1E6E36" />
              <stop offset="100%" stopColor="#104A22" />
            </linearGradient>
            <linearGradient id="fgVeinR" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B3E67A" />
              <stop offset="100%" stopColor="#76B84A" />
            </linearGradient>
          </defs>

          <path
            d="M 0 200 C 150 170, 290 260, 400 390 C 415 425, 385 440, 340 410 C 230 350, 120 280, 0 250 Z"
            fill="url(#fgLeafR)"
          />
          <path
            d="M 0 225 C 145 195, 275 270, 400 390"
            stroke="url(#fgVeinR)"
            strokeWidth="5"
            fill="none"
          />

          <path
            d="M 0 490 C 160 450, 300 540, 420 670 C 435 700, 395 720, 350 680 C 240 610, 120 545, 0 535 Z"
            fill="url(#fgLeafR)"
          />
          <path
            d="M 0 510 C 150 470, 285 550, 420 670"
            stroke="url(#fgVeinR)"
            strokeWidth="5"
            fill="none"
          />

          <path
            d="M 0 770 C 140 730, 280 820, 380 930 C 390 955, 355 970, 310 940 C 210 870, 110 820, 0 810 Z"
            fill="url(#fgLeafR)"
          />
        </svg>
      </div>
    </>
  );
};
