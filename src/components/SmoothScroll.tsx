'use client';

import React, { useEffect } from 'react';

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let lenisInstance: any = null;
    let animId: number;

    import('lenis')
      .then(({ default: Lenis }) => {
        lenisInstance = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          touchMultiplier: 1.5,
          infinite: false,
        });

        (window as any).__lenis = lenisInstance;

        // If intro is active, pause lenis so it does not capture scroll events
        if (typeof document !== 'undefined' && document.querySelector('.landing-intro-portal')) {
          lenisInstance.stop();
          lenisInstance.scrollTo(0, { immediate: true });
        }

        function raf(time: number) {
          lenisInstance?.raf(time);
          animId = requestAnimationFrame(raf);
        }

        animId = requestAnimationFrame(raf);
      })
      .catch((err) => {
        console.warn('Lenis smooth scroll initialization skipped:', err);
      });

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (lenisInstance) lenisInstance.destroy();
    };
  }, []);

  return <>{children}</>;
};
