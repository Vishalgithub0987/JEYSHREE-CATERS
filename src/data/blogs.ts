export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'veg-caterers',
    title: 'Veg Catering in K V Kuppam — The Tradition of Arusuvai Feasting',
    category: 'Veg Catering',
    date: '15/09/2026',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Explore how authentic pure vegetarian feasts balance the six sacred tastes (Arusuvai) to bring holistic joy to wedding celebrations.',
  },
  {
    id: 'blog-2',
    slug: 'wedding-caterers',
    title: 'Wedding Caterers — From Marudhani to Maruveedu Celebrations',
    category: 'Wedding',
    date: '08/09/2026',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Everything you need to know about orchestrating flawless Muhurtham breakfasts, royal afternoon plantain leaf meals, and grand reception spreads.',
  },
  {
    id: 'blog-3',
    slug: 'corporate-catering',
    title: 'Corporate Event Catering — High-Tea, Executive Spreads & Summits',
    category: 'Corporate Event',
    date: '03/09/2026',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    excerpt: 'How on-time execution, hygienic multi-course buffets, and artisanal filter coffee stations elevate high-profile corporate conferences.',
  },
];
