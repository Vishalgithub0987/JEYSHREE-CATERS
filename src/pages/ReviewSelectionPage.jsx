import React, { useState, useEffect } from 'react';
import { useSelection } from '../context/SelectionContext';
import { useAuth } from '../context/AuthContext';
import { 
  ArrowLeft, 
  Trash2, 
  Send, 
  Calendar, 
  Users, 
  MapPin, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  AlertCircle,
  FileEdit,
  Sparkles
} from 'lucide-react';

const EVENT_TYPES = [
  'Wedding',
  'Birthday',
  'Engagement',
  'Corporate Event',
  'Reception',
  'Family Function',
  'Other'
];

export function ReviewSelectionPage({ setActivePage, onOrderSuccess }) {
  const { selectedFoods, removeFood, clearSelection, totalCount } = useSelection();
  const { user, isAuthenticated } = useAuth();

  // Customer & Event details form state
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    whatsapp: '',
    eventType: 'Wedding',
    eventDate: '',
    guests: 100,
    location: '',
    notes: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Hydrate form with authenticated user details if available
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        customerName: user.name || prev.customerName,
        phone: user.phone || prev.phone,
        whatsapp: user.whatsapp || user.phone || prev.whatsapp,
        eventType: user.eventType || prev.eventType,
        eventDate: user.eventDate || prev.eventDate,
        guests: user.guests || prev.guests,
        location: user.location || prev.location
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirmAndSend = async (e) => {
    e.preventDefault();
    setFormError('');

    if (totalCount === 0) {
      setFormError('Please select at least one food item before submitting.');
      return;
    }

    if (!formData.customerName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }

    if (!formData.phone.trim()) {
      setFormError('Please enter your contact mobile number.');
      return;
    }

    if (!formData.eventDate) {
      setFormError('Please specify the expected event date.');
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        userId: user?.id || null,
        customerName: formData.customerName.trim(),
        phone: formData.phone.trim(),
        whatsapp: (formData.whatsapp || formData.phone).trim(),
        eventType: formData.eventType,
        eventDate: formData.eventDate,
        guests: Number(formData.guests) || 50,
        location: formData.location.trim(),
        notes: formData.notes.trim(),
        selectedFoods: selectedFoods.map(f => ({
          id: f.id,
          name: f.name,
          category: f.category,
          type: f.type,
          price: f.price || 0
        }))
      };

      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to submit catering request.');
      }

      // Clear selected cart on successful submission
      clearSelection();

      // Trigger success modal with returned request and WhatsApp deep links
      onOrderSuccess(data);

    } catch (err) {
      console.error('Submission error:', err);
      setFormError(err.message || 'Error sending catering selection. Please verify details and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (totalCount === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-stone-50">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-stone-200 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-stone-900">Your Selection is Empty</h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            You haven't selected any dishes yet. Browse our catering food menu to select your starters, biryanis, curries, and desserts.
          </p>
          <button
            onClick={() => setActivePage('menu')}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-royal-950 font-bold text-sm shadow-md hover:shadow-glow transition-all"
          >
            Explore Food Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen py-12 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          onClick={() => setActivePage('menu')}
          className="inline-flex items-center space-x-2 text-stone-500 hover:text-stone-800 text-sm font-semibold mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Food Menu</span>
        </button>

        {/* Page Title */}
        <div className="mb-10">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-amber-800 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Final Step &bull; Review &amp; WhatsApp Transmission</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Review Your Catering Selection
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Verify your chosen dishes, confirm event specifications, and submit to receive instant WhatsApp confirmation.
          </p>
        </div>

        {formError && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* 2-Column Grid: Left (Selected Foods) / Right (Event & Customer Details Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Selected Foods List (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <h2 className="font-serif font-bold text-xl text-stone-900">Selected Menu Items</h2>
                <p className="text-xs text-stone-500 mt-0.5">Customized catering spread for your event</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                  Total Items: {totalCount}
                </span>
              </div>
            </div>

            {/* Dish Rows */}
            <div className="divide-y divide-stone-100 space-y-1">
              {selectedFoods.map((item, idx) => (
                <div key={item.id} className="pt-3 pb-3 flex items-center justify-between group">
                  <div className="flex items-center space-x-3 min-w-0">
                    <span className="font-mono text-xs font-bold text-stone-400 w-6">
                      {String(idx + 1).padStart(2, '0')}.
                    </span>
                    <span className={item.type === 'veg' ? 'veg-badge shrink-0' : 'nonveg-badge shrink-0'}></span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-stone-800 truncate">{item.name}</p>
                      <p className="text-xs text-stone-400">{item.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {item.price ? (
                      <span className="text-xs font-bold text-stone-600">
                        ₹{item.price}
                      </span>
                    ) : null}
                    <button
                      onClick={() => removeFood(item.id)}
                      className="text-stone-300 hover:text-red-600 p-1 rounded-lg transition-colors"
                      title="Remove dish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick action buttons */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <button
                onClick={() => setActivePage('menu')}
                className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center space-x-1"
              >
                <FileEdit className="w-3.5 h-3.5" />
                <span>+ Add More Dishes from Menu</span>
              </button>

              <button
                onClick={clearSelection}
                className="text-xs text-stone-400 hover:text-red-600 transition-colors"
              >
                Clear Entire Selection
              </button>
            </div>

          </div>

          {/* Right Column: Customer & Event Details Form (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6 sticky top-28">
            <div>
              <h2 className="font-serif font-bold text-xl text-stone-900">Event &amp; Host Details</h2>
              <p className="text-xs text-stone-500 mt-0.5">Where and when is your royal celebration?</p>
            </div>

            <form onSubmit={handleConfirmAndSend} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="customerName"
                  required
                  placeholder="e.g. Vishal Sangeeth"
                  value={formData.customerName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                />
              </div>

              {/* Mobile & WhatsApp Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    placeholder="If same, leave empty"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Event Type & Expected Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Event Type *
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 font-medium"
                  >
                    {EVENT_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    required
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Number of Guests & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Guest Count *
                  </label>
                  <input
                    type="number"
                    name="guests"
                    min="15"
                    step="5"
                    required
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Venue / City *
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. Alwarpet, Chennai"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Special Notes / Preferences
                </label>
                <textarea
                  name="notes"
                  rows="2"
                  placeholder="e.g. Jain food options, Live Tandoor counter, extra mild spices..."
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 resize-none"
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-royal-950 font-extrabold text-sm shadow-xl hover:shadow-glow flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Submitting & Preparing WhatsApp...' : 'Confirm & Send Selection'}</span>
                </button>

                <p className="text-[11px] text-stone-400 text-center leading-normal">
                  ⚡ Upon confirmation, you &amp; our head caterer will immediately receive the menu on WhatsApp.
                </p>
              </div>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
}
