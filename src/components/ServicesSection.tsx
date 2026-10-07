'use client';

import React from 'react';
import Image from 'next/image';
import { allServices } from '@/data/services';
import { ArrowRight } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="we-offer-section">
      <div className="container">
        {/* Title Box */}
        <div className="title-box centered">
          <div className="subtitle">
            <span>Our Expertise</span>
          </div>
          <div className="pattern-image">
            <Image 
              src="/images/icons/separator.svg" 
              alt="Separator" 
              width={120} 
              height={24} 
            />
          </div>
          <h2>Services We Deliver</h2>
          <div className="text">
            We deliver outstanding catering and celebration banquet management for every auspicious occasion, from grand traditional weddings to corporate events.
          </div>
        </div>

        {/* 13 Services Grid */}
        <div className="services-grid">
          {allServices.map((service) => (
            <div key={service.id} className="offer-block-two">
              <div className="image">
                <Image 
                  src={service.image} 
                  alt={service.title} 
                  width={450} 
                  height={250} 
                  style={{ objectFit: 'cover' }}
                />
                {service.badge && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: '#C89F5C',
                      color: '#052020',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      padding: '0.25rem 0.65rem',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    }}
                  >
                    {service.badge}
                  </span>
                )}
              </div>
              <div className="inner-box">
                <h4>
                  <a href="#reserve">{service.title}</a>
                </h4>
                <div className="desc">
                  {service.description}
                </div>
                <div className="price">
                  <a href="#reserve" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span>Know More</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
