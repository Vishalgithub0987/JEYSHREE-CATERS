import { redirect } from 'next/navigation';

const sectionMap: Record<string, string> = {
  index: '/',
  home: '/',
  'about-us': '/#story',
  about: '/#story',
  services: '/#services',
  catering: '/#services',
  'supplier-service-buffet': '/#services',
  'tea-stall-coffee-corner': '/#services',
  'ice-cream-beeda-popcorn-corner': '/#services',
  'fruits-corner': '/#services',
  'welcome-girls': '/#services',
  'stage-and-entrance-decorations': '/#services',
  bouncers: '/#services',
  photography: '/#services',
  'dj-light-music': '/#services',
  'return-gifts-thambulam-thattuvarisai': '/#services',
  'golu-corner': '/#services',
  'mehndi-corner': '/#services',
  'best-wedding-catering-services-in-kv-kuppam': '/#services',
  'corporate-catering-services-in-kv-kuppam': '/#services',
  'best-wedding-planners-in-kv-kuppam': '/#services',
  'event-planners-in-kv-kuppam': '/#services',
  'get-together-catering-services-in-kv-kuppam': '/#services',
  'engagement-catering-services-kv-kuppam': '/#services',
  'birthday-party-catering-services-in-kv-kuppam': '/#services',
  'catering-service-for-house-warming-in-kv-kuppam': '/#services',
  'puberty-function-catering-service-in-kv-kuppam': '/#services',
  'caterers-for-baby-showers-in-kv-kuppam': '/#services',
  'best-wedding-photographers-in-kv-kuppam': '/#services',
  'wedding-decorators-in-kv-kuppam': '/#services',
  menus: '/menu',
  gallery: '/#gallery',
  blogs: '/',
  'veg-caterers': '/#services',
  'wedding-caterers': '/#services',
  'corporate-catering': '/#services',
  reviews: '/#reviews',
  testimonials: '/#reviews',
  faq: '/',
  contact: '/#reserve',
  'contact-us': '/#reserve',
  'social-media': '/#reserve',
};

export default function CatchAllSlugPage({ params }: { params: { slug?: string[] } }) {
  const slugs = params?.slug || [];
  const first = slugs[0]?.toLowerCase() || '';
  const last = slugs[slugs.length - 1]?.toLowerCase() || '';

  const destination = sectionMap[last] || sectionMap[first] || '/';
  redirect(destination);
}
