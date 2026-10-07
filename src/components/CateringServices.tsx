'use client';

import React from 'react';
import Image from 'next/image';
import { cateringServices } from '@/data/services';
import { useSelection } from '@/context/SelectionContext';
import { getQuickWhatsAppLink } from '@/utils/whatsapp';
import { 
  Sparkles, 
  CheckCircle2, 
  Users, 
  MessageCircle, 
  ArrowUpRight 
} from 'lucide-react';

export const CateringServices: React.FC = () => {
  const { setIsDrawerOpen } = useSelection();

  return (
    <section id="services" className="section-padding bg-kolam-pattern">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="eyebrow">
            <Sparkles size={14} color="#075B35" />
            <span>Curated Hospitality</span>
          </div>
          <h2 className="section-title">
            Our Specialized Catering Services
          </h2>
          <p className="section-subtitle">
            Whether welcoming 50 close relatives or orchestrating a royal feast for 3,000 wedding guests, we tailor every detail to your family&apos;s traditions and preferences.
          </p>
        </div>

        {/* Services Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {cateringServices.map((service: any) => {
            const waUrl = getQuickWhatsAppLink('services', service.title);

            return (
              <div
                key={service.id}
                className="card-luxury"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: 0,
                  overflow: 'hidden',
                }}
              >
                <div>
                  {/* Service Image Banner with Guest Count Pill */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16 / 10',
                      backgroundColor: '#EFE8D6',
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{
                        objectFit: 'cover',
                        transition: 'transform 0.6s ease',
                      }}
                      className="service-card-img"
                    />
                    <style jsx>{`
                      :global(.service-card-img:hover) {
                        transform: scale(1.05);
                      }
                    `}</style>
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, transparent 60%, rgba(3, 66, 38, 0.7) 100%)',
                      }}
                    />

                    {/* Guest Count Pill */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '1rem',
                        left: '1rem',
                        backgroundColor: 'rgba(255, 253, 247, 0.95)',
                        backdropFilter: 'blur(6px)',
                        padding: '0.35rem 0.85rem',
                        borderRadius: '9999px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: 'var(--green-dark)',
                        border: '1px solid rgba(229, 181, 42, 0.4)',
                      }}
                    >
                      <Users size={14} color="#075B35" />
                      <span>{service.guests}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: '2rem 1.8rem 1.2rem 1.8rem' }}>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: '#B88916',
                      }}
                    >
                      {service.subtitle}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.45rem',
                        color: 'var(--green-dark)',
                        marginTop: '0.25rem',
                        marginBottom: '0.85rem',
                      }}
                    >
                      {service.title}
                    </h3>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.4rem' }}>
                      {service.description}
                    </p>

                    {/* Highlights Checklist */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', borderTop: '1px solid rgba(7, 91, 53, 0.08)', paddingTop: '1.2rem' }}>
                      {service.highlights?.map((highlight: string, idx: number) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem' }}>
                          <CheckCircle2 size={16} color="#075B35" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                          <span style={{ fontSize: '0.84rem', color: 'var(--text)', fontWeight: 500 }}>
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
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
                    <span>Plan Event</span>
                    <ArrowUpRight size={15} />
                  </button>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-sm"
                    style={{ padding: '0.55rem 0.9rem' }}
                    title={`Enquire on WhatsApp about ${service.title}`}
                    aria-label={`Enquire on WhatsApp about ${service.title}`}
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
