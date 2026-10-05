import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  Check, 
  ExternalLink 
} from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: 'Wedding',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [waLink, setWaLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setWaLink(data.whatsappLink);
      setSubmitted(true);
    } catch (e) {
      console.error(e);
    }
  };

  const openDirectWhatsApp = () => {
    window.open('https://wa.me/919876543210?text=Hello%20Royal%20Feast%20Caterers,%20I%20would%20like%20to%20discuss%20a%20catering%20inquiry.', '_blank');
  };

  return (
    <div className="bg-stone-50 min-h-screen py-16 pb-28 space-y-16">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
          Connect with Our Catering Team
        </h1>
        <p className="text-stone-500 text-base max-w-xl mx-auto">
          Have an upcoming event or custom dietary requirements? Reach out directly via WhatsApp, phone, or visit our central catering facility.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info (5 cols) */}
          <div className="lg:col-span-5 bg-royal-950 text-white rounded-3xl p-8 sm:p-10 border border-amber-900/40 shadow-xl space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-mono">Head Office &amp; Central Kitchen</span>
              <h2 className="font-serif text-2xl font-bold mt-1">Royal Feast Caterers</h2>
              <p className="text-stone-400 text-xs sm:text-sm mt-2 leading-relaxed">
                Operating high-capacity hygienic central commercial kitchens catering events across Tamil Nadu, Karnataka, and Andhra Pradesh.
              </p>
            </div>

            <div className="space-y-5 text-sm">
              <div className="flex items-start space-x-3.5">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Culinary Experience Center</p>
                  <p className="text-stone-300 text-xs mt-0.5">No. 42, Heritage Boulevard, Alwarpet, Chennai, TN 600018</p>
                </div>
              </div>

              <div className="flex items-center space-x-3.5">
                <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <p className="font-bold text-white">Call Us Directly</p>
                  <p className="text-stone-300 text-xs font-mono mt-0.5">+91 98765 43210 / +91 98401 23456</p>
                </div>
              </div>

              <div className="flex items-center space-x-3.5">
                <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <p className="font-bold text-white">Email Address</p>
                  <p className="text-stone-300 text-xs mt-0.5">contact@royalfeastcaterers.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-3.5">
                <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <p className="font-bold text-white">Consultation Hours</p>
                  <p className="text-stone-300 text-xs mt-0.5">Monday &ndash; Sunday: 8:00 AM &ndash; 10:00 PM</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800">
              <button
                onClick={openDirectWhatsApp}
                className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp Directly</span>
              </button>
            </div>
          </div>

          {/* Right Column: Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/90 shadow-sm space-y-6">
            <div>
              <h2 className="font-serif font-bold text-2xl text-stone-900">Send an Event Inquiry</h2>
              <p className="text-xs text-stone-500 mt-1">
                Fill in the details below and our banquet manager will review your inquiry immediately.
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-xl text-emerald-950">Inquiry Received!</h3>
                <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                  Thank you for reaching out. We have prepared a prefilled WhatsApp chat for faster discussion.
                </p>
                {waLink && (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Open in WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arun Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="arun@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Celebration Type
                    </label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData(prev => ({ ...prev, eventType: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="Wedding">Wedding</option>
                      <option value="Birthday">Birthday Party</option>
                      <option value="Corporate Event">Corporate Event</option>
                      <option value="Engagement">Engagement</option>
                      <option value="Reception">Reception</option>
                      <option value="Other">Other Function</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Message / Expected Guests / Venue Details
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Tell us about your event date, approximate guest count, and cuisine preferences..."
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:ring-1 focus:ring-amber-500 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-royal-950 font-bold text-xs shadow-md flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry &amp; Generate WhatsApp Connection</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* Google Maps / Location Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">Experience Center Location</h3>
              <p className="text-xs text-stone-500">Alwarpet, Central Chennai &bull; Tasting by Appointment</p>
            </div>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
              Open Daily 8am - 10pm
            </span>
          </div>

          <div className="relative h-64 rounded-2xl bg-stone-200 overflow-hidden border border-stone-200">
            <iframe
              title="Royal Feast Location Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              src="https://maps.google.com/maps?q=Alwarpet,%20Chennai,%20Tamil%20Nadu&t=&z=14&ie=UTF8&iwloc=&output=embed"
            ></iframe>
          </div>
        </div>
      </div>

    </div>
  );
}
