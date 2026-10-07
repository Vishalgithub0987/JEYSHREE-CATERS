'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Sparkles, 
  ShieldCheck, 
  Flame, 
  Heart, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';

export const AboutJayShree: React.FC = () => {
  return (
    <section
      id="about"
      className="section-padding bg-cream-accent"
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="eyebrow">
            <Sparkles size={14} color="#075B35" />
            <span>Our Culinary Ethos</span>
          </div>
          <h2 className="section-title">
            The Soul of Authentic South Indian Hospitality
          </h2>
          <p className="section-subtitle">
            At JayShree Caters, catering is not merely serving food — it is an auspicious sacred ritual of feeding loved ones with boundless warmth, purity, and culinary perfection.
          </p>
        </div>

        {/* Story Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3.5rem',
            alignItems: 'center',
            marginBottom: '4.5rem',
          }}
          className="about-grid"
        >
          <style jsx>{`
            @media (min-width: 1024px) {
              .about-grid {
                grid-templateColumns: 1fr 1.15fr !important;
              }
            }
          `}</style>

          {/* Left Visual Composition */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: '2rem',
                overflow: 'hidden',
                aspectRatio: '4 / 3.4',
                boxShadow: 'var(--shadow-lg)',
                border: '1.5px solid rgba(229, 181, 42, 0.4)',
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80"
                alt="Traditional South Indian Culinary Preparations by JayShree Caters"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 40%, rgba(3, 66, 38, 0.75) 100%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.5rem',
                  right: '1.5rem',
                  color: '#FFFFFF',
                }}
              >
                <p style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: '1.1rem' }}>
                  &ldquo;A feast cooked with pure intention and timeless spices touches every soul in attendance.&rdquo;
                </p>
              </div>
            </div>

            {/* Small Floating Seal */}
            <div
              style={{
                position: 'absolute',
                top: '-1rem',
                right: '-1rem',
                backgroundColor: '#FFFFFF',
                borderRadius: '50%',
                width: '100px',
                height: '100px',
                border: '2px solid #E5B52A',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '0.5rem',
              }}
            >
              <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#B88916', textTransform: 'uppercase' }}>
                Tradition
              </span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: '#075B35', lineHeight: 1 }}>
                Pure
              </span>
              <span style={{ fontSize: '0.62rem', fontWeight: 700, color: '#034226' }}>
                Taste
              </span>
            </div>
          </div>

          {/* Right Narrative Column */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2rem',
                color: 'var(--green-dark)',
                marginBottom: '1.2rem',
                lineHeight: 1.2,
              }}
            >
              Preserving Ancient Recipes, Elevating Modern Celebrations
            </h3>

            {/* Traditional Heritage Tamil & English Highlight Callout */}
            <div
              style={{
                backgroundColor: 'rgba(229, 181, 42, 0.12)',
                borderLeft: '4px solid #B88916',
                borderRadius: '0.75rem',
                padding: '1.25rem 1.5rem',
                marginBottom: '1.5rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.08rem',
                  fontWeight: 700,
                  color: '#034226',
                  lineHeight: 1.6,
                  marginBottom: '0.4rem',
                }}
              >
                &ldquo;பாரம்பரியமிக்க அறுசுவை கல்யாண விருந்து — மருதாணி முதல் மறுவீடு வரை உயர்ந்த தரம் உங்கள் பட்ஜெட்டில்.&rdquo;
              </p>
              <p style={{ fontSize: '0.86rem', color: '#555', fontStyle: 'italic', margin: 0 }}>
                From sacred pre-wedding rituals (Marudhani &amp; Nichayathartham) to grand Muhurtham banquets and celebratory farewells (Maruveedu), we craft every feast with purity, authentic cow ghee, and love.
              </p>
            </div>

            <p style={{ marginBottom: '1.2rem', fontSize: '1.02rem', lineHeight: 1.7 }}>
              Rooted in the timeless temple culinary heritage of South India, JayShree Caters was founded with a singular dedication: to provide unadulterated, wholesome, and memorable feasts for life&apos;s most cherished milestones.
            </p>

            <p style={{ marginBottom: '2rem', fontSize: '1.02rem', lineHeight: 1.7 }}>
              From grand multi-session wedding celebrations in traditional kalyana mandapams to modern corporate galas and intimate housewarmings, we pair time-tested cooking secrets with uncompromising FSSAI hygiene standards.
            </p>

            {/* Checklist */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={18} color="#075B35" />
                <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text)' }}>
                  Traditional Wood-Fire &amp; Urli Slow Cooking
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={18} color="#075B35" />
                <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text)' }}>
                  Fresh Stone-Ground Sambar &amp; Rasam Spices
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={18} color="#075B35" />
                <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text)' }}>
                  Dedicated Separate Veg &amp; Non-Veg Kitchens
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={18} color="#075B35" />
                <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text)' }}>
                  Punctual Hall Captains &amp; Courteous Staff
                </span>
              </div>
            </div>

            <a href="#services" className="btn btn-primary">
              <span>View Catering Services</span>
            </a>
          </div>

        </div>

        {/* 4 Pillars of Excellence */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}
        >
          <div className="card-luxury">
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '1rem',
                backgroundColor: 'rgba(7, 91, 53, 0.08)',
                color: '#075B35',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.2rem',
              }}
            >
              <ShieldCheck size={24} />
            </div>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.6rem', color: '#034226' }}>
              Uncompromising Purity
            </h4>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
              We source directly from trusted farmers. 100% pure cow ghee, cold-pressed sesame and groundnut oils, and natural spices with zero artificial preservatives or food colors.
            </p>
          </div>

          <div className="card-luxury">
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '1rem',
                backgroundColor: 'rgba(229, 181, 42, 0.15)',
                color: '#B88916',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.2rem',
              }}
            >
              <Flame size={24} />
            </div>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.6rem', color: '#034226' }}>
              Ancestral Recipes
            </h4>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
              Every recipe has been refined across decades. From the fragrant tellicherry pepper in our rasams to the slow-condensed milk in our palada payasam, flavor is never rushed.
            </p>
          </div>

          <div className="card-luxury">
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '1rem',
                backgroundColor: 'rgba(7, 91, 53, 0.08)',
                color: '#075B35',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.2rem',
              }}
            >
              <Clock size={24} />
            </div>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.6rem', color: '#034226' }}>
              Precision Timing
            </h4>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
              Muhurthams, poojas, and corporate lunches require pinpoint punctuality. Our dining halls open precisely on schedule, with continuous steaming hot refills.
            </p>
          </div>

          <div className="card-luxury">
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '1rem',
                backgroundColor: 'rgba(229, 181, 42, 0.15)',
                color: '#B88916',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.2rem',
              }}
            >
              <Heart size={24} />
            </div>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.6rem', color: '#034226' }}>
              Gracious Hospitality
            </h4>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
              Our servers are trained in the courteous traditions of South Indian banana leaf service, attending to elders and young guests with genuine respect and care.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
