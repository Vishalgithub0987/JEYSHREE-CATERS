import type { Metadata } from 'next';
import '@/styles/globals.css';
import { siteConfig } from '@/data/site';
import { SelectionProvider } from '@/context/SelectionContext';
import { SmoothScroll } from '@/components/SmoothScroll';

export const metadata: Metadata = {
  title: `${siteConfig.name} | Authentic South Indian Catering & Traditional Feasts`,
  description: `${siteConfig.tagline}. Authentic South Indian catering for grand weddings, muhurthams, housewarmings, and corporate feasts across Tamil Nadu and South India. 100% pure cow ghee and wood-pressed oils.`,
  keywords: [
    'JayShree Caters',
    'South Indian Catering K V Kuppam',
    'Vegetarian and Non-Vegetarian Catering',
    'Traditional Banana Leaf Feast',
    'Wedding Catering K V Kuppam',
    'Non-Veg Catering K V Kuppam',
    'Pure Vegetarian Feasts',
    'Ambur Biryani Catering',
    'Muhurtham Catering',
    'Brahmin Catering K V Kuppam',
    'Chettinad Non-Veg Catering',
    'Catering Food Menu Selection',
    'K V Kuppam Catering',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.jayshreecaters.com'),
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.headline}`,
    description: siteConfig.subheadline,
    url: 'https://www.jayshreecaters.com',
    siteName: siteConfig.name,
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/images/logo.jpeg', type: 'image/jpeg' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/images/logo.jpeg',
    apple: [
      { url: '/images/logo.jpeg', type: 'image/jpeg' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.subheadline,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.area,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.pincode,
      addressCountry: 'IN',
    },
    servesCuisine: ['South Indian', 'Traditional Feasts', 'Pure Vegetarian', 'Non-Vegetarian Specialties', 'Chettinad', 'Biryani Varieties'],
    priceRange: '₹₹',
    openingHours: 'Mo-Su 07:00-22:00',
    areaServed: siteConfig.serviceAreas,
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/logo.jpeg" type="image/jpeg" />
        <link rel="shortcut icon" href="/images/logo.jpeg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/images/logo.jpeg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,600&family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;1,600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SmoothScroll>
          <SelectionProvider>
            {children}
          </SelectionProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
