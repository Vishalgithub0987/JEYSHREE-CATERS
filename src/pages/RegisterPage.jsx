import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UtensilsCrossed, AlertCircle, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

const EVENT_TYPES = [
  'Wedding',
  'Birthday',
  'Engagement',
  'Corporate Event',
  'Reception',
  'Family Function',
  'Other'
];

export function RegisterPage({ setActivePage }) {
  const { register, loading } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    password: '',
    confirmPassword: '',
    eventType: 'Wedding',
    eventDate: '',
    guests: 100,
    location: ''
  });

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    const result = await register(formData);

    if (result.success) {
      setSuccessMsg('Account created successfully!');
      setTimeout(() => {
        setActivePage('customer-dashboard');
      }, 1200);
    } else {
      setError(result.error || 'Failed to create account.');
    }
  };

  return (
    <div className="min-h-screen py-14 px-4 sm:px-6 lg:px-8 bg-stone-50 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/90 shadow-xl space-y-8 animate-fade-in">
        
        {/* Header */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-600 flex items-center justify-center mx-auto mb-3">
            <UtensilsCrossed className="w-6 h-6 stroke-[2.5]" />
          </div>
          <h2 className="font-serif text-3xl font-extrabold text-stone-900">
            Create Customer Account
          </h2>
          <p className="text-stone-500 text-sm mt-1.5">
            Register your profile to customize menus, view catering quotes, and track event requests.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center space-x-2.5">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center space-x-2.5">
            <CheckCircle className="w-5 h-5 shrink-0" />
            <span>{successMsg} Redirecting to your dashboard...</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Full Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Arun Kumar"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="arun@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
              />
            </div>
          </div>

          {/* Mobile & WhatsApp Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Mobile Number *
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
                placeholder="If different from mobile"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
              />
            </div>
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Password *
              </label>
              <input
                type="password"
                name="password"
                required
                minLength={6}
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Confirm Password *
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                placeholder="Repeat password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
              />
            </div>
          </div>

          {/* Event Details Header */}
          <div className="pt-2 pb-1 border-t border-stone-100">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              Primary Event Information (Can be updated anytime)
            </span>
          </div>

          {/* Event Type & Event Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Event Type *
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

          {/* Number of Guests & Event Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Number of Guests
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
                Event Location / City
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

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-royal-950 font-bold text-sm shadow-xl hover:shadow-glow flex items-center justify-center space-x-2 transition-all disabled:opacity-60"
            >
              <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-stone-500">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => setActivePage('login')}
              className="font-bold text-amber-700 hover:underline"
            >
              Sign In Here
            </button>
          </p>

        </form>

      </div>
    </div>
  );
}
