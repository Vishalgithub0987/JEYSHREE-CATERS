'use client';

import React from 'react';
import { siteConfig } from '@/data/site';
import { useSelection } from '@/context/SelectionContext';
import { getQuickWhatsAppLink } from '@/utils/whatsapp';
import { PhoneCall, MessageCircle, UtensilsCrossed } from 'lucide-react';

export const MobileStickyCTA: React.FC = () => {
  const { totalCount, setIsDrawerOpen } = useSelection();
  const whatsappUrl = getQuickWhatsAppLink('sticky');

  return (
    <div
      className="mobile-sticky-bar"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        backgroundColor: 'rgba(255, 253, 247, 0.96)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(229, 181, 42, 0.4)',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
        padding: '0.65rem 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
      }}
    >
      <style jsx>{`
        @media (min-width: 768px) {
          .mobile-sticky-bar {
            display: none !important;
          }
        }
      `}</style>

      {/* If dishes are selected, show selection button */}
      {totalCount > 0 ? (
        <button
          onClick={() => setIsDrawerOpen(true)}
          style={{
            flex: '1.2',
            padding: '0.7rem 0.5rem',
            borderRadius: '9999px',
            backgroundColor: '#075B35',
            color: '#FFFDF7',
            border: '1px solid #E5B52A',
            fontSize: '0.84rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            cursor: 'pointer',
          }}
        >
          <UtensilsCrossed size={16} color="#E5B52A" />
          <span>Review Menu ({totalCount})</span>
        </button>
      ) : (
        <a
          href={`tel:${siteConfig.phone}`}
          style={{
            flex: 1,
            padding: '0.7rem 0.5rem',
            borderRadius: '9999px',
            backgroundColor: '#FFFDF7',
            color: '#075B35',
            border: '1.5px solid #075B35',
            fontSize: '0.85rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            textDecoration: 'none',
          }}
        >
          <PhoneCall size={16} color="#075B35" />
          <span>Call Us</span>
        </a>
      )}

      {/* WhatsApp CTA Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          flex: '1.2',
          padding: '0.7rem 0.5rem',
          borderRadius: '9999px',
          backgroundColor: '#25D366',
          color: '#FFFFFF',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          fontSize: '0.85rem',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.4rem',
          textDecoration: 'none',
          boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
        }}
      >
        <MessageCircle size={17} fill="currentColor" />
        <span>WhatsApp</span>
      </a>
    </div>
  );
};
