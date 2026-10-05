import React from 'react';
import { 
  Sparkles, 
  UtensilsCrossed, 
  Flame, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Coffee,
  Wine
} from 'lucide-react';

export function ServicesPage({ setActivePage }) {
  const services = [
    {
      title: 'Grand Wedding Banquets',
      description: 'Lavish multi-course wedding dining setups featuring authentic traditional sweets, live welcome drinks, aromatic Dum Biryanis, and royal dining etiquette.',
      guests: '150 to 5,000+ Guests',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      highlights: ['Traditional Banana Leaf or Luxury Buffet', 'Live Tandoor & Chaat Counters', 'Pre-Wedding Sangeet & Reception Dining']
    },
    {
      title: 'Corporate Galas & Networking Luncheons',
      description: 'Sophisticated executive buffet setups designed for punctuality, dietary variety, and seamless conference breaks for MNCs and business summits.',
      guests: '50 to 1,500 Guests',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      highlights: ['Punctual Multi-Course Executive Lunches', 'Networking Hi-Tea & Gourmet Appetizers', 'Corporate Festive Annual Feasts']
    },
    {
      title: 'Engagement & Reception Galas',
      description: 'Stunning thematic buffets tailored to contemporary cocktail evenings, ring ceremonies, and celebratory dinners.',
      guests: '100 to 800 Guests',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
      highlights: ['Signature Mocktail Bars', 'Live Pasta & Kebab Counters', 'Artisanal Dessert Displays']
    },
    {
      title: 'Birthday Parties & Intimate Gatherings',
      description: 'Fun, vibrant food menus crafted for milestone birthdays, housewarming rituals, and family reunions with crowd-pleasing appetizers.',
      guests: '30 to 250 Guests',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80',
      highlights: ['Kid-Friendly & Mild Spiced Delicacies', 'Crispy Starters on Circulation', 'Customized Cake-Cutting Refreshments']
    },
    {
      title: 'Live Cooking & Interactive Food Stations',
      description: 'Theatrical cooking experiences where chefs prepare crispy dosa varieties, steaming hot roomali rotis, and freshly spun jalebis live before guests.',
      guests: 'All Event Scales',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      highlights: ['Live Charcoal Tandoor Skewers', 'Delhi & Mumbai Chaat Stations', 'Live Flambe & Hot Halwa Counters']
    },
    {
      title: 'Gourmet Packed Meal Trays & Outdoor Catering',
      description: 'Hygienically heat-sealed luxury meal boxes delivered hot to shooting locations, bus excursions, or outdoor ceremonies.',
      guests: '25 to 1,000 Boxes',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      highlights: ['Leak-Proof Biodegradable Compartments', 'Hot Insulated Delivery', 'Customizable Veg & Non-Veg Assortments']
    }
  ];

  return (
    <div className="bg-stone-50 min-h-screen py-16 pb-28 space-y-16">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 rounded-full text-amber-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Tailored Event Dining</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
          Catering Services &amp; Packages
        </h1>
        <p className="text-stone-500 text-base max-w-2xl mx-auto">
          Explore our range of hospitality setups designed to match any celebration scale, dietary preference, and venue aesthetic.
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc, i) => (
            <div key={i} className="bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="aspect-[16/10] w-full bg-stone-100 overflow-hidden relative">
                  <img src={svc.image} alt={svc.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  <span className="absolute bottom-3 right-3 bg-royal-950/80 text-amber-300 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
                    {svc.guests}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-serif font-bold text-xl text-stone-900">{svc.title}</h3>
                  <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">{svc.description}</p>
                  
                  <div className="pt-2 space-y-1.5 border-t border-stone-100">
                    {svc.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs text-stone-700">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setActivePage('menu')}
                  className="w-full py-2.5 rounded-xl bg-stone-50 hover:bg-amber-500 hover:text-royal-950 text-stone-800 text-xs font-bold border border-stone-200 hover:border-amber-500 transition-all flex items-center justify-center space-x-1"
                >
                  <span>Build Menu for This Event</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
