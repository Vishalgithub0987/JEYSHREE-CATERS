'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { siteConfig } from '@/data/site';
import { allServices } from '@/data/services';
import { MapPin, Heart } from 'lucide-react';
import { markIntroEntered } from '@/components/LandingIntro';

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    markIntroEntered();

    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    if (typeof window !== 'undefined' && (window as any).__lenis) {
      (window as any).__lenis.start();
    }

    if (pathname === '/') {
      const el = document.getElementById(targetId);
      if (el) {
        if ((window as any).__lenis) {
          (window as any).__lenis.scrollTo(el, { offset: -70, duration: 1.2 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
        if (typeof window !== 'undefined' && window.history?.replaceState) {
          window.history.replaceState(window.history.state, '', `#${targetId}`);
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      router.push(`/#${targetId}`);
    }
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    markIntroEntered();
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    if (typeof window !== 'undefined' && (window as any).__lenis) {
      (window as any).__lenis.start();
    }

    if (pathname === '/') {
      e.preventDefault();
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      if (typeof window !== 'undefined' && window.location.hash && window.history?.replaceState) {
        window.history.replaceState(window.history.state, '', window.location.pathname);
      }
    }
  };

  return (
    <footer className="main-footer">
      <div className="container">
        {/* Top 4-Column Grid */}
        <div className="footer-top-row">
          {/* Column 1: Company Profile */}
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: '#052020',
                  border: '2px solid #C89F5C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}
              >
                <Image 
                  src="/images/logo.jpeg" 
                  alt="JayShree Caters" 
                  width={44} 
                  height={44} 
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div>
                <h3 style={{ color: '#E4C590', fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800 }}>
                  Jayshree Caters
                </h3>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Event Management • Since 1960s
                </div>
              </div>
            </div>

            <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: '1.7', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              Jayshree Caters &amp; Event Management is built on a proud four-generation legacy in the hotel and food-service industry since the 1960s. Over 40+ years of catering and 1000+ events successfully served across North Tamil Nadu.
            </p>
          </div>

          {/* Column 2: Our Services */}
          <div className="footer-col">
            <h4>Catering Services</h4>
            <ul>
              {allServices.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <a href={pathname === '/' ? '#services' : '/#services'} onClick={(e) => handleNavClick(e, 'services')}>{service.title}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/" onClick={handleHomeClick}>Home</Link></li>
              <li><a href={pathname === '/' ? '#story' : '/#story'} onClick={(e) => handleNavClick(e, 'story')}>About Us</a></li>
              <li><a href={pathname === '/' ? '#services' : '/#services'} onClick={(e) => handleNavClick(e, 'services')}>Services</a></li>
              <li><Link href="/menu" onClick={() => markIntroEntered()} style={{ color: '#E4C590', fontWeight: 700 }}>Master Menu</Link></li>
              <li><a href={pathname === '/' ? '#banana-leaf' : '/#banana-leaf'} onClick={(e) => handleNavClick(e, 'banana-leaf')}>Banana Leaf Feast</a></li>
              <li><a href={pathname === '/' ? '#reviews' : '/#reviews'} onClick={(e) => handleNavClick(e, 'reviews')}>Reviews</a></li>
              <li><a href={pathname === '/' ? '#reserve' : '/#reserve'} onClick={(e) => handleNavClick(e, 'reserve')}>Book Your Function</a></li>
            </ul>
          </div>

          {/* Column 4: Visit Us & Location Map */}
          <div className="footer-col">
            <h4>Visit Us</h4>
            
            {/* Google Map Preview - KV Kuppam */}
            <div
              style={{
                width: '100%',
                borderRadius: '10px',
                overflow: 'hidden',
                border: '1.5px solid rgba(200, 159, 92, 0.35)',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.35)',
                background: '#052020',
              }}
            >
              <iframe
                title="JayShree Caters - KV Kuppam Location"
                src="https://maps.google.com/maps?q=KV%20Kuppam%2C%20Tamil%20Nadu&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="170"
                style={{ border: 0, display: 'block', width: '100%' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.5rem 0.75rem',
                  background: 'rgba(5, 32, 32, 0.95)',
                  borderTop: '1px solid rgba(200, 159, 92, 0.25)',
                  fontSize: '0.78rem',
                  color: '#E4C590',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600 }}>
                  <MapPin size={14} color="#E4C590" />
                  <span>K. V. Kuppam, Tamil Nadu</span>
                </span>
                <a
                  href="https://maps.google.com/?q=KV+Kuppam,+Tamil+Nadu"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.45rem',
                    borderRadius: '4px',
                    background: 'rgba(200, 159, 92, 0.2)',
                    border: '1px solid rgba(200, 159, 92, 0.4)',
                  }}
                >
                  View ↗
                </a>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(228,197,144,0.2)' }}>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Booking Request
              </div>
              <a
                href={`tel:${siteConfig.phone}`}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: '#E4C590',
                  display: 'block',
                  marginTop: '0.25rem',
                }}
              >
                {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.legalName}. All Rights Reserved.
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#E4C590' }}>
            <span>Four Generations of Trust • Decades of Taste • A Legacy of Hospitality</span>
            <Heart size={14} fill="#E4C590" color="#E4C590" />
          </p>
        </div>
      </div>
    </footer>
  );
};
