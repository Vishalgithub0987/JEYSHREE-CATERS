'use client';

import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Flame, 
  Clock, 
  UtensilsCrossed, 
  HeartHandshake, 
  Droplets 
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      icon: Droplets,
      title: 'Wood-Pressed Oils & Cow Ghee',
      description:
        'We cook solely with pure Mara Chekku (wood-pressed) gingelly, groundnut, and coconut oils alongside rich farm-fresh cow ghee. Absolutely no palm oil or vanaspati.',
    },
    {
      icon: ShieldCheck,
      title: 'Zero Artificial Additives',
      description:
        'No synthetic food coloring, no MSG, and no chemical tenderizers. Vibrant red shades come from natural Kashmiri chilies; yellow glows from pure Salem turmeric.',
    },
    {
      icon: Clock,
      title: 'Guaranteed Punctual Dining',
      description:
        'Our banquet captains ensure wedding muhurtham breakfasts and reception buffets open sharp to the minute, with endless hot replenishment throughout.',
    },
    {
      icon: Flame,
      title: 'Live On-Site Culinary Theatre',
      description:
        'From sizzling clay tandoors and live crispy paper roast dosas to hot flambe halwa and frothy Kumbakonam degree filter coffee stations right before your guests.',
    },
    {
      icon: UtensilsCrossed,
      title: 'Strict FSSAI Hygiene Standards',
      description:
        'Sanitized central commercial kitchens, medical-grade temperature-controlled transport vehicles, and uniformed catering stewards with gloves and hairnets.',
    },
    {
      icon: HeartHandshake,
      title: 'Direct WhatsApp Coordination',
      description:
        'Zero bureaucratic hassles. Build your menu online, adjust portions directly, and coordinate directly with senior banquet directors over WhatsApp.',
    },
  ];

  return (
    <section className="section-padding bg-cream-accent">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="eyebrow">
            <Sparkles size={14} color="#075B35" />
            <span>The JayShree Distinction</span>
          </div>
          <h2 className="section-title">
            Why Discerning Hosts Trust JayShree Caters
          </h2>
          <p className="section-subtitle">
            An unwavering commitment to culinary integrity, sacred ritual precision, and generous South Indian hospitality.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          {points.map((pt, idx) => {
            const IconComponent = pt.icon;
            return (
              <div
                key={idx}
                className="card-luxury"
                style={{
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '1.25rem',
                    backgroundColor: 'rgba(7, 91, 53, 0.08)',
                    color: '#075B35',
                    border: '1px solid rgba(229, 181, 42, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconComponent size={24} />
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.35rem',
                    color: 'var(--green-dark)',
                    fontWeight: 700,
                  }}
                >
                  {pt.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.92rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.65,
                  }}
                >
                  {pt.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
