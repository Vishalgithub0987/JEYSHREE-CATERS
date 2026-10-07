'use client';

import React from 'react';
import { siteConfig } from '@/data/site';
import { useSelection } from '@/context/SelectionContext';
import { getQuickWhatsAppLink } from '@/utils/whatsapp';
import { 
  Sparkles, 
  ArrowRight, 
  MessageCircle, 
  PhoneCall, 
  Calendar 
} from 'lucide-react';

export const FinalCTA: React.FC = () => {
  const { setIsDrawerOpen } = useSelection();
  const whatsappUrl = getQuickWhatsAppLink('hero');

  return (
    <section className="section-padding" style={{ backgroundColor: '#FFFDF7' }}>
      <div className="container">
        
        <div
          style={{
            backgroundColor: '#034226',
            borderRadius: '2.5rem',
            padding: '4rem 2rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(3, 66, 38, 0.25)',
            border: '2px solid rgba(229, 181, 42, 0.45)',
            color: '#FFFDF7',
          }}
        >
          {/* Decorative Subtle Radial Glow */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(229, 181, 42, 0.2) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 2, maxWidth: '760px', margin: '0 auto' }}>
            
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: 'rgba(229, 181, 42, 0.18)',
                color: '#F4D98A',
                padding: '0.4rem 1.2rem',
                borderRadius: '9999px',
                border: '1px solid rgba(229, 181, 42, 0.4)',
                fontSize: '0.78rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '1.4rem',
              }}
            >
              <Sparkles size={14} color="#E5B52A" />
              <span>Begin Your Celebration Planning</span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
                fontWeight: 800,
                color: '#FFFDF7',
                lineHeight: 1.15,
                marginBottom: '1.25rem',
              }}
            >
              Let Us Create an Unforgettable Feast for Your Guests
            </h2>

            <p
              style={{
                fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
                color: '#E0DDD3',
                lineHeight: 1.7,
                marginBottom: '2.5rem',
              }}
            >
              Browse our 40+ authentic dishes, pick your favorites, and receive an instant, beautifully organized breakdown on WhatsApp — with zero obligation.
            </p>

            {/* CTAs */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                marginBottom: '2rem',
              }}
            >
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="btn btn-gold btn-lg"
              >
                <span>Curate Menu &amp; Book Dates</span>
                <ArrowRight size={18} />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <MessageCircle size={18} fill="currentColor" />
                <span>Chat on WhatsApp Directly</span>
              </a>
            </div>

            {/* Direct Phone Helpline */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#F4D98A', fontSize: '0.95rem', fontWeight: 600 }}>
              <PhoneCall size={16} />
              <span>Call our banquet director directly:</span>
              <a
                href={`tel:${siteConfig.phone}`}
                style={{ color: '#FFFFFF', textDecoration: 'underline', fontWeight: 700 }}
              >
                {siteConfig.phoneDisplay}
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
