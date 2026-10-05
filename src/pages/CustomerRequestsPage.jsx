import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  ClipboardList, 
  Eye, 
  MessageCircle, 
  Calendar, 
  Users, 
  MapPin, 
  Clock, 
  X, 
  ExternalLink,
  UtensilsCrossed,
  Printer
} from 'lucide-react';

export function CustomerRequestsPage({ setActivePage }) {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeModalRequest, setActiveModalRequest] = useState(null);

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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">New</span>;
      case 'Contacted':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">Contacted</span>;
      case 'Confirmed':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Confirmed</span>;
      case 'Completed':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">Completed</span>;
      case 'Cancelled':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-stone-100 text-stone-600">Cancelled</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-stone-100 text-stone-700">{status}</span>;
    }
  };

  const openWhatsAppChat = (req) => {
    const text = encodeURIComponent(`Hello Royal Feast Caterers, I am inquiring regarding my catering request ${req.id} for the ${req.eventType} on ${req.eventDate}.`);
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <div className="bg-stone-50 min-h-screen py-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-extrabold text-stone-900">
              My Catering Requests
            </h1>
            <p className="text-stone-500 text-sm mt-1">
              Track the progress, status, and selected menu breakdown for all your scheduled events.
            </p>
          </div>
          <button
            onClick={() => setActivePage('menu')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-royal-950 font-bold text-xs shadow-md transition-all self-start sm:self-auto"
          >
            + Create New Catering Selection
          </button>
        </div>

        {/* Requests List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(n => (
              <div key={n} className="h-28 bg-white rounded-2xl border border-stone-200 animate-pulse"></div>
            ))}
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-stone-200 shadow-sm space-y-4">
            <ClipboardList className="w-12 h-12 text-stone-300 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-stone-800">No catering requests yet</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Start by choosing dishes from our catering food menu to prepare your first request.
            </p>
            <button
              onClick={() => setActivePage('menu')}
              className="px-6 py-3 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-amber-600 transition-colors"
            >
              Start Selecting Menu
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-stone-50 border-b border-stone-100 text-stone-400 font-mono text-xs uppercase tracking-wider">
                  <tr>
                    <th className="py-4 px-6">Request ID</th>
                    <th className="py-4 px-6">Event Type</th>
                    <th className="py-4 px-6">Event Date</th>
                    <th className="py-4 px-6">Guests</th>
                    <th className="py-4 px-6">Items</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-medium">
                  {requests.map(req => (
                    <tr key={req.id} className="hover:bg-amber-50/40 transition-colors">
                      <td className="py-4 px-6 font-mono font-bold text-amber-800">
                        {req.id}
                      </td>
                      <td className="py-4 px-6 text-stone-900 font-semibold">
                        {req.eventType}
                      </td>
                      <td className="py-4 px-6 text-stone-600">
                        {req.eventDate}
                      </td>
                      <td className="py-4 px-6 text-stone-600">
                        {req.guests} Guests
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-bold text-stone-800">
                          {req.selectedFoods?.length || 0}
                        </span>{' '}
                        <span className="text-xs text-stone-400">items</span>
                      </td>
                      <td className="py-4 px-6">
                        {getStatusBadge(req.status)}
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => setActiveModalRequest(req)}
                          className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold inline-flex items-center space-x-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Details</span>
                        </button>
                        <button
                          onClick={() => openWhatsAppChat(req)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold inline-flex items-center space-x-1"
                          title="Chat with caterer on WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">WhatsApp</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Request Details Modal */}
        {activeModalRequest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
            <div 
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-royal-950 to-stone-900 text-white flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-xs font-bold bg-amber-400 text-royal-950 px-2.5 py-0.5 rounded">
                      {activeModalRequest.id}
                    </span>
                    <span className="text-xs text-stone-300">
                      Submitted on {new Date(activeModalRequest.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold mt-2">
                    {activeModalRequest.eventType} Catering Order
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalRequest(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
                
                {/* Event info card */}
                <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-[11px] text-stone-400 uppercase font-bold">Status</p>
                    <div className="mt-1">{getStatusBadge(activeModalRequest.status)}</div>
                  </div>
                  <div>
                    <p className="text-[11px] text-stone-400 uppercase font-bold">Event Date</p>
                    <p className="text-xs sm:text-sm font-bold text-stone-800 mt-1">{activeModalRequest.eventDate}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-stone-400 uppercase font-bold">Guests</p>
                    <p className="text-xs sm:text-sm font-bold text-stone-800 mt-1">{activeModalRequest.guests}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-stone-400 uppercase font-bold">Venue</p>
                    <p className="text-xs sm:text-sm font-bold text-stone-800 mt-1 truncate">{activeModalRequest.location || 'Pending'}</p>
                  </div>
                </div>

                {/* Selected Food List */}
                <div>
                  <h4 className="font-serif font-bold text-lg text-stone-900 mb-3 flex items-center justify-between">
                    <span>Selected Menu ({activeModalRequest.selectedFoods?.length} items)</span>
                  </h4>
                  <div className="space-y-2 border border-stone-200 rounded-2xl p-4 divide-y divide-stone-100">
                    {activeModalRequest.selectedFoods?.map((food, idx) => (
                      <div key={idx} className="pt-2 pb-2 first:pt-0 last:pb-0 flex items-center justify-between">
                        <div className="flex items-center space-x-2.5">
                          <span className="text-xs font-mono font-bold text-stone-400">{idx + 1}.</span>
                          <span className={food.type === 'veg' ? 'veg-badge shrink-0' : 'nonveg-badge shrink-0'}></span>
                          <span className="text-sm font-semibold text-stone-800">{food.name}</span>
                        </div>
                        <span className="text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded">
                          {food.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {activeModalRequest.notes && (
                  <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 text-xs">
                    <p className="font-bold text-amber-900 mb-1">Host Notes / Requirements:</p>
                    <p className="text-stone-700">{activeModalRequest.notes}</p>
                  </div>
                )}

                {/* Contact actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => openWhatsAppChat(activeModalRequest)}
                    className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Message Caterer on WhatsApp</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="py-3 px-4 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-semibold text-xs flex items-center justify-center space-x-2"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Menu</span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
