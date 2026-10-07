'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelection } from '@/context/SelectionContext';
import { MenuDietToggle } from './MenuDietToggle';
import { Sparkles, Utensils } from 'lucide-react';
import { DietaryType } from '@/types';

export const MenuSneakPeekSection: React.FC = () => {
  const [diet, setDiet] = useState<DietaryType>('veg');
  const { setIsDrawerOpen } = useSelection();

  return (
    <section id="menu" className="menu-section">
      <div className="container">
        {/* Title Box */}
        <div className="title-box centered">
          <div className="subtitle">
            <span>Signature Celebrations</span>
          </div>
          <div className="pattern-image">
            <Image 
              src="/images/icons/separator.svg" 
              alt="Separator" 
              width={120} 
              height={24} 
            />
          </div>
          <h2>Delectable Dishes &amp; Feasts</h2>
          <div className="text" style={{ maxWidth: '820px', margin: '0 auto 1.75rem' }}>
            A sneak peek of the extensive culinary variety offered by JayShree Catering Services. We provide authentic South Indian vegetarian feasts and rich non-vegetarian celebrations, prepared in dedicated separate kitchens with specialized master chefs.
          </div>

          {/* Veg / Non-Veg Switcher */}
          <MenuDietToggle
            currentDiet={diet}
            onChange={setDiet}
            vegCount={150}
            nonVegCount={72}
          />
        </div>

        {/* 3 Showcase Visual News Blocks */}
        {diet === 'veg' ? (
          <div className="menu-cards-grid">
            {/* Veg Card 1 */}
            <div className="dish-news-block">
              <div className="image-box">
                <Image 
                  src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80" 
                  alt="Traditional South Indian Kalyana Virundhu" 
                  width={400} 
                  height={260} 
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="content-wrap">
                <h4>Royal Kalyana Virundhu</h4>
                <p>Authentic plantain leaf feast featuring 24+ courses of Arusuvai dishes, sambar, rasam, and vatha kuzhambu.</p>
              </div>
            </div>

            {/* Veg Card 2 */}
            <div className="dish-news-block">
              <div className="image-box">
                <Image 
                  src="https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80" 
                  alt="Traditional South Indian Sweets & Payasam" 
                  width={400} 
                  height={260} 
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="content-wrap">
                <h4>Artisanal Sweets &amp; Payasams</h4>
                <p>Rich Elaneer Payasam, melt-in-mouth Ghee Mysore Pak, hot fresh Jangiris, and pure cow ghee Halwas.</p>
              </div>
            </div>

            {/* Veg Card 3 */}
            <div className="dish-news-block">
              <div className="image-box">
                <Image 
                  src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80" 
                  alt="Live Interactive Tiffin & Dosa Counters" 
                  width={400} 
                  height={260} 
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="content-wrap">
                <h4>Live Dosa &amp; Tiffin Stations</h4>
                <p>Piping hot Ghee Roast Podi Dosas, crispy Medu Vadas, fluffy Idlis, and freshly brewed Kumbakonam Degree Coffee.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="menu-cards-grid">
            {/* Non-Veg Card 1 */}
            <div className="dish-news-block">
              <div className="image-box">
                <Image 
                  src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80" 
                  alt="Celebration Dum Biryani Varieties" 
                  width={400} 
                  height={260} 
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="content-wrap">
                <h4 style={{ color: '#B91C1C' }}>Ambur &amp; Bhai Style Dum Biryanis</h4>
                <p>Legendary Seeraga Samba firewood dum biryanis layered with tender mutton &amp; chicken, served with brinjal dalcha &amp; raita.</p>
              </div>
            </div>

            {/* Non-Veg Card 2 */}
            <div className="dish-news-block">
              <div className="image-box">
                <Image 
                  src="https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80" 
                  alt="Fiery Chettinad Starters & Kababs" 
                  width={400} 
                  height={260} 
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="content-wrap">
                <h4 style={{ color: '#B91C1C' }}>Chettinad Starters &amp; Seafood Fries</h4>
                <p>Fiery Chicken 65, Tellicherry Pepper Chicken, crispy Vanjaram fish fry, coastal prawn ghee roast, and juicy tandoori kebabs.</p>
              </div>
            </div>

            {/* Non-Veg Card 3 */}
            <div className="dish-news-block">
              <div className="image-box">
                <Image 
                  src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80" 
                  alt="Clay Pot Meen Kulambu & Country Chicken Gravies" 
                  width={400} 
                  height={260} 
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="content-wrap">
                <h4 style={{ color: '#B91C1C' }}>Meen Kulambu &amp; Naatu Kozhi Gravies</h4>
                <p>Clay-pot slow-simmered fish curry with shallots and tamarind, organic country chicken gravies, and rich Mutton Paya broths.</p>
              </div>
            </div>
          </div>
        )}

        {/* Lower Link Box */}
        <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '2.5rem' }}>
          <button 
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="theme-btn btn-style-two"
            style={{ cursor: 'pointer' }}
          >
            <Utensils size={18} style={{ marginRight: '0.45rem' }} />
            <span>Customize Menu Selection</span>
          </button>
          <Link
            href={`/menu?diet=${diet}`}
            className="theme-btn btn-style-one"
            style={{
              background: diet === 'veg' ? undefined : 'linear-gradient(135deg, #B91C1C 0%, #DC2626 100%)',
              borderColor: diet === 'veg' ? undefined : '#B91C1C',
            }}
          >
            <Sparkles size={18} style={{ marginRight: '0.45rem' }} />
            <span>
              Explore Complete {diet === 'veg' ? 'Veg (150+ Dishes)' : 'Non-Veg (72 Master Dishes)'} Menu →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};
