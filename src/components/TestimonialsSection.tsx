'use client';

import React from 'react';
import { testimonials } from '@/data/testimonials';
import { Sparkles, Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="section-padding" style={{ backgroundColor: '#FFFDF7' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="eyebrow eyebrow-gold">
            <Sparkles size={14} color="#B88916" />
            <span>Honored Testimonials</span>
          </div>
          <h2 className="section-title">
            Words from Grateful Hosts &amp; Families
          </h2>
          <p className="section-subtitle">
            Over 9,100 families and corporate leaders have celebrated their defining moments with JayShree Caters.
          </p>

          {/* Benchmark Google Reviews Trust Ribbon */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(7, 91, 53, 0.15)',
              padding: '0.65rem 1.4rem',
              borderRadius: '9999px',
              marginTop: '1.25rem',
              boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            }}
          >
            {/* Google G icon */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <svg width="22" height="22" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--green-dark)' }}>
                4.9 / 5.0
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#E5B52A" color="#E5B52A" />
              ))}
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              (2,050+ Verified Client Reviews)
            </span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
          }}
        >
          {testimonials.map((test: any) => (
            <div
              key={test.id}
              className="card-luxury"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: '#FFFFFF',
              }}
            >
              <div>
                {/* 5-Star Row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '1.2rem' }}>
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} size={17} fill="#E5B52A" color="#E5B52A" />
                  ))}
                </div>

                {/* Quote */}
                <p
                  style={{
                    fontSize: '0.96rem',
                    color: 'var(--text)',
                    lineHeight: 1.7,
                    fontStyle: 'italic',
                    marginBottom: '1.5rem',
                  }}
                >
                  &ldquo;{test.quote}&rdquo;
                </p>
              </div>

              {/* Host Metadata */}
              <div
                style={{
                  borderTop: '1px solid rgba(7, 91, 53, 0.08)',
                  paddingTop: '1rem',
                }}
              >
                <h3 style={{ fontSize: '1.05rem', color: 'var(--green-dark)', fontWeight: 700 }}>
                  {test.author}
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#B88916', fontWeight: 600, marginTop: '0.15rem' }}>
                  {test.role} • {test.event} ({test.guests})
                </p>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                  {test.location}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
