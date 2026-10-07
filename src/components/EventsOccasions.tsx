'use client';

import React from 'react';
import Image from 'next/image';
import { eventOccasions } from '@/data/events';
import { useSelection } from '@/context/SelectionContext';
import { getQuickWhatsAppLink } from '@/utils/whatsapp';
import { 
  Sparkles, 
  CheckCircle2, 
  Users, 
  ArrowRight, 
  MessageCircle 
} from 'lucide-react';

export const EventsOccasions: React.FC = () => {
  const { setIsDrawerOpen } = useSelection();

  return (
    <section id="occasions" className="section-padding bg-kolam-pattern">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="eyebrow">
            <Sparkles size={14} color="#075B35" />
            <span>Celebration Packages</span>
          </div>
          <h2 className="section-title">
            Crafted for Every Sacred &amp; Joyful Milestone
          </h2>
          <p className="section-subtitle">
            From dawn muhurthams requiring strictly pious sattvic preparation to grand evening receptions featuring modern interactive live stations.
          </p>
        </div>

        {/* Occasions Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {eventOccasions.map((occasion) => {
            const waUrl = getQuickWhatsAppLink('services', occasion.title);

            return (
              <div
                key={occasion.id}
                className="card-luxury"
                style={{
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  overflow: 'hidden',
                }}
              >
                <div>
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16 / 10',
                      backgroundColor: '#F7F3E8',
                    }}
                  >
                    <Image
                      src={occasion.image}
                      alt={occasion.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, transparent 55%, rgba(3, 66, 38, 0.75) 100%)',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '0.85rem',
                        left: '1rem',
                        backgroundColor: 'rgba(255, 253, 247, 0.95)',
                        padding: '0.35rem 0.8rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'var(--green-dark)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                    >
                      <Users size={13} color="#075B35" />
                      <span>{occasion.suitableFor}</span>
                    </div>
                  </div>

                  <div style={{ padding: '1.8rem' }}>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: '#B88916',
                      }}
                    >
                      {occasion.subtitle}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.45rem',
                        color: 'var(--green-dark)',
                        marginTop: '0.2rem',
                        marginBottom: '0.75rem',
                      }}
                    >
                      {occasion.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.4rem' }}>
                      {occasion.description}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', borderTop: '1px solid rgba(7, 91, 53, 0.08)', paddingTop: '1.2rem' }}>
                      {occasion.features.map((feat, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem' }}>
                          <CheckCircle2 size={16} color="#075B35" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                          <span style={{ fontSize: '0.84rem', color: 'var(--text)', fontWeight: 500 }}>
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    padding: '1.2rem 1.8rem 1.8rem 1.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                    borderTop: '1px solid rgba(7, 91, 53, 0.06)',
                  }}
                >
                  <button
                    onClick={() => setIsDrawerOpen(true)}
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1 }}
                  >
                    <span>Customize Menu</span>
                    <ArrowRight size={14} />
                  </button>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-sm"
                    style={{ padding: '0.55rem 0.9rem' }}
                    title={`Enquire on WhatsApp for ${occasion.title}`}
                  >
                    <MessageCircle size={16} fill="currentColor" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
