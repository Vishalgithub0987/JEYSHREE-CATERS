'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FoodModal } from '@/components/FoodModal';
import { SelectionReviewDrawer } from '@/components/SelectionReviewDrawer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { MenuDietToggle } from '@/components/MenuDietToggle';
import { masterMenuCategories, menuItems } from '@/data/menu';
import { nonVegMasterMenuCategories, nonVegMenuItems } from '@/data/nonVegMenu';
import { useSelection } from '@/context/SelectionContext';
import { 
  Search, 
  Sparkles, 
  UtensilsCrossed, 
  Check, 
  Plus, 
  Flame,
  ArrowRight
} from 'lucide-react';
import { DietaryType } from '@/types';

export default function MasterMenuPage() {
  const [diet, setDiet] = useState<DietaryType>('veg');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');
  const { toggleSelectFood, isSelected, totalCount, setIsDrawerOpen, setSelectedModalFood, openCustomModal } = useSelection();

  // Support reading ?diet=non-veg or ?diet=veg from URL query params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const paramDiet = params.get('diet');
      if (paramDiet === 'non-veg') {
        setDiet('non-veg');
      }
    }
  }, []);

  // Determine active dataset based on selected diet
  const currentCategories = diet === 'veg' ? masterMenuCategories : nonVegMasterMenuCategories;
  const currentTotalCount = diet === 'veg' ? menuItems.length : nonVegMenuItems.length;
  const themeColor = diet === 'veg' ? '#075B35' : '#B91C1C';
  const themeBorder = diet === 'veg' ? 'rgba(7, 91, 53, 0.25)' : 'rgba(185, 28, 28, 0.25)';
  const themeBgLight = diet === 'veg' ? '#F5FBF7' : '#FEF2F2';

  const handleDietChange = (newDiet: DietaryType) => {
    setDiet(newDiet);
    setActiveCategory('all');
    setSearchQuery('');
  };

  // Filter hierarchy: Category -> Subcategory -> Items
  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return currentCategories
      .filter((cat) => {
        if (activeCategory === 'all') return true;
        return cat.id === activeCategory || cat.name === activeCategory;
      })
      .map((cat) => {
        const filteredSubs = cat.subcategories
          .map((sub) => {
            const items = sub.items.filter((item) => {
              if (!q) return true;
              return (
                item.name.toLowerCase().includes(q) ||
                item.englishName.toLowerCase().includes(q) ||
                item.tamilName.includes(q) ||
                item.description.toLowerCase().includes(q) ||
                item.ingredients.toLowerCase().includes(q)
              );
            });
            return { ...sub, items };
          })
          .filter((sub) => sub.items.length > 0);

        return { ...cat, subcategories: filteredSubs };
      })
      .filter((cat) => cat.subcategories.length > 0);
  }, [currentCategories, searchQuery, activeCategory]);

  const totalFilteredCount = useMemo(() => {
    return filteredData.reduce((acc, cat) => {
      return acc + cat.subcategories.reduce((subAcc, sub) => subAcc + sub.items.length, 0);
    }, 0);
  }, [filteredData]);

  const scrollToSection = (catId: string) => {
    const el = document.getElementById(catId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FFFDF7' }}>
      {/* Global Navigation */}
      <Navbar />

      <main style={{ flex: 1, paddingTop: 0 }}>
        {/* Page Hero Header with Veg/Non-Veg Toggle */}
        <section
          style={{
            backgroundColor: '#FAF7EE',
            borderBottom: '1px solid rgba(200, 159, 92, 0.3)',
            padding: '3rem 1.25rem 2.25rem',
            textAlign: 'center',
          }}
        >
          <div className="container" style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div
              className="eyebrow eyebrow-gold"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                marginBottom: '0.65rem',
              }}
            >
              <Sparkles size={14} color="#B88916" />
              <span
                style={{
                  color: themeColor,
                  fontWeight: 800,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  fontSize: '0.85rem',
                  transition: 'color 0.25s ease',
                }}
              >
                JayShree Caters Master Menu
              </span>
            </div>

            <h1
              style={{
                color: '#052020',
                fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                fontWeight: 800,
                margin: '0 0 0.75rem',
              }}
            >
              Explore Our Complete Master Menu
            </h1>

            <p
              style={{
                color: '#4A5568',
                fontSize: '1.02rem',
                lineHeight: 1.6,
                maxWidth: '780px',
                margin: '0 auto 1.75rem',
              }}
            >
              Select between our traditional pure vegetarian Arusuvai feast specialties and our royal non-vegetarian master menu. Choose dishes directly to curate your personalized event menu.
            </p>

            {/* Premium Veg / Non-Veg Toggle Switch */}
            <MenuDietToggle
              currentDiet={diet}
              onChange={handleDietChange}
              vegCount={menuItems.length}
              nonVegCount={nonVegMenuItems.length}
            />

            {/* Custom Item Option - Clearly visible near the top of the menu, close to the Veg / Non-Veg toggle */}
            <div
              style={{
                marginTop: '1.25rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
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
                  color: diet === 'veg' ? '#075B35' : '#B91C1C',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 2px 10px rgba(200, 159, 92, 0.12)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(200, 159, 92, 0.22)';
                  e.currentTarget.style.backgroundColor = themeBgLight;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(200, 159, 92, 0.12)';
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                }}
              >
                <Sparkles size={16} color="#B88916" />
                <span>Can’t find your dish? Add a custom item +</span>
              </button>
            </div>
          </div>
        </section>

        {/* Sticky Filter Bar & Category Anchor Bar */}
        <section
          style={{
            position: 'sticky',
            top: '70px',
            zIndex: 30,
            backgroundColor: '#FFFFFF',
            boxShadow: '0 4px 20px rgba(5, 32, 32, 0.08)',
            borderBottom: '1px solid rgba(200, 159, 92, 0.3)',
            padding: '0.85rem 1.25rem',
          }}
        >
          <div className="container" style={{ maxWidth: '1360px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            
            {/* Top Row: Search & View Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
              {/* Search Bar */}
              <div style={{ position: 'relative', flex: '1 1 320px' }}>
                <Search size={18} color="#7c9989" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder={
                    diet === 'veg'
                      ? 'Search 150+ Veg items in English or Tamil (e.g. Idli, பன்னீர், Rasam, Laddu)...'
                      : 'Search 72 Non-Veg items (e.g. Briyani, 65, Pepper Chicken, Vanjaram, Mutton)...'
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 1rem 0.65rem 2.8rem',
                    borderRadius: '999px',
                    border: `1.5px solid ${themeBorder}`,
                    backgroundColor: '#FAF7EE',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border 0.25s ease',
                  }}
                />
              </div>

              {/* View Switcher & Counter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#4A5568', fontWeight: 600 }}>
                  Showing <strong>{totalFilteredCount}</strong> of {currentTotalCount} Items
                </span>

                <div style={{ display: 'flex', border: '1px solid #C89F5C', borderRadius: '8px', overflow: 'hidden' }}>
                  <button
                    type="button"
                    onClick={() => setViewMode('cards')}
                    style={{
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      backgroundColor: viewMode === 'cards' ? themeColor : '#FFFFFF',
                      color: viewMode === 'cards' ? '#FFFFFF' : '#052020',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease',
                    }}
                  >
                    Cards View
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    style={{
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      backgroundColor: viewMode === 'list' ? themeColor : '#FFFFFF',
                      color: viewMode === 'list' ? '#FFFFFF' : '#052020',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease',
                    }}
                  >
                    Compact List
                  </button>
                </div>

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#B88916',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Clear Search
                  </button>
                )}
              </div>
            </div>

            {/* Category Anchor Pills */}
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem', scrollbarWidth: 'thin' }}>
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                style={{
                  padding: '0.4rem 0.95rem',
                  borderRadius: '999px',
                  border: activeCategory === 'all' ? `1.5px solid ${themeColor}` : '1px solid rgba(200, 159, 92, 0.35)',
                  backgroundColor: activeCategory === 'all' ? themeColor : '#FAF7EE',
                  color: activeCategory === 'all' ? '#FFFFFF' : '#052020',
                  fontSize: '0.82rem',
                  fontWeight: activeCategory === 'all' ? 700 : 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                All {currentCategories.length} Categories
              </button>
              {currentCategories.map((cat, idx) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setActiveCategory(cat.id);
                      scrollToSection(cat.id);
                    }}
                    style={{
                      padding: '0.4rem 0.95rem',
                      borderRadius: '999px',
                      border: isActive ? `1.5px solid ${themeColor}` : '1px solid rgba(200, 159, 92, 0.35)',
                      backgroundColor: isActive ? themeColor : '#FAF7EE',
                      color: isActive ? '#FFFFFF' : '#052020',
                      fontSize: '0.82rem',
                      fontWeight: isActive ? 700 : 600,
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {idx + 1}. {cat.name}
                  </button>
                );
              })}
            </div>

          </div>
        </section>

        {/* Master Menu Content Area */}
        <section style={{ padding: '3rem 1.25rem 6rem' }}>
          <div className="container" style={{ maxWidth: '1360px', margin: '0 auto' }}>
            
            {filteredData.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 1.5rem', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1.5px dashed #C89F5C' }}>
                <UtensilsCrossed size={40} color="#B88916" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ color: '#052020', fontSize: '1.4rem' }}>No matching items found</h3>
                <p style={{ color: '#718096', margin: '0.5rem 0 1.5rem' }}>
                  Can&apos;t find your desired delicacy in the list? You can easily add it as a custom item for your event.
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
                    }}
                  >
                    <Sparkles size={16} color="#FFFFFF" />
                    <span>Add Custom Item +</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                    className="theme-btn btn-style-two"
                  >
                    <span>Show All {diet === 'veg' ? 'Veg' : 'Non-Veg'} Items</span>
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                {filteredData.map((category) => (
                  <div key={category.id} id={category.id} style={{ scrollMarginTop: '160px' }}>
                    
                    {/* Category Title Header */}
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
                        transition: 'border-left 0.25s ease',
                      }}
                    >
                      <div>
                        <h2 style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: 'clamp(1.5rem, 2.3vw, 1.95rem)',
                          color: '#052020',
                          fontWeight: 800,
                          margin: 0
                        }}>
                          {category.name}
                        </h2>
                        {category.description && (
                          <p style={{ color: '#4A5568', fontSize: '0.92rem', margin: '0.25rem 0 0' }}>
                            {category.description}
                          </p>
                        )}
                      </div>

                      <span style={{
                        backgroundColor: themeColor,
                        color: '#FFFFFF',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        padding: '0.35rem 0.85rem',
                        borderRadius: '999px',
                        transition: 'background-color 0.25s ease',
                      }}>
                        {category.subcategories.reduce((acc, sub) => acc + sub.items.length, 0)} Items
                      </span>
                    </div>

                    {/* Subcategories */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                      {category.subcategories.map((sub) => (
                        <div key={sub.id} style={{ backgroundColor: '#FFFFFF', padding: 'clamp(1rem, 2.5vw, 1.75rem)', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                          
                          {/* Subcategory Label */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderBottom: '1.5px solid #F0F4F2',
                            paddingBottom: '0.75rem',
                            marginBottom: '1.5rem',
                          }}>
                            <h3 style={{
                              margin: 0,
                              fontFamily: 'var(--font-heading)',
                              fontSize: '1.25rem',
                              fontWeight: 800,
                              color: themeColor,
                              transition: 'color 0.25s ease',
                            }}>
                              {sub.name}
                            </h3>
                            <span style={{ fontSize: '0.82rem', color: '#718096', fontWeight: 600 }}>
                              {sub.items.length} choices
                            </span>
                          </div>

                          {/* Items Display: Cards vs List */}
                          {viewMode === 'cards' ? (
                            <div
                              style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
                                gap: '1.5rem',
                              }}
                            >
                              {sub.items.map((item) => {
                                const selected = isSelected(item.id);
                                return (
                                  <div
                                    key={item.id}
                                    style={{
                                      border: selected ? `2px solid ${themeColor}` : '1px solid rgba(200, 159, 92, 0.3)',
                                      borderRadius: '12px',
                                      overflow: 'hidden',
                                      backgroundColor: selected ? themeBgLight : '#FFFFFF',
                                      boxShadow: selected ? `0 8px 20px ${diet === 'veg' ? 'rgba(7, 91, 53, 0.12)' : 'rgba(185, 28, 28, 0.12)'}` : '0 2px 8px rgba(0,0,0,0.03)',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      transition: 'all 0.25s ease',
                                    }}
                                  >
                                    <div
                                      style={{
                                        position: 'relative',
                                        width: '100%',
                                        height: '180px',
                                        cursor: 'pointer',
                                      }}
                                      onClick={() => setSelectedModalFood(item)}
                                    >
                                      <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        sizes="(max-width: 640px) 100vw, 300px"
                                      />
                                      
                                      {/* Dietary Indicator (Veg / Non-Veg) */}
                                      <span
                                        style={{
                                          position: 'absolute',
                                          top: '8px',
                                          left: '8px',
                                          backgroundColor: '#FFFFFF',
                                          padding: '3px',
                                          borderRadius: '4px',
                                          display: 'inline-flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                                        }}
                                        title={item.type === 'veg' ? 'Pure Vegetarian' : 'Non-Vegetarian'}
                                      >
                                        <span
                                          style={{
                                            width: '14px',
                                            height: '14px',
                                            border: item.type === 'veg' ? '1.5px solid #27AE60' : '1.5px solid #C0392B',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: '2px',
                                          }}
                                        >
                                          {item.type === 'veg' ? (
                                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#27AE60' }} />
                                          ) : (
                                            <span
                                              style={{
                                                width: 0,
                                                height: 0,
                                                borderLeft: '3.5px solid transparent',
                                                borderRight: '3.5px solid transparent',
                                                borderBottom: '6px solid #C0392B',
                                              }}
                                            />
                                          )}
                                        </span>
                                      </span>

                                      {/* Spiciness Level Badge */}
                                      {item.spiciness && (
                                        <span
                                          style={{
                                            position: 'absolute',
                                            top: '8px',
                                            right: '8px',
                                            backgroundColor: 'rgba(5, 32, 32, 0.85)',
                                            color: '#FAF7EE',
                                            fontSize: '0.7rem',
                                            fontWeight: 700,
                                            padding: '0.15rem 0.5rem',
                                            borderRadius: '999px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.2rem',
                                          }}
                                        >
                                          <Flame size={11} color="#E4C590" />
                                          <span>{item.spiciness}</span>
                                        </span>
                                      )}
                                    </div>

                                    <div style={{ padding: '1.15rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                                      <div>
                                        <h4
                                          style={{
                                            fontFamily: 'var(--font-heading)',
                                            fontSize: '1.05rem',
                                            fontWeight: 800,
                                            color: '#052020',
                                            margin: '0 0 0.35rem',
                                            lineHeight: 1.35,
                                            cursor: 'pointer',
                                          }}
                                          onClick={() => setSelectedModalFood(item)}
                                        >
                                          {item.name}
                                        </h4>
                                        <p style={{ fontSize: '0.82rem', color: '#718096', margin: '0 0 0.65rem', lineHeight: 1.45 }}>
                                          {item.description}
                                        </p>
                                      </div>

                                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid #F0F4F2' }}>
                                        <button
                                          type="button"
                                          onClick={() => setSelectedModalFood(item)}
                                          style={{
                                            background: 'none',
                                            border: 'none',
                                            color: themeColor,
                                            fontSize: '0.8rem',
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                            padding: 0,
                                          }}
                                        >
                                          Details
                                        </button>

                                        <button
                                          type="button"
                                          onClick={() => toggleSelectFood(item)}
                                          style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.35rem',
                                            padding: '0.35rem 0.85rem',
                                            borderRadius: '999px',
                                            border: selected ? `1.5px solid ${themeColor}` : '1px solid #C89F5C',
                                            backgroundColor: selected ? themeColor : '#FAF7EE',
                                            color: selected ? '#FFFFFF' : themeColor,
                                            fontSize: '0.8rem',
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                          }}
                                        >
                                          {selected ? (
                                            <>
                                              <Check size={13} />
                                              <span>Selected</span>
                                            </>
                                          ) : (
                                            <>
                                              <Plus size={13} />
                                              <span>Add to Menu</span>
                                            </>
                                          )}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            /* Compact Scannable List View */
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                              {sub.items.map((item, idx) => {
                                const selected = isSelected(item.id);
                                return (
                                  <div
                                    key={item.id}
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      padding: '0.85rem 1.15rem',
                                      borderRadius: '10px',
                                      backgroundColor: selected ? themeBgLight : '#FAF7EE',
                                      border: selected ? `1.5px solid ${themeColor}` : '1px solid rgba(200, 159, 92, 0.25)',
                                      gap: '1rem',
                                      flexWrap: 'wrap',
                                    }}
                                  >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flex: 1 }}>
                                      {/* Diet Indicator Dot */}
                                      <span
                                        style={{
                                          width: '14px',
                                          height: '14px',
                                          border: item.type === 'veg' ? '1.5px solid #27AE60' : '1.5px solid #C0392B',
                                          display: 'inline-flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          borderRadius: '2px',
                                          backgroundColor: '#FFFFFF',
                                          flexShrink: 0,
                                        }}
                                      >
                                        {item.type === 'veg' ? (
                                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#27AE60' }} />
                                        ) : (
                                          <span
                                            style={{
                                              width: 0,
                                              height: 0,
                                              borderLeft: '3px solid transparent',
                                              borderRight: '3px solid transparent',
                                              borderBottom: '5px solid #C0392B',
                                            }}
                                          />
                                        )}
                                      </span>

                                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#C89F5C', minWidth: '24px' }}>
                                        {idx + 1}.
                                      </span>
                                      <div>
                                        <div style={{ fontWeight: 800, color: '#052020', fontSize: '1rem' }}>
                                          {item.name}
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: '#718096', marginTop: '0.15rem' }}>
                                          {item.description}
                                        </div>
                                      </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                      <button
                                        type="button"
                                        onClick={() => setSelectedModalFood(item)}
                                        style={{
                                          background: 'none',
                                          border: 'none',
                                          color: '#718096',
                                          fontSize: '0.8rem',
                                          fontWeight: 600,
                                          cursor: 'pointer',
                                        }}
                                      >
                                        Ingredients
                                      </button>

                                      <button
                                        type="button"
                                        onClick={() => toggleSelectFood(item)}
                                        style={{
                                          display: 'inline-flex',
                                          alignItems: 'center',
                                          gap: '0.35rem',
                                          padding: '0.35rem 0.9rem',
                                          borderRadius: '999px',
                                          border: selected ? `1.5px solid ${themeColor}` : '1px solid #C89F5C',
                                          backgroundColor: selected ? themeColor : '#FFFFFF',
                                          color: selected ? '#FFFFFF' : themeColor,
                                          fontSize: '0.82rem',
                                          fontWeight: 700,
                                          cursor: 'pointer',
                                        }}
                                      >
                                        {selected ? (
                                          <>
                                            <Check size={13} />
                                            <span>Selected</span>
                                          </>
                                        ) : (
                                          <>
                                            <Plus size={13} />
                                            <span>Add</span>
                                          </>
                                        )}
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}

                        </div>
                      ))}
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        </section>

        {/* Bottom Floating Curate Bar if items are selected */}
        {totalCount > 0 && (
          <div
            className="menu-floating-cart-pill"
            style={{
              position: 'fixed',
              bottom: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 999,
              backgroundColor: '#052020',
              color: '#FFFFFF',
              padding: '0.85rem 1.75rem',
              borderRadius: '999px',
              boxShadow: '0 10px 30px rgba(5, 32, 32, 0.45)',
              border: '2px solid #E4C590',
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <UtensilsCrossed size={18} color="#E4C590" />
              <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>
                {totalCount} Items Selected in Your Menu
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              style={{
                backgroundColor: '#E4C590',
                color: '#052020',
                border: 'none',
                borderRadius: '999px',
                padding: '0.45rem 1.15rem',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <span>Get WhatsApp Quote</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}

      </main>

      {/* Global Modals & WhatsApp */}
      <FoodModal />
      <SelectionReviewDrawer />
      <FloatingWhatsApp />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
