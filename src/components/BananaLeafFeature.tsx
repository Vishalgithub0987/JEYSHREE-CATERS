'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { bananaLeafItems, LeafItem } from '@/data/bananaLeaf';
import { getQuickWhatsAppLink } from '@/utils/whatsapp';
import { 
  Sparkles, 
  MessageCircle, 
  Info, 
  Utensils, 
  Leaf, 
  CheckCircle2,
  UtensilsCrossed,
  ArrowRight
} from 'lucide-react';

export const BananaLeafFeature: React.FC = () => {
  const [activeItem, setActiveItem] = useState<LeafItem>(bananaLeafItems[0]);
  const whatsappUrl = getQuickWhatsAppLink('bananaleaf');
  const topRowItems = bananaLeafItems.slice(0, 6);
  const bottomRowItems = bananaLeafItems.slice(6, 12);

  return (
    <section
      id="banana-leaf"
      className="section-padding bg-cream-accent"
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="eyebrow eyebrow-gold">
            <Sparkles size={14} color="#B88916" />
            <span>Sacred Hospitality</span>
          </div>
          <h2 className="section-title">
            The Traditional Banana Leaf Virundhu
          </h2>
          <p className="section-subtitle">
            An ancient gastronomic science balancing the six tastes (&ldquo;Arusuvai&rdquo;): sweet, sour, salty, pungent, bitter, and astringent. Every item has its consecrated place on the fresh plantain leaf.
          </p>
        </div>

        {/* Banana Leaf Visual Representation & Interactive Guide */}
        <div
          className="banana-leaf-card"
          style={{
            backgroundColor: '#022b18',
            borderRadius: '2.5rem',
            padding: '2.5rem 2rem',
            boxShadow: '0 20px 50px rgba(3, 66, 38, 0.35)',
            border: '2px solid rgba(229, 181, 42, 0.4)',
            color: '#FFFDF7',
            marginBottom: '3rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Golden Mandala Watermark */}
          <div
            style={{
              position: 'absolute',
              top: '-20%',
              right: '-10%',
              width: '450px',
              height: '450px',
              borderRadius: '50%',
              border: '1px solid rgba(229, 181, 42, 0.15)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '2.5rem',
              alignItems: 'center',
            }}
            className="leaf-grid"
          >
            <style jsx>{`
              @media (min-width: 1024px) {
                .leaf-grid {
                  grid-template-columns: 1.25fr 0.75fr !important;
                }
              }

              .leaf-grid {
                width: 100%;
                box-sizing: border-box;
              }

              .leaf-grid > * {
                min-width: 0;
                width: 100%;
                box-sizing: border-box;
              }

              .banana-leaf-plate {
                position: relative;
                background: linear-gradient(180deg, #185a2f 0%, #134e26 46%, #0b3317 50%, #134e26 54%, #185a2f 100%);
                background-image: 
                  repeating-linear-gradient(115deg, transparent, transparent 18px, rgba(134, 239, 172, 0.05) 19px, transparent 20px),
                  repeating-linear-gradient(65deg, transparent, transparent 18px, rgba(134, 239, 172, 0.05) 19px, transparent 20px),
                  linear-gradient(180deg, #185a2f 0%, #134e26 46%, #0b3317 50%, #134e26 54%, #185a2f 100%);
                border-radius: 60px 18px 50px 18px;
                border: 2.5px solid rgba(134, 239, 172, 0.38);
                box-shadow: inset 0 0 35px rgba(0, 0, 0, 0.45), 0 16px 40px rgba(0, 0, 0, 0.35);
                padding: 1.35rem 1.15rem;
                overflow: hidden;
                width: 100%;
                box-sizing: border-box;
              }

              @media (max-width: 768px) {
                .banana-leaf-plate {
                  border-radius: 20px 10px 16px 10px;
                  padding: 0.85rem 0.5rem;
                }
              }

              .leaf-header-bar {
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-bottom: 0.85rem;
                padding: 0 0.25rem;
                font-size: 0.72rem;
                color: #a7f3d0;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.05em;
              }

              .leaf-tip-badge, .leaf-base-badge {
                display: inline-flex;
                align-items: center;
                gap: 0.4rem;
                background: rgba(0, 0, 0, 0.35);
                padding: 0.25rem 0.65rem;
                border-radius: 999px;
                border: 1px solid rgba(134, 239, 172, 0.3);
              }

              .leaf-tip-dot {
                width: 7px;
                height: 7px;
                border-radius: 50%;
                background-color: #22c55e;
                box-shadow: 0 0 8px #22c55e;
              }

              .leaf-tier-label {
                font-size: 0.72rem;
                color: #F4D98A;
                letter-spacing: 0.04em;
                font-weight: 700;
              }

              .leaf-tier-label-bottom {
                font-size: 0.72rem;
                color: #F4D98A;
                letter-spacing: 0.04em;
                margin-bottom: 0.6rem;
                padding-left: 0.25rem;
                font-weight: 700;
                text-transform: uppercase;
              }

              .leaf-row {
                display: grid;
                grid-template-columns: repeat(6, 1fr);
                gap: 0.55rem;
              }

              @media (max-width: 1200px) {
                .leaf-row {
                  grid-template-columns: repeat(3, 1fr);
                }
              }

              @media (max-width: 600px) {
                .leaf-row {
                  grid-template-columns: repeat(2, 1fr);
                  gap: 0.45rem;
                }
              }

              .leaf-dish-spot {
                background: rgba(2, 32, 16, 0.78);
                backdrop-filter: blur(6px);
                border: 1.5px solid rgba(134, 239, 172, 0.25);
                border-radius: 12px;
                padding: 0.65rem 0.5rem;
                color: #FFFDF7;
                text-align: left;
                cursor: pointer;
                transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                min-height: 84px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                width: 100%;
                box-sizing: border-box;
                min-width: 0;
                overflow: hidden;
              }

              .leaf-dish-spot:hover {
                transform: translateY(-3px) scale(1.02);
                border-color: #E5B52A;
                background: rgba(4, 45, 23, 0.92);
                box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
              }

              .leaf-dish-spot.active {
                border: 2px solid #E5B52A;
                background: rgba(229, 181, 42, 0.22);
                box-shadow: 0 0 18px rgba(229, 181, 42, 0.55), inset 0 0 10px rgba(229, 181, 42, 0.2);
                transform: translateY(-2px);
              }

              .spot-top {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 0.3rem;
                gap: 0.25rem;
              }

              .spot-num {
                font-size: 0.68rem;
                font-weight: 800;
                color: #E5B52A;
                background: rgba(229, 181, 42, 0.15);
                padding: 0.12rem 0.38rem;
                border-radius: 4px;
                line-height: 1;
                flex-shrink: 0;
              }

              .leaf-dish-spot.active .spot-num {
                color: #052020;
                background: #E5B52A;
              }

              .spot-cat {
                font-size: 0.6rem;
                color: #86efac;
                text-transform: capitalize;
                opacity: 0.85;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }

              .spot-name {
                font-size: 0.8rem;
                font-weight: 700;
                line-height: 1.25;
                color: #FFFDF7;
                word-break: break-word;
                overflow-wrap: break-word;
              }

              .spot-tamil {
                font-size: 0.68rem;
                color: #F4D98A;
                margin-top: 0.15rem;
                opacity: 0.9;
                word-break: break-word;
                overflow-wrap: break-word;
              }

              .leaf-midrib {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                margin: 0.9rem 0;
              }

              .leaf-midrib-line {
                flex: 1;
                height: 2px;
                background: linear-gradient(90deg, transparent, rgba(134, 239, 172, 0.7), #E5B52A, rgba(134, 239, 172, 0.7), transparent);
                box-shadow: 0 0 8px rgba(229, 181, 42, 0.5);
              }

              .leaf-midrib-tag {
                display: inline-flex;
                align-items: center;
                gap: 0.4rem;
                padding: 0.22rem 0.75rem;
                border-radius: 999px;
                background: rgba(2, 24, 13, 0.92);
                border: 1px solid rgba(229, 181, 42, 0.4);
                font-size: 0.72rem;
                font-weight: 700;
                color: #E5B52A;
                letter-spacing: 0.5px;
                white-space: nowrap;
                max-width: 100%;
                box-sizing: border-box;
              }
            `}</style>

            {/* Left: Plantain Leaf Schematic Grid */}
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <Leaf size={24} color="#E5B52A" />
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.65rem', color: '#FFFDF7', margin: 0 }}>
                      Auspicious Serving Order (பரிமாறும் முறை)
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#F4D98A', marginTop: '0.35rem', marginBottom: 0, opacity: 0.9 }}>
                    Click any dish on the banana leaf below to explore traditional Arusuvai placement and nutritional harmony.
                  </p>
                </div>

                <Link
                  href="/menu"
                  className="btn btn-gold leaf-order-cta"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.55rem 1.15rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    borderRadius: '999px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 15px rgba(229, 181, 42, 0.3)',
                  }}
                >
                  <UtensilsCrossed size={15} />
                  <span>Customize Your Own Banana Leaf Virundhu</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* Realistic Banana Leaf Styled Grid */}
              <div className="banana-leaf-plate">
                {/* Leaf Orientation Header */}
                <div className="leaf-header-bar">
                  <div className="leaf-tip-badge">
                    <span className="leaf-tip-dot" />
                    <span>🌿 நுனி இலை (Leaf Tip - Salt &amp; Condiments)</span>
                  </div>
                  <div className="leaf-tier-label">
                    <span>மேல் வரிசை: தொடுகறிகள் (Side Dishes)</span>
                  </div>
                  <div className="leaf-base-badge">
                    <span>அடி இலை (Leaf Base) 🌿</span>
                  </div>
                </div>

                {/* Top Row: Side Dishes & Accompaniments (#1 to #6) */}
                <div className="leaf-row top-leaf-row">
                  {topRowItems.map((item, idx) => {
                    const isActive = activeItem.id === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveItem(item)}
                        className={`leaf-dish-spot ${isActive ? 'active' : ''}`}
                        title={`${item.name} (${item.position})`}
                      >
                        <div className="spot-top">
                          <span className="spot-num">#{idx + 1}</span>
                          <span className="spot-cat">{item.category}</span>
                        </div>
                        <div className="spot-body">
                          <div className="spot-name">{item.name.split('(')[0].trim()}</div>
                          <div className="spot-tamil">{item.tamilName}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Central Banana Leaf Spine / Midrib (நடு நரம்பு) */}
                <div className="leaf-midrib">
                  <div className="leaf-midrib-line" />
                  <div className="leaf-midrib-tag">
                    <Leaf size={13} color="#E5B52A" />
                    <span>வாழை இலை நடு நரம்பு • Traditional Serving Sequence</span>
                  </div>
                  <div className="leaf-midrib-line" />
                </div>

                {/* Leaf Tier Label for Bottom Row */}
                <div className="leaf-tier-label-bottom">
                  <span>கீழ் வரிசை: பிரதான சாதம், குழம்பு வகைகள் &amp; பாயாசம் (Main Courses)</span>
                </div>

                {/* Bottom Row: Main Courses & Sweets (#7 to #12) */}
                <div className="leaf-row bottom-leaf-row">
                  {bottomRowItems.map((item, idx) => {
                    const isActive = activeItem.id === item.id;
                    const itemNumber = idx + 7;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveItem(item)}
                        className={`leaf-dish-spot ${isActive ? 'active' : ''}`}
                        title={`${item.name} (${item.position})`}
                      >
                        <div className="spot-top">
                          <span className="spot-num">#{itemNumber}</span>
                          <span className="spot-cat">{item.category}</span>
                        </div>
                        <div className="spot-body">
                          <div className="spot-name">{item.name.split('(')[0].trim()}</div>
                          <div className="spot-tamil">{item.tamilName}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Selected Dish Spotlight Card */}
            <div
              className="leaf-spotlight-card"
              style={{
                backgroundColor: 'rgba(255, 253, 247, 0.08)',
                backdropFilter: 'blur(10px)',
                borderRadius: '1.75rem',
                border: '1.5px solid rgba(229, 181, 42, 0.35)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '340px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: '#E5B52A',
                    }}
                  >
                    Leaf Placement: {activeItem.position}
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      backgroundColor: 'rgba(229, 181, 42, 0.2)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '9999px',
                      color: '#F4D98A',
                    }}
                  >
                    {activeItem.tamilName}
                  </span>
                </div>

                <h4
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.65rem',
                    color: '#FFFDF7',
                    marginTop: '0.35rem',
                    marginBottom: '1rem',
                  }}
                >
                  {activeItem.name}
                </h4>

                <p style={{ fontSize: '0.98rem', color: '#EAE6D9', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                  {activeItem.description}
                </p>

                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.12)', paddingTop: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem', color: '#F4D98A' }}>
                    <CheckCircle2 size={16} />
                    <span>Cooked fresh with cold-pressed oils &amp; pure ghee</span>
                  </div>
                </div>
              </div>

              {/* Booking CTAs inside feature */}
              <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Link
                  href="/menu"
                  className="btn btn-gold"
                  style={{
                    width: '100%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    padding: '0.85rem 1.25rem',
                    boxShadow: '0 6px 20px rgba(229, 181, 42, 0.35)',
                  }}
                >
                  <UtensilsCrossed size={17} />
                  <span>Customize Your Own Banana Leaf Virundhu</span>
                  <ArrowRight size={16} />
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{
                    width: '100%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    color: '#FFFDF7',
                    background: 'rgba(255, 255, 255, 0.08)',
                    textDecoration: 'none',
                    fontSize: '0.88rem',
                  }}
                >
                  <MessageCircle size={17} fill="currentColor" />
                  <span>Book Traditional Banana Leaf Virundhu</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* 3 Core Virundhu Promises */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          <div className="card-luxury" style={{ backgroundColor: '#FFFFFF' }}>
            <h4 style={{ fontSize: '1.15rem', color: '#034226', marginBottom: '0.5rem' }}>
              Fresh Washed Plantain Leaves
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Harvested daily from certified organic banana groves, sanitized with pristine water, and cut to full royal banquet breadth.
            </p>
          </div>

          <div className="card-luxury" style={{ backgroundColor: '#FFFFFF' }}>
            <h4 style={{ fontSize: '1.15rem', color: '#034226', marginBottom: '0.5rem' }}>
              Sequential Course Pours
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Our servers orchestrate courses seamlessly: Nei Paruppu &rarr; Sambar &rarr; Rasam &rarr; Thayir &rarr; Payasam so every guest enjoys each phase at peak temperature.
            </p>
          </div>

          <div className="card-luxury" style={{ backgroundColor: '#FFFFFF' }}>
            <h4 style={{ fontSize: '1.15rem', color: '#034226', marginBottom: '0.5rem' }}>
              Continuous Hot Second Helpings
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Hall captains ensure that hot vadai, crispy appalams, and ladles of fragrant rasam are offered generously without guests having to ask twice.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
