'use client';

import React from 'react';
import { LandingIntro } from '@/components/LandingIntro';
import { Navbar } from '@/components/Navbar';
import { HomeBanner } from '@/components/HomeBanner';
import { StorySection } from '@/components/StorySection';
import { ServicesSection } from '@/components/ServicesSection';
import { SpecialDishSection } from '@/components/SpecialDishSection';
import { MenuSneakPeekSection } from '@/components/MenuSneakPeekSection';
import { BananaLeafFeature } from '@/components/BananaLeafFeature';
import { WhyUsSection } from '@/components/WhyUsSection';
import { IntroSection } from '@/components/IntroSection';
import { ReserveSection } from '@/components/ReserveSection';
import { GoogleReviewsSection } from '@/components/GoogleReviewsSection';
import { Footer } from '@/components/Footer';
import { MobileStickyCTA } from '@/components/MobileStickyCTA';
import { FoodModal } from '@/components/FoodModal';
import { SelectionReviewDrawer } from '@/components/SelectionReviewDrawer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';

export default function HomePage() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Cinematic Landing Intro with Banana Tree Foliage & Parallax */}
      <LandingIntro
        onEnter={() => {
          if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            const heroEl = document.getElementById('hero');
            if (heroEl) {
              heroEl.scrollIntoView({ behavior: 'instant', block: 'start' });
            }
          }
        }}
      />

      {/* 2. Global Header & Navigation (Top Bar + Main Nav + Hidden Bar Drawer) */}
      <Navbar />

      <main style={{ flex: 1 }}>
        {/* 3. Hero Multi-Language Banner Slider (English, Tamil, Telugu, Malayalam) */}
        <HomeBanner />

        {/* 4. Story Section (Elevate Your Celebrations & Founder/CEO Leadership) */}
        <StorySection />

        {/* 5. Services Section (13 Comprehensive Catering & Event Services) */}
        <ServicesSection />

        {/* 6. Special Dish / Story ("Best Veg Catering Services in K V Kuppam") */}
        <SpecialDishSection />

        {/* 7. Menu Sneak Peek ("Delectable Dishes") */}
        <MenuSneakPeekSection />

        {/* 8. Dedicated Banana Leaf / Traditional Feast Feature */}
        <BananaLeafFeature />


        {/* 10. Why Us Section ("Our Core Competencies") */}
        <WhyUsSection />

        {/* 11. Fact Counter (9154+ Clients, 9251+ Projects, 349+ Chefs, 40+ Years, 10000+ Guests) */}
        <IntroSection />

        {/* 12. "Book Your Function" Reservation Form */}
        <ReserveSection />

        {/* 13. Verified Customer Google Reviews 4.9 Stars Widget */}
        <GoogleReviewsSection />
      </main>

      {/* 16. Global Footer */}
      <Footer />

      {/* 17. Mobile Sticky CTA Bar */}
      <MobileStickyCTA />

      {/* 18. Dish Details Modal */}
      <FoodModal />

      {/* 19. Interactive Selection Review & WhatsApp Enquiry Drawer */}
      <SelectionReviewDrawer />

      {/* 20. Floating WhatsApp Chat Widget & Preview Popup */}
      <FloatingWhatsApp />
    </div>
  );
}
