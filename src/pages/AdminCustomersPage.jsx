import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  Calendar, 
  MapPin,
  ClipboardList
} from 'lucide-react';

export function AdminCustomersPage({ setActivePage }) {
  const { token } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchCustomers = () => {
    fetch('/api/admin/customers', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCustomers(data);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCustomers();
  }, [token]);

  const openWhatsApp = (phone, name) => {
    const text = encodeURIComponent(`Hello ${name}, this is Chef Rajesh from Royal Feast Caterers. We are reviewing catering arrangements for your upcoming celebration.`);
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  const filtered = customers.filter(c => {
    const q = search.toLowerCase().trim();
    return !q || 
      c.name.toLowerCase().includes(q) || 
      c.email.toLowerCase().includes(q) || 
      c.phone.includes(q) ||
      (c.location && c.location.toLowerCase().includes(q));
  });

  return (
    <div className="bg-stone-50 min-h-screen py-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-extrabold text-stone-900">
              Registered Customers
            </h1>
            <p className="text-stone-500 text-sm mt-1">
              View customer profiles, contact numbers, event schedules, and history.
            </p>
          </div>
          <button
            onClick={() => setActivePage('admin-dashboard')}
            className="text-xs font-bold text-amber-700 hover:text-amber-800"
          >
            &larr; Admin Dashboard
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-3xl border border-stone-200/90 shadow-sm">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by customer name, email, phone, location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="h-64 bg-white rounded-3xl border border-stone-200 animate-pulse"></div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-stone-200">
            <Users className="w-12 h-12 text-stone-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-stone-800">No customers found</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-stone-50 border-b border-stone-100 text-stone-400 font-mono text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-4 px-6">Customer Name</th>
                    <th className="py-4 px-6">Contact Info</th>
                    <th className="py-4 px-6">Primary Event</th>
                    <th className="py-4 px-6">Event Date</th>
                    <th className="py-4 px-6">Location</th>
                    <th className="py-4 px-6">Requests</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-medium">
                  {filtered.map(cust => (
                    <tr key={cust.id} className="hover:bg-amber-50/40 transition-colors">
                      <td className="py-4 px-6">
                        <p className="font-bold text-stone-900">{cust.name}</p>
                        <p className="text-[11px] text-stone-400">{cust.email}</p>
                      </td>

                      <td className="py-4 px-6 text-xs text-stone-600">
                        <p>Phone: <span className="font-mono">{cust.phone}</span></p>
                        {cust.whatsapp && (
                          <p className="text-emerald-700">WA: <span className="font-mono">{cust.whatsapp}</span></p>
                        )}
                      </td>

                      <td className="py-4 px-6 text-xs">
                        <span className="font-bold text-stone-800">{cust.eventType || 'Celebration'}</span>
                        <span className="text-stone-400 block">{cust.guests || 100} Guests</span>
                      </td>

                      <td className="py-4 px-6 text-xs text-stone-600">
                        {cust.lastEvent || cust.eventDate || 'Pending'}
                      </td>

                      <td className="py-4 px-6 text-xs text-stone-600">
                        {cust.location || 'N/A'}
                      </td>

                      <td className="py-4 px-6">
                        <span className="font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full text-xs">
                          {cust.totalRequests} {cust.totalRequests === 1 ? 'order' : 'orders'}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => openWhatsApp(cust.whatsapp || cust.phone, cust.name)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold inline-flex items-center space-x-1"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
