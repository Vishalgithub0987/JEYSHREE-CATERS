'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { masterMenuCategories, menuCategories, menuItems } from '@/data/menu';
import { nonVegMasterMenuCategories, nonVegMenuCategories, nonVegMenuItems } from '@/data/nonVegMenu';
import { FoodCard } from './FoodCard';
import { MenuDietToggle } from './MenuDietToggle';
import { useSelection } from '@/context/SelectionContext';
import { 
  Search, 
  Sparkles, 
  UtensilsCrossed, 
  RotateCcw, 
  BookOpen, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { DietaryType } from '@/types';

export const SignatureMenu: React.FC = () => {
  const [diet, setDiet] = useState<DietaryType>('veg');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { totalCount, setIsDrawerOpen, openCustomModal } = useSelection();

  // Active datasets based on selected diet
  const activeMasterCategories = diet === 'veg' ? masterMenuCategories : nonVegMasterMenuCategories;
  const activeMenuCategories = diet === 'veg' ? menuCategories : nonVegMenuCategories;
  const themeColor = diet === 'veg' ? '#075B35' : '#B91C1C';
  const themeBorder = diet === 'veg' ? 'rgba(7, 91, 53, 0.25)' : 'rgba(185, 28, 28, 0.25)';

  const handleDietChange = (newDiet: DietaryType) => {
    setDiet(newDiet);
    setSelectedCategory('All');
    setSearchQuery('');
  };

  // Filter and group by Category -> Subcategory -> Items
  const filteredHierarchy = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return activeMasterCategories
      .filter((cat) => {
        if (selectedCategory === 'All') return true;
        return cat.name === selectedCategory;
      })
      .map((cat) => {
        // Filter subcategories and items within
        const filteredSubs = cat.subcategories
          .map((sub) => {
            const filteredItems = sub.items.filter((item) => {
              if (!q) return true;
              return (
                item.name.toLowerCase().includes(q) ||
                item.englishName.toLowerCase().includes(q) ||
                item.tamilName.includes(q) ||
                item.description.toLowerCase().includes(q) ||
                item.ingredients.toLowerCase().includes(q)
              );
            });
            return {
              ...sub,
              items: filteredItems,
            };
          })
          .filter((sub) => sub.items.length > 0);

        return {
          ...cat,
          subcategories: filteredSubs,
        };
      })
      .filter((cat) => cat.subcategories.length > 0);
  }, [activeMasterCategories, selectedCategory, searchQuery]);

  // Total matching items count
  const totalMatchingItems = useMemo(() => {
    return filteredHierarchy.reduce((acc, cat) => {
      return acc + cat.subcategories.reduce((subAcc, sub) => subAcc + sub.items.length, 0);
    }, 0);
  }, [filteredHierarchy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
  };

  return (
    <section id="menu" className="section-padding" style={{ backgroundColor: '#FFFDF7' }}>
      <div className="container" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 1.25rem' }}>
        
        {/* Section Header */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="eyebrow eyebrow-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
            <Sparkles size={14} color="#B88916" />
            <span style={{ color: themeColor, fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
              JayShree Caters Master Menu
            </span>
          </div>
          <h2 className="section-title" style={{ color: '#052020', fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, marginBottom: '0.75rem' }}>
            Explore Our Complete Master Menu
          </h2>
          <p className="section-subtitle" style={{ color: '#4A5568', maxWidth: '820px', margin: '0 auto 1.5rem', lineHeight: 1.6, fontSize: '1.02rem' }}>
            Browse our authentic culinary categories. Select dishes directly to curate your personalized event menu and receive an instant quotation.
          </p>

          {/* Premium Veg / Non-Veg Toggle Switch */}
          <MenuDietToggle
            currentDiet={diet}
            onChange={handleDietChange}
            vegCount={menuItems.length}
            nonVegCount={nonVegMenuItems.length}
          />

          {/* Quick link and Custom Item option */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.85rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => openCustomModal(diet)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.65rem 1.35rem',
                backgroundColor: '#FFFFFF',
                border: '1.5px dashed #C89F5C',
                borderRadius: '999px',
                color: themeColor,
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(200, 159, 92, 0.12)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(200, 159, 92, 0.22)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(200, 159, 92, 0.12)';
              }}
            >
              <Sparkles size={16} color="#B88916" />
              <span>Can’t find your dish? Add a custom item +</span>
            </button>

            <Link
              href={`/menu?diet=${diet}`}
              className="theme-btn btn-style-two"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.4rem',
                fontSize: '0.9rem',
                borderRadius: '999px',
                border: '1.5px solid #C89F5C',
                color: themeColor,
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              <BookOpen size={16} />
              <span>View Full {diet === 'veg' ? 'Veg' : 'Non-Veg'} Menu on Dedicated Page</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>

        {/* Filter & Search Bar Container */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '1.5rem',
            padding: '1.5rem',
            boxShadow: '0 8px 30px rgba(5, 32, 32, 0.06)',
            border: '1px solid rgba(200, 159, 92, 0.3)',
            marginBottom: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          {/* Top row: Search input */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
          >
            {/* Search Input */}
            <div style={{ position: 'relative', flex: '1 1 320px' }}>
              <Search
                size={18}
                color="#7c9989"
                style={{
                  position: 'absolute',
                  left: '1.15rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              />
              <input
                type="text"
                placeholder={
                  diet === 'veg'
                    ? 'Search Veg menu in English or Tamil (e.g. Idli, பன்னீர், Payasam, Soup, Dosa)...'
                    : 'Search Non-Veg menu (e.g. Briyani, 65, Pepper Chicken, Vanjaram, Mutton)...'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem 0.8rem 3rem',
                  borderRadius: '9999px',
                  border: `1.5px solid ${themeBorder}`,
                  backgroundColor: '#FFFDF7',
                  fontSize: '0.92rem',
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--green-dark)',
                  outline: 'none',
                }}
              />
            </div>

            {/* Quick Stats & Reset */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.9rem', color: '#4A5568', fontWeight: 600 }}>
                Showing <strong>{totalMatchingItems}</strong> items
              </span>
              {(selectedCategory !== 'All' || searchQuery) && (
                <button
                  type="button"
                  onClick={resetFilters}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#B88916',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    cursor: 'pointer',
                  }}
                >
                  <RotateCcw size={13} />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs Scroll Bar */}
          <div
            style={{
              display: 'flex',
              gap: '0.6rem',
              overflowX: 'auto',
              paddingBottom: '0.4rem',
              scrollbarWidth: 'thin',
            }}
          >
            {activeMenuCategories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    padding: '0.55rem 1.25rem',
                    borderRadius: '9999px',
                    border: active ? `1.5px solid ${themeColor}` : '1px solid rgba(200, 159, 92, 0.35)',
                    backgroundColor: active ? themeColor : '#FFFDF7',
                    color: active ? '#FFFDF7' : '#052020',
                    fontSize: '0.85rem',
                    fontWeight: active ? 700 : 600,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: active ? `0 4px 12px ${diet === 'veg' ? 'rgba(7, 91, 53, 0.2)' : 'rgba(185, 28, 28, 0.2)'}` : 'none',
                  }}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Selection Review Floating Banner Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2.5rem',
            padding: '1rem 1.5rem',
            backgroundColor: '#FAF7EE',
            borderRadius: '12px',
            border: '1.5px solid rgba(200, 159, 92, 0.4)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: themeColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFDF7',
              }}
            >
              <UtensilsCrossed size={18} />
            </div>
            <div>
              <div style={{ fontWeight: 800, color: '#052020', fontSize: '0.98rem' }}>
                Your Custom Menu Selection: {totalCount} Items Chosen
              </div>
              <div style={{ fontSize: '0.82rem', color: '#718096' }}>
                {totalCount === 0
                  ? 'Click "Add" on any item below to build your feast.'
                  : 'Ready to review and get instant pricing on WhatsApp!'}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="theme-btn btn-style-one"
            style={{
              padding: '0.5rem 1.25rem',
              fontSize: '0.85rem',
              borderRadius: '999px',
              cursor: 'pointer',
            }}
          >
            <span>Review Selection ({totalCount})</span>
            <ArrowRight size={14} style={{ marginLeft: '0.35rem' }} />
          </button>
        </div>

        {/* Grouped Category Listing */}
        {filteredHierarchy.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1.5px dashed #C89F5C',
            }}
          >
            <UtensilsCrossed size={48} color="#B88916" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ color: '#052020', fontSize: '1.35rem', fontWeight: 800 }}>
              No dishes found matching your search
            </h3>
            <p style={{ color: '#718096', margin: '0.5rem 0 1.5rem', fontSize: '0.92rem' }}>
              Can&apos;t find your desired delicacy in the list? You can easily add it as a custom item for your feast.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => openCustomModal(diet)}
                className="theme-btn btn-style-one"
                style={{
                  backgroundColor: themeColor,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1.5rem',
                  borderRadius: '9999px',
                }}
              >
                <Sparkles size={16} color="#FFFFFF" />
                <span>Add Custom Item +</span>
              </button>
              <button
                type="button"
                onClick={resetFilters}
                className="theme-btn btn-style-two"
                style={{ padding: '0.6rem 1.5rem', borderRadius: '9999px' }}
              >
                <span>Show All Dishes</span>
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            {filteredHierarchy.map((category) => (
              <div key={category.id} id={category.id} style={{ scrollMarginTop: '100px' }}>
                {/* Category Header Banner */}
                <div
                  style={{
                    backgroundColor: '#FAF7EE',
                    borderLeft: `5px solid ${themeColor}`,
                    borderRight: '1px solid rgba(200, 159, 92, 0.3)',
                    borderTop: '1px solid rgba(200, 159, 92, 0.3)',
                    borderBottom: '1px solid rgba(200, 159, 92, 0.3)',
                    padding: '1.25rem 1.75rem',
                    borderRadius: '0 12px 12px 0',
                    marginBottom: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)',
                        color: '#052020',
                        fontWeight: 800,
                        margin: 0,
                      }}
                    >
                      {category.name}
                    </h3>
                    {category.description && (
                      <p style={{ color: '#4A5568', fontSize: '0.9rem', margin: '0.25rem 0 0' }}>
                        {category.description}
                      </p>
                    )}
                  </div>

                  <span
                    style={{
                      backgroundColor: themeColor,
                      color: '#FFFDF7',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '999px',
                    }}
                  >
                    {category.subcategories.reduce((acc, sub) => acc + sub.items.length, 0)} Items
                  </span>
                </div>

                {/* Subcategories */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                  {category.subcategories.map((sub) => (
                    <div
                      key={sub.id}
                      style={{
                        backgroundColor: '#FFFFFF',
                        padding: '1.75rem',
                        borderRadius: '16px',
                        border: '1px solid #E2E8F0',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderBottom: '1.5px solid #F0F4F2',
                          paddingBottom: '0.75rem',
                          marginBottom: '1.5rem',
                        }}
                      >
                        <h4
                          style={{
                            margin: 0,
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1.2rem',
                            fontWeight: 800,
                            color: themeColor,
                          }}
                        >
                          {sub.name}
                        </h4>
                        <span style={{ fontSize: '0.82rem', color: '#718096', fontWeight: 600 }}>
                          {sub.items.length} choices
                        </span>
                      </div>

                      {/* Food Cards Grid */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                          gap: '1.5rem',
                        }}
                      >
                        {sub.items.map((item) => (
                          <FoodCard key={item.id} food={item} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
