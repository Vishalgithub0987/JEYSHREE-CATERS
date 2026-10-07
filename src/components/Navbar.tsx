'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { siteConfig } from '@/data/site';
import { allServices } from '@/data/services';
import { useSelection } from '@/context/SelectionContext';
import { 
  MapPin, 
  Phone, 
  UtensilsCrossed, 
  X 
} from 'lucide-react';
import { markIntroEntered } from '@/components/LandingIntro';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hiddenBarOpen, setHiddenBarOpen] = useState(false);
  const { totalCount, setIsDrawerOpen } = useSelection();
  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    markIntroEntered();
    setHiddenBarOpen(false);

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
    setHiddenBarOpen(false);

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 45);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (pathname === '/' && typeof window !== 'undefined' && window.location.hash) {
      const hashId = window.location.hash.replace('#', '');
      const el = document.getElementById(hashId);
      if (el) {
        setTimeout(() => {
          if ((window as any).__lenis) {
            (window as any).__lenis.scrollTo(el, { offset: -70 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      }
    }
  }, [pathname]);

  // Lock background scroll and pause Lenis when side drawer is open
  useEffect(() => {
    if (hiddenBarOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if ((window as any).__lenis) {
        (window as any).__lenis.stop();
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setHiddenBarOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        if ((window as any).__lenis) {
          (window as any).__lenis.start();
        }
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [hiddenBarOpen]);

  return (
    <>
      <header className={`main-header header-down ${isScrolled ? 'sticky' : ''}`}>
        <div className="header-top">
          <div className="auto-container">
            <div className="inner clearfix">
              <div className="top-left clearfix">
                <ul className="top-info clearfix">
                  <li>
                    <i className="icon far fa-map-marker-alt" style={{ display: 'inline-flex', alignItems: 'center', marginRight: '6px' }}>
                      <MapPin size={14} color="#E4C590" />
                    </i>
                    {siteConfig.legalName}
                  </li>
                </ul>
              </div>

              {/* Moving Motion Message in Between */}
              <div className="top-ticker-wrap">
                <div className="top-ticker-track">
                  <span className="ticker-text">
                    <span className="ticker-sparkle">✨</span> Four Generations of Trust • Decades of Taste • A Legacy of Hospitality Since the 1960s!
                  </span>
                  <span className="ticker-divider">•</span>
                  <span className="ticker-text">
                    <span className="ticker-sparkle">✨</span> Four Generations of Trust • Decades of Taste • A Legacy of Hospitality Since the 1960s!
                  </span>
                  <span className="ticker-divider">•</span>
                  <span className="ticker-text">
                    <span className="ticker-sparkle">✨</span> Four Generations of Trust • Decades of Taste • A Legacy of Hospitality Since the 1960s!
                  </span>
                  <span className="ticker-divider">•</span>
                </div>
              </div>

              <div className="top-right clearfix">
                <ul className="top-info clearfix">
                  <li>
                    <a href={`tel:${siteConfig.phone}`}>
                      <i className="icon far fa-phone" style={{ display: 'inline-flex', alignItems: 'center', marginRight: '6px' }}>
                        <Phone size={14} color="#E4C590" />
                      </i>
                      {siteConfig.phoneDisplay}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Header Upper */}
        <div className="header-upper">
          <div className="auto-container">
            {/* Main Box */}
            <div className="main-box clearfix">
              {/* Logo */}
              <div className="logo-box">
                <div className="logo">
                  <Link href="/" title={siteConfig.name}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          backgroundColor: '#052020',
                          border: '2px solid #C89F5C',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                          boxShadow: '0 4px 12px rgba(200, 159, 92, 0.3)',
                          flexShrink: 0
                        }}
                      >
                        <Image
                          src="/images/logo.jpeg"
                          alt="Best catering services in K V Kuppam"
                          title="Wedding catering services K V Kuppam"
                          width={48}
                          height={48}
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div className="logo-text-wrap">
                        <span className="logo-text-main">JayShree Caters</span>
                        <span className="logo-text-sub">Authentic Veg &amp; Non-Veg • K V Kuppam</span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="nav-box clearfix">
                {/* Nav Outer */}
                <div className="nav-outer clearfix">
                  <nav className="main-menu">
                    <ul className="navigation clearfix">
                      <li className={pathname === '/' ? 'current' : ''}>
                        <Link href="/" onClick={handleHomeClick}>Home</Link>
                      </li>
                      <li>
                        <a href={pathname === '/' ? '#story' : '/#story'} onClick={(e) => handleNavClick(e, 'story')}>About Us</a>
                      </li>
                      <li className="dropdown">
                        <a href={pathname === '/' ? '#services' : '/#services'} onClick={(e) => handleNavClick(e, 'services')}>Services</a>
                        <ul>
                          {allServices.map((service) => (
                            <li key={service.id}>
                              <a href={pathname === '/' ? '#services' : '/#services'} onClick={(e) => handleNavClick(e, 'services')}>{service.title}</a>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li>
                        <Link href="/menu" onClick={() => { markIntroEntered(); setHiddenBarOpen(false); }}>Master Menu</Link>
                      </li>
                      <li>
                        <a href={pathname === '/' ? '#reserve' : '/#reserve'} onClick={(e) => handleNavClick(e, 'reserve')}>Contact</a>
                      </li>
                    </ul>
                  </nav>
                  {/* Main Menu End */}
                </div>
                {/* Nav Outer End */}

                <div className="links-box clearfix" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  {/* Live Selection Pill */}
                  <button
                    onClick={() => setIsDrawerOpen(true)}
                    className="btn btn-secondary btn-sm"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      padding: '0.45rem 0.9rem',
                      borderRadius: '999px',
                      border: '1.5px solid #075B35',
                      background: totalCount > 0 ? '#F8F5EE' : '#FFFFFF',
                      cursor: 'pointer'
                    }}
                    title="Review selected menu dishes"
                    aria-label={`Selected ${totalCount} dishes`}
                  >
                    <UtensilsCrossed size={15} color="#075B35" />
                    <span style={{ fontWeight: 700, fontSize: '0.825rem', color: '#034226' }}>
                      Menu ({totalCount})
                    </span>
                  </button>

                  <div className="link info-toggler">
                    <button 
                      className="info-btn"
                      onClick={() => setHiddenBarOpen(true)}
                      aria-label="Open information bar"
                    >
                      <span className="hamburger">
                        <span className="top-bun"></span>
                        <span className="meat"></span>
                        <span className="bottom-bun"></span>
                      </span>
                    </button>
                  </div>
                </div>

                {/* Hidden Nav Toggler */}
                <div className="nav-toggler">
                  <button 
                    className="hidden-bar-opener"
                    onClick={() => setHiddenBarOpen(true)}
                    aria-label="Open mobile navigation"
                  >
                    <span className="hamburger">
                      <span className="top-bun"></span>
                      <span className="meat"></span>
                      <span className="bottom-bun"></span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Menu Backdrop */}
      <div 
        className={`menu-backdrop ${hiddenBarOpen ? 'active' : ''}`}
        onClick={() => setHiddenBarOpen(false)}
        onWheel={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onTouchMove={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      />

      {/* Slide-Out Hidden Navigation Bar / Side Drawer */}
      <section 
        className={`hidden-bar ${hiddenBarOpen ? 'active' : ''}`}
        data-lenis-prevent="true"
        onWheel={(e) => {
          e.stopPropagation();
        }}
        onTouchMove={(e) => {
          e.stopPropagation();
        }}
        style={{ overscrollBehavior: 'contain' }}
      >
        <div className="inner-box">
          <div 
            className="cross-icon"
            onClick={() => setHiddenBarOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </div>

          <div className="logo-box">
            <Link href="/" onClick={() => setHiddenBarOpen(false)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: '#08332A',
                    border: '2px solid #E4C590',
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
                  <div style={{ color: '#E4C590', fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800 }}>
                    JayShree Caters
                  </div>
                  <div style={{ color: '#FFFFFF', fontSize: '0.65rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    Authentic South Indian
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation Links inside Drawer */}
          <div className="side-menu">
            <ul>
              <li>
                <Link href="/" onClick={handleHomeClick}>Home</Link>
              </li>
              <li>
                <a href={pathname === '/' ? '#story' : '/#story'} onClick={(e) => handleNavClick(e, 'story')}>About Us</a>
              </li>
              <li>
                <a href={pathname === '/' ? '#services' : '/#services'} onClick={(e) => handleNavClick(e, 'services')}>Services</a>
              </li>
              <li>
                <Link href="/menu" onClick={() => { markIntroEntered(); setHiddenBarOpen(false); }} style={{ color: '#E4C590', fontWeight: 700 }}>
                  Master Menu
                </Link>
              </li>
              <li>
                <a href={pathname === '/' ? '#banana-leaf' : '/#banana-leaf'} onClick={(e) => handleNavClick(e, 'banana-leaf')}>Banana Leaf Virundhu</a>
              </li>
              <li>
                <a href={pathname === '/' ? '#why-us' : '/#why-us'} onClick={(e) => handleNavClick(e, 'why-us')}>Why Trust Us</a>
              </li>
              <li>
                <a href={pathname === '/' ? '#reviews' : '/#reviews'} onClick={(e) => handleNavClick(e, 'reviews')}>Reviews</a>
              </li>
              <li>
                <a href={pathname === '/' ? '#reserve' : '/#reserve'} onClick={(e) => handleNavClick(e, 'reserve')}>Contact</a>
              </li>
            </ul>
          </div>

          <h3>Visit Us</h3>
          <ul className="info">
            <li>
              {siteConfig.address.street}, <br />
              {siteConfig.address.area}, <br />
              K V Kuppam - {siteConfig.address.pincode}.
            </li>
            <li style={{ marginTop: '0.5rem' }}>Open: 9.00 am - 7.00 pm (Mon - Sun)</li>
          </ul>

          <div className="booking-info">
            <div className="bk-title">Booking request</div>
            <div className="bk-no">
              <a href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
