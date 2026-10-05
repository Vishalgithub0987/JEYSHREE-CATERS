import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  MessageCircle, 
  Copy, 
  Check, 
  ExternalLink, 
  FileText, 
  ArrowRight, 
  Sparkles,
  PhoneCall
} from 'lucide-react';

export function SuccessOrderModal({ orderData, onClose, onViewRequest, onBackToMenu }) {
  const [copiedType, setCopiedType] = useState(null);
  const [showRawMessages, setShowRawMessages] = useState(false);

  useEffect(() => {
    // Fire celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  }, []);

  if (!orderData) return null;

  const { request, whatsapp } = orderData;

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const openLink = (url) => {
    if (url) window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-amber-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-royal-950 p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-royal-950 text-amber-400 flex items-center justify-center shadow-xl mb-4">
            <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
          </div>
          <span className="inline-block bg-royal-950/20 text-royal-950 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-2">
            Confirmed & Recorded
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-royal-950">
            🎉 Your Catering Request Has Been Submitted!
          </h2>
          <div className="mt-3 inline-flex items-center space-x-2 bg-royal-950 text-amber-400 px-4 py-1.5 rounded-xl font-mono text-sm font-bold shadow-md">
            <span>Request ID:</span>
            <span className="text-white">{request?.id}</span>
          </div>
          <p className="text-royal-950/90 text-xs sm:text-sm max-w-md mx-auto mt-2 font-medium">
            We have received your food selection. Our culinary team will contact you shortly to review your event menu.
          </p>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-6">

          {/* Quick Summary Card */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 sm:p-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div>
                <p className="text-[11px] text-stone-400 uppercase font-bold">Event</p>
                <p className="text-xs sm:text-sm font-bold text-stone-800 mt-0.5">{request?.eventType}</p>
              </div>
              <div>
                <p className="text-[11px] text-stone-400 uppercase font-bold">Date</p>
                <p className="text-xs sm:text-sm font-bold text-stone-800 mt-0.5">{request?.eventDate}</p>
              </div>
              <div>
                <p className="text-[11px] text-stone-400 uppercase font-bold">Guests</p>
                <p className="text-xs sm:text-sm font-bold text-stone-800 mt-0.5">{request?.guests}</p>
              </div>
              <div>
                <p className="text-[11px] text-stone-400 uppercase font-bold">Selected Dishes</p>
                <p className="text-xs sm:text-sm font-bold text-amber-700 mt-0.5">{request?.selectedFoods?.length} Items</p>
              </div>
            </div>
          </div>

          {/* WhatsApp Integration Hub */}
          <div className="border border-emerald-200 bg-emerald-50/50 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-emerald-950">Instant WhatsApp Integration</h4>
                  <p className="text-xs text-emerald-800">Direct notifications prepared for Admin & Customer</p>
                </div>
              </div>
              <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full uppercase">
                Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Send to Admin's WhatsApp */}
              <button
                onClick={() => openLink(whatsapp?.adminLink)}
                className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Send to Admin's WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </button>

              {/* Customer WhatsApp Copy / Open */}
              <button
                onClick={() => openLink(whatsapp?.customerLink)}
                className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 fill-current" />
                <span>Open Customer Confirmation</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </button>
            </div>

            {/* Toggle Raw Message Preview */}
            <div className="text-center pt-1">
              <button
                onClick={() => setShowRawMessages(!showRawMessages)}
                className="text-xs text-emerald-800 hover:text-emerald-950 font-semibold underline"
              >
                {showRawMessages ? 'Hide Formatted WhatsApp Messages' : 'View Formatted WhatsApp Message Content'}
              </button>
            </div>

            {showRawMessages && (
              <div className="space-y-3 pt-2 text-xs animate-fade-in">
                {/* Admin Message Box */}
                <div className="bg-white p-3.5 rounded-xl border border-emerald-200 text-stone-700">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-stone-900">Admin Notification Message:</span>
                    <button
                      onClick={() => copyToClipboard(whatsapp?.adminMessage, 'admin')}
                      className="text-[11px] text-stone-500 hover:text-emerald-700 flex items-center space-x-1"
                    >
                      {copiedType === 'admin' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedType === 'admin' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="font-mono text-[11px] whitespace-pre-wrap bg-stone-50 p-2.5 rounded-lg border border-stone-200 max-h-40 overflow-y-auto text-stone-800">
                    {whatsapp?.adminMessage}
                  </pre>
                </div>

                {/* Customer Message Box */}
                <div className="bg-white p-3.5 rounded-xl border border-emerald-200 text-stone-700">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-stone-900">Customer Confirmation Message:</span>
                    <button
                      onClick={() => copyToClipboard(whatsapp?.customerMessage, 'customer')}
                      className="text-[11px] text-stone-500 hover:text-emerald-700 flex items-center space-x-1"
                    >
                      {copiedType === 'customer' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedType === 'customer' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="font-mono text-[11px] whitespace-pre-wrap bg-stone-50 p-2.5 rounded-lg border border-stone-200 max-h-40 overflow-y-auto text-stone-800">
                    {whatsapp?.customerMessage}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Navigation Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={onBackToMenu}
              className="py-3 px-4 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs sm:text-sm font-semibold transition-colors"
            >
              Back to Menu
            </button>
            <button
              onClick={onViewRequest}
              className="py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-royal-950 text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 shadow-md transition-all"
            >
              <span>View My Requests</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
