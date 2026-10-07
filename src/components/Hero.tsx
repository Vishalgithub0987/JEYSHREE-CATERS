'use client';

import React from 'react';
import Image from 'next/image';
import { siteConfig } from '@/data/site';
import { getQuickWhatsAppLink } from '@/utils/whatsapp';
import { useSelection } from '@/context/SelectionContext';
import { 
  ArrowRight, 
  MessageCircle, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Utensils, 
  Users 
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { setIsDrawerOpen } = useSelection();
  const whatsappUrl = getQuickWhatsAppLink('hero');

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        backgroundColor: '#FFFDF7',
        backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(229, 181, 42, 0.12) 0%, transparent 60%)',
        overflow: 'hidden',
        paddingTop: '3.5rem',
        paddingBottom: '5rem',
      }}
    >
      {/* Subtle South Indian Floral Kolam Accents */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          border: '1px dashed rgba(7, 91, 53, 0.12)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-8%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          border: '1px dashed rgba(229, 181, 42, 0.25)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3.5rem',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          <style jsx>{`
            @media (min-width: 1024px) {
              .hero-grid {
                grid-templateColumns: 1.15fr 0.85fr !important;
                gap: 4rem !important;
              }
            }
          `}</style>

          {/* Left Text Column */}
          <div style={{ textAlign: 'left' }}>
            {/* Eyebrow */}
            <div className="eyebrow eyebrow-gold">
              <Sparkles size={14} color="#B88916" />
              <span>{siteConfig.eyebrow}</span>
            </div>

            {/* Headline */}
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.75rem, 5.5vw, 4.4rem)',
                fontWeight: 800,
                color: 'var(--green-dark)',
                lineHeight: 1.08,
                letterSpacing: '-0.025em',
                marginBottom: '1.4rem',
              }}
            >
              Every Celebration <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #075B35 0%, #B88916 60%, #E5B52A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Deserves a Feast.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p
              style={{
                fontSize: 'clamp(1rem, 1.25vw, 1.2rem)',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                maxWidth: '620px',
                marginBottom: '2.4rem',
              }}
            >
              {siteConfig.subheadline}
            </p>

            {/* Action Buttons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                alignItems: 'center',
                marginBottom: '3rem',
              }}
            >
              {/* Primary CTA */}
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="btn btn-primary btn-lg"
                style={{
                  boxShadow: '0 8px 24px rgba(7, 91, 53, 0.28)',
                }}
              >
                <span>Plan Your Event</span>
                <ArrowRight size={18} />
              </button>

              {/* Secondary CTA */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <MessageCircle size={18} fill="currentColor" />
                <span>WhatsApp Us</span>
              </a>

              {/* Explore Menu link */}
              <a
                href="#menu"
                className="btn btn-secondary btn-lg"
              >
                <span>Explore Menu &rarr;</span>
              </a>
            </div>

            {/* Quick Guarantees Badge List */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(7, 91, 53, 0.12)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={18} color="#075B35" />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--green-dark)' }}>
                  100% Pure Cow Ghee &amp; Cold-Pressed Oils
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award size={18} color="#B88916" />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--green-dark)' }}>
                  Zero Artificial Food Colors
                </span>
              </div>
            </div>
          </div>

          {/* Right Luxury Visual Framing */}
          <div style={{ position: 'relative' }}>
            {/* Decorative Gold Frame Offset */}
            <div
              style={{
                position: 'absolute',
                inset: '-12px -12px 12px 12px',
                border: '2px solid rgba(229, 181, 42, 0.45)',
                borderRadius: '2rem',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />

            {/* Main Hero Visual Card */}
            <div
              style={{
                position: 'relative',
                borderRadius: '2rem',
                overflow: 'hidden',
                boxShadow: '0 24px 60px rgba(3, 66, 38, 0.18)',
                zIndex: 1,
                aspectRatio: '4 / 4.2',
                backgroundColor: '#F7F3E8',
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
                alt="Traditional South Indian Wedding Banana Leaf Feast by JayShree Caters"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />

              {/* Gradient Overlay for Text Readability */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 55%, rgba(3, 66, 38, 0.88) 100%)',
                }}
              />

              {/* Floating Bottom Card */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.5rem',
                  right: '1.5rem',
                  backgroundColor: 'rgba(255, 253, 247, 0.94)',
                  backdropFilter: 'blur(8px)',
                  padding: '1.2rem',
                  borderRadius: '1.25rem',
                  border: '1px solid rgba(229, 181, 42, 0.5)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#B88916', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      Traditional Virundhu
                    </span>
                    <h3 style={{ fontSize: '1.15rem', color: '#034226', fontWeight: 700, marginTop: '0.1rem' }}>
                      Authentic Banana Leaf Catering
                    </h3>
                  </div>
                  <a
                    href="#banana-leaf"
                    className="btn btn-gold btn-sm"
                    style={{ padding: '0.45rem 1rem' }}
                  >
                    View Feast
                  </a>
                </div>
              </div>
            </div>

            {/* Small Floating Experience Tag */}
            <div
              style={{
                position: 'absolute',
                top: '-1rem',
                left: '-1rem',
                zIndex: 2,
                backgroundColor: '#075B35',
                color: '#FFFDF7',
                padding: '0.65rem 1.2rem',
                borderRadius: '1rem',
                boxShadow: '0 10px 25px rgba(7, 91, 53, 0.3)',
                border: '1px solid rgba(229, 181, 42, 0.5)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
              }}
            >
              <Utensils size={16} color="#F4D98A" />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.04em' }}>
                40+ Signature Dishes
              </span>
            </div>
          </div>

        </div>

        {/* Metrics Bar */}
        <div
          style={{
            marginTop: '5rem',
            backgroundColor: '#FFFFFF',
            borderRadius: '1.75rem',
            padding: '2.2rem 2.5rem',
            border: '1px solid rgba(7, 91, 53, 0.1)',
            boxShadow: 'var(--shadow-md)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
            gap: '2rem',
            textAlign: 'center',
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 800, color: '#075B35', lineHeight: 1 }}>
              {siteConfig.metrics.eventsCatered}
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              Catering Projects
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 800, color: '#B88916', lineHeight: 1 }}>
              {siteConfig.metrics.experienceYears}
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              Years Of Experience
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 800, color: '#075B35', lineHeight: 1 }}>
              {siteConfig.metrics.masterChefsStaff}
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              Expert Chefs &amp; Staffs
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 800, color: '#B88916', lineHeight: 1 }}>
              {siteConfig.metrics.singleDayCapacity}
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              Guests Served in a Day
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 800, color: '#075B35', lineHeight: 1 }}>
              {siteConfig.metrics.hygieneRating}
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              Clean &amp; Safe Cuisine
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
