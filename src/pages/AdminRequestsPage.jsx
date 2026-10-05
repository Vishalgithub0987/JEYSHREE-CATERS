import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWebSocket } from '../context/WebSocketContext';
import { 
  ClipboardList, 
  Search, 
  Filter, 
  Eye, 
  MessageCircle, 
  X, 
  Phone, 
  Printer, 
  Calendar,
  Users,
  MapPin,
  CheckCircle2
} from 'lucide-react';

export function AdminRequestsPage({ setActivePage }) {
  const { token } = useAuth();
  const { lastEvent } = useWebSocket();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [activeModal, setActiveModal] = useState(null);

  const fetchRequests = () => {
    fetch('/api/requests', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setRequests(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch requests:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRequests();
  }, [token]);

  useEffect(() => {
    if (lastEvent && (lastEvent.type === 'NEW_REQUEST' || lastEvent.type === 'REQUEST_STATUS_UPDATED')) {
      fetchRequests();
    }
  }, [lastEvent]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/requests/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
        if (activeModal && activeModal.id === id) {
          setActiveModal(prev => ({ ...prev, status: newStatus }));
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const openWhatsApp = (req) => {
    const phone = req.whatsapp || req.phone;
    const text = encodeURIComponent(`Hello ${req.customerName}, this is Chef Rajesh from Royal Feast Caterers regarding your catering order ${req.id} for ${req.eventType} on ${req.eventDate}.`);
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  const filteredRequests = requests.filter(r => {
    const matchesStatus = filterStatus === 'All' || r.status === filterStatus;
    const q = search.toLowerCase().trim();
    const matchesSearch = !q || 
      r.id.toLowerCase().includes(q) ||
      r.customerName.toLowerCase().includes(q) ||
      r.phone.includes(q) ||
      (r.location && r.location.toLowerCase().includes(q)) ||
      r.eventType.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="bg-stone-50 min-h-screen py-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-extrabold text-stone-900">
              Catering Requests Management
            </h1>
            <p className="text-stone-500 text-sm mt-1">
              Review, update, and coordinate all incoming event food selections.
            </p>
          </div>
          <button
            onClick={() => setActivePage('admin-dashboard')}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 self-start sm:self-auto"
          >
            &larr; Back to Admin Dashboard
          </button>
        </div>

        {/* Filter Controls */}
        <div className="bg-white p-4 rounded-3xl border border-stone-200/90 shadow-sm flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by customer name, phone, or request ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0">
            {['All', 'New', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'].map(st => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  filterStatus === st 
                    ? 'bg-amber-600 text-white shadow-xs' 
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Requests Table */}
        {loading ? (
          <div className="h-64 bg-white rounded-3xl border border-stone-200 animate-pulse"></div>
        ) : filteredRequests.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-stone-200 shadow-sm">
            <ClipboardList className="w-12 h-12 text-stone-300 mx-auto mb-2" />
            <h3 className="font-serif text-lg font-bold text-stone-800">No requests found</h3>
            <p className="text-xs text-stone-400 mt-1">Try clearing filters or search terms.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-stone-50 border-b border-stone-100 text-stone-400 font-mono text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-4 px-6">ID &amp; Date</th>
                    <th className="py-4 px-6">Customer Name</th>
                    <th className="py-4 px-6">Contact Numbers</th>
                    <th className="py-4 px-6">Event &amp; Venue</th>
                    <th className="py-4 px-6">Guests</th>
                    <th className="py-4 px-6">Items</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-medium">
                  {filteredRequests.map(req => (
                    <tr key={req.id} className="hover:bg-amber-50/40 transition-colors">
                      <td className="py-4 px-6">
                        <span className="font-mono font-bold text-amber-800 text-xs block">{req.id}</span>
                        <span className="text-[10px] text-stone-400">{new Date(req.createdAt).toLocaleDateString()}</span>
                      </td>

                      <td className="py-4 px-6">
                        <p className="font-bold text-stone-900">{req.customerName}</p>
                      </td>

                      <td className="py-4 px-6 text-xs text-stone-600 space-y-0.5">
                        <p>Phone: <span className="font-mono">{req.phone}</span></p>
                        {req.whatsapp && req.whatsapp !== req.phone && (
                          <p className="text-emerald-700">WA: <span className="font-mono">{req.whatsapp}</span></p>
                        )}
                      </td>

                      <td className="py-4 px-6 text-xs">
                        <p className="font-bold text-stone-900">{req.eventType}</p>
                        <p className="text-stone-400">{req.eventDate} &bull; {req.location || 'Pending'}</p>
                      </td>

                      <td className="py-4 px-6 text-stone-700 font-semibold">
                        {req.guests}
                      </td>

                      <td className="py-4 px-6">
                        <span className="font-bold text-stone-800">{req.selectedFoods?.length || 0}</span>{' '}
                        <span className="text-xs text-stone-400">items</span>
                      </td>

                      <td className="py-4 px-6">
                        <select
                          value={req.status}
                          onChange={(e) => handleStatusChange(req.id, e.target.value)}
                          className="text-xs font-semibold rounded-lg px-2.5 py-1 border border-stone-200 bg-stone-50 focus:ring-1 focus:ring-amber-500"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => setActiveModal(req)}
                          className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold inline-flex items-center space-x-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => openWhatsApp(req)}
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

        {/* Details Modal */}
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
            <div 
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 bg-gradient-to-r from-royal-950 to-stone-900 text-white flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-bold bg-amber-400 text-royal-950 px-2 py-0.5 rounded">
                    {activeModal.id}
                  </span>
                  <h3 className="font-serif text-2xl font-bold mt-2">
                    {activeModal.customerName} &bull; {activeModal.eventType}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
                <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-stone-400 block">Phone</span>
                    <span className="font-bold text-stone-900">{activeModal.phone}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">WhatsApp</span>
                    <span className="font-bold text-stone-900">{activeModal.whatsapp}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Date</span>
                    <span className="font-bold text-stone-900">{activeModal.eventDate}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Guests</span>
                    <span className="font-bold text-stone-900">{activeModal.guests}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-serif font-bold text-lg text-stone-900 mb-3">
                    Selected Dishes ({activeModal.selectedFoods?.length} items)
                  </h4>
                  <div className="space-y-2 border border-stone-200 rounded-2xl p-4 divide-y divide-stone-100">
                    {activeModal.selectedFoods?.map((f, i) => (
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

                {activeModal.notes && (
                  <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 text-xs">
                    <p className="font-bold text-amber-900 mb-1">Customer Special Notes:</p>
                    <p className="text-stone-700">{activeModal.notes}</p>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => openWhatsApp(activeModal)}
                    className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Send Message via WhatsApp</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="py-3 px-4 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-semibold text-xs"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Order</span>
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
