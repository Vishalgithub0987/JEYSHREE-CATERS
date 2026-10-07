'use client';

import React, { useState } from 'react';
import { faqs, FAQItem } from '@/data/faqs';
import { Plus } from 'lucide-react';
import { siteConfig } from '@/data/site';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        {/* Title */}
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-subtitle">
          Everything you need to know about booking, menus, and our vegetarian &amp; non-vegetarian catering in K V Kuppam
        </div>

        {/* FAQ Accordion List */}
        <div className="faq-accordion-wrap">
          {faqs.map((faq: FAQItem) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="faq-item">
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  className={`faq-question ${isOpen ? 'active' : ''}`}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">
                    <Plus size={22} />
                  </span>
                </button>

                <div className={`faq-answer ${isOpen ? 'show' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '1.25rem', fontSize: '1rem' }}>
            Still have questions about your upcoming function? We are always here to help.
          </p>
          <a href={`tel:${siteConfig.phone}`} className="theme-btn btn-style-one">
            <span>Call Our Banquet Manager: {siteConfig.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
