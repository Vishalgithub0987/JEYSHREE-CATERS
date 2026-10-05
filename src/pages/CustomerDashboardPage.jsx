import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSelection } from '../context/SelectionContext';
import { 
  Sparkles, 
  Calendar, 
  Users, 
  UtensilsCrossed, 
  ShoppingBag, 
  ClipboardList, 
  User, 
  ArrowRight, 
  Clock, 
  MessageCircle,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export function CustomerDashboardPage({ setActivePage, onOpenFoodDetails }) {
  const { user } = useAuth();
  const { selectedFoods, totalCount } = useSelection();
  
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/requests', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('royal_feast_token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setRequests(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const latestRequest = requests[0] || null;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">New</span>;
      case 'Contacted':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">Contacted</span>;
      case 'Confirmed':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Confirmed</span>;
      case 'Completed':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">Completed</span>;
      case 'Cancelled':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-stone-100 text-stone-600">Cancelled</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-stone-100 text-stone-700">{status || 'Draft'}</span>;
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen py-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-royal-950 via-stone-900 to-royal-950 rounded-3xl p-6 sm:p-10 text-white border border-amber-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Customer Portal</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-white">
              Welcome, {user?.name || 'Valued Guest'}!
            </h1>
            <p className="text-stone-300 text-sm mt-1 max-w-lg">
              Manage your catering menu selections, monitor event statuses, and coordinate directly with our chef team.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActivePage('menu')}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-royal-950 font-bold text-xs shadow-md transition-all flex items-center space-x-2"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Browse Menu</span>
            </button>
            <button
              onClick={() => setActivePage('customer-profile')}
              className="px-4 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs border border-stone-700 transition-all flex items-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Cards (Requirement 6) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Total Selected Foods */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Live Selection</p>
              <h3 className="font-serif text-3xl font-extrabold text-stone-900 mt-1">
                {totalCount} <span className="text-sm font-sans font-normal text-stone-500">Items</span>
              </h3>
              <p className="text-[11px] text-amber-700 font-medium mt-1">
                {totalCount > 0 ? 'Ready to review' : 'No draft items'}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: Event Date */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Event Date</p>
              <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-stone-900 mt-1">
                {latestRequest?.eventDate || user?.eventDate || 'Not Set'}
              </h3>
              <p className="text-[11px] text-stone-400 mt-1">
                {latestRequest?.eventType || user?.eventType || 'Celebration'}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Number of Guests */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Expected Guests</p>
              <h3 className="font-serif text-3xl font-extrabold text-stone-900 mt-1">
                {latestRequest?.guests || user?.guests || 100}
              </h3>
              <p className="text-[11px] text-stone-400 mt-1">
                {latestRequest?.location || user?.location || 'Venue pending'}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          {/* Card 4: Request Status */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Request Status</p>
              <div className="mt-2">
                {getStatusBadge(latestRequest?.status || 'No Submissions')}
              </div>
              <p className="text-[11px] text-stone-400 mt-2 truncate max-w-[140px]">
                {latestRequest?.id || 'Start selection'}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* 2-Column Split: Active Selection Draft vs Request History */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: My Food Selection (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center space-x-2">
                <UtensilsCrossed className="w-5 h-5 text-amber-600" />
                <h2 className="font-serif font-bold text-xl text-stone-900">My Food Selection</h2>
              </div>
              {totalCount > 0 && (
                <button
                  onClick={() => setActivePage('review-selection')}
                  className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center space-x-1"
                >
                  <span>Review Draft</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {totalCount === 0 ? (
              <div className="py-10 text-center space-y-3">
                <p className="text-sm text-stone-500">
                  Your current draft has no dishes selected.
                </p>
                <button
                  onClick={() => setActivePage('menu')}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 text-royal-950 font-bold text-xs hover:bg-amber-400 transition-colors"
                >
                  Browse Catering Menu
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedFoods.slice(0, 6).map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 rounded-2xl bg-stone-50 border border-stone-100">
                      <span className={item.type === 'veg' ? 'veg-badge shrink-0' : 'nonveg-badge shrink-0'}></span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-stone-800 truncate">{item.name}</p>
                        <p className="text-[10px] text-stone-400">{item.category}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedFoods.length > 6 && (
                  <p className="text-xs text-stone-400 text-center">
                    + {selectedFoods.length - 6} more dishes in your selection
                  </p>
                )}

                <div className="pt-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-700">
                    {totalCount} Items Selected
                  </span>
                  <button
                    onClick={() => setActivePage('review-selection')}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-royal-950 font-bold text-xs shadow-md"
                  >
                    Confirm &amp; Send Selection
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: My Requests Quick View (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center space-x-2">
                <ClipboardList className="w-5 h-5 text-amber-600" />
                <h2 className="font-serif font-bold text-xl text-stone-900">My Requests</h2>
              </div>
              <button
                onClick={() => setActivePage('customer-requests')}
                className="text-xs font-bold text-amber-700 hover:text-amber-800"
              >
                View All
              </button>
            </div>

            {loading ? (
              <div className="space-y-3">
                <div className="h-16 bg-stone-100 rounded-xl animate-pulse"></div>
                <div className="h-16 bg-stone-100 rounded-xl animate-pulse"></div>
              </div>
            ) : requests.length === 0 ? (
              <div className="py-8 text-center text-xs text-stone-400">
                You have not submitted any catering requests yet.
              </div>
            ) : (
              <div className="space-y-3">
                {requests.slice(0, 3).map((req) => (
                  <div key={req.id} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-stone-800">{req.id}</span>
                      {getStatusBadge(req.status)}
                    </div>
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span>{req.eventType} &bull; {req.guests} Guests</span>
                      <span>{req.eventDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-amber-800 font-semibold pt-1 border-t border-stone-200/60">
                      <span>{req.selectedFoods?.length || 0} Foods Selected</span>
                      <button
                        onClick={() => setActivePage('customer-requests')}
                        className="underline hover:text-amber-950"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
