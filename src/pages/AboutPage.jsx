import React from 'react';
import { 
  Sparkles, 
  Award, 
  ShieldCheck, 
  ChefHat, 
  Heart, 
  Clock, 
  Users, 
  UtensilsCrossed, 
  ArrowRight 
} from 'lucide-react';

export function AboutPage({ setActivePage }) {
  return (
    <div className="bg-stone-50 min-h-screen py-16 pb-28 space-y-20">
      
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 rounded-full text-amber-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Heritage Culinary Traditions &bull; Since 2012</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-stone-900 tracking-tight">
          Crafting Feasts Fit for Royalty
        </h1>
        <p className="text-stone-500 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          At Royal Feast Caterers, food is not simply a service — it is an art of hospitality, ancient culinary secret recipes, and memorable celebratory dining.
        </p>
      </div>

      {/* Story & Philosophy Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-200 aspect-[4/3]">
            <img 
              src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80" 
              alt="Culinary Banquet Spread" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-royal-950/70 via-transparent to-transparent flex items-end p-6">
              <p className="text-white font-serif italic text-sm sm:text-base">
                "Every dish carries the aroma of authentic wood-pressed oils, hand-ground spices, and generational warmth."
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700 font-mono">Our Journey</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
              A Legacy of Pure Taste and Flawless Execution
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              Founded under the leadership of master culinarian Chef Rajesh Sharma, Royal Feast was created to bridge grand traditional banquet cooking with modern, tech-enabled menu customization.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              Whether you are feeding an intimate celebration of 50 loved ones or coordinating a monumental wedding feast for 3,000 guests, our kitchen delivers unwavering consistency, pristine temperature management, and radiant guest smiles.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-200">
              <div>
                <span className="font-serif text-3xl font-bold text-amber-700">14+</span>
                <p className="text-xs text-stone-500 mt-0.5">Years of Master Catering</p>
              </div>
              <div>
                <span className="font-serif text-3xl font-bold text-amber-700">1,500+</span>
                <p className="text-xs text-stone-500 mt-0.5">Grand Banquets Managed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Culinary Standards */}
      <div className="bg-white py-16 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl font-bold text-stone-900">Our Uncompromising Standards</h2>
            <p className="text-stone-500 text-sm mt-2">Every catering contract comes with our five-fold guarantee.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-3xl bg-stone-50 border border-stone-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900">Zero Artificial Additives</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                We never use artificial colors or synthetic enhancers. Pure saffron, Kashmiri chilies, and farm dairy only.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-stone-50 border border-stone-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <ChefHat className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900">Specialist Regional Chefs</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Awadhi Biryani ustads, Tandoor masters, and traditional sweet halwais dedicated to their specific craft.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-stone-50 border border-stone-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900">Exact Buffet Timeline</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Buffets open strictly on the dot as per the host's muhurtham or banquet schedule. Zero delays guaranteed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
        <h2 className="font-serif text-3xl font-bold text-stone-900">Ready to Experience the Royal Feast?</h2>
        <p className="text-stone-500 text-sm max-w-lg mx-auto">
          Start browsing dishes now or connect with our catering managers directly over WhatsApp.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setActivePage('menu')}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-royal-950 font-bold text-xs shadow-md"
          >
            Start Menu Selection
          </button>
        </div>
      </div>

    </div>
  );
}
