import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UtensilsCrossed, AlertCircle, ArrowRight, KeyRound, ShieldAlert, Check } from 'lucide-react';

export function LoginPage({ setActivePage }) {
  const { login, loading } = useAuth();
  
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [forgotModalOpen, setForgotModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!emailOrPhone.trim() || !password) {
      setError('Please enter both email/phone and password.');
      return;
    }

    const res = await login(emailOrPhone.trim(), password);

    if (res.success) {
      if (res.user.role === 'admin') {
        setActivePage('admin-dashboard');
      } else {
        setActivePage('customer-dashboard');
      }
    } else {
      setError(res.error || 'Invalid email or password.');
    }
  };

  const handleFillDemoCustomer = () => {
    setEmailOrPhone('vishal@example.com');
    setPassword('User@123');
    setError('');
  };

  const handleFillDemoAdmin = () => {
    setEmailOrPhone('admin@royalfeast.com');
    setPassword('Admin@123');
    setError('');
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-stone-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/90 shadow-xl space-y-6 animate-fade-in">
        
        {/* Header */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-600 flex items-center justify-center mx-auto mb-3">
            <UtensilsCrossed className="w-6 h-6 stroke-[2.5]" />
          </div>
          <h2 className="font-serif text-3xl font-extrabold text-stone-900">
            Welcome Back
          </h2>
          <p className="text-stone-500 text-sm mt-1.5">
            Log in to manage your catering selections and track orders.
          </p>
        </div>

        {/* Demo Fast-fill Buttons */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3.5 space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-amber-900 text-center">
            Quick Demo Login Shortcuts
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleFillDemoCustomer}
              className="py-1.5 px-2 bg-white hover:bg-amber-100 text-amber-900 rounded-lg text-xs font-semibold border border-amber-200 transition-colors shadow-xs"
            >
              Fill Customer Demo
            </button>
            <button
              type="button"
              onClick={handleFillDemoAdmin}
              className="py-1.5 px-2 bg-royal-950 hover:bg-stone-800 text-amber-400 rounded-lg text-xs font-semibold transition-colors shadow-xs"
            >
              Fill Admin Demo
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center space-x-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Email or Mobile Number *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. vishal@example.com or phone"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                Password *
              </label>
              <button
                type="button"
                onClick={() => setForgotModalOpen(true)}
                className="text-xs text-amber-700 hover:underline font-semibold"
              >
                Forgot Password?
              </button>
            </div>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-royal-950 font-bold text-sm shadow-xl hover:shadow-glow flex items-center justify-center space-x-2 transition-all disabled:opacity-60"
            >
              <span>{loading ? 'Logging in...' : 'Login'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-3 text-center border-t border-stone-100">
            <p className="text-xs text-stone-500">
              Don't have a catering account?{' '}
              <button
                type="button"
                onClick={() => setActivePage('register')}
                className="font-bold text-amber-700 hover:underline ml-1"
              >
                Create New Account
              </button>
            </p>
          </div>
        </form>

      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-stone-200 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">Password Recovery</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              For security, password resets are sent via registered WhatsApp or through catering support. 
              Please contact the head caterer at <b className="text-stone-800">+91 98765 43210</b> or use the demo login buttons above.
            </p>
            <button
              onClick={() => setForgotModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-stone-900 text-white font-bold text-xs"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
