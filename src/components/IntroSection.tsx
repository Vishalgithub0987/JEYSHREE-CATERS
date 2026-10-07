'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface CounterData {
  stop: number;
  suffix: string;
  title: string;
}

const counters: CounterData[] = [
  { stop: 4, suffix: ' Generations', title: 'Family Hospitality Legacy' },
  { stop: 40, suffix: '+ Years', title: 'Catering & Food-Service Mastery' },
  { stop: 1000, suffix: '+', title: 'Events Across North Tamil Nadu' },
  { stop: 100, suffix: '%', title: 'Traditional Taste & Pure Hospitality' },
  { stop: 100, suffix: '%', title: 'Trust & Customer Satisfaction' },
];

export const IntroSection: React.FC = () => {
  const [counts, setCounts] = useState<number[]>(counters.map((c) => c.stop));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Reset to 0 and count up on view
          setCounts(counters.map(() => 0));

          counters.forEach((counter, idx) => {
            const duration = 2000;
            const steps = 40;
            const increment = counter.stop / steps;
            let current = 0;
            const timer = setInterval(() => {
              current += increment;
              if (current >= counter.stop) {
                current = counter.stop;
                clearInterval(timer);
              }
              setCounts((prev) => {
                const next = [...prev];
                next[idx] = Math.floor(current);
                return next;
              });
            }, duration / steps);
          });
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="intro-section">
      <div className="container" style={{ maxWidth: '1400px' }}>
        {/* Content Box */}
        <div className="content-box">
          <div className="title-box centered">
            <div className="subtitle" style={{ color: '#E4C590' }}>
              <span>A Legacy of Taste, Tradition &amp; Hospitality Since the 1960s</span>
            </div>
            <div className="pattern-image">
              <Image 
                src="/images/icons/separator.svg" 
                alt="Separator" 
                width={120} 
                height={24} 
              />
            </div>
            <h2>Four Generations of Trust. Decades of Taste. A Legacy of Hospitality.</h2>
          </div>
        </div>

        {/* Fact Counter Row */}
        <div className="fact-counter">
          <div className="fact-row">
            {counters.map((c, idx) => (
              <div key={c.title} className="fact-block">
                <div className="inner">
                  <div className="fact-count">
                    <span>{counts[idx]}</span>
                    <i>{c.suffix}</i>
                  </div>
                  <div className="fact-title">
                    {c.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
