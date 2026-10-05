import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSelection } from '../context/SelectionContext';
import { 
  UtensilsCrossed, 
  Menu as MenuIcon, 
  X, 
  ShoppingBag, 
  User, 
  LogOut, 
  Shield, 
  ClipboardList, 
  ChevronDown,
  Sparkles
} from 'lucide-react';

export function Navbar({ activePage, setActivePage }) {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { totalCount } = useSelection();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleNav = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-royal-950/95 backdrop-blur-md border-b border-amber-900/40 text-stone-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNav('home')} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-royal-950 shadow-md group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  Royal <span className="text-amber-400">Feast</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded border border-amber-400/30">
                  Catering
                </span>
              </div>
              <p className="text-[11px] text-stone-400 tracking-wider">Premium Taste &bull; Flawless Events</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm">
            <button
              onClick={() => handleNav('home')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                activePage === 'home' ? 'text-amber-400 bg-white/5 font-semibold' : 'text-stone-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('about')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                activePage === 'about' ? 'text-amber-400 bg-white/5 font-semibold' : 'text-stone-300 hover:text-white hover:bg-white/5'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNav('services')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                activePage === 'services' ? 'text-amber-400 bg-white/5 font-semibold' : 'text-stone-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Catering Services
            </button>
            <button
              onClick={() => handleNav('menu')}
              className={`relative px-4 py-2 rounded-lg transition-colors flex items-center space-x-1.5 ${
                activePage === 'menu' ? 'text-amber-400 bg-amber-500/10 font-bold border border-amber-500/30' : 'text-stone-200 hover:text-amber-400 hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Food Menu</span>
            </button>
            <button
              onClick={() => handleNav('contact')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                activePage === 'contact' ? 'text-amber-400 bg-white/5 font-semibold' : 'text-stone-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Contact Us
            </button>
          </nav>

          {/* Right Action Elements */}
          <div className="hidden lg:flex items-center space-x-4">
            
            {/* Live Selections Cart Button */}
            <button
              onClick={() => handleNav('review-selection')}
              className="relative flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 hover:bg-amber-500/25 transition-all shadow-sm"
              title="View your catering selections"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-semibold">My Selection</span>
              <span className={`inline-flex items-center justify-center text-xs font-bold w-5 h-5 rounded-full ${
                totalCount > 0 ? 'bg-amber-400 text-royal-950 scale-110 shadow-glow' : 'bg-stone-800 text-stone-400'
              } transition-all`}>
                {totalCount}
              </span>
            </button>

            {/* User Dropdown / Auth CTA */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2.5 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 text-stone-200 transition-all text-sm"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold leading-none text-white max-w-[110px] truncate">{user?.name}</p>
                    <p className="text-[10px] text-amber-400/80 leading-tight capitalize mt-0.5">{user?.role}</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 bg-stone-900/95 backdrop-blur-xl border border-stone-800 rounded-2xl shadow-2xl py-2 z-50 animate-fade-in"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-stone-800">
                      <p className="text-xs text-stone-400">Signed in as</p>
                      <p className="text-sm font-semibold text-white truncate">{user?.email}</p>
                    </div>

                    {isAdmin ? (
                      <>
                        <button
                          onClick={() => handleNav('admin-dashboard')}
                          className="w-full text-left px-4 py-2 text-xs text-stone-200 hover:bg-amber-500/10 hover:text-amber-400 flex items-center space-x-2"
                        >
                          <Shield className="w-4 h-4 text-amber-400" />
                          <span>Admin Dashboard</span>
                        </button>
                        <button
                          onClick={() => handleNav('admin-requests')}
                          className="w-full text-left px-4 py-2 text-xs text-stone-200 hover:bg-amber-500/10 hover:text-amber-400 flex items-center space-x-2"
                        >
                          <ClipboardList className="w-4 h-4 text-amber-400" />
                          <span>Manage Requests</span>
                        </button>
                        <button
                          onClick={() => handleNav('admin-foods')}
                          className="w-full text-left px-4 py-2 text-xs text-stone-200 hover:bg-amber-500/10 hover:text-amber-400 flex items-center space-x-2"
                        >
                          <UtensilsCrossed className="w-4 h-4 text-amber-400" />
                          <span>Manage Food Menu</span>
                        </button>
                        <button
                          onClick={() => handleNav('admin-settings')}
                          className="w-full text-left px-4 py-2 text-xs text-stone-200 hover:bg-amber-500/10 hover:text-amber-400 flex items-center space-x-2"
                        >
                          <span>⚙ WhatsApp & Settings</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleNav('customer-dashboard')}
                          className="w-full text-left px-4 py-2 text-xs text-stone-200 hover:bg-amber-500/10 hover:text-amber-400 flex items-center space-x-2"
                        >
                          <User className="w-4 h-4 text-amber-400" />
                          <span>Customer Dashboard</span>
                        </button>
                        <button
                          onClick={() => handleNav('customer-requests')}
                          className="w-full text-left px-4 py-2 text-xs text-stone-200 hover:bg-amber-500/10 hover:text-amber-400 flex items-center space-x-2"
                        >
                          <ClipboardList className="w-4 h-4 text-amber-400" />
                          <span>My Catering Requests</span>
                        </button>
                        <button
                          onClick={() => handleNav('customer-profile')}
                          className="w-full text-left px-4 py-2 text-xs text-stone-200 hover:bg-amber-500/10 hover:text-amber-400 flex items-center space-x-2"
                        >
                          <span>Edit Profile</span>
                        </button>
                      </>
                    )}

                    <div className="border-t border-stone-800 my-1"></div>
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                        handleNav('home');
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4 text-red-400" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleNav('login')}
                  className="px-3.5 py-2 text-xs font-semibold text-stone-200 hover:text-white transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleNav('register')}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-royal-950 shadow-md hover:shadow-glow transition-all"
                >
                  Register
                </button>
              </div>
            )}

          </div>

          {/* Mobile Right Bar (Cart + Hamburger) */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button
              onClick={() => handleNav('review-selection')}
              className="relative p-2 rounded-lg bg-amber-500/20 text-amber-300"
            >
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-royal-950 font-bold text-[10px] flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-royal-950 border-b border-amber-900/40 px-4 pt-2 pb-6 space-y-2 animate-fade-in">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => handleNav('home')}
              className="text-left px-3 py-2.5 rounded-lg text-stone-200 hover:bg-stone-900 text-sm font-medium"
            >
              Home
            </button>
            <button
              onClick={() => handleNav('about')}
              className="text-left px-3 py-2.5 rounded-lg text-stone-200 hover:bg-stone-900 text-sm font-medium"
            >
              About Us
            </button>
            <button
              onClick={() => handleNav('services')}
              className="text-left px-3 py-2.5 rounded-lg text-stone-200 hover:bg-stone-900 text-sm font-medium"
            >
              Catering Services
            </button>
            <button
              onClick={() => handleNav('menu')}
              className="text-left px-3 py-2.5 rounded-lg bg-amber-500/10 text-amber-400 font-semibold text-sm flex items-center justify-between"
            >
              <span>Food Menu</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </button>
            <button
              onClick={() => handleNav('contact')}
              className="text-left px-3 py-2.5 rounded-lg text-stone-200 hover:bg-stone-900 text-sm font-medium"
            >
              Contact Us
            </button>
          </div>

          <div className="border-t border-stone-800 pt-3">
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="px-3 py-2 bg-stone-900 rounded-lg">
                  <p className="text-xs text-stone-400">Signed in as</p>
                  <p className="text-sm font-semibold text-white">{user?.name} ({user?.role})</p>
                </div>
                {isAdmin ? (
                  <>
                    <button
                      onClick={() => handleNav('admin-dashboard')}
                      className="w-full text-left px-3 py-2 text-sm text-amber-400 font-semibold"
                    >
                      Admin Dashboard
                    </button>
                    <button
                      onClick={() => handleNav('admin-requests')}
                      className="w-full text-left px-3 py-2 text-sm text-stone-300"
                    >
                      Manage Requests
                    </button>
                    <button
                      onClick={() => handleNav('admin-foods')}
                      className="w-full text-left px-3 py-2 text-sm text-stone-300"
                    >
                      Manage Food Menu
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleNav('customer-dashboard')}
                      className="w-full text-left px-3 py-2 text-sm text-amber-400 font-semibold"
                    >
                      Customer Dashboard
                    </button>
                    <button
                      onClick={() => handleNav('customer-requests')}
                      className="w-full text-left px-3 py-2 text-sm text-stone-300"
                    >
                      My Catering Requests
                    </button>
                    <button
                      onClick={() => handleNav('customer-profile')}
                      className="w-full text-left px-3 py-2 text-sm text-stone-300"
                    >
                      Edit Profile
                    </button>
                  </>
                )}
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                    handleNav('home');
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-red-400 font-medium"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => handleNav('login')}
                  className="w-full py-2.5 text-center text-sm font-semibold rounded-xl bg-stone-900 text-stone-200 border border-stone-800"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleNav('register')}
                  className="w-full py-2.5 text-center text-sm font-bold rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-royal-950"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
