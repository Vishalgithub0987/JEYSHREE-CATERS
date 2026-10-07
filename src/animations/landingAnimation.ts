/**
 * JEYSHREE CATERING — Cinematic Landing Animation Infrastructure
 * Powered by GSAP & GSAP ScrollTrigger
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger safely in browser context
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Global Configuration for the Landing Intro
 * You can adjust speeds, toggles, and distances here.
 */
export const INTRO_CONFIG = {
  /**
   * Set to `false` to temporarily bypass the intro during development.
   * Can also be bypassed by adding `?skipIntro=true` to the URL.
   */
  ENABLE_INTRO: true,

  /**
   * Duration in seconds for the initial screen entrance (foliage & logo entrance).
   */
  ENTRANCE_DURATION: 1.2,

  /**
   * Duration in seconds for the parting transition when user clicks "ENTER WEBSITE".
   * Recommended range: 1.0 – 1.5 seconds.
   */
  REVEAL_DURATION: 1.3,

  /**
   * Brief momentary hold (in seconds) right after click before parting begins.
   */
  CLICK_HOLD_DURATION: 0.12,

  /**
   * Mouse parallax shift strength in pixels for each depth layer on desktop.
   */
  PARALLAX: {
    BACKGROUND_X: 6,
    BACKGROUND_Y: 4,
    MIDGROUND_X: 14,
    MIDGROUND_Y: 8,
    FOREGROUND_X: 24,
    FOREGROUND_Y: 14,
  },

  /**
   * Subtle natural breeze sway oscillation speed and angle.
   */
  SWAY: {
    DURATION: 4.5,
    ROTATION_DEG: 1.2,
  },
};

export interface FoliageElements {
  leftBg: HTMLElement | null;
  leftMid: HTMLElement | null;
  leftFg: HTMLElement | null;
  rightBg: HTMLElement | null;
  rightMid: HTMLElement | null;
  rightFg: HTMLElement | null;
}

export interface CenterElements {
  container: HTMLElement | null;
  badge: HTMLElement | null;
  logo: HTMLElement | null;
  title: HTMLElement | null;
  subtitle: HTMLElement | null;
  cta: HTMLElement | null;
}

/**
 * Build the initial entrance timeline when the user first lands on the page.
 */
export function createEntranceTimeline(
  backdropEl: HTMLElement | null,
  foliage: FoliageElements,
  center: CenterElements,
  onComplete?: () => void
): gsap.core.Timeline {
  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onComplete,
  });

  // Initial resets
  if (backdropEl) {
    gsap.set(backdropEl, { opacity: 0 });
  }

  const leftElements = [foliage.leftBg, foliage.leftMid, foliage.leftFg].filter(Boolean);
  const rightElements = [foliage.rightBg, foliage.rightMid, foliage.rightFg].filter(Boolean);
  const centerElements = [center.badge, center.logo, center.title, center.subtitle, center.cta].filter(Boolean);

  // Set foliage slightly offscreen to ease in naturally
  gsap.set(leftElements, { xPercent: -15, opacity: 0 });
  gsap.set(rightElements, { xPercent: 15, opacity: 0 });
  gsap.set(centerElements, { opacity: 0, y: 22, scale: 0.96 });

  // 1. Atmosphere fades in
  if (backdropEl) {
    tl.to(backdropEl, {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    }, 0);
  }

  // 2. Banana foliage glides in from both sides with natural staggered depth
  tl.to(leftElements, {
    xPercent: 0,
    opacity: 1,
    duration: INTRO_CONFIG.ENTRANCE_DURATION,
    stagger: 0.1,
    ease: 'power3.out',
  }, 0.1);

  tl.to(rightElements, {
    xPercent: 0,
    opacity: 1,
    duration: INTRO_CONFIG.ENTRANCE_DURATION,
    stagger: 0.1,
    ease: 'power3.out',
  }, 0.1);

  // 3. Center branding logo & title entrance
  tl.to(centerElements, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1.0,
    stagger: 0.08,
    ease: 'power3.out',
  }, 0.4);

  return tl;
}

/**
 * Start subtle natural breeze sway for realistic life.
 */
