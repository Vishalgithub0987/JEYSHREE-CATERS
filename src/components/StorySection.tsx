'use client';

import React from 'react';
import Image from 'next/image';
import {
  History,
  Sparkles,
  Award,
  Users,
  CalendarCheck,
  CheckCircle2,
  HeartHandshake,
  PhoneCall,
  ArrowRight
} from 'lucide-react';
import { siteConfig } from '@/data/site';

export const StorySection: React.FC = () => {
  return (
    <section id="story" className="story-section">
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Section Header: About Us */}
        <div className="story-header" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span className="badge-icon1">
              <Image
                src="/images/resource/badge-gold.svg"
                alt="Heritage Badge"
                width={32}
                height={32}
              />
            </span>
            <span style={{
              color: '#075B35',
              fontWeight: 800,
              fontSize: '0.9rem',
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}>
              About Us
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
            <Image
              src="/images/icons/separator.svg"
              alt="Separator"
              width={120}
              height={24}
            />
          </div>

          <h2 style={{
            color: '#052020',
            fontSize: 'clamp(2rem, 3.8vw, 2.85rem)',
            fontWeight: 800,
            lineHeight: 1.25,
            maxWidth: '900px',
            margin: '0 auto 1.25rem'
          }}>
            A Legacy of Taste, Tradition &amp; Hospitality Since the 1960s
          </h2>

          <p style={{
            color: '#075B35',
            fontSize: '1.15rem',
            fontWeight: 600,
            maxWidth: '850px',
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            Jayshree Caters &amp; Event Management is built on a proud four-generation legacy in the hotel and food-service industry, carrying forward a family tradition that began in the 1960s.
          </p>
        </div>

        {/* Row 1: The Story & Visual Collage */}
        <div className="row" style={{ alignItems: 'center', marginBottom: '4.5rem' }}>
          {/* Text Column */}
          <div className="col-text">
            <div className="title-box">
              <div className="subtitle" style={{ textAlign: 'left', color: '#C89F5C', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
                Four Generations of Trust • Decades of Taste
              </div>
              <h3 style={{ textAlign: 'left', color: '#052020', fontSize: '1.85rem', fontWeight: 800, marginTop: '0.5rem', marginBottom: '1.25rem' }}>
                From Humble Street Vending to Grand Celebrations
              </h3>

              <div className="text" style={{ textAlign: 'left', color: '#4A5568', lineHeight: 1.8, fontSize: '1.02rem' }}>
                <p style={{ marginBottom: '1.15rem' }}>
                  Our story is one of hard work, family values, tradition, and continuous growth. What started as an earnest dream to serve wholesome food has evolved across sixty years and four generations into one of North Tamil Nadu&apos;s most cherished names in authentic catering and grand event management.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  Today, under the dedicated stewardship of <strong>Mr. P. Amarnath</strong>, we seamlessly unite deep-rooted ancestral recipes, pure ingredients like wood-pressed oils and aromatic cow ghee, uncompromising hygiene standards, and full-scale modern wedding orchestration.
                </p>
              </div>

              {/* Tagline Callout */}
              <div style={{
                background: 'linear-gradient(135deg, #FAF7EE 0%, #F5EEDB 100%)',
                borderLeft: '4px solid #C89F5C',
                padding: '1.15rem 1.5rem',
                borderRadius: '0 10px 10px 0',
                marginBottom: '2rem'
              }}>
                <div style={{ fontStyle: 'italic', fontWeight: 700, color: '#075B35', fontSize: '1.05rem', lineHeight: 1.6 }}>
                  &ldquo;Four Generations of Trust. Decades of Taste. A Legacy of Hospitality.&rdquo;
                </div>
                <div style={{ fontSize: '0.85rem', color: '#718096', marginTop: '0.35rem', fontWeight: 600 }}>
                  — Jayshree Caters &amp; Event Management
                </div>
              </div>

              <div>
                <a href="#timeline" className="theme-btn btn-style-two">
                  <span>Explore Our 4-Generation Journey</span>
                  <ArrowRight size={16} style={{ marginLeft: '0.45rem' }} />
                </a>
              </div>
            </div>
          </div>

          {/* Image Column */}
          <div className="col-image">
            <div className="image-wrapper" style={{ position: 'relative' }}>
              <div className="round-stamp">
                <Image
                  src="/images/resource/stamp-since.svg"
                  alt="Since 1960s - 4 Generations Stamp"
                  width={115}
                  height={115}
                />
              </div>
              <div className="parallax-frame">
                <Image
                  src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80"
                  alt="A Legacy of Taste, Tradition & Hospitality Since the 1960s"
                  width={600}
                  height={480}
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Four-Generation Timeline Grid */}
        <div id="timeline" style={{ marginBottom: '5rem', paddingTop: '1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.75rem' }}>
            <span style={{
              color: '#C89F5C',
              fontWeight: 800,
              fontSize: '0.85rem',
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}>
              Ancestral Roots
            </span>
            <h3 style={{
              color: '#052020',
              fontSize: '2.15rem',
              fontWeight: 800,
              marginTop: '0.35rem'
            }}>
              Our Four-Generation Journey
            </h3>
            <p style={{ color: '#718096', maxWidth: '650px', margin: '0.5rem auto 0' }}>
              Passed with pride and devotion through each generation to bring authentic hospitality to your celebrations.
            </p>
          </div>

          <div className="generation-grid">
            {/* Gen 1 */}
            <div className="generation-card">
              <div className="gen-badge-wrap">
                <span className="gen-era">1960s</span>
                <span className="gen-num">1st Generation</span>
              </div>
              <div className="gen-title">Late Thiru K. Narayasamy</div>
              <div className="gen-subtitle">Great-Grandfather • The Humble Beginning</div>
              <p className="gen-desc">
                Our journey started with Late Thiru K. Narayasamy, our great-grandfather along with his wife Late Thirumathi N. Chinnamma, who began his humble journey by selling idlis as a street vendor in the 1960s. With hard work, dedication and a passion for serving good food, the family gradually grew its presence in the hospitality business.
              </p>
            </div>

            {/* Gen 2 */}
            <div className="generation-card">
              <div className="gen-badge-wrap">
                <span className="gen-era">Late 1980s</span>
                <span className="gen-num">2nd Generation</span>
              </div>
              <div className="gen-title">Thiru N. Murugesan &amp; Smt. Lakshmi</div>
              <div className="gen-subtitle">Grandparents • The Foundation</div>
              <p className="gen-desc">
                In the late 1980s, the next generation, Thiru N. Murugesan and Smt. Lakshmi, continued this journey by starting a small hut hotel in Kanguppam. What began as a modest establishment became the foundation for the family&apos;s continued journey in the food and hospitality industry.
              </p>
            </div>

            {/* Gen 3 */}
            <div className="generation-card">
              <div className="gen-badge-wrap">
                <span className="gen-era">1990s – 2000</span>
                <span className="gen-num">3rd Generation</span>
              </div>
              <div className="gen-title">Late Thiru M. Pandu</div>
              <div className="gen-subtitle">Father • Experience &amp; Expansion</div>
              <p className="gen-desc">
                Our father, Late Thiru M. Pandu, took the family legacy forward. He moved to Bangalore, where he gained valuable experience by working in the hotel industry for nearly 15 years. Even before establishing his own hotel, he had already entered the catering business in the 1990s. In 2000, he returned to K. V. Kuppam and started his own hotel, further strengthening the family&apos;s presence in the hospitality industry.
              </p>
            </div>

            {/* Gen 4 */}
            <div className="generation-card active-card">
              <div className="gen-badge-wrap">
                <span className="gen-era">Present Day</span>
                <span className="gen-num" style={{ background: '#C89F5C', color: '#052020' }}>4th Generation</span>
              </div>
              <div className="gen-title">Mr. P. Amarnath</div>
              <div className="gen-subtitle">Son of Late Thiru M. Pandu • Current Leadership</div>
              <p className="gen-desc">
                Today, Mr. P. Amarnath, son of Late Thiru M. Pandu, and Amarnath's wife Mrs. A. Sangeetha Amarnath, proudly carries forward this family legacy. With deep-rooted experience passed down through four generations, Jayshree Caters &amp; Event Management continues to combine traditional taste, quality food, professional service and modern event management.
              </p>
            </div>
          </div>
        </div>

        {/* Row 3: Our Experience Section */}
        <div style={{
          backgroundColor: '#FAF7EE',
          borderRadius: '16px',
          border: '1.5px solid rgba(200, 159, 92, 0.4)',
          padding: '3rem 2.5rem',
          marginBottom: '5rem',
          boxShadow: '0 10px 30px rgba(5, 32, 32, 0.04)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{
              color: '#075B35',
              fontWeight: 800,
              fontSize: '0.85rem',
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}>
              Proven Excellence
            </span>
            <h3 style={{
              color: '#052020',
              fontSize: '2.1rem',
              fontWeight: 800,
              marginTop: '0.35rem'
            }}>
              Our Experience
            </h3>
            <p style={{ color: '#4A5568', maxWidth: '600px', margin: '0.4rem auto 0' }}>
              Built upon decades of hands-on culinary dedication and event mastery.
            </p>
          </div>

          <div className="experience-grid">
            <div className="experience-item">
              <div className="exp-icon-box">
                <Award size={26} color="#075B35" />
              </div>
              <div>
                <h4 className="exp-heading">4 Generations</h4>
                <p className="exp-text">Family legacy in the hotel and food-service industry</p>
              </div>
            </div>

            <div className="experience-item">
              <div className="exp-icon-box">
                <History size={26} color="#075B35" />
              </div>
              <div>
                <h4 className="exp-heading">40+ Years</h4>
                <p className="exp-text">Of professional catering and banquet experience</p>
              </div>
            </div>

            <div className="experience-item">
              <div className="exp-icon-box">
                <CalendarCheck size={26} color="#075B35" />
              </div>
              <div>
                <h4 className="exp-heading">1000+ Events</h4>
                <p className="exp-text">Successfully served across North Tamil Nadu</p>
              </div>
            </div>

            <div className="experience-item">
              <div className="exp-icon-box">
                <Sparkles size={26} color="#075B35" />
              </div>
              <div>
                <h4 className="exp-heading">Decades of Mastery</h4>
                <p className="exp-text">Catering &amp; food-service experience spanning decades</p>
              </div>
            </div>

            <div className="experience-item exp-item-full">
              <div className="exp-icon-box">
                <HeartHandshake size={26} color="#075B35" />
              </div>
              <div>
                <h4 className="exp-heading">Full-Scale Event Management</h4>
                <p className="exp-text">Professional event management services for weddings, receptions, family functions, corporate events and celebrations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Row 4: Our Commitment & Leadership Message */}
        <div className="row leadership-row" style={{ alignItems: 'center' }}>
          {/* Image Column: Founder Photo & Tribute */}
          <div className="col-image">
            <div
              className="founder-photo-card"
              style={{
                maxWidth: '430px',
                margin: '0 auto',
                borderRadius: '16px',
                border: '2px solid #C89F5C',
                backgroundColor: '#FAF7EE',
                overflow: 'hidden',
                boxShadow: '0 16px 36px rgba(5, 32, 32, 0.12)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  backgroundColor: '#FAF7EE',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '1.25rem 1.25rem 0.5rem'
                }}
              >
                <Image
                  src="/images/founder.jpeg"
                  alt="Thiru M. Pandu - Founder of Jayshree Caters"
                  width={400}
                  height={480}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '440px',
                    objectFit: 'contain',
                    borderRadius: '10px',
                    display: 'block'
                  }}
                  priority
                />
              </div>

              {/* Founder Information Plate */}
              <div
                style={{
                  background: 'linear-gradient(180deg, #052020 0%, #075B35 100%)',
                  padding: '1.25rem 1.5rem',
                  borderTop: '2px solid #C89F5C',
                  textAlign: 'center',
                  color: '#FAF7EE'
                }}
              >
                <div
                  style={{
                    color: '#E4C590',
                    fontWeight: 800,
                    fontSize: '1.35rem',
                    fontFamily: 'var(--font-heading)',
                    letterSpacing: '0.5px',
                    lineHeight: 1.2
                  }}
                >
                  Thiru M. Pandu
                </div>
                <div
                  style={{
                    fontSize: '0.88rem',
                    color: '#FFFFFF',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    fontWeight: 700,
                    marginTop: '0.35rem'
                  }}
                >
                  Founder of Jayshree Caters
                </div>
                <div
                  style={{
                    fontSize: '0.78rem',
                    color: 'rgba(228, 197, 144, 0.9)',
                    marginTop: '0.35rem',
                    lineHeight: 1.4
                  }}
                >
                  3rd Generation Visionary • Pioneered Catering in 1990s &amp; K. V. Kuppam Hotel in 2000
                </div>
              </div>
            </div>
          </div>

          {/* Text Column: Our Commitment */}
          <div className="col-text">
            <div className="title-box">
              <span className="badge-icon1">
                <Image
                  src="/images/resource/badge-gold.svg"
                  alt="Commitment Badge"
                  width={38}
                  height={38}
                />
              </span>
              <div className="subtitle" style={{ textAlign: 'left', color: '#075B35' }}>
                <span>Our Commitment</span>
              </div>
              <div className="pattern-image" style={{ justifyContent: 'flex-start' }}>
                <Image
                  src="/images/icons/separator.svg"
                  alt="Separator"
                  width={110}
                  height={22}
                />
              </div>
              <h2 style={{ textAlign: 'left', color: '#052020', fontSize: '2.1rem' }}>
                Every Event is a Sacred Opportunity
              </h2>
              <div className="text" style={{ textAlign: 'left', marginTop: '1.25rem' }}>
                <p style={{ lineHeight: '1.8', marginBottom: '1.25rem', fontSize: '1.05rem', color: '#4A5568' }}>
                  At Jayshree Caters &amp; Event Management, every event is more than just a function — it is an opportunity to create memorable experiences through delicious food, warm hospitality and dependable service.
                </p>
                <p style={{ lineHeight: '1.8', marginBottom: '1.5rem', fontSize: '1.05rem', color: '#4A5568' }}>
                  From our great-grandfather&apos;s humble street-vending journey to serving thousands of guests across North Tamil Nadu, our story is one of hard work, family values, tradition and continuous growth.
                </p>
              </div>

              {/* Call CTA Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.75rem', alignItems: 'center' }}>
                <a
                  href="#reserve"
                  className="theme-btn btn-style-one"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('reserve');
                    if (el) {
                      if ((window as any).__lenis) {
                        (window as any).__lenis.scrollTo(el, { offset: -70, duration: 1.2 });
                      } else {
                        el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                >
                  <PhoneCall size={16} style={{ marginRight: '0.45rem' }} />
                  <span>Book Your Event</span>
                </a>
                <a href={`tel:${siteConfig.phone}`} style={{
                  color: '#075B35',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.98rem'
                }}>
                  <span>Call Us: {siteConfig.phoneDisplay}</span>
                </a>
              </div>

              {/* Signature & Tagline */}
              <div style={{ marginTop: '2.25rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(200, 159, 92, 0.3)' }}>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  color: '#075B35',
                  letterSpacing: '0.5px'
                }}>
                  Jayshree Caters &amp; Event Management
                </div>
                <div style={{
                  color: '#C89F5C',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  marginTop: '0.2rem'
                }}>
                  Four Generations of Trust. Decades of Taste. A Legacy of Hospitality.
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Embedded Component Styles */}
      <style jsx>{`
        .generation-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 1.5rem;
        }
        @media (min-width: 640px) {
          .generation-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .generation-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .generation-card {
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 12px;
          padding: 1.75rem 1.5rem;
          transition: all 0.35s ease;
          display: flex;
          flex-direction: column;
          position: relative;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
        }
        .generation-card:hover {
          transform: translateY(-5px);
          border-color: #C89F5C;
          box-shadow: 0 12px 25px rgba(200, 159, 92, 0.15);
        }
        .generation-card.active-card {
          border-color: #075B35;
          background: linear-gradient(180deg, #FFFFFF 0%, #F5FBF7 100%);
          box-shadow: 0 6px 20px rgba(7, 91, 53, 0.08);
        }
        .gen-badge-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.15rem;
        }
        .gen-era {
          font-size: 0.8rem;
          font-weight: 800;
          color: #C89F5C;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .gen-num {
          font-size: 0.72rem;
          font-weight: 700;
          background: #075B35;
          color: #FFFFFF;
          padding: 0.2rem 0.6rem;
          border-radius: 999px;
          letter-spacing: 0.5px;
        }
        .gen-title {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 800;
          color: #052020;
          line-height: 1.35;
          margin-bottom: 0.35rem;
        }
        .gen-subtitle {
          font-size: 0.8rem;
          font-weight: 700;
          color: #075B35;
          margin-bottom: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .gen-desc {
          font-size: 0.92rem;
          line-height: 1.65;
          color: #4A5568;
          flex-grow: 1;
        }

        .experience-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 1.5rem;
        }
        @media (min-width: 640px) {
          .experience-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .exp-item-full {
            grid-column: span 2;
          }
        }
        @media (min-width: 1024px) {
          .experience-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .experience-item {
          background: #FFFFFF;
          border: 1px solid rgba(200, 159, 92, 0.25);
          border-radius: 10px;
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          transition: transform 0.25s ease;
        }
        .experience-item:hover {
          transform: translateY(-3px);
          border-color: #C89F5C;
        }
        .exp-icon-box {
          background: #FAF7EE;
          border: 1px solid #C89F5C;
          width: 48px;
          height: 48px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .exp-heading {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: #052020;
          margin-bottom: 0.25rem;
        }
        .exp-text {
          font-size: 0.92rem;
          color: #4A5568;
          line-height: 1.55;
          margin: 0;
        }

        .founder-photo-card {
          transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .founder-photo-card:hover {
          transform: translateY(-5px);
          border-color: #E4C590 !important;
          box-shadow: 0 22px 45px rgba(5, 32, 32, 0.18) !important;
        }
        .founder-photo-card img {
          max-height: 440px !important;
          width: 100% !important;
          height: auto !important;
          object-fit: contain !important;
        }
      `}</style>
    </section>
  );
};
