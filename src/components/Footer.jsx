import React from 'react';
import { 
  UtensilsCrossed, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Heart
} from 'lucide-react';

export function Footer({ setActivePage }) {
  const handleNav = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/919876543210?text=Hello%20Royal%20Feast%20Caterers,%20I%20would%20like%20to%20inquire%20about%20catering%20services.', '_blank');
  };

  return (
    <footer className="bg-royal-950 text-stone-300 border-t border-amber-950/60 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNav('home')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-royal-950 font-bold">
                <UtensilsCrossed className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Royal <span className="text-amber-400">Feast</span>
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              Crafting extraordinary culinary moments for luxury weddings, corporate banquets, and intimate family gatherings across South India with authentic royal traditions.
            </p>
            <div className="pt-2">
              <button
                onClick={openWhatsApp}
                className="inline-flex items-center space-x-2.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat with Head Caterer on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-amber-400 transition-colors">Home</button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-amber-400 transition-colors">About Us</button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-amber-400 transition-colors">Catering Services</button>
              </li>
              <li>
                <button onClick={() => handleNav('menu')} className="hover:text-amber-400 transition-colors">Food Menu & Live Selector</button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-amber-400 transition-colors">Contact Us</button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">Catering</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-stone-400 hover:text-white cursor-pointer" onClick={() => handleNav('services')}>Grand Wedding Banquets</li>
              <li className="text-stone-400 hover:text-white cursor-pointer" onClick={() => handleNav('services')}>Corporate Gala & Luncheons</li>
              <li className="text-stone-400 hover:text-white cursor-pointer" onClick={() => handleNav('services')}>Engagement & Receptions</li>
              <li className="text-stone-400 hover:text-white cursor-pointer" onClick={() => handleNav('services')}>Birthday Celebrations</li>
              <li className="text-stone-400 hover:text-white cursor-pointer" onClick={() => handleNav('services')}>Live Charcoal & Chaat Counters</li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">Contact</h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>No. 42, Heritage Boulevard, Alwarpet, Chennai, TN 600018</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>contact@royalfeastcaterers.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Open Daily: 8:00 AM - 10:00 PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 space-y-4 sm:space-y-0">
          <p className="flex items-center">
            &copy; 2026 Royal Feast Caterers. All Rights Reserved. Crafted with <Heart className="w-3.5 h-3.5 mx-1 text-red-500 fill-current inline" /> for perfect events.
          </p>
          <div className="flex items-center space-x-4">
            <span className="text-stone-400 hover:text-amber-400 cursor-pointer">Privacy Policy</span>
            <span>&bull;</span>
            <span className="text-stone-400 hover:text-amber-400 cursor-pointer">Terms of Service</span>
            <span>&bull;</span>
            <span className="text-stone-400 hover:text-amber-400 cursor-pointer">Food Hygiene Certifications</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
