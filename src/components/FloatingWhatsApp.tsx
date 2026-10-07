'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Send, CheckCheck } from 'lucide-react';
import { siteConfig } from '@/data/site';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('Just now');

  useEffect(() => {
    // Only initialize the timestamp — do NOT auto-open the chat card.
    // The WhatsApp chat preview should only open when the user manually clicks the button.
    const now = new Date();
    setCurrentTime(
      now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
  }, []);

  const enquiryMessage =
    'Vanakkam Jayshree Caters! I would like to know more about your catering & event management services for an upcoming event.';
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    enquiryMessage
  )}`;

  const handleOpenChat = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className="floating-whatsapp-container"
      style={{
        position: 'fixed',
        right: '24px',
        bottom: '24px',
        zIndex: 9990,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <style jsx>{`
        @media (max-width: 768px) {
          .floating-whatsapp-container {
            bottom: 84px !important;
            right: 18px !important;
          }
          .whatsapp-preview-card {
            width: calc(100vw - 36px) !important;
            max-width: 340px !important;
          }
        }

        @keyframes whatsappBounce {
          0%, 15%, 35%, 55%, 100% {
            transform: translateY(0) scale(1);
            box-shadow: 0 6px 20px rgba(37, 211, 102, 0.45), 0 2px 6px rgba(0, 0, 0, 0.15);
          }
          20% {
            transform: translateY(-11px) scale(1.06);
            box-shadow: 0 16px 28px rgba(37, 211, 102, 0.55), 0 4px 10px rgba(0, 0, 0, 0.2);
          }
          28% {
            transform: translateY(0) scale(0.96);
            box-shadow: 0 4px 14px rgba(37, 211, 102, 0.4), 0 2px 4px rgba(0, 0, 0, 0.15);
          }
          42% {
            transform: translateY(-5px) scale(1.03);
            box-shadow: 0 10px 22px rgba(37, 211, 102, 0.5), 0 3px 8px rgba(0, 0, 0, 0.18);
          }
          50% {
            transform: translateY(0) scale(1);
          }
        }

        @keyframes floatBtnPopIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          70% {
            opacity: 1;
            transform: scale(1.12);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(14px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .whatsapp-float-btn {
          animation: floatBtnPopIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) backwards, whatsappBounce 3.2s ease-in-out 0.6s infinite;
          transform-origin: center bottom;
        }

        .whatsapp-float-btn:hover {
          animation-play-state: paused;
          transform: scale(1.1) !important;
        }

        .whatsapp-preview-card {
          animation: slideInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Chat Preview Popup / Card */}
      {isOpen && (
        <div
          className="whatsapp-preview-card"
          onClick={handleOpenChat}
          style={{
            width: '340px',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            boxShadow: '0 12px 35px rgba(5, 32, 32, 0.28), 0 2px 8px rgba(0, 0, 0, 0.08)',
            border: '1.5px solid rgba(200, 159, 92, 0.4)',
            overflow: 'hidden',
            marginBottom: '14px',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          {/* Card Header (WhatsApp Emerald Styling) */}
          <div
            style={{
              backgroundColor: '#075B35',
              padding: '0.85rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#FFFFFF',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div
                style={{
                  position: 'relative',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid #E4C590',
                  flexShrink: 0,
                  backgroundColor: '#052020',
                }}
              >
                <Image
                  src="/images/logo.jpeg"
                  alt="JayShree Caters"
                  width={42}
                  height={42}
                  style={{ objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: '1px',
                    right: '1px',
                    width: '10px',
                    height: '10px',
                    backgroundColor: '#25D366',
                    borderRadius: '50%',
                    border: '2px solid #FFFFFF',
                  }}
                />
              </div>

              <div>
                <h4
                  style={{
                    margin: 0,
                    fontSize: '0.98rem',
                    fontWeight: 700,
                    color: '#FFFDF7',
                    lineHeight: 1.2,
                  }}
                >
                  Jayshree Caters
                </h4>
                <span
                  style={{
                    fontSize: '0.74rem',
                    color: '#85E3A3',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#25D366',
                      display: 'inline-block',
                    }}
                  />
                  Online • Typically replies instantly
                </span>
              </div>
            </div>

            {/* Dismiss (x) button */}
            <button
              onClick={handleDismiss}
              aria-label="Close WhatsApp chat preview"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: 'none',
                color: '#FFFDF7',
                borderRadius: '50%',
                width: '26px',
                height: '26px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)')
              }
            >
              <X size={15} />
            </button>
          </div>

          {/* Card Body with WhatsApp Chat Bubble Pattern */}
          <div
            style={{
              padding: '1.1rem 1rem 0.9rem 1rem',
              backgroundColor: '#ECE5DD',
              backgroundImage:
                'radial-gradient(#DBD2C9 1px, transparent 1px), radial-gradient(#DBD2C9 1px, #ECE5DD 1px)',
              backgroundSize: '24px 24px',
              backgroundPosition: '0 0, 12px 12px',
            }}
          >
            {/* WhatsApp Speech Bubble */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '0 12px 12px 12px',
                padding: '0.85rem 0.95rem',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                position: 'relative',
                maxWidth: '94%',
              }}
            >
              {/* Bubble Corner Notch */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '-8px',
                  width: 0,
                  height: 0,
                  borderTop: '8px solid #FFFFFF',
                  borderLeft: '8px solid transparent',
                }}
              />

              <div
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#075B35',
                  marginBottom: '0.35rem',
                }}
              >
                Catering Desk
              </div>

              <p
                style={{
                  margin: 0,
                  fontSize: '0.92rem',
                  color: '#111B21',
                  lineHeight: 1.45,
                  fontWeight: 500,
                }}
              >
                Vanakkam! 🙏 Chat with us to know more about our services.
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '4px',
                  marginTop: '0.45rem',
                  fontSize: '0.7rem',
                  color: '#667781',
                }}
              >
                <span>{currentTime}</span>
                <CheckCheck size={14} color="#53BDEB" />
              </div>
            </div>

            {/* Quick Action / Direct Redirect Bar */}
            <div
              style={{
                marginTop: '0.85rem',
                backgroundColor: '#25D366',
                color: '#FFFFFF',
                borderRadius: '999px',
                padding: '0.65rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: '0.88rem',
                fontWeight: 700,
                boxShadow: '0 3px 10px rgba(37, 211, 102, 0.35)',
                transition: 'all 0.25s ease',
              }}
            >
              <Send size={15} />
              <span>Click to Chat on WhatsApp</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Circular WhatsApp Button */}
      <button
        onClick={toggleOpen}
        aria-label="Open WhatsApp catering chat"
        className="whatsapp-float-btn"
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          color: '#FFFFFF',
          border: '2px solid #FFFFFF',
          boxShadow: '0 6px 20px rgba(37, 211, 102, 0.45), 0 2px 6px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative',
          transition: 'transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
      >
        {/* Authentic WhatsApp Icon SVG */}
        <svg
          viewBox="0 0 32 32"
          width="32"
          height="32"
          fill="#FFFFFF"
          style={{ display: 'block' }}
        >
          <path d="M16 2C8.269 2 2 8.269 2 16c0 2.584.698 5.008 1.918 7.096L2.046 29.5a1 1 0 001.238 1.238l6.404-1.872A13.93 13.93 0 0016 30c7.731 0 14-6.269 14-14S23.731 2 16 2zm0 25.5c-2.316 0-4.488-.63-6.36-1.724a1 1 0 00-.737-.107l-4.527 1.323 1.323-4.527a1 1 0 00-.107-.737A11.43 11.43 0 014.5 16C4.5 9.659 9.659 4.5 16 4.5S27.5 9.659 27.5 16 22.341 27.5 16 27.5zm7.042-8.542c-.386-.193-2.285-1.127-2.639-1.256-.353-.129-.61-.193-.867.193-.257.386-.997 1.256-1.222 1.513-.225.257-.45.29-.836.096-.386-.193-1.63-.6-3.105-1.916-1.147-1.023-1.922-2.287-2.147-2.673-.225-.386-.024-.595.17-.788.174-.173.386-.45.579-.675.193-.225.257-.386.386-.643.129-.257.064-.482-.032-.675-.096-.193-.867-2.09-1.189-2.862-.313-.752-.632-.65-.867-.662l-.74-.013c-.257 0-.675.096-1.028.482s-1.35 1.319-1.35 3.216 1.382 3.73 1.575 3.987c.193.257 2.72 4.154 6.589 5.823.92.398 1.639.635 2.199.813.924.294 1.765.252 2.43.153.742-.111 2.285-.933 2.607-1.833.322-.9.322-1.672.225-1.833-.097-.161-.354-.257-.74-.45z" />
        </svg>

        {/* Unread Message Badge Notification */}
        {!isOpen && (
          <span
            style={{
              position: 'absolute',
              top: '-3px',
              right: '-3px',
              backgroundColor: '#E4C590',
              color: '#052020',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              fontSize: '0.75rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #FFFFFF',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.25)',
            }}
          >
            1
          </span>
        )}
      </button>
    </div>
  );
};
