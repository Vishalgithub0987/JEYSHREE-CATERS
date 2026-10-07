'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/data/site';
import { getQuickWhatsAppLink } from '@/utils/whatsapp';
import { 
  Sparkles, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle,
  AlertCircle 
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: 'Wedding / Reception',
    eventDate: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [waLink, setWaLink] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const directWhatsAppUrl = getQuickWhatsAppLink('contact');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.message || 'Submission failed. Please try WhatsApp directly.');
        setSubmitting(false);
        return;
      }

      setWaLink(data.whatsappLink);
      setSubmitted(true);
      setSubmitting(false);

      if (data.whatsappLink) {
        window.open(data.whatsappLink, '_blank');
      }
    } catch {
      setErrorMsg('Unable to connect to server. Please try WhatsApp directly.');
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-cream-accent">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="eyebrow">
            <Sparkles size={14} color="#075B35" />
            <span>Connect With Us</span>
          </div>
          <h2 className="section-title">
            Visit Our Kitchen or Plan Your Date
          </h2>
          <p className="section-subtitle">
            Have an upcoming celebration or custom dietary requirements? Reach out directly via WhatsApp, phone, or schedule a food tasting at our Mylapore culinary center.
          </p>
        </div>

        {/* Contact Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
            alignItems: 'start',
          }}
          className="contact-grid"
        >
          <style jsx>{`
            @media (min-width: 1024px) {
              .contact-grid {
                grid-template-columns: 1fr 1.25fr !important;
              }
            }
          `}</style>

          {/* Left Column: Direct Info Card */}
          <div
            style={{
              backgroundColor: '#034226',
              color: '#FFFDF7',
              borderRadius: '2rem',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-lg)',
              border: '2px solid rgba(229, 181, 42, 0.4)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#E5B52A' }}>
                Central Kitchen &amp; Tasting Facility
              </span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', color: '#FFFDF7', marginTop: '0.25rem' }}>
                JayShree Caters
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#E0DDD3', lineHeight: 1.6, marginTop: '0.5rem' }}>
                Operating high-capacity hygienic central commercial kitchens catering events across Tamil Nadu, Karnataka, and Andhra Pradesh.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.92rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <MapPin size={20} color="#E5B52A" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                <div>
                  <strong style={{ color: '#FFFFFF', display: 'block' }}>Culinary Experience Center</strong>
                  <span style={{ color: '#CBD5E1', fontSize: '0.85rem' }}>
                    {siteConfig.address.street}, {siteConfig.address.area},<br />
                    {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.pincode}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <Phone size={19} color="#E5B52A" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                <div>
                  <strong style={{ color: '#FFFFFF', display: 'block' }}>Direct Helpline</strong>
                  <span style={{ color: '#CBD5E1', fontSize: '0.85rem' }}>
                    {siteConfig.phoneDisplay} / {siteConfig.phoneSecondaryDisplay}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <Mail size={19} color="#E5B52A" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                <div>
                  <strong style={{ color: '#FFFFFF', display: 'block' }}>Email Enquiries</strong>
                  <span style={{ color: '#CBD5E1', fontSize: '0.85rem' }}>
                    {siteConfig.email}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <Clock size={19} color="#E5B52A" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                <div>
                  <strong style={{ color: '#FFFFFF', display: 'block' }}>Consultation &amp; Tasting Hours</strong>
                  <span style={{ color: '#CBD5E1', fontSize: '0.85rem' }}>
                    {siteConfig.operatingHours}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ width: '100%' }}
              >
                <MessageCircle size={18} fill="currentColor" />
                <span>Chat on WhatsApp Directly</span>
              </a>
            </div>
          </div>

          {/* Right Column: Direct Form */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '2rem',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid rgba(7, 91, 53, 0.12)',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.75rem',
                color: 'var(--green-dark)',
                marginBottom: '0.4rem',
              }}
            >
              Book Your Function
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
              Booking request? Call us at{' '}
              <a href={`tel:${siteConfig.phone}`} style={{ color: '#075B35', fontWeight: 700, textDecoration: 'underline' }}>
                {siteConfig.phoneDisplay}
              </a>{' '}
              or fill out the reservation form below:
            </p>

            {submitted ? (
              <div
                style={{
                  backgroundColor: 'rgba(39, 174, 96, 0.08)',
                  border: '1.5px solid #27AE60',
                  borderRadius: '1.25rem',
                  padding: '2rem',
                  textAlign: 'center',
                }}
              >
                <CheckCircle size={40} color="#27AE60" style={{ margin: '0 auto 1rem auto' }} />
                <h4 style={{ fontSize: '1.3rem', color: '#034226', marginBottom: '0.5rem' }}>
                  Inquiry Received!
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  We have prepared a prefilled WhatsApp chat with our banquet team for quick coordination.
                </p>
                {waLink && (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                  >
                    <MessageCircle size={18} fill="currentColor" />
                    <span>Open in WhatsApp</span>
                  </a>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {errorMsg && (
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
                    <AlertCircle size={18} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--green-dark)', marginBottom: '0.35rem' }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arun Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.95rem',
                        borderRadius: '0.75rem',
                        border: '1.5px solid rgba(7, 91, 53, 0.15)',
                        backgroundColor: '#FFFDF7',
                        fontSize: '0.9rem',
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
                      required
                      placeholder="+91 98401 23456"
                      value={formData.phone}
                      onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.95rem',
                        borderRadius: '0.75rem',
                        border: '1.5px solid rgba(7, 91, 53, 0.15)',
                        backgroundColor: '#FFFDF7',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--green-dark)', marginBottom: '0.35rem' }}>
                      Celebration Occasion *
                    </label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData((p) => ({ ...p, eventType: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.95rem',
                        borderRadius: '0.75rem',
                        border: '1.5px solid rgba(7, 91, 53, 0.15)',
                        backgroundColor: '#FFFDF7',
                        fontSize: '0.9rem',
                        outline: 'none',
                        color: 'var(--green-dark)',
                        fontWeight: 600,
                      }}
                    >
                      <option value="Wedding / Reception">Wedding / Muhurtham / Reception</option>
                      <option value="Engagement (Nichayathartham)">Engagement (Nichayathartham)</option>
                      <option value="Griha Pravesham">House Warming (Griha Pravesham)</option>
                      <option value="Baby Shower / Seemantham">Baby Shower / Seemantham / Valaikappu</option>
                      <option value="Puberty Function">Puberty (Manjal Neerattu Vizha)</option>
                      <option value="Birthday Celebration">Birthday Party / Milestone</option>
                      <option value="Corporate Event">Corporate Event / Conference</option>
                      <option value="Get Together">Family Get-Together / Feast</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--green-dark)', marginBottom: '0.35rem' }}>
                      Event Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.eventDate}
                      onChange={(e) => setFormData((p) => ({ ...p, eventDate: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.95rem',
                        borderRadius: '0.75rem',
                        border: '1.5px solid rgba(7, 91, 53, 0.15)',
                        backgroundColor: '#FFFDF7',
                        fontSize: '0.9rem',
                        outline: 'none',
                        color: 'var(--text)',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--green-dark)', marginBottom: '0.35rem' }}>
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. arun@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.95rem',
                      borderRadius: '0.75rem',
                      border: '1.5px solid rgba(7, 91, 53, 0.15)',
                      backgroundColor: '#FFFDF7',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--green-dark)', marginBottom: '0.35rem' }}>
                    Message With Event Name, Expected Guests or Venue
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Traditional Banana Leaf Virundhu for 500 guests at Mayor Ramanathan Hall..."
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.95rem',
                      borderRadius: '0.75rem',
                      border: '1.5px solid rgba(7, 91, 53, 0.15)',
                      backgroundColor: '#FFFDF7',
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-sans)',
                      outline: 'none',
                      resize: 'none',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', opacity: submitting ? 0.7 : 1 }}
                >
                  <Send size={18} />
                  <span>{submitting ? 'Submitting...' : 'Submit Event Inquiry'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
