'use client';

import React from 'react';
import Image from 'next/image';
import { siteConfig } from '@/data/site';
import { PhoneCall } from 'lucide-react';

export const SpecialDishSection: React.FC = () => {
  return (
    <section className="special-dish">
      <div className="container">
        <div className="row">
          {/* Left Column: Food / Banquet Display */}
          <div className="image-col">
            <div className="image-card">
              <Image 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80" 
                alt="South Indian Catering Services in K V Kuppam" 
                width={600} 
                height={480} 
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Right Column: Narrative Story & Call CTA */}
          <div className="content-col">
            <div className="title-box">
              <span className="badge-icon1">
                <Image 
                  src="/images/resource/badge-gold.svg" 
                  alt="Badge" 
                  width={38} 
                  height={38} 
                />
              </span>
              <div className="subtitle" style={{ textAlign: 'left', color: '#075B35' }}>
                <span>A 4-Generation Heritage Story</span>
              </div>
              <div className="pattern-image" style={{ justifyContent: 'flex-start' }}>
                <Image 
                  src="/images/icons/separator.svg" 
                  alt="Separator" 
                  width={110} 
                  height={22} 
                />
              </div>
              <h2 style={{ textAlign: 'left', color: '#052020', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
                Decades of Taste &amp; Memorable Celebrations
              </h2>
              <div className="text" style={{ textAlign: 'left', marginTop: '1.25rem' }}>
                <p style={{ fontWeight: 700, color: '#075B35', fontSize: '1.15rem', marginBottom: '1rem' }}>
                  Four Generations of Trust. Decades of Taste. A Legacy of Hospitality.
                </p>
                <p style={{ lineHeight: '1.7', marginBottom: '1rem' }}>
                  Welcome to Jayshree Caters &amp; Event Management, carrying forward an auspicious family tradition that began with Late Thiru K. Narayasamy in the 1960s. Over 40+ years of catering and 1000+ events successfully served across North Tamil Nadu, we specialize in creating unforgettable dining experiences with authentic vegetarian and non-vegetarian cuisines crafted with care, culinary mastery, and traditional hospitality.
                </p>
                <p style={{ lineHeight: '1.7' }}>
                  Whether you are planning a grand wedding muhurtham, reception, corporate gathering, or family pooja, Mr. P. Amarnath and our expert hospitality team deliver flawless service, delightful taste, and dependable event execution.
                </p>
              </div>

              {/* Call / Book Now banner */}
              <div className="price-box">
                <span className="old">Book Now</span>
                <a href={`tel:${siteConfig.phone}`} className="new">
                  {siteConfig.phoneDisplay}
                </a>
              </div>

              <div style={{ marginTop: '1.75rem' }}>
                <a href="#reserve" className="theme-btn btn-style-two">
                  <PhoneCall size={16} style={{ marginRight: '0.45rem' }} />
                  <span>Contact Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
