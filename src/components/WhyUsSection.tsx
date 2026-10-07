'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Award, Users, HeartHandshake } from 'lucide-react';

export const WhyUsSection: React.FC = () => {
  return (
    <section id="why-us" className="why-us">
      <div className="container">
        {/* Title Box */}
        <div className="title-box centered">
          <div className="subtitle">
            <span>Why Trust Us</span>
          </div>
          <div className="pattern-image">
            <Image 
              src="/images/icons/separator.svg" 
              alt="Separator" 
              width={120} 
              height={24} 
            />
          </div>
          <h2>Our Core Competencies</h2>
        </div>

        {/* 4 Competency Blocks */}
        <div className="why-grid">
          {/* Block 1 */}
          <div className="why-block">
            <div className="icon-box">
              <Award size={32} />
            </div>
            <h4>4 Generations of Trust</h4>
            <div className="text">
              Carrying forward an auspicious legacy started in the 1960s, passed with devotion through four generations of hotel &amp; food-service mastery.
            </div>
          </div>

          {/* Block 2 */}
          <div className="why-block">
            <div className="icon-box">
              <ShieldCheck size={32} />
            </div>
            <h4>Clean &amp; Safe Cuisine</h4>
            <div className="text">
              Sterile hygiene protocols, purified RO water, authentic wood-pressed oils, pure cow ghee, and zero artificial flavors.
            </div>
          </div>

          {/* Block 3 */}
          <div className="why-block">
            <div className="icon-box">
              <Users size={32} />
            </div>
            <h4>1000+ Events Served</h4>
            <div className="text">
              Over 40+ years of catering excellence trusted by thousands of families across North Tamil Nadu for weddings and milestones.
            </div>
          </div>

          {/* Block 4 */}
          <div className="why-block">
            <div className="icon-box">
              <HeartHandshake size={32} />
            </div>
            <h4>Modern Event Management</h4>
            <div className="text">
              Under Mr. P. Amarnath&apos;s leadership, we provide end-to-end banquet orchestration, dining hall management, and warm hospitality.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
