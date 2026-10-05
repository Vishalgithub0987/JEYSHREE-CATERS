import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Check, AlertCircle, Save } from 'lucide-react';

const EVENT_TYPES = [
  'Wedding',
  'Birthday',
  'Engagement',
  'Corporate Event',
  'Reception',
  'Family Function',
  'Other'
];

export function CustomerProfilePage({ setActivePage }) {
  const { user, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    whatsapp: user?.whatsapp || '',
    eventType: user?.eventType || 'Wedding',
    eventDate: user?.eventDate || '',
    guests: user?.guests || 100,
    location: user?.location || ''
  });

  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg({ type: '', text: '' });

    const result = await updateProfile(formData);
    setSaving(false);

    if (result.success) {
      setStatusMsg({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => setStatusMsg({ type: '', text: '' }), 4000);
    } else {
      setStatusMsg({ type: 'error', text: result.error || 'Failed to update profile.' });
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen py-12 pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div>
          <h1 className="font-serif text-3xl font-extrabold text-stone-900">
            Customer Profile
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Update your contact credentials and default event preferences for faster menu bookings.
          </p>
        </div>

        {statusMsg.text && (
          <div className={`p-4 rounded-2xl flex items-center space-x-2.5 text-sm ${
            statusMsg.type === 'success' 
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {statusMsg.type === 'success' ? <Check className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
            <span>{statusMsg.text}</span>
          </div>
        )}

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Account Info */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700 font-mono">
                Contact Details
              </h3>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Email (Account Identifier)
                </label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-100 border border-stone-200 text-sm text-stone-500 cursor-not-allowed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
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
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Event Preferences */}
            <div className="pt-4 border-t border-stone-100 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700 font-mono">
                Default Event Preferences
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Event Type
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  >
                    {EVENT_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Event Date
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Expected Guests
                  </label>
                  <input
                    type="number"
                    name="guests"
                    min="10"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Preferred Location / Venue
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={saving}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-royal-950 font-bold text-sm shadow-md hover:shadow-glow flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving Changes...' : 'Save Profile Changes'}</span>
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
