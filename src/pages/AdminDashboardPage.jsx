import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWebSocket } from '../context/WebSocketContext';
import { 
  Users, 
  ClipboardList, 
  Clock, 
  CheckCircle, 
  UtensilsCrossed, 
  Eye, 
  MessageCircle, 
  TrendingUp, 
  AlertCircle,
  ExternalLink,
  X,
  Phone
} from 'lucide-react';

export function AdminDashboardPage({ setActivePage }) {
  const { token } = useAuth();
  const { lastEvent } = useWebSocket();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedReqModal, setSelectedReqModal] = useState(null);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);

  const fetchStats = () => {
    fetch('/api/admin/stats', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch admin stats:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStats();
  }, [token]);

  // Re-fetch when real-time event received
  useEffect(() => {
    if (lastEvent && (lastEvent.type === 'NEW_REQUEST' || lastEvent.type === 'REQUEST_STATUS_UPDATED' || lastEvent.type === 'FOOD_UPDATED')) {
      fetchStats();
    }
  }, [lastEvent]);

  const handleUpdateStatus = async (requestId, newStatus) => {
    setUpdatingStatusId(requestId);
    try {
      const res = await fetch(`/api/requests/${requestId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchStats();
        if (selectedReqModal && selectedReqModal.id === requestId) {
          setSelectedReqModal(prev => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      console.error('Status update failed:', err);
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const openWhatsApp = (phone, req) => {
    const text = encodeURIComponent(`Hello ${req.customerName}, this is Chef Rajesh from Royal Feast Caterers regarding your catering order ${req.id} for ${req.eventType} on ${req.eventDate}.`);
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

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
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-stone-100 text-stone-700">{status}</span>;
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen py-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-700 text-xs font-bold uppercase tracking-wider mb-1 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Live Catering Operations Control</span>
            </div>
            <h1 className="font-serif text-3xl font-extrabold text-stone-900">
              Admin Catering Dashboard
            </h1>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setActivePage('admin-requests')}
              className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs shadow-sm flex items-center space-x-2"
            >
              <ClipboardList className="w-4 h-4 text-amber-400" />
              <span>All Requests</span>
            </button>
            <button
              onClick={() => setActivePage('admin-foods')}
              className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs shadow-sm flex items-center space-x-2"
            >
              <UtensilsCrossed className="w-4 h-4 text-amber-400" />
              <span>Food Menu Management</span>
            </button>
            <button
              onClick={() => setActivePage('admin-settings')}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-royal-950 font-bold text-xs shadow-sm flex items-center space-x-1.5"
            >
              <span>WhatsApp &amp; API Settings</span>
            </button>
          </div>
        </div>

        {/* 5 Statistics Metric Cards (Requirement 15) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          
          {/* 1. Total Customers */}
          <div className="bg-white p-5 rounded-3xl border border-stone-200/90 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Total Customers</p>
              <h3 className="font-serif text-3xl font-extrabold text-stone-900 mt-1">
                {stats?.totalCustomers ?? 0}
              </h3>
              <p className="text-[10px] text-stone-400 mt-1">Registered accounts</p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>

          {/* 2. Total Requests */}
          <div className="bg-white p-5 rounded-3xl border border-stone-200/90 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Total Requests</p>
              <h3 className="font-serif text-3xl font-extrabold text-stone-900 mt-1">
                {stats?.totalRequests ?? 0}
              </h3>
              <p className="text-[10px] text-stone-400 mt-1">Lifetime selections</p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <ClipboardList className="w-5 h-5" />
            </div>
          </div>

          {/* 3. Pending Requests */}
          <div className="bg-white p-5 rounded-3xl border border-stone-200/90 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Pending</p>
              <h3 className="font-serif text-3xl font-extrabold text-amber-600 mt-1">
                {stats?.pendingRequests ?? 0}
              </h3>
              <p className="text-[10px] text-amber-800 font-semibold mt-1">New / Contacted</p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          {/* 4. Confirmed Requests */}
          <div className="bg-white p-5 rounded-3xl border border-stone-200/90 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Confirmed</p>
              <h3 className="font-serif text-3xl font-extrabold text-emerald-600 mt-1">
                {stats?.confirmedRequests ?? 0}
              </h3>
              <p className="text-[10px] text-emerald-800 font-semibold mt-1">Booked events</p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>

          {/* 5. Total Food Items */}
          <div className="bg-white p-5 rounded-3xl border border-stone-200/90 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Food Catalog</p>
              <h3 className="font-serif text-3xl font-extrabold text-stone-900 mt-1">
                {stats?.totalFoodItems ?? 0}
              </h3>
              <p className="text-[10px] text-stone-400 mt-1">Active catering dishes</p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
          </div>

        </div>

        {/* Breakdown Charts / Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Event Breakdown */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm">
            <h3 className="font-serif font-bold text-base text-stone-900 mb-4 flex items-center justify-between">
              <span>Event Type Breakdown</span>
              <span className="text-xs text-stone-400 font-sans font-normal">By Volume</span>
            </h3>
            <div className="space-y-3">
              {stats?.eventTypeBreakdown && Object.entries(stats.eventTypeBreakdown).map(([event, count]) => (
                <div key={event} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-stone-700">
                    <span>{event}</span>
                    <span className="text-stone-500">{count} events</span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-amber-500 h-2 rounded-full"
                      style={{ width: `${Math.min(100, (count / (stats.totalRequests || 1)) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Most Selected Dishes */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm">
            <h3 className="font-serif font-bold text-base text-stone-900 mb-4 flex items-center justify-between">
              <span>Top 5 Most Requested Dishes</span>
              <span className="text-xs text-stone-400 font-sans font-normal">Customer Selections</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {stats?.popularDishes?.map((dish, i) => (
                <div key={dish.name} className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border border-stone-100">
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-xs font-bold text-stone-800 truncate">{dish.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md shrink-0">
                    {dish.count}x
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Recent Requests Table (Requirement 15: Customer | Event | Date | Guests | Items | Status | Action) */}
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
            <div>
              <h2 className="font-serif font-bold text-xl text-stone-900">Recent Catering Selections</h2>
              <p className="text-xs text-stone-500 mt-0.5">Real-time incoming customer menu choices</p>
            </div>
            <button
              onClick={() => setActivePage('admin-requests')}
              className="text-xs font-bold text-amber-700 hover:text-amber-800"
            >
              View All Requests ({stats?.totalRequests || 0})
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-stone-50 text-stone-400 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Customer</th>
                  <th className="py-3.5 px-6">Event</th>
                  <th className="py-3.5 px-6">Date</th>
                  <th className="py-3.5 px-6">Guests</th>
                  <th className="py-3.5 px-6">Items</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-medium">
                {stats?.recentRequests?.map(req => (
                  <tr key={req.id} className="hover:bg-amber-50/40 transition-colors">
                    {/* Customer */}
                    <td className="py-4 px-6">
                      <p className="font-bold text-stone-900">{req.customerName}</p>
                      <p className="text-xs text-stone-400 flex items-center space-x-1 mt-0.5">
                        <Phone className="w-3 h-3 text-stone-400" />
                        <span>{req.phone}</span>
                      </p>
                    </td>

                    {/* Event */}
                    <td className="py-4 px-6 text-stone-800 font-semibold">
                      {req.eventType}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 text-stone-600">
                      {req.eventDate}
                    </td>

                    {/* Guests */}
                    <td className="py-4 px-6 text-stone-600">
                      {req.guests}
                    </td>

                    {/* Items */}
                    <td className="py-4 px-6">
                      <span className="font-bold text-stone-800">{req.selectedFoods?.length || 0}</span>{' '}
                      <span className="text-xs text-stone-400">items</span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      <select
                        value={req.status}
                        onChange={(e) => handleUpdateStatus(req.id, e.target.value)}
                        className="text-xs font-semibold rounded-lg px-2.5 py-1 border border-stone-200 bg-stone-50 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => setSelectedReqModal(req)}
                        className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold inline-flex items-center space-x-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </button>
                      <button
                        onClick={() => openWhatsApp(req.whatsapp || req.phone, req)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold inline-flex items-center space-x-1"
                        title="Chat on WhatsApp"
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

        {/* Complete Details Modal */}
        {selectedReqModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
            <div 
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-royal-950 to-stone-900 text-white flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold bg-amber-400 text-royal-950 px-2.5 py-0.5 rounded">
                      {selectedReqModal.id}
                    </span>
                    <span className="text-xs text-stone-300">
                      {new Date(selectedReqModal.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold mt-2">
                    {selectedReqModal.customerName} &bull; {selectedReqModal.eventType}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedReqModal(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
                {/* Host Details */}
                <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-stone-400 block">Phone</span>
                    <span className="font-bold text-stone-900">{selectedReqModal.phone}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">WhatsApp</span>
                    <span className="font-bold text-stone-900">{selectedReqModal.whatsapp}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Event Date</span>
                    <span className="font-bold text-stone-900">{selectedReqModal.eventDate}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Guests</span>
                    <span className="font-bold text-stone-900">{selectedReqModal.guests}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Location</span>
                    <span className="font-bold text-stone-900">{selectedReqModal.location || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Current Status</span>
                    <div className="mt-0.5">{getStatusBadge(selectedReqModal.status)}</div>
                  </div>
                </div>

                {/* Selected Foods Breakdown */}
                <div>
                  <h4 className="font-serif font-bold text-lg text-stone-900 mb-3">
                    Selected Dishes ({selectedReqModal.selectedFoods?.length} items)
                  </h4>
                  <div className="space-y-2 border border-stone-200 rounded-2xl p-4 divide-y divide-stone-100">
                    {selectedReqModal.selectedFoods?.map((f, i) => (
                      <div key={i} className="pt-2 pb-2 first:pt-0 last:pb-0 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs text-stone-400">{i + 1}.</span>
                          <span className={f.type === 'veg' ? 'veg-badge' : 'nonveg-badge'}></span>
                          <span className="text-sm font-semibold text-stone-800">{f.name}</span>
                        </div>
                        <span className="text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded">
                          {f.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => openWhatsApp(selectedReqModal.whatsapp || selectedReqModal.phone, selectedReqModal)}
                    className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Contact Customer on WhatsApp</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="py-3 px-4 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-semibold text-xs"
                  >
                    Print Details
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
