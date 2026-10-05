import React, { useEffect, useState } from 'react';
import { useSelection } from '../context/SelectionContext';
import { useAuth } from '../context/AuthContext';
import { FoodCard } from '../components/FoodCard';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  UtensilsCrossed, 
  Clock, 
  ShieldCheck, 
  HeartHandshake, 
  Star, 
  ChevronRight,
  Flame,
  Award
} from 'lucide-react';

export function HomePage({ setActivePage, onOpenFoodDetails }) {
  const { user, isAuthenticated } = useAuth();
  const [popularFoods, setPopularFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/foods')
      .then(res => res.json())
      .then(data => {
        // Pick 6 popular items across categories
        const featured = data.slice(0, 6);
        setPopularFoods(featured);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-royal-950 text-white overflow-hidden">
        {/* Background Image with luxury dark gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=2000&q=80"
            alt="Royal Indian Catering Buffet Feast"
            className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-105 scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-royal-950 via-royal-950/60 to-transparent"></div>
          <div className="absolute inset-0 bg-radial-gradient"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24 sm:py-32">
          
          <div className="inline-flex items-center space-x-2 bg-amber-500/15 border border-amber-500/40 px-4 py-1.5 rounded-full text-amber-300 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Award-Winning Authentic Catering &amp; Live Buffets</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight sm:leading-none">
            Delicious Food. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
              Perfect Events.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
            Choose your favorite dishes and create your perfect catering menu in just a few clicks. Real-time selection with instant WhatsApp confirmation.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setActivePage('menu')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-royal-950 font-bold text-base shadow-xl hover:shadow-glow flex items-center justify-center space-x-3 transition-all transform hover:-translate-y-0.5"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {!isAuthenticated ? (
              <button
                onClick={() => setActivePage('register')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-stone-900/80 hover:bg-stone-800 text-white font-semibold text-base border border-stone-700/80 backdrop-blur-md flex items-center justify-center space-x-2 transition-all"
              >
                <span>Login / Register</span>
              </button>
            ) : (
              <button
                onClick={() => setActivePage('customer-dashboard')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-stone-900/80 hover:bg-stone-800 text-white font-semibold text-base border border-stone-700/80 backdrop-blur-md flex items-center justify-center space-x-2 transition-all"
              >
                <span>Go to Customer Dashboard</span>
              </button>
            )}
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-stone-800/80 max-w-4xl mx-auto">
            <div>
              <p className="font-serif text-3xl font-bold text-amber-400">1,500+</p>
              <p className="text-xs text-stone-400 uppercase tracking-wider mt-1">Events Catered</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-bold text-amber-400">40+</p>
              <p className="text-xs text-stone-400 uppercase tracking-wider mt-1">Royal Dishes</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-bold text-amber-400">100%</p>
              <p className="text-xs text-stone-400 uppercase tracking-wider mt-1">Hygiene Certified</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-bold text-amber-400">4.9 ★</p>
              <p className="text-xs text-stone-400 uppercase tracking-wider mt-1">Customer Rating</p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. HOW IT WORKS (Requirement 3: 4-Step Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 font-mono">Simple &amp; Seamless</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
            How It Works
          </h2>
          <p className="text-stone-500 text-sm sm:text-base mt-3">
            Build and finalize your dream catering menu in four simple steps without endless phone calls.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Step 1 */}
          <div className="relative bg-white rounded-3xl p-8 border border-stone-200 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all group">
            <span className="font-serif text-4xl font-extrabold text-amber-200 group-hover:text-amber-500 transition-colors">
              01
            </span>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center my-4 group-hover:scale-110 transition-transform">
              <CheckCircle className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">Create Account</h3>
            <p className="text-stone-500 text-xs sm:text-sm mt-2 leading-relaxed">
              Register and create your customer profile with event dates, guest counts, and location.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative bg-white rounded-3xl p-8 border border-stone-200 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all group">
            <span className="font-serif text-4xl font-extrabold text-amber-200 group-hover:text-amber-500 transition-colors">
              02
            </span>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center my-4 group-hover:scale-110 transition-transform">
              <UtensilsCrossed className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">Explore Menu</h3>
            <p className="text-stone-500 text-xs sm:text-sm mt-2 leading-relaxed">
              Browse our wide range of catering dishes across Starters, Biryani, Curries, Breads, and Desserts.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative bg-white rounded-3xl p-8 border border-stone-200 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all group">
            <span className="font-serif text-4xl font-extrabold text-amber-200 group-hover:text-amber-500 transition-colors">
              03
            </span>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center my-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">Select Your Favorites</h3>
            <p className="text-stone-500 text-xs sm:text-sm mt-2 leading-relaxed">
              Click the foods you want for your event. Watch your selection assemble live in real-time.
            </p>
          </div>

          {/* Step 4 */}
          <div className="relative bg-white rounded-3xl p-8 border border-stone-200 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all group">
            <span className="font-serif text-4xl font-extrabold text-amber-200 group-hover:text-amber-500 transition-colors">
              04
            </span>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center my-4 group-hover:scale-110 transition-transform">
              <HeartHandshake className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">Send Your Selection</h3>
            <p className="text-stone-500 text-xs sm:text-sm mt-2 leading-relaxed">
              Submit your selection and receive instant, beautifully formatted details through WhatsApp.
            </p>
          </div>

        </div>
      </section>

      {/* 3. POPULAR FOODS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 font-mono">Culinary Masterpieces</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
              Popular Catering Dishes
            </h2>
            <p className="text-stone-500 text-sm mt-2 max-w-xl">
              Hand-picked favorites frequently chosen for grand weddings and executive banquets.
            </p>
          </div>
          <button
            onClick={() => setActivePage('menu')}
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-amber-700 hover:text-amber-800 font-bold text-sm"
          >
            <span>View Full 40+ Food Menu</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-72 rounded-2xl bg-stone-200 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularFoods.map(food => (
              <FoodCard key={food.id} food={food} onOpenDetails={onOpenFoodDetails} />
            ))}
          </div>
        )}
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="bg-stone-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-mono">The Royal Standard</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2">
              Why Cater with Royal Feast?
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-3">
              We bring restaurant-grade elegance and authentic heritage taste directly to your venue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-stone-800/80 p-8 rounded-3xl border border-stone-700">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-6">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-white">Live On-Site Charcoal Cooking</h3>
              <p className="text-stone-300 text-xs sm:text-sm mt-3 leading-relaxed">
                Piping-hot tandoori rotis, live dosa counters, and fresh skewered tikkas prepared right before your guests for peak flavor and theatre.
              </p>
            </div>

            <div className="bg-stone-800/80 p-8 rounded-3xl border border-stone-700">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-white">FSSAI Certified Strict Hygiene</h3>
              <p className="text-stone-300 text-xs sm:text-sm mt-3 leading-relaxed">
                Uncompromising hygiene standards, temperature-controlled transport vessels, and certified food handlers ensure absolute peace of mind.
              </p>
            </div>

            <div className="bg-stone-800/80 p-8 rounded-3xl border border-stone-700">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-white">Impeccable Timing &amp; Service Staff</h3>
              <p className="text-stone-300 text-xs sm:text-sm mt-3 leading-relaxed">
                Uniformed professional banquet servers and banquet managers guarantee that your buffet opens sharp on schedule without delays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CATERING SERVICES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 font-mono">Specialized Dining</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
            Our Catering Services
          </h2>
          <p className="text-stone-500 text-sm mt-2">
            Tailored dining experiences designed around your celebration scale and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all">
            <img 
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80" 
              alt="Weddings" 
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="font-serif font-bold text-xl text-stone-900">Grand Wedding Banquets</h3>
              <p className="text-stone-500 text-xs sm:text-sm mt-2 leading-relaxed">
                Multi-course royal feasts from welcome sherbets to late-night biryani stations for 100 to 5,000+ guests.
              </p>
              <button onClick={() => setActivePage('services')} className="mt-4 text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center space-x-1">
                <span>Learn more</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all">
            <img 
              src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80" 
              alt="Corporate Events" 
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="font-serif font-bold text-xl text-stone-900">Corporate Galas &amp; Conferences</h3>
              <p className="text-stone-500 text-xs sm:text-sm mt-2 leading-relaxed">
                Punctual, elegant executive buffets, networking hi-teas, and boxed gourmet luncheons for corporate summits.
              </p>
              <button onClick={() => setActivePage('services')} className="mt-4 text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center space-x-1">
                <span>Learn more</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all">
            <img 
              src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80" 
              alt="Family Parties" 
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="font-serif font-bold text-xl text-stone-900">Birthdays &amp; Receptions</h3>
              <p className="text-stone-500 text-xs sm:text-sm mt-2 leading-relaxed">
                Joyful menus featuring live chaat counters, artisanal mocktail bars, and decadent dessert spreads.
              </p>
              <button onClick={() => setActivePage('services')} className="mt-4 text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center space-x-1">
                <span>Learn more</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CUSTOMER REVIEWS */}
      <section className="bg-amber-50/60 py-20 border-y border-amber-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700 font-mono">Testimonials</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
              Loved by Over 1,500 Hosts
            </h2>
            <p className="text-stone-600 text-sm mt-2">
              Read how our live menu selection and culinary excellence delighted their guests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-amber-100 flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-stone-700 text-sm italic leading-relaxed">
                  "Selecting our wedding dishes online and getting instant WhatsApp confirmation saved us days of back-and-forth. The Dum Biryani and Rasmalai were legendary!"
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-100">
                <p className="font-bold text-sm text-stone-900">Vishal &amp; Sneha Sangeeth</p>
                <p className="text-xs text-stone-400">Wedding Reception • 450 Guests</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-amber-100 flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-stone-700 text-sm italic leading-relaxed">
                  "We hosted an annual leadership summit for 300 delegates. The executive lunch buffet, especially the Butter Chicken and live Naan counter, received non-stop praise."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-100">
                <p className="font-bold text-sm text-stone-900">Kavita Narayanan</p>
                <p className="text-xs text-stone-400">Corporate Head, TechSphere</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-amber-100 flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-stone-700 text-sm italic leading-relaxed">
                  "The online menu with ingredients and veg/non-veg breakdown made it so easy to balance options for our family reunion. Outstanding service and punctuality."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-100">
                <p className="font-bold text-sm text-stone-900">Dr. M. Ramanathan</p>
                <p className="text-xs text-stone-400">60th Birthday Celebration • 180 Guests</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-royal-950 via-stone-900 to-royal-950 text-white p-8 sm:p-14 border border-amber-500/30 shadow-2xl text-center">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-mono">
              Ready to Craft Your Menu?
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
              Create Your Dream Catering Selection Today
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Explore 40+ authentic dishes, pick your favorites in seconds, and receive an instant breakdown on WhatsApp.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setActivePage('menu')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-royal-950 font-bold text-sm shadow-xl hover:shadow-glow transition-all"
              >
                Browse &amp; Select Menu
              </button>
              <button
                onClick={() => setActivePage('contact')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-stone-600 hover:bg-white/10 text-white font-semibold text-sm transition-all"
              >
                Contact Catering Team
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
