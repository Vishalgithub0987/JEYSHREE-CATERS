'use client';

import React from 'react';
import Image from 'next/image';
import { googleReviews } from '@/data/testimonials';
import { Star, CheckCircle } from 'lucide-react';

export const GoogleReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="google-reviews-section">
      <div className="container">
        {/* Title Box */}
        <div className="title-box centered">
          <div className="subtitle">
            <span>Verified Testimonials</span>
          </div>
          <div className="pattern-image">
            <Image 
              src="/images/icons/separator.svg" 
              alt="Separator" 
              width={120} 
              height={24} 
            />
          </div>
          <h2>What Our Customers Say</h2>
        </div>

        {/* Testimonials Grid Container */}
        <div className="google-widget-wrap" style={{ paddingTop: '2.5rem' }}>
          {/* Reviews Grid */}
          <div className="reviews-grid">
            {googleReviews.map((review) => (
              <div key={review.id} className="google-review-card">
                <div>
                  <div className="rev-user-header" style={{ marginBottom: '0.85rem' }}>
                    <div className="rev-user-info">
                      <span className="rev-name" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#052020' }}>
                        {review.name}
                        {review.verified && (
                          <CheckCircle size={15} fill="#075B35" color="#FFFFFF" style={{ marginLeft: '4px' }} />
                        )}
                      </span>
                      <span className="rev-time" style={{ fontSize: '0.8rem', color: '#6B7280', marginTop: '2px' }}>
                        {review.timeAgo}
                      </span>
                    </div>
                  </div>

                  {/* Stars Row */}
                  <div style={{ display: 'flex', gap: '3px', marginBottom: '0.85rem' }}>
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#FFB400" color="#FFB400" />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="rev-text" style={{ fontSize: '0.925rem', lineHeight: 1.6, color: '#374151' }}>
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>

                <div style={{ marginTop: '1.25rem', paddingTop: '0.85rem', borderTop: '1px solid #E5E7EB', fontSize: '0.8rem', color: '#075B35', fontWeight: 600 }}>
                  Event: {review.event}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
