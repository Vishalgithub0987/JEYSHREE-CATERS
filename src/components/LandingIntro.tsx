'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ChevronDown, Sparkles } from 'lucide-react';
import { BananaFoliage } from './BananaFoliage';
import {
  INTRO_CONFIG,
  createEntranceTimeline,
  createEnterWebsiteTransition,
  startBreezeSway,
  initSubsequentScrollAnimations,
  FoliageElements,
  CenterElements,
} from '@/animations/landingAnimation';

// Module-level tracking flag: persists across client-side router navigation within the session,
// but resets to false whenever the browser reloads or refreshes (F5) the page.
let hasIntroEnteredThisSession = false;

export function markIntroEntered() {
  hasIntroEnteredThisSession = true;
}

export function isIntroEntered(): boolean {
  return hasIntroEnteredThisSession;
}

interface LandingIntroProps {
  onEnter?: () => void;
}

export const LandingIntro: React.FC<LandingIntroProps> = ({ onEnter }) => {
  const [isActive, setIsActive] = useState(() => !hasIntroEnteredThisSession);
  const [isEntering, setIsEntering] = useState(false);

  // Master container & atmosphere refs
  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Left foliage layer refs
  const leftBgRef = useRef<HTMLDivElement>(null);
  const leftMidRef = useRef<HTMLDivElement>(null);
  const leftFgRef = useRef<HTMLDivElement>(null);

  // Right foliage layer refs
  const rightBgRef = useRef<HTMLDivElement>(null);
  const rightMidRef = useRef<HTMLDivElement>(null);
  const rightFgRef = useRef<HTMLDivElement>(null);

  // Center content refs
  const centerContainerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  // Animation active state tracking
  const swayTweensRef = useRef<gsap.core.Tween[]>([]);

  // Cleanup helper to restore normal body scroll
  const unlockScroll = useCallback(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
      window.scrollTo(0, 0);
    }
  }, []);

  // Enter Website Transition Handler
  const handleEnterClick = useCallback(() => {
    if (isEntering) return;
    setIsEntering(true);

    // Stop idle sways
    swayTweensRef.current.forEach((tw) => tw.kill());

    const foliage: FoliageElements = {
      leftBg: leftBgRef.current,
      leftMid: leftMidRef.current,
      leftFg: leftFgRef.current,
      rightBg: rightBgRef.current,
      rightMid: rightMidRef.current,
      rightFg: rightFgRef.current,
    };

    const center: CenterElements = {
      container: centerContainerRef.current,
      badge: badgeRef.current,
      logo: logoRef.current,
      title: titleRef.current,
      subtitle: subtitleRef.current,
      cta: ctaRef.current,
    };

    createEnterWebsiteTransition(
      containerRef.current,
      backdropRef.current,
      foliage,
      center,
      () => {
        // Mark session as entered so client nav never re-triggers the intro
        hasIntroEnteredThisSession = true;

        // Firmly ensure scroll is at 0, 0 (top of Home Page banner)
        if (typeof window !== 'undefined') {
          if (window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname);
          }
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          if ((window as any).__lenis) {
            (window as any).__lenis.scrollTo(0, { immediate: true });
            (window as any).__lenis.start();
          }
        }

        unlockScroll();
        setIsActive(false);
        if (onEnter) onEnter();

        // Extra safety check in next event cycle
        requestAnimationFrame(() => {
          window.scrollTo(0, 0);
          if (typeof window !== 'undefined' && (window as any).__lenis) {
            (window as any).__lenis.scrollTo(0, { immediate: true });
          }
        });

        // Trigger subsequent ScrollTrigger animations for the main site
        setTimeout(() => {
          initSubsequentScrollAnimations();
        }, 150);
      }
    );
  }, [isEntering, onEnter, unlockScroll]);

  // Initial check & mount
  useEffect(() => {
    if (!isActive) {
      unlockScroll();
      if (typeof window !== 'undefined' && (window as any).__lenis) {
        (window as any).__lenis.start();
      }
      return;
    }

    // Check developer bypasses or preferences
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const isSkipParam = urlParams.get('skipIntro') === 'true';
      const isDevDisabled = localStorage.getItem('jeyshree_intro_disabled') === 'true';

      if (!INTRO_CONFIG.ENABLE_INTRO || isSkipParam || isDevDisabled) {
        hasIntroEnteredThisSession = true;
        setIsActive(false);
        unlockScroll();
        if ((window as any).__lenis) {
          (window as any).__lenis.start();
        }
        if (onEnter) onEnter();
        setTimeout(() => initSubsequentScrollAnimations(), 200);
        return;
      }

      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
      window.scrollTo(0, 0);

      if ((window as any).__lenis) {
        (window as any).__lenis.stop();
        (window as any).__lenis.scrollTo(0, { immediate: true });
      }

      // Lock body scroll while intro is visible
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      document.documentElement.style.overflow = 'hidden';
    }

    const foliage: FoliageElements = {
      leftBg: leftBgRef.current,
      leftMid: leftMidRef.current,
      leftFg: leftFgRef.current,
      rightBg: rightBgRef.current,
      rightMid: rightMidRef.current,
      rightFg: rightFgRef.current,
    };

    const center: CenterElements = {
      container: centerContainerRef.current,
      badge: badgeRef.current,
      logo: logoRef.current,
      title: titleRef.current,
      subtitle: subtitleRef.current,
      cta: ctaRef.current,
    };

    // Run cinematic entrance
    const entranceTl = createEntranceTimeline(
      backdropRef.current,
      foliage,
      center,
      () => {
        // Start natural idle breeze sway
        swayTweensRef.current = startBreezeSway(foliage);
      }
    );

    // Mouse movement parallax for desktop
    const handleMouseMove = (e: MouseEvent) => {
      if (isEntering) return;
      if (window.innerWidth < 768) return; // Disable on mobile screens

      const normX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const normY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);

      const p = INTRO_CONFIG.PARALLAX;

      // Parallax Left side
      if (leftBgRef.current) {
        gsap.to(leftBgRef.current, {
          x: normX * p.BACKGROUND_X,
          y: normY * p.BACKGROUND_Y,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
      if (leftMidRef.current) {
        gsap.to(leftMidRef.current, {
          x: normX * p.MIDGROUND_X,
          y: normY * p.MIDGROUND_Y,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
      if (leftFgRef.current) {
        gsap.to(leftFgRef.current, {
          x: normX * p.FOREGROUND_X,
          y: normY * p.FOREGROUND_Y,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }

      // Parallax Right side
      if (rightBgRef.current) {
        gsap.to(rightBgRef.current, {
          x: -normX * p.BACKGROUND_X,
          y: normY * p.BACKGROUND_Y,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
      if (rightMidRef.current) {
        gsap.to(rightMidRef.current, {
          x: -normX * p.MIDGROUND_X,
          y: normY * p.MIDGROUND_Y,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
      if (rightFgRef.current) {
        gsap.to(rightFgRef.current, {
          x: -normX * p.FOREGROUND_X,
          y: normY * p.FOREGROUND_Y,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    };

    // Wheel listener: Scrolling down triggers entering
    let accumulatedDelta = 0;
    const handleWheel = (e: WheelEvent) => {
      // Prevent background page from scrolling or accumulating delta
      e.preventDefault();
      e.stopPropagation();

      if (isEntering) return;
      accumulatedDelta += e.deltaY;
      if (accumulatedDelta > 20 || e.deltaY > 15) {
        handleEnterClick();
      }
    };

    // Touch swipe listener: Swiping triggers entering
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isEntering) return;
      if (e.touches.length > 0) {
        const currentY = e.touches[0].clientY;
        const diff = touchStartY - currentY;
        if (Math.abs(diff) > 28) {
          handleEnterClick();
        }
      }
    };

    // Keyboard listener: ArrowDown / Space / Enter triggers entering
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isEntering) return;
      if (['ArrowDown', 'PageDown', 'Space', 'Enter'].includes(e.code)) {
        e.preventDefault();
        handleEnterClick();
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      entranceTl.kill();
      swayTweensRef.current.forEach((tw) => tw.kill());
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
      unlockScroll();
    };
  }, [unlockScroll, onEnter, isEntering, handleEnterClick]);

  if (!isActive) return null;

  return (
    <div
      ref={containerRef}
      className="landing-intro-portal"
      onWheel={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onTouchMove={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        backgroundColor: '#04170E',
        overflow: 'hidden',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-label="Jeyshree Catering Cinematic Entrance"
    >
      {/* 1. Atmospheric Ambient Lighting & Vignette */}
      <div
        ref={backdropRef}
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 45%, #0B3620 0%, #062315 45%, #03130B 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        {/* Subtle warm morning sunlight radiance from above */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100vw',
            height: '70vh',
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(228, 197, 144, 0.18) 0%, rgba(200, 159, 92, 0.05) 50%, transparent 80%)',
            pointerEvents: 'none',
          }}
        />

        {/* Traditional Kolam / Floral Ambient Shading */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(rgba(200, 159, 92, 0.12) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.35,
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* 2. Realistic Banana Tree Foliage System (Left & Right 3D Depth Layers) */}
      <BananaFoliage
        leftBgRef={leftBgRef}
        leftMidRef={leftMidRef}
        leftFgRef={leftFgRef}
        rightBgRef={rightBgRef}
        rightMidRef={rightMidRef}
        rightFgRef={rightFgRef}
      />

      {/* 3. Center Branding & "ENTER WEBSITE" Call-To-Action */}
      <div
        ref={centerContainerRef}
        className="landing-center-content"
        style={{
          position: 'relative',
          zIndex: 30,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '1.5rem',
          maxWidth: '680px',
          width: '100%',
        }}
      >
        {/* Sacred Eyebrow */}
        <div
          ref={badgeRef}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.35rem 1rem',
            borderRadius: '999px',
            backgroundColor: 'rgba(200, 159, 92, 0.12)',
            border: '1px solid rgba(200, 159, 92, 0.3)',
            marginBottom: '1.25rem',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Sparkles size={13} color="#E4C590" />
          <span
            style={{
              color: '#E4C590',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            Sacred Hospitality & Royal Feasts
          </span>
          <Sparkles size={13} color="#E4C590" />
        </div>

        {/* Circular Logo Emblem */}
        <div
          ref={logoRef}
          style={{
            width: '92px',
            height: '92px',
            borderRadius: '50%',
            padding: '3px',
            background:
              'linear-gradient(135deg, #F4D98A 0%, #C89F5C 50%, #8A6417 100%)',
            boxShadow:
              '0 0 35px rgba(200, 159, 92, 0.45), 0 10px 25px rgba(0, 0, 0, 0.6)',
            marginBottom: '1.25rem',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              overflow: 'hidden',
              backgroundColor: '#052020',
            }}
          >
            <Image
              src="/images/logo.jpeg"
              alt="JAYSHREE CATERING"
              width={92}
              height={92}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              priority
            />
          </div>
        </div>

        {/* Main Branding Title */}
        <h1
          ref={titleRef}
          style={{
            fontFamily: 'var(--font-heading, "Playfair Display", serif)',
            fontSize: 'clamp(2.1rem, 5.2vw, 3.8rem)',
            fontWeight: 800,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            margin: '0 0 0.5rem 0',
            color: '#FFFDF7',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.7)',
            background:
              'linear-gradient(180deg, #FFFFFF 0%, #F6E6C2 60%, #D4AF37 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.15,
          }}
        >
          JAYSHREE CATERING
        </h1>

        {/* Subtitle / Traditional Heritage */}
        <p
          ref={subtitleRef}
          style={{
            fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)',
            color: 'rgba(255, 253, 247, 0.85)',
            maxWidth: '520px',
            margin: '0 0 2rem 0',
            lineHeight: 1.6,
            letterSpacing: '0.5px',
          }}
        >
          <span style={{ color: '#E4C590', fontWeight: 700 }}>
            KV Kuppam
          </span>{' '}
          • 4 Generations of Master Culinary Feasts
          <br />
          <span
            style={{
              fontSize: '0.82rem',
              color: 'rgba(228, 197, 144, 0.75)',
              display: 'inline-block',
              marginTop: '0.25rem',
            }}
          >
            பாரம்பரிய சைவ & அசைவ விருந்து உபசரிப்பு
          </span>
        </p>

        {/* Scroll Style Action Trigger (Interactive Scroll & Click to Enter) */}
        <button
          ref={ctaRef}
          type="button"
          onClick={handleEnterClick}
          disabled={isEntering}
          className="enter-website-cta scroll-style-trigger"
          aria-label="Scroll or Click to Enter Jayshree Catering"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            padding: '0.95rem 2.25rem',
            borderRadius: '999px',
            backgroundColor: 'rgba(7, 36, 21, 0.85)',
            border: '1.5px solid #C89F5C',
            color: '#FFFDF7',
            cursor: isEntering ? 'default' : 'pointer',
            boxShadow:
              '0 0 35px rgba(200, 159, 92, 0.4), 0 8px 24px rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            minHeight: '54px',
          }}
          onMouseEnter={(e) => {
            if (!isEntering) {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
              e.currentTarget.style.backgroundColor = '#0A3B22';
              e.currentTarget.style.boxShadow =
                '0 0 50px rgba(200, 159, 92, 0.65), 0 14px 32px rgba(0, 0, 0, 0.6)';
              e.currentTarget.style.borderColor = '#F4D98A';
            }
          }}
          onMouseLeave={(e) => {
            if (!isEntering) {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.backgroundColor = 'rgba(7, 36, 21, 0.85)';
              e.currentTarget.style.boxShadow =
                '0 0 35px rgba(200, 159, 92, 0.4), 0 8px 24px rgba(0, 0, 0, 0.5)';
              e.currentTarget.style.borderColor = '#C89F5C';
            }
          }}
        >
          {/* Animated Mouse Capsule */}
          <div
            style={{
              width: '18px',
              height: '28px',
              borderRadius: '14px',
              border: '2px solid #E4C590',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '4px',
              flexShrink: 0,
            }}
          >
            <div
              className="scroll-mouse-wheel"
              style={{
                width: '3px',
                height: '6px',
                borderRadius: '2px',
                backgroundColor: '#E4C590',
              }}
            />
          </div>

          <span
            style={{
              fontSize: '0.92rem',
              fontWeight: 700,
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
            }}
          >
            {isEntering ? 'ENTERING...' : 'SCROLL TO ENTER'}
          </span>

          {/* Bouncing Chevron Indicator */}
          <div className="scroll-arrow-indicator" style={{ display: 'flex', alignItems: 'center' }}>
            <ChevronDown size={19} color="#E4C590" />
          </div>
        </button>

        {/* Gentle hint */}
        <span
          style={{
            fontSize: '0.72rem',
            color: 'rgba(228, 197, 144, 0.7)',
            letterSpacing: '1.2px',
            textTransform: 'uppercase',
            marginTop: '0.85rem',
          }}
        >
          {isEntering ? 'Welcome to our feast' : 'Scroll down or click to enter website'}
        </span>
      </div>
    </div>
  );
};
