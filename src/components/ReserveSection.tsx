'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/data/site';
import { Phone, CheckCircle2, MessageCircle, Send } from 'lucide-react';

export const ReserveSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Submit to API endpoint
      await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.name,
          phone: formData.phone,
          email: formData.email,
          eventDate: formData.date,
          notes: formData.message,
          selectedDishes: [],
        }),
      });

      // 2. Open WhatsApp with formatted message
      const text = `🙏 *NAMASKARAM JAYSHREE CATERS*\nI would like to book catering for an upcoming function.\n\n👤 *Name:* ${formData.name}\n📞 *Phone:* ${formData.phone}\n📧 *Email:* ${formData.email}\n📅 *Event Date:* ${formData.date}\n📝 *Event Details:* ${formData.message}`;
      const waUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
      
      setIsSuccess(true);
      window.open(waUrl, '_blank');
    } catch {
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reserve" className="reserve-section">
      <div className="container">
        <div className="reserve-outer-box">
          <div className="reserve-row">
            {/* Left Column: Booking Form */}
            <div className="reserv-col">
              <div className="title">
                <h2>Book Your Function</h2>
                <div className="request-info">
                  Booking request{' '}
                  <a href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a>{' '}
                  or fill out the order form below
                </div>
              </div>

              {isSuccess ? (
                <div
                  style={{
                    backgroundColor: 'rgba(200, 159, 92, 0.15)',
                    border: '1.5px solid #C89F5C',
                    borderRadius: '8px',
                    padding: '2rem',
                    textAlign: 'center',
                    color: '#FFFFFF',
                  }}
                >
                  <CheckCircle2 size={48} color="#E4C590" style={{ margin: '0 auto 1rem auto' }} />
                  <h3 style={{ color: '#E4C590', marginBottom: '0.5rem', fontSize: '1.5rem' }}>
                    Function Enquiry Received!
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '1.5rem' }}>
                    Thank you, {formData.name}. Our banquet manager is reviewing your requirements and will connect with you within 2 hours.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="theme-btn btn-style-one"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="reservation-form">
                  <div className="form-grid">
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number (10 Digits)"
                        pattern="[0-9]{10}"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <input
                        type="date"
                        name="date"
                        placeholder="Event Date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>
                    <div className="col-full">
                      <textarea
                        name="message"
                        placeholder="Message with Event Name (e.g. Wedding, House Warming, Birthday) & Expected Guests !"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>
                    <div className="col-full" style={{ marginTop: '0.5rem' }}>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="theme-btn btn-style-one"
                        style={{ width: '100%' }}
                      >
                        <Send size={18} style={{ marginRight: '0.5rem' }} />
                        <span>{isSubmitting ? 'Booking...' : 'Book Now!'}</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Direct Catering Consultation */}
            <div className="info-col">
              <div style={{ width: '100%', maxWidth: '380px', color: '#FFFFFF' }}>
                <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', marginBottom: '1.5rem', boxShadow: '0 8px 25px rgba(0,0,0,0.4)' }}>
                  <Image 
                    src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80" 
                    alt="JayShree Caters K V Kuppam Celebrations" 
                    width={380} 
                    height={220}
                    style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(5,32,32,0.95), transparent)', padding: '1rem' }}>
                    <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#E4C590', fontWeight: 700 }}>Direct Consultation</span>
                    <h4 style={{ color: '#FFFFFF', fontSize: '1.15rem', margin: 0 }}>Speak with Our Head Chef</h4>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      padding: '0.85rem 1.15rem',
                      backgroundColor: 'rgba(200, 159, 92, 0.15)',
                      border: '1px solid rgba(200, 159, 92, 0.4)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#C89F5C', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Phone size={18} color="#052020" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#E4C590', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Call Banquet Desk</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>{siteConfig.phoneDisplay}</div>
                    </div>
                  </a>

                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hello JayShree Caters, I would like to consult regarding catering services for an upcoming function.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      padding: '0.85rem 1.15rem',
                      backgroundColor: 'rgba(37, 211, 102, 0.15)',
                      border: '1px solid rgba(37, 211, 102, 0.4)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MessageCircle size={18} color="#FFFFFF" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#85E3A3', textTransform: 'uppercase', letterSpacing: '0.05em' }}>WhatsApp Chat</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>Chat with Manager</div>
                    </div>
                  </a>

                  <div style={{ padding: '0.85rem 1rem', background: 'rgba(255,255,255,0.04)', borderRadius: '8px', fontSize: '0.825rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
                    <strong style={{ color: '#E4C590', display: 'block', marginBottom: '0.25rem' }}>Kitchen &amp; Banquet Office</strong>
                    {siteConfig.address.street}, {siteConfig.address.city} • {siteConfig.operatingHours}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