export function startBreezeSway(foliage: FoliageElements): gsap.core.Tween[] {
  const tweens: gsap.core.Tween[] = [];

  const leftElements = [foliage.leftBg, foliage.leftMid, foliage.leftFg].filter(Boolean);
  const rightElements = [foliage.rightBg, foliage.rightMid, foliage.rightFg].filter(Boolean);

  leftElements.forEach((el, index) => {
    if (!el) return;
    const dur = INTRO_CONFIG.SWAY.DURATION + index * 0.8;
    const rot = (INTRO_CONFIG.SWAY.ROTATION_DEG * (index + 1)) / 2;
    tweens.push(
      gsap.to(el, {
        rotation: rot,
        y: `+=${3 + index * 2}`,
        duration: dur,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.3,
      })
    );
  });

  rightElements.forEach((el, index) => {
    if (!el) return;
    const dur = INTRO_CONFIG.SWAY.DURATION + 0.4 + index * 0.7;
    const rot = -(INTRO_CONFIG.SWAY.ROTATION_DEG * (index + 1)) / 2;
    tweens.push(
      gsap.to(el, {
        rotation: rot,
        y: `+=${3 + index * 2}`,
        duration: dur,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.25,
      })
    );
  });

  return tweens;
}

/**
 * Master cinematic transition when "ENTER WEBSITE" is clicked.
 * Parts the foliage, expands the center, reveals the home page underneath.
 */
export function createEnterWebsiteTransition(
  containerEl: HTMLElement | null,
  backdropEl: HTMLElement | null,
  foliage: FoliageElements,
  center: CenterElements,
  onComplete: () => void
): gsap.core.Timeline {
  const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const tl = gsap.timeline({
    onComplete: () => {
      if (containerEl) {
        gsap.set(containerEl, { display: 'none', pointerEvents: 'none' });
      }
      onComplete();
    },
  });

  if (isReducedMotion) {
    // Graceful simple fade for reduced-motion accessibility
    tl.to(containerEl, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
    });
    return tl;
  }

  const duration = INTRO_CONFIG.REVEAL_DURATION;
  const hold = INTRO_CONFIG.CLICK_HOLD_DURATION;

  // 1. Center content gently expands and fades away
  if (center.container) {
    tl.to(center.container, {
      scale: 1.08,
      opacity: 0,
      filter: 'blur(4px)',
      duration: duration * 0.55,
      ease: 'power2.in',
    }, hold);
  }

  // 2. Left side foliage parts to the left edge with layered depth speeds
  if (foliage.leftFg) {
    tl.to(foliage.leftFg, {
      xPercent: -135,
      opacity: 0.9,
      duration: duration,
      ease: 'power3.inOut',
    }, hold + 0.02);
  }

  if (foliage.leftMid) {
    tl.to(foliage.leftMid, {
      xPercent: -125,
      opacity: 0.7,
      duration: duration + 0.08,
      ease: 'power3.inOut',
    }, hold + 0.06);
  }

  if (foliage.leftBg) {
    tl.to(foliage.leftBg, {
      xPercent: -115,
      opacity: 0.5,
      duration: duration + 0.15,
      ease: 'power3.inOut',
    }, hold + 0.1);
  }

  // 3. Right side foliage parts to the right edge with layered depth speeds
  if (foliage.rightFg) {
    tl.to(foliage.rightFg, {
      xPercent: 135,
      opacity: 0.9,
      duration: duration,
      ease: 'power3.inOut',
    }, hold + 0.02);
  }

  if (foliage.rightMid) {
    tl.to(foliage.rightMid, {
      xPercent: 125,
      opacity: 0.7,
      duration: duration + 0.08,
      ease: 'power3.inOut',
    }, hold + 0.06);
  }

  if (foliage.rightBg) {
    tl.to(foliage.rightBg, {
      xPercent: 115,
      opacity: 0.5,
      duration: duration + 0.15,
      ease: 'power3.inOut',
    }, hold + 0.1);
  }

  // 4. Center opening mask & backdrop fade out to reveal the home page directly underneath
  if (backdropEl) {
    tl.to(backdropEl, {
      opacity: 0,
      scale: 1.05,
      duration: duration * 0.85,
      ease: 'power2.inOut',
    }, hold + 0.15);
  }

  if (containerEl) {
    tl.to(containerEl, {
      opacity: 0,
      duration: duration * 0.4,
      ease: 'power1.out',
    }, hold + duration * 0.75);
  }

  return tl;
}

/**
 * Subsequent subtle scroll animations across existing website sections using GSAP ScrollTrigger.
 */
export function initSubsequentScrollAnimations(): void {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Refresh ScrollTrigger calculations
  ScrollTrigger.refresh();

  // Subtle reveal for section headings
  const headers = document.querySelectorAll('.section-header, .section-title');
  headers.forEach((header) => {
    gsap.fromTo(
      header,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // Staggered reveal for service / feature / review cards
  const cardContainers = document.querySelectorAll('.services-grid, .why-us-grid, .fact-row');
  cardContainers.forEach((container) => {
    const children = container.children;
    if (children.length > 0) {
      gsap.fromTo(
        children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  });
}
