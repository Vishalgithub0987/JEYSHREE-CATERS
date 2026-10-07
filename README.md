# JayShree Caters — Authentic South Indian Catering & Traditional Feasts

A modern, production-grade web platform for **JayShree Caters**, an authentic South Indian catering and celebration banquet service based in K V Kuppam, Tamil Nadu.

Built with **Next.js (App Router)**, **React**, **TypeScript**, **Pure Vanilla CSS / CSS Modules (No Tailwind)**, **GSAP & GSAP ScrollTrigger**, **Lenis Smooth Scroll**, and **Next.js Image Optimization**.

---

## 🌟 Key Highlights & Architecture

### 1. Auspicious Hero Intro Animation (GSAP)
- Authentic traditional South Indian ceremonial curtain opening animation:
  - Ivory background with subtle golden radiance and floating Kolam motifs.
  - Jasmine and marigold garlands enter from both sides, forming an auspicious traditional wedding arch.
  - Sacred JayShree Caters emblem logo reveals in center with golden rays.
  - Garlands part open like a traditional mandap curtain, revealing the hero section.
  - Fast-path skip and repeat-visit detection via `sessionStorage` and `prefers-reduced-motion` support.

### 2. DB-Less Centralized Content Architecture
The platform is completely database-free, eliminating fragile JSON flat files or ORM dependencies while keeping content 100% dynamic and configurable:
- `src/data/site.ts`: Central business metadata, phone numbers, WhatsApp, Mylapore address, operating hours, and metrics.
- `src/data/services.ts`: Catering service packages with guest capacities, description, and highlights.
- `src/data/menu.ts`: 40+ authentic dishes spanning Starters, Biryani & Traditional Rice, Curries & Main Course, Breads, Pachadi & Accompaniments, Desserts & Sweets, and Beverages.
- `src/data/bananaLeaf.ts`: Traditional Plantain Leaf Feast (Arusuvai Virundhu) sequential arrangement rules and descriptions.
- `src/data/events.ts`: Occasion packages (Weddings, Griha Pravesham, Receptions, Corporate Galas, Milestones).
- `src/data/gallery.ts`: Editorial photography categorized by feast type.
- `src/data/testimonials.ts`: Verified South Indian host reviews.

### 3. Live Menu Curation & Practical WhatsApp Enquiry Flow
- Instant live dish selection ("Select" / "✓ Selected") with category and dietary filters (Pure Veg vs. Non-Veg).
- Dish Details Modal showing culinary notes, stone-ground spices, and ingredients.
- Slide-out Selection Review Drawer with full form validation:
  - Full Name (required)
  - Mobile / WhatsApp Number (validated for 10 digits)
  - Celebration Occasion & Date
  - Expected Guest Count
  - Event Location / Hall
  - Special Dietary & Service Notes
- Submits to `/api/enquiry` with server-side validation and automatically generates a formatted WhatsApp inquiry link:
  ```
  🙏 NAMASKARAM JAYSHREE CATERS
  I would like to enquire about catering for an upcoming celebration.
  
  👤 Name: [Customer Name]
  📞 Phone: [Customer Phone]
  🎉 Event: Wedding / Muhurtham
  📅 Event Date: [Date]
  👥 Expected Guests: [Count]
  📍 Location: [Venue]
  
  🍽️ SELECTED MENU ITEMS (X):
    1. Medu Vada (Starters • Veg)
    2. Ennai Kathirikai (Main Course • Veg)
    ...
  ```

### 4. Visual Identity & Design System
- Strictly complies with the 70% Ivory / 20% Forest Green / 8% Warm Gold / 2% Accent brand palette:
  - `--green: #075B35;`
  - `--green-dark: #034226;`
  - `--gold: #E5B52A;`
  - `--gold-soft: #F4D98A;`
  - `--ivory: #FFFDF7;`
  - `--cream: #F7F3E8;`
  - `--text: #173B2A;`
- Pure Vanilla CSS styling (No Tailwind CSS).
- Google Fonts: *Playfair Display*, *Cormorant Garamond*, and *Inter*.

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 3. Production Build & Execution
```bash
npm run build
npm run start
```

---

## 🛠️ Verification Checklist

- [x] Next.js App Router with TypeScript strict typing
- [x] Zero database dependencies (Prisma, PostgreSQL, MySQL, Mongo, SQLite, flat JSON files removed)
- [x] Zero Tailwind CSS (Pure CSS design system)
- [x] GSAP Hero opening animation with jasmine/marigold garlands and skip mechanism
- [x] Lenis smooth scrolling with `prefers-reduced-motion` compliance
- [x] Next.js Image optimization (`next/image`)
- [x] 40+ authentic dishes with live selection and ingredient modals
- [x] Traditional Banana Leaf Feast feature section
- [x] Server-validated API endpoints (`/api/enquiry`, `/api/contact`)
- [x] Centralized WhatsApp helper generating dynamic URLs
- [x] Mobile sticky Call / WhatsApp CTA
- [x] SEO metadata & LocalBusiness JSON-LD schema
- [x] Production build passes with 0 errors

---

## 📄 License & Credits
&copy; 2026 JayShree Caters. All Rights Reserved. Handcrafted for authentic South Indian celebrations.
