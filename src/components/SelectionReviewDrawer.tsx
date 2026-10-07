'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useSelection } from '@/context/SelectionContext';
import { CateringEnquiryPayload, EnquiryResponse } from '@/types';
import { 
  X, 
  Trash2, 
  UtensilsCrossed, 
  Sparkles, 
  Send, 
  MessageCircle, 
  Calendar, 
  Users, 
  MapPin, 
  Phone, 
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Pencil,
  Plus
} from 'lucide-react';

const EVENT_TYPES = [
  'Wedding / Muhurtham',
  'Reception & Sangeet',
  'Griha Pravesham (Housewarming)',
  'Religious Homam / Pooja Feast',
  'Sashtiabdapoorthi (60th Birthday)',
  'Milestone Birthday Party',
  'Corporate Gala / Conference',
  'Other Celebration',
];

export const SelectionReviewDrawer: React.FC = () => {
  const { selectedFoods, removeFood, clearSelection, totalCount, isDrawerOpen, setIsDrawerOpen, openCustomModal } = useSelection();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: 'Wedding / Muhurtham',
    eventDate: '',
    guests: 100,
    location: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState<EnquiryResponse | null>(null);

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if ((window as any).__lenis) {
        (window as any).__lenis.stop();
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsDrawerOpen(false);
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
  }, [isDrawerOpen, setIsDrawerOpen]);

  if (!isDrawerOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Client-side validation checks
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMessage('Please provide a valid 10-digit mobile number for WhatsApp communication.');
      return;
    }

    if (!formData.eventDate) {
      setErrorMessage('Please select your celebration date.');
      return;
    }

    if (!formData.guests || Number(formData.guests) < 10) {
      setErrorMessage('Please specify an expected guest count of at least 10.');
      return;
    }

    if (!formData.location.trim()) {
      setErrorMessage('Please specify the event location (city or hall).');
      return;
    }

    setSubmitting(true);

    try {
      const payload: CateringEnquiryPayload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        eventType: formData.eventType,
        eventDate: formData.eventDate,
        guests: Number(formData.guests),
        location: formData.location.trim(),
        selectedFoods,
        message: formData.message.trim() || undefined,
      };

      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data: EnquiryResponse = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.message || 'Submission failed. Please check your inputs.');
        setSubmitting(false);
        return;
      }

      // Success
      setSubmissionSuccess(data);
      setSubmitting(false);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#075B35', '#E5B52A', '#F4D98A', '#25D366'],
        });
      } catch {
        // Confetti fallback
      }

      // Automatically open WhatsApp in new tab
      if (data.whatsappLink) {
        window.open(data.whatsappLink, '_blank');
      }

      // Clear the selected items and reset menu count back to zero
      clearSelection();
    } catch {
      setErrorMessage('Unable to connect to server. Please try reaching us on WhatsApp directly.');
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (submissionSuccess) {
      clearSelection();
    }
    setIsDrawerOpen(false);
    setSubmissionSuccess(null);
    setErrorMessage('');
    setFormData({
      name: '',
      phone: '',
      email: '',
      eventType: 'Wedding / Muhurtham',
      eventDate: '',
      guests: 100,
      location: '',
      message: '',
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: 'rgba(3, 66, 38, 0.65)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={handleClose}
      onWheel={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onTouchMove={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-heading"
    >
      <div
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '560px',
          height: '100%',
          backgroundColor: '#FFFDF7',
          boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          borderLeft: '2px solid rgba(229, 181, 42, 0.4)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid rgba(7, 91, 53, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FFFFFF',
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <UtensilsCrossed size={20} color="#075B35" />
            <div>
              <h2 id="drawer-heading" style={{ fontSize: '1.25rem', color: 'var(--green-dark)', fontWeight: 800 }}>
                Catering Selection
              </h2>
              <span style={{ fontSize: '0.75rem', color: '#B88916', fontWeight: 700 }}>
                {submissionSuccess ? 'Enquiry Prepared & Dispatched' : `${totalCount} Dishes Curated`}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {!submissionSuccess && totalCount > 0 && (
              <button
                onClick={clearSelection}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#C0392B',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: '0.3rem 0.6rem',
                }}
              >
                Clear All
              </button>
            )}

            <button
              onClick={handleClose}
              style={{
                background: 'none',
                border: '1px solid rgba(7, 91, 53, 0.2)',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--green-dark)',
              }}
              aria-label="Close Selection Drawer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Success Screen */}
        {submissionSuccess ? (
          <div style={{ padding: '3rem 2rem', textAlign: 'center', margin: 'auto 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#27AE60',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                boxShadow: '0 8px 24px rgba(39, 174, 96, 0.3)',
              }}
            >
              <CheckCircle size={36} />
            </div>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', color: '#034226', marginBottom: '0.75rem' }}>
              Enquiry Prepared Successfully!
            </h3>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
              Your event details and {submissionSuccess.details?.itemCount ?? totalCount} selected dishes have been formatted for instant WhatsApp dispatch.
            </p>

            <div
              style={{
                backgroundColor: 'rgba(7, 91, 53, 0.06)',
                border: '1px solid rgba(7, 91, 53, 0.15)',
                borderRadius: '1rem',
                padding: '1.25rem',
                textAlign: 'left',
                marginBottom: '1.25rem',
                fontSize: '0.85rem',
                lineHeight: 1.6,
              }}
            >
              <div><strong>Reference ID:</strong> {submissionSuccess.details?.requestId}</div>
              <div><strong>Customer:</strong> {submissionSuccess.details?.customerName} ({submissionSuccess.details?.phone})</div>
              <div><strong>Caterer:</strong> Jayshree Caters ({submissionSuccess.details?.ownerPhone || '+91 962 642 6046'})</div>
              <div><strong>Event:</strong> {submissionSuccess.details?.eventSummary}</div>
              <div><strong>Selected Delicacies:</strong> {submissionSuccess.details?.itemCount} items</div>
            </div>

            {/* Dual Dispatch Notice */}
            <div
              style={{
                backgroundColor: '#F8F5EE',
                border: '1px dashed #C89F5C',
                borderRadius: '0.75rem',
                padding: '0.75rem 1rem',
                marginBottom: '1.5rem',
                fontSize: '0.8rem',
                color: '#052020',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                textAlign: 'left',
              }}
            >
              <Sparkles size={18} color="#C89F5C" style={{ flexShrink: 0 }} />
              <span>
                Enquiry formatted for both <strong>Jayshree Caters (Owner)</strong> &amp; <strong>Your WhatsApp ({submissionSuccess.details?.phone})</strong>.
              </span>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.25rem' }}>
              {/* Button 1: Send to Owner */}
              <a
                href={submissionSuccess.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => clearSelection()}
                className="btn-whatsapp-owner"
                style={{
                  width: '100%',
                  padding: '0.9rem 1.25rem',
                  borderRadius: '9999px',
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  color: '#FFFFFF',
                  border: '1.5px solid #E4C590',
                  boxShadow: '0 6px 20px rgba(37, 211, 102, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.65rem',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                }}
              >
                <MessageCircle size={19} fill="currentColor" />
                <span>Send to Jayshree Caters (Owner)</span>
                <ExternalLink size={15} />
              </a>

              {/* Button 2: Send Copy to User's WhatsApp */}
              {submissionSuccess.userWhatsappLink && (
                <a
                  href={submissionSuccess.userWhatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => clearSelection()}
                  className="btn-whatsapp-user"
                  style={{
                    width: '100%',
                    padding: '0.9rem 1.25rem',
                    borderRadius: '9999px',
                    background: 'linear-gradient(135deg, #ECC243 0%, #C89F5C 100%)',
                    color: '#052020',
                    border: '1.5px solid #FFE4A0',
                    boxShadow: '0 6px 20px rgba(200, 159, 92, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.65rem',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                  }}
                >
                  <Send size={18} />
                  <span>Send Menu Copy to My WhatsApp</span>
                  <ExternalLink size={15} />
                </a>
              )}
            </div>

            <button
              onClick={handleClose}
              style={{
                width: '100%',
                padding: '0.75rem 1.25rem',
                borderRadius: '9999px',
                border: '1.5px solid rgba(7, 91, 53, 0.3)',
                backgroundColor: 'transparent',
                color: '#075B35',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Close Drawer
            </button>
          </div>
        ) : (
          <div className="drawer-inner-content" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Selected Dishes Summary List */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--green-dark)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Selected Menu Items ({selectedFoods.length})
                </h3>
              </div>

              {selectedFoods.length === 0 ? (
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '1.25rem',
                    padding: '2rem 1.5rem',
                    textAlign: 'center',
                    border: '1.5px dashed rgba(7, 91, 53, 0.15)',
                  }}
                >
                  <UtensilsCrossed size={32} color="#B88916" style={{ margin: '0 auto 0.75rem auto' }} />
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    No dishes selected yet.
                  </p>
                  <p style={{ fontSize: '0.8rem', color: '#7c9989' }}>
                    Browse our menu and click <strong>&ldquo;+ Select&rdquo;</strong> to assemble your feast. You can also submit an inquiry directly below.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxHeight: '280px', overflowY: 'auto' }}>
                  {selectedFoods.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        backgroundColor: item.isCustom ? '#FFFDF5' : '#FFFFFF',
                        borderRadius: '0.85rem',
                        padding: '0.75rem 0.85rem',
                        border: item.isCustom ? '1.5px solid rgba(200, 159, 92, 0.45)' : '1px solid rgba(7, 91, 53, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.5rem',
                        boxShadow: item.isCustom ? '0 2px 8px rgba(200, 159, 92, 0.1)' : 'none',
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', minWidth: 0, flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', flexWrap: 'wrap' }}>
                          {/* Diet indicator */}
                          <span
                            style={{
                              width: '10px',
                              height: '10px',
                              borderRadius: item.type === 'veg' ? '50%' : '2px',
                              backgroundColor: item.type === 'veg' ? '#27AE60' : '#C0392B',
                              flexShrink: 0,
                            }}
                            title={item.type === 'veg' ? 'Pure Vegetarian' : 'Non-Vegetarian'}
                          />

                          {/* Item Name */}
                          <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--green-dark)', wordBreak: 'break-word' }}>
                            {item.name}
                          </span>

                          {/* Custom Item Badge */}
                          {item.isCustom ? (
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                backgroundColor: '#FEF3C7',
                                color: '#92400E',
                                border: '1px solid #FCD34D',
                                borderRadius: '999px',
                                padding: '0.12rem 0.45rem',
                                fontSize: '0.68rem',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                flexShrink: 0,
                              }}
                            >
                              <Sparkles size={10} color="#B45309" />
                              Custom Item
                            </span>
                          ) : (
                            <span style={{ fontSize: '0.72rem', color: '#7c9989', flexShrink: 0 }}>
                              ({item.category})
                            </span>
                          )}

                          {/* Quantity Badge */}
                          {item.isCustom && item.quantity && (
                            <span
                              style={{
                                backgroundColor: 'rgba(7, 91, 53, 0.08)',
                                color: '#075B35',
                                borderRadius: '4px',
                                padding: '0.1rem 0.4rem',
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                flexShrink: 0,
                              }}
                            >
                              Qty: {item.quantity}
                            </span>
                          )}
                        </div>

                        {/* Custom notes preview if present */}
                        {item.isCustom && item.customNotes && (
                          <div style={{ fontSize: '0.72rem', color: '#6B7280', fontStyle: 'italic', paddingLeft: '1rem' }}>
                            &ldquo;{item.customNotes}&rdquo;
                          </div>
                        )}
                      </div>

                      {/* Action buttons (Edit & Remove) */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
                        {item.isCustom && (
                          <button
                            type="button"
                            onClick={() => openCustomModal(item.type, item)}
                            style={{
                              background: '#FAF7EE',
                              border: '1px solid rgba(200, 159, 92, 0.4)',
                              borderRadius: '6px',
                              color: '#B88916',
                              cursor: 'pointer',
                              padding: '0.3rem 0.45rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                            }}
                            title={`Edit ${item.name}`}
                            aria-label={`Edit ${item.name}`}
                          >
                            <Pencil size={12} />
                            <span>Edit</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => removeFood(item.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#C0392B',
                            cursor: 'pointer',
                            padding: '0.3rem',
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: '4px',
                          }}
                          title={`Remove ${item.name}`}
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Add another custom dish shortcut inside drawer */}
                  <button
                    type="button"
                    onClick={() => openCustomModal('veg')}
                    style={{
                      marginTop: '0.35rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.45rem',
                      width: '100%',
                      padding: '0.6rem',
                      backgroundColor: '#FAF7EE',
                      border: '1.5px dashed #C89F5C',
                      borderRadius: '0.75rem',
                      color: '#7A5210',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease',
                    }}
                  >
                    <Plus size={15} color="#B88916" />
                    <span>Add another custom dish +</span>
                  </button>
                </div>
              )}
            </div>

            {/* Practical Event Details Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--green-dark)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Your Celebration Details
              </h3>

              {errorMessage && (
                <div
                  style={{
                    backgroundColor: '#FDEDEC',
                    border: '1px solid #F5B7B1',
                    color: '#922B21',
                    borderRadius: '0.85rem',
                    padding: '0.75rem 1rem',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <AlertCircle size={18} style={{ flexShrink: 0 }} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Name & Phone */}
              <div className="drawer-input-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--green-dark)', marginBottom: '0.35rem' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Arun Kumar"
                    value={formData.name}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.85rem',
                      borderRadius: '0.75rem',
                      border: '1.5px solid rgba(7, 91, 53, 0.15)',
                      backgroundColor: '#FFFFFF',
                      fontSize: '0.88rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--green-dark)', marginBottom: '0.35rem' }}>
                    Mobile / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 98401 23456"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.85rem',
                      borderRadius: '0.75rem',
                      border: '1.5px solid rgba(7, 91, 53, 0.15)',
                      backgroundColor: '#FFFFFF',
                      fontSize: '0.88rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Event Type & Date */}
              <div className="drawer-input-row" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--green-dark)', marginBottom: '0.35rem' }}>
                    Event Occasion *
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.85rem',
                      borderRadius: '0.75rem',
                      border: '1.5px solid rgba(7, 91, 53, 0.15)',
                      backgroundColor: '#FFFFFF',
                      fontSize: '0.88rem',
                      outline: 'none',
                    }}
                  >
                    {EVENT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--green-dark)', marginBottom: '0.35rem' }}>
                    Event Date *
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    required
                    value={formData.eventDate}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.85rem',
                      borderRadius: '0.75rem',
                      border: '1.5px solid rgba(7, 91, 53, 0.15)',
                      backgroundColor: '#FFFFFF',
                      fontSize: '0.88rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Guests Count & Location */}
              <div className="drawer-input-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--green-dark)', marginBottom: '0.35rem' }}>
                    Expected Guests *
                  </label>
                  <input
                    type="number"
                    name="guests"
                    min={10}
                    step={10}
                    required
                    value={formData.guests}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.85rem',
                      borderRadius: '0.75rem',
                      border: '1.5px solid rgba(7, 91, 53, 0.15)',
                      backgroundColor: '#FFFFFF',
                      fontSize: '0.88rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--green-dark)', marginBottom: '0.35rem' }}>
                    Location / Venue *
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    placeholder="e.g. K V Kuppam, Vellore"
                    value={formData.location}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.85rem',
                      borderRadius: '0.75rem',
                      border: '1.5px solid rgba(7, 91, 53, 0.15)',
                      backgroundColor: '#FFFFFF',
                      fontSize: '0.88rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Email (Optional) */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--green-dark)', marginBottom: '0.35rem' }}>
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="arun@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.7rem 0.85rem',
                    borderRadius: '0.75rem',
                    border: '1.5px solid rgba(7, 91, 53, 0.15)',
                    backgroundColor: '#FFFFFF',
                    fontSize: '0.88rem',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Custom Requirements / Message */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--green-dark)', marginBottom: '0.35rem' }}>
                  Special Dietary or Service Notes
                </label>
                <textarea
                  name="message"
                  rows={2}
                  placeholder="e.g. Banana leaf service required for elders, mild spices for children, live dosa counter needed..."
                  value={formData.message}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.7rem 0.85rem',
                    borderRadius: '0.75rem',
                    border: '1.5px solid rgba(7, 91, 53, 0.15)',
                    backgroundColor: '#FFFFFF',
                    fontSize: '0.88rem',
                    fontFamily: 'var(--font-sans)',
                    outline: 'none',
                    resize: 'none',
                  }}
                />
              </div>

              {/* Submit CTA */}
              <div style={{ marginTop: '1rem' }}>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-enquiry-submit"
                  style={{
                    width: '100%',
                    padding: '0.95rem 1.5rem',
                    borderRadius: '9999px',
                    background: 'linear-gradient(135deg, #ECC243 0%, #C89F5C 50%, #B88916 100%)',
                    color: '#052020',
                    border: '2px solid #FFEBB0',
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.65rem',
                    boxShadow: '0 8px 24px rgba(200, 159, 92, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.6)',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    opacity: submitting ? 0.75 : 1,
                    transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: '#052020',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <MessageCircle size={16} color="#ECC243" fill="#ECC243" />
                  </div>
                  <span>{submitting ? 'Preparing WhatsApp Breakdown...' : 'Send Enquiry via WhatsApp'}</span>
                </button>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.45rem',
                    fontSize: '0.74rem',
                    color: '#075B35',
                    fontWeight: 600,
                    marginTop: '0.65rem',
                    textAlign: 'center',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      backgroundColor: '#25D366',
                    }}
                  />
                  <span>Dispatches menu breakdown to both <strong>Owner</strong> &amp; <strong>Your WhatsApp</strong></span>
                </div>
              </div>

            </form>

          </div>
        )}

      </div>
    </div>
  );
};
