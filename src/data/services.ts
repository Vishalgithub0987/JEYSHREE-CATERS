export interface JayShreeService {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  badge?: string;
  highlights?: string[];
}

export type SubikshamService = JayShreeService;

export const allServices: SubikshamService[] = [
  {
    id: 'catering',
    title: 'Catering',
    slug: 'catering',
    description: 'Authentic four-generation catering offering pure vegetarian feasts and flavorful non-vegetarian celebrations with traditional Arusuvai recipes, wood-pressed oils, and signature biryanis.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    badge: 'Signature',
  },
  {
    id: 'supplier-service-buffet',
    title: 'Supplier Service / Buffet',
    slug: 'supplier-service-buffet',
    description: 'Professional, uniformed hospitality service staff and elegant buffet setups ensuring courteous, prompt, and hygienic serving for all your guests.',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    badge: 'Popular',
  },
  {
    id: 'tea-stall-coffee-corner',
    title: 'Tea Stall / Coffee Corner',
    slug: 'tea-stall-coffee-corner',
    description: 'Live traditional Kumbakonam degree filter coffee and aromatic specialty tea counter brewed fresh to energize guests throughout your event.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ice-cream-beeda-popcorn-corner',
    title: 'Ice Cream / Beeda / Popcorn Corner',
    slug: 'ice-cream-beeda-popcorn-corner',
    description: 'Delightful fun corner offering assorted premium ice cream flavors, authentic Calcutta sweet beeda (paan), and warm crunchy popcorn.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'fruits-corner',
    title: 'Fruits Corner',
    slug: 'fruits-corner',
    description: 'Exotic seasonal and tropical fruit counter carved and presented artistically, providing a fresh, nutritious, and vibrant experience.',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'welcome-girls',
    title: 'Welcome Girls',
    slug: 'welcome-girls',
    description: 'Gracious, traditionally attired hostesses offering warm traditional hospitality, rose water, sandalwood paste, and welcoming your valued guests.',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'stage-and-entrance-decorations',
    title: 'Stage and Entrance Decorations',
    slug: 'stage-and-entrance-decorations',
    description: 'Breathtaking floral stages, majestic grand entrance arches, authentic traditional mandap designs, and fairy light ambiance tailored to your theme.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    badge: 'Exquisite',
  },
  {
    id: 'bouncers',
    title: 'Bouncers',
    slug: 'bouncers',
    description: 'Trained, disciplined, and alert security and bouncer personnel ensuring crowd control, VIP guest coordination, and seamless event safety.',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'photography',
    title: 'Photography',
    slug: 'photography',
    description: 'Candid and traditional wedding photography and videography capturing candid smiles, auspicious rituals, and timeless memories forever.',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dj-light-music',
    title: 'DJ / Light Music',
    slug: 'dj-light-music',
    description: 'Energetic live DJ performances, classical instrumentals, or soulful carnatic and cinema light music ensembles tailored for receptions and sangeets.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'return-gifts-thambulam-thattuvarisai',
    title: 'Return Gifts / Thambulam / Thattuvarisai',
    slug: 'return-gifts-thambulam-thattuvarisai',
    description: 'Custom curated Thamboolam bags, divine Thattu Varisai platters, and eco-friendly tree saplings or traditional gift sets presented with reverence.',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
    badge: 'Traditional',
  },
  {
    id: 'golu-corner',
    title: 'Golu Corner',
    slug: 'golu-corner',
    description: 'Auspicious traditional doll arrangements and thematic Golu padi setups handcrafted with sacred craftsmanship for devotional and festive elegance.',
    image: 'https://images.unsplash.com/photo-1609137144822-5443cf1e138a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mehndi-corner',
    title: 'Mehndi Corner',
    slug: 'mehndi-corner',
    description: 'Skilled bridal mehndi artists creating intricate Rajasthani, Arabic, and bridal henna patterns for brides and guests in a festive setting.',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
  },
];

export const cateringServices = allServices;
