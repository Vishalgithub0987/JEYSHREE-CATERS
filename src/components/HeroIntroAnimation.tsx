'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { X } from 'lucide-react';

interface HeroIntroAnimationProps {
  onComplete?: () => void;
}

export const HeroIntroAnimation: React.FC<HeroIntroAnimationProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFramingActive, setIsFramingActive] = useState(false);

  // Master container & timeline refs
  const containerRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const topToranRef = useRef<HTMLDivElement>(null);
  const leftGarlandRef = useRef<HTMLDivElement>(null);
  const rightGarlandRef = useRef<HTMLDivElement>(null);
  const centerMedallionRef = useRef<HTMLDivElement>(null);
  const goldenGlowRef = useRef<HTMLDivElement>(null);
  const petalsRef = useRef<HTMLDivElement>(null);
  const frameDismissRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Check if user has already seen the intro or prefers reduced motion
    try {
      const hasSeenIntro = localStorage.getItem('jayshree_intro_seen');
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (hasSeenIntro === 'true' || prefersReducedMotion) {
        setIsVisible(false);
        document.documentElement.classList.add('intro-already-seen');
        if (onComplete) onComplete();
        return;
      }
    } catch {
      // In case localStorage is disabled or restricted
    }

    // Mark intro as seen immediately so refresh or page navigation will not replay it
    try {
      localStorage.setItem('jayshree_intro_seen', 'true');
    } catch {
      // ignore
    }

    const ctx = gsap.context(() => {
      // Master GSAP Timeline matching the exact requested 6-second pacing
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        onComplete: () => {
          document.documentElement.classList.add('intro-already-seen');
          setIsFramingActive(true);
          if (containerRef.current) {
            containerRef.current.style.pointerEvents = 'none';
          }
          if (onComplete) onComplete();
        },
      });

      // INITIAL SETUPS
      gsap.set(containerRef.current, { opacity: 1, visibility: 'visible' });
      gsap.set([leftDoorRef.current, rightDoorRef.current], { xPercent: 0 });
      gsap.set(topToranRef.current, { yPercent: -100, opacity: 0 });
      gsap.set([leftGarlandRef.current, rightGarlandRef.current], { opacity: 0, scaleY: 0.95 });
      gsap.set(goldenGlowRef.current, { opacity: 0, scale: 0.4 });
      gsap.set(centerMedallionRef.current, { opacity: 0, scale: 0.75, rotation: -10 });
      gsap.set(petalsRef.current, { opacity: 0 });

      // ==============================================================
      // 0–1 sec: Background and subtle golden light appear
      // ==============================================================
      tl.to(goldenGlowRef.current, {
        opacity: 0.85,
        scale: 1.1,
        duration: 1.0,
        ease: 'power2.out',
      }, 0)
      .to(centerMedallionRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.0,
        ease: 'power3.out',
      }, 0.2)
      .to(petalsRef.current, {
        opacity: 1,
        duration: 1.0,
      }, 0.5);

      // ==============================================================
      // 1–2 sec: Banana leaves and flower garlands settle into position
      // ==============================================================
      tl.to(topToranRef.current, {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        ease: 'power3.out',
      }, 0.9)
      .to([leftGarlandRef.current, rightGarlandRef.current], {
        opacity: 1,
        scaleY: 1,
        duration: 1.1,
        ease: 'power2.out',
      }, 1.1)
      .to(goldenGlowRef.current, {
        scale: 1.35,
        opacity: 0.95,
        duration: 0.8,
        ease: 'sine.inOut',
      }, 1.4);

      // ==============================================================
      // 2–3 sec: Short pause / anticipation
      // ==============================================================
      tl.to(centerMedallionRef.current, {
        scale: 1.06,
        filter: 'drop-shadow(0 0 24px rgba(228, 197, 144, 0.9))',
        duration: 0.9,
        ease: 'sine.inOut',
      }, 2.0);

      // ==============================================================
      // 3–5 sec: Left and right decorated doors smoothly open outward,
      // directly revealing the actual JayShree Caters website behind them!
      // ==============================================================
      tl.to(centerMedallionRef.current, {
        opacity: 0,
        scale: 1.25,
        duration: 0.6,
        ease: 'power2.in',
      }, 3.0)
      .to(leftDoorRef.current, {
        xPercent: -100,
        duration: 1.8,
        ease: 'power3.inOut',
      }, 3.1)
      .to(rightDoorRef.current, {
        xPercent: 100,
        duration: 1.8,
        ease: 'power3.inOut',
      }, 3.1)
      .to(goldenGlowRef.current, {
        scale: 2.2,
        opacity: 0,
        duration: 1.8,
        ease: 'power2.out',
      }, 3.2)
      .to(containerRef.current, {
        backgroundColor: 'transparent',
        duration: 1.2,
      }, 3.2);

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  const handleDismissFrame = () => {
    setIsVisible(false);
    try {
      localStorage.setItem('jayshree_intro_seen', 'true');
      document.documentElement.classList.add('intro-already-seen');
    } catch {
      // ignore
    }
  };

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="jay-entrance-portal"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99998,
        backgroundColor: '#FFFDF7',
        overflow: 'hidden',
        transition: 'background-color 0.8s ease',
      }}
      aria-label="JayShree Caters Auspicious Entrance"
    >
      {/* Frame Dismiss Button (Visible once doors open so user can toggle frame off if desired) */}
      {isFramingActive && (
        <button
          ref={frameDismissRef}
          onClick={handleDismissFrame}
          title="Dismiss decorative entrance frame"
          style={{
            position: 'absolute',
            top: '4.75rem',
            right: '1rem',
            zIndex: 100000,
            background: 'rgba(5, 32, 32, 0.85)',
            border: '1px solid #E4C590',
            color: '#E4C590',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            pointerEvents: 'auto',
          }}
        >
          <X size={15} />
        </button>
      )}

      {/* 2. Warm Golden Light Radial Glow */}
      <div
        ref={goldenGlowRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '750px',
          height: '750px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(228, 197, 144, 0.65) 0%, rgba(200, 159, 92, 0.28) 40%, transparent 70%)',
          filter: 'blur(20px)',
          pointerEvents: 'none',
          zIndex: 4,
        }}
      />

      {/* 3. Very Minimal Floating Flower Petals (Realistic subtle downward drift) */}
      <div
        ref={petalsRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 6,
          overflow: 'hidden',
        }}
      >
        {[
          { left: '15%', delay: '0s', dur: '7s', size: 14, color: '#F39C12' },
          { left: '32%', delay: '1.2s', dur: '8.5s', size: 11, color: '#FFFDF7' },
          { left: '48%', delay: '0.4s', dur: '6.5s', size: 13, color: '#E67E22' },
          { left: '68%', delay: '2.1s', dur: '7.8s', size: 10, color: '#FFFDF7' },
          { left: '85%', delay: '0.8s', dur: '8s', size: 14, color: '#F39C12' },
        ].map((petal, i) => (
          <span
            key={`petal-${i}`}
            className="floating-petal"
            style={{
              position: 'absolute',
              top: '-30px',
              left: petal.left,
              width: `${petal.size}px`,
              height: `${petal.size * 1.3}px`,
              backgroundColor: petal.color,
              borderRadius: '50% 0 50% 50%',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              animation: `driftPetal ${petal.dur} linear infinite`,
              animationDelay: petal.delay,
              opacity: 0.85,
              border: petal.color === '#FFFDF7' ? '1px solid rgba(228, 197, 144, 0.4)' : 'none',
            }}
          />
        ))}
      </div>

      {/* 4. Center Medallion (Golden Brass Latch / Kolam Ring before opening) */}
      <div
        ref={centerMedallionRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          backgroundColor: '#052020',
          border: '4px solid #E4C590',
          boxShadow: '0 0 35px rgba(228, 197, 144, 0.7), inset 0 0 20px rgba(200, 159, 92, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid #C89F5C',
            marginBottom: '0.25rem',
          }}
        >
          <Image
            src="/images/logo.jpeg"
            alt="JayShree Seal"
            width={64}
            height={64}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            color: '#E4C590',
            fontSize: '0.75rem',
            fontWeight: 800,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
          }}
        >
          KV Kuppam
        </span>
        <span
          style={{
            color: '#FFFFFF',
            fontSize: '0.58rem',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            opacity: 0.8,
          }}
        >
          Since 1960s
        </span>
      </div>

      {/* 5. LEFT DECORATED DOOR / CURTAIN (Smoothly opens to the LEFT) */}
      <div
        ref={leftDoorRef}
        className="entrance-door entrance-door-left"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50.2vw',
          height: '100%',
          backgroundColor: '#FAF7EE',
          backgroundImage: 'radial-gradient(#C89F5C 0.75px, transparent 0.75px), radial-gradient(#075B35 0.75px, #FAF7EE 0.75px)',
          backgroundSize: '30px 30px',
          backgroundPosition: '0 0, 15px 15px',
          borderRight: '3px solid #C89F5C',
          boxShadow: '15px 0 40px rgba(5, 32, 32, 0.15)',
          zIndex: 10,
          overflow: 'hidden',
          willChange: 'transform',
        }}
      >
        {/* Left Door Silk Shading Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(245, 239, 225, 0.4), rgba(255, 253, 247, 0.95))',
          }}
        />

        {/* Traditional Gold Filigree Border along Right Edge of Left Door */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: '12px',
            width: '8px',
            height: '100%',
            background: 'repeating-linear-gradient(180deg, #C89F5C 0px, #E4C590 15px, #996F0E 30px)',
            boxShadow: '0 0 8px rgba(200, 159, 92, 0.4)',
          }}
        />

        {/* Left Side Banana Tree Pillar Motif */}
        <svg
          width="180"
          height="100%"
          viewBox="0 0 180 900"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            opacity: 0.85,
            pointerEvents: 'none',
          }}
        >
          {/* Main trunk */}
          <rect x="0" y="0" width="30" height="900" fill="#2E7D32" />
          <rect x="30" y="0" width="8" height="900" fill="#1B5E20" />
          {/* Banana leaves emerging */}
          {[120, 260, 400, 540, 680, 820].map((y, i) => (
            <path
              key={`b-leaf-${i}`}
              d={`M38 ${y} C 90 ${y - 40}, 160 ${y - 20}, 175 ${y + 35} C 140 ${y + 50}, 80 ${y + 30}, 38 ${y + 15} Z`}
              fill={i % 2 === 0 ? '#388E3C' : '#2E7D32'}
              stroke="#81C784"
              strokeWidth="1.5"
            />
          ))}
        </svg>

        {/* Left Brass Temple Bells hanging from chain */}
        <div style={{ position: 'absolute', top: '15%', right: '35px', textAlign: 'center' }}>
          <div style={{ width: '2px', height: '110px', background: '#C89F5C', margin: '0 auto' }} />
          <svg width="34" height="42" viewBox="0 0 34 42" fill="none">
            <path d="M17 0 L17 6 M8 12 C8 6, 26 6, 26 12 L30 30 C30 34, 4 34, 4 30 Z" fill="#C89F5C" stroke="#996F0E" strokeWidth="1.5" />
            <circle cx="17" cy="36" r="3" fill="#E4C590" />
          </svg>
        </div>
      </div>

      {/* 6. RIGHT DECORATED DOOR / CURTAIN (Smoothly opens to the RIGHT) */}
      <div
        ref={rightDoorRef}
        className="entrance-door entrance-door-right"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50.2vw',
          height: '100%',
          backgroundColor: '#FAF7EE',
          backgroundImage: 'radial-gradient(#C89F5C 0.75px, transparent 0.75px), radial-gradient(#075B35 0.75px, #FAF7EE 0.75px)',
          backgroundSize: '30px 30px',
          backgroundPosition: '0 0, 15px 15px',
          borderLeft: '3px solid #C89F5C',
          boxShadow: '-15px 0 40px rgba(5, 32, 32, 0.15)',
          zIndex: 10,
          overflow: 'hidden',
          willChange: 'transform',
        }}
      >
        {/* Right Door Silk Shading Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to left, rgba(245, 239, 225, 0.4), rgba(255, 253, 247, 0.95))',
          }}
        />

        {/* Traditional Gold Filigree Border along Left Edge of Right Door */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '12px',
            width: '8px',
            height: '100%',
            background: 'repeating-linear-gradient(180deg, #C89F5C 0px, #E4C590 15px, #996F0E 30px)',
            boxShadow: '0 0 8px rgba(200, 159, 92, 0.4)',
          }}
        />

        {/* Right Side Banana Tree Pillar Motif */}
        <svg
          width="180"
          height="100%"
          viewBox="0 0 180 900"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            height: '100%',
            opacity: 0.85,
            pointerEvents: 'none',
          }}
        >
          <rect x="142" y="0" width="38" height="900" fill="#2E7D32" />
          <rect x="134" y="0" width="8" height="900" fill="#1B5E20" />
          {[120, 260, 400, 540, 680, 820].map((y, i) => (
            <path
              key={`rb-leaf-${i}`}
              d={`M142 ${y} C 90 ${y - 40}, 20 ${y - 20}, 5 ${y + 35} C 40 ${y + 50}, 100 ${y + 30}, 142 ${y + 15} Z`}
              fill={i % 2 === 0 ? '#388E3C' : '#2E7D32'}
              stroke="#81C784"
              strokeWidth="1.5"
            />
          ))}
        </svg>

        {/* Right Brass Temple Bell */}
        <div style={{ position: 'absolute', top: '15%', left: '35px', textAlign: 'center' }}>
          <div style={{ width: '2px', height: '110px', background: '#C89F5C', margin: '0 auto' }} />
          <svg width="34" height="42" viewBox="0 0 34 42" fill="none">
            <path d="M17 0 L17 6 M8 12 C8 6, 26 6, 26 12 L30 30 C30 34, 4 34, 4 30 Z" fill="#C89F5C" stroke="#996F0E" strokeWidth="1.5" />
            <circle cx="17" cy="36" r="3" fill="#E4C590" />
          </svg>
        </div>
      </div>

      {/* ==============================================================
          7. PERMANENT FRAMING ELEMENTS (Leaves + Garlands framing the hero)
          These stay naturally positioned along top and edges when doors open
          ============================================================== */}

      {/* TOP TORAN ARCH: Fresh Green Banana Leaves + Jasmine String */}
      <div
        ref={topToranRef}
        className="entrance-top-toran"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '110px',
          zIndex: 30,
          pointerEvents: 'none',
          display: 'flex',
          justifyContent: 'center',
          overflow: 'hidden',
          filter: 'drop-shadow(0 6px 12px rgba(5, 32, 32, 0.12))',
        }}
      >
        <svg
          width="100%"
          height="110"
          viewBox="0 0 1440 110"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top border beam */}
          <rect width="1440" height="12" fill="#075B35" />
          <rect y="12" width="1440" height="4" fill="#C89F5C" />

          {/* Row of hanging fresh banana leaves / mango leaf toran */}
          {Array.from({ length: 24 }).map((_, i) => {
            const x = i * 62 - 10;
            return (
              <g key={`toran-leaf-${i}`} transform={`translate(${x}, 16)`}>
                <path
                  d="M0 0 C 10 30, 20 70, 32 88 C 44 70, 54 30, 64 0 Z"
                  fill={i % 2 === 0 ? '#2E7D32' : '#388E3C'}
                  stroke="#1B5E20"
                  strokeWidth="1.5"
                />
                <line x1="32" y1="0" x2="32" y2="78" stroke="#81C784" strokeWidth="1" />
              </g>
            );
          })}

          {/* Golden & Jasmine Garland string across the top */}
          <path
            d="M 0 20 Q 360 45, 720 20 Q 1080 45, 1440 20"
            stroke="#E4C590"
            strokeWidth="3"
            strokeDasharray="6 4"
          />

          {/* Hanging marigold beads along the toran */}
          {Array.from({ length: 18 }).map((_, i) => {
            const cx = i * 80 + 40;
            const cy = 20 + Math.sin((i / 18) * Math.PI * 2) * 10;
            return (
              <circle key={`t-bead-${i}`} cx={cx} cy={cy} r="6" fill={i % 2 === 0 ? '#F39C12' : '#FFFDF7'} stroke="#C89F5C" strokeWidth="1" />
            );
          })}
        </svg>
      </div>

      {/* LEFT SIDE: Jasmine + Marigold Flower Garlands Framing */}
      <div
        ref={leftGarlandRef}
        className="entrance-garland-left"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '90px',
          height: '100%',
          zIndex: 25,
          pointerEvents: 'none',
        }}
      >
        <svg
          width="90"
          height="100%"
          viewBox="0 0 90 900"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main green garland rope */}
          <path
            d="M 30 0 C 45 200, 25 450, 40 700 C 45 800, 30 900, 30 900"
            stroke="#1B5E20"
            strokeWidth="4"
          />
          {/* Alternating Jasmine (White) & Marigold (Orange/Gold) Flower Beads */}
          {Array.from({ length: 28 }).map((_, i) => {
            const y = i * 32 + 20;
            const x = 30 + Math.sin(i * 0.7) * 8;
            const isMarigold = i % 2 === 0;
            return (
              <g key={`l-garland-${i}`} transform={`translate(${x}, ${y})`}>
                <circle
                  r={isMarigold ? 11 : 9}
                  fill={isMarigold ? '#F39C12' : '#FFFFFF'}
                  stroke={isMarigold ? '#D35400' : '#E4C590'}
                  strokeWidth="1.5"
                />
                <circle
                  r={isMarigold ? 6 : 4}
                  fill={isMarigold ? '#E67E22' : '#F5EFEB'}
                />
                {isMarigold && <circle r="2.5" fill="#C0392B" />}
              </g>
            );
          })}
        </svg>
      </div>

      {/* RIGHT SIDE: Jasmine + Marigold Flower Garlands Framing */}
      <div
        ref={rightGarlandRef}
        className="entrance-garland-right"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '90px',
          height: '100%',
          zIndex: 25,
          pointerEvents: 'none',
        }}
      >
        <svg
          width="90"
          height="100%"
          viewBox="0 0 90 900"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 60 0 C 45 200, 65 450, 50 700 C 45 800, 60 900, 60 900"
            stroke="#1B5E20"
            strokeWidth="4"
          />
          {Array.from({ length: 28 }).map((_, i) => {
            const y = i * 32 + 20;
            const x = 60 - Math.sin(i * 0.7) * 8;
            const isMarigold = i % 2 === 0;
            return (
              <g key={`r-garland-${i}`} transform={`translate(${x}, ${y})`}>
                <circle
                  r={isMarigold ? 11 : 9}
                  fill={isMarigold ? '#F39C12' : '#FFFFFF'}
                  stroke={isMarigold ? '#D35400' : '#E4C590'}
                  strokeWidth="1.5"
                />
                <circle
                  r={isMarigold ? 6 : 4}
                  fill={isMarigold ? '#E67E22' : '#F5EFEB'}
                />
                {isMarigold && <circle r="2.5" fill="#C0392B" />}
              </g>
            );
          })}
        </svg>
      </div>

      {/* CSS Keyframes for subtle flower petal drift */}
      <style jsx>{`
        @keyframes driftPetal {
          0% {
            transform: translateY(0vh) rotate(0deg) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.85;
          }
          90% {
            opacity: 0.85;
          }
          100% {
            transform: translateY(105vh) rotate(360deg) translateX(40px);
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          .entrance-garland-left,
          .entrance-garland-right {
            width: 45px !important;
          }
          .entrance-top-toran {
            height: 75px !important;
          }
        }
      `}</style>
    </div>
  );
};
