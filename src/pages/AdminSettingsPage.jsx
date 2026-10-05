import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Settings, 
  MessageCircle, 
  ShieldCheck, 
  Save, 
  Send, 
  Check, 
  AlertCircle, 
  RefreshCw,
  ExternalLink,
  History
} from 'lucide-react';

export function AdminSettingsPage({ setActivePage }) {
  const { token } = useAuth();

  const [settings, setSettings] = useState({
    adminWhatsAppNumber: '+919876543210',
    whatsappApiEnabled: false,
    whatsappPhoneNumberId: '',
    whatsappAccessToken: '',
    notifyAdminOnSubmission: true,
    notifyCustomerOnSubmission: true,
    companyName: 'Royal Feast Caterers',
    companyPhone: '+919876543210',
    companyEmail: 'contact@royalfeastcaterers.com'
  });

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testPhone, setTestPhone] = useState('+919876543210');
  const [testResult, setTestResult] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fetchSettingsAndLogs = () => {
    Promise.all([
      fetch('/api/admin/settings', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
      fetch('/api/admin/whatsapp/logs', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json())
    ])
      .then(([settingsData, logsData]) => {
        if (settingsData) setSettings(settingsData);
        if (Array.isArray(logsData)) setLogs(logsData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSettingsAndLogs();
  }, [token]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3500);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleSendTest = async () => {
    setTestResult(null);
    try {
      const res = await fetch('/api/admin/whatsapp/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ testPhone })
      });
      const data = await res.json();
      setTestResult(data);
      fetchSettingsAndLogs();
    } catch (e) {
      setTestResult({ message: 'Error sending test message' });
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen py-10 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-extrabold text-stone-900">
              Admin WhatsApp &amp; Integration Settings
            </h1>
            <p className="text-stone-500 text-sm mt-1">
              Configure automatic WhatsApp Business API delivery, recipient admin numbers, and direct fallbacks.
            </p>
          </div>
          <button
            onClick={() => setActivePage('admin-dashboard')}
            className="text-xs font-bold text-amber-700 hover:text-amber-800"
          >
            &larr; Admin Dashboard
          </button>
        </div>

        {saveSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center space-x-2.5">
            <Check className="w-5 h-5 shrink-0" />
            <span>Settings saved successfully!</span>
          </div>
        )}

        {/* Configuration Form */}
        <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
          
          {/* Section 1: Admin WhatsApp Recipient */}
          <div>
            <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-emerald-600" />
              <span>Admin Receiving Number</span>
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              All new customer catering submissions will prepare and dispatch notification messages to this number.
            </p>
            <div className="mt-3 max-w-md">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Admin WhatsApp Number (with country code)
              </label>
              <input
                type="text"
                required
                value={settings.adminWhatsAppNumber}
                onChange={(e) => setSettings(prev => ({ ...prev, adminWhatsAppNumber: e.target.value }))}
                className="w-full px-4 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:ring-1 focus:ring-amber-500 font-mono"
                placeholder="+919876543210"
              />
            </div>
          </div>

          {/* Section 2: Automated Meta WhatsApp Business Cloud API */}
          <div className="pt-6 border-t border-stone-100 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  <span>Meta WhatsApp Cloud API (Server-Side Delivery)</span>
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Optional. If configured, our backend automatically transmits WhatsApp alerts without human intervention.
                </p>
              </div>

              {/* Toggle Switch */}
              <label className="flex items-center space-x-2 text-xs font-bold text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.whatsappApiEnabled}
                  onChange={(e) => setSettings(prev => ({ ...prev, whatsappApiEnabled: e.target.checked }))}
                  className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                />
                <span>Enable Cloud API</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Phone Number ID
                </label>
                <input
                  type="text"
                  value={settings.whatsappPhoneNumberId || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, whatsappPhoneNumberId: e.target.value }))}
                  placeholder="e.g. 104829104829102"
                  className="w-full px-4 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:ring-1 focus:ring-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Access Token (Bearer)
                </label>
                <input
                  type="password"
                  value={settings.whatsappAccessToken || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, whatsappAccessToken: e.target.value }))}
                  placeholder="Paste Meta System User Token..."
                  className="w-full px-4 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:ring-1 focus:ring-amber-500 font-mono"
                />
              </div>
            </div>

            <p className="text-[11px] text-stone-400">
              Note: When disabled or if API encounters rate limits, the system provides a seamless zero-delay <b>wa.me</b> link fallback.
            </p>
          </div>

          {/* Section 3: Notification Toggles */}
          <div className="pt-6 border-t border-stone-100 space-y-3">
            <h3 className="font-serif font-bold text-base text-stone-900">
              Notification Preferences
            </h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-xs font-medium text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifyAdminOnSubmission !== false}
                  onChange={(e) => setSettings(prev => ({ ...prev, notifyAdminOnSubmission: e.target.checked }))}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <span>Dispatch notification to Admin WhatsApp whenever customer submits selection</span>
              </label>

              <label className="flex items-center space-x-2 text-xs font-medium text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifyCustomerOnSubmission !== false}
                  onChange={(e) => setSettings(prev => ({ ...prev, notifyCustomerOnSubmission: e.target.checked }))}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <span>Send confirmation message to Customer's WhatsApp number</span>
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-royal-950 font-bold text-xs shadow-md flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Configuration'}</span>
            </button>
          </div>

        </form>

        {/* Section 4: Live Test Notification Panel */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-4">
          <div>
            <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center space-x-2">
              <Send className="w-5 h-5 text-amber-600" />
              <span>Test WhatsApp Integration</span>
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Verify that notification formatting and dispatch links operate correctly with a test payload.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-center max-w-lg">
            <input
              type="text"
              value={testPhone}
              onChange={(e) => setTestPhone(e.target.value)}
              placeholder="+919876543210"
              className="w-full sm:flex-1 px-4 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 font-mono"
            />
            <button
              type="button"
              onClick={handleSendTest}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shrink-0 flex items-center justify-center space-x-1.5"
            >
              <span>Send Test Message</span>
            </button>
          </div>

          {testResult && (
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 animate-fade-in space-y-2">
              <p className="font-bold text-stone-900">{testResult.message}</p>
              {testResult.link && (
                <a
                  href={testResult.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1 text-emerald-700 font-bold hover:underline"
                >
                  <span>Open Test Message in WhatsApp Web / App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Section 5: WhatsApp Logs */}
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center space-x-2">
                <History className="w-5 h-5 text-stone-600" />
                <span>WhatsApp Notification Logs</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">Audited trace of recent automated dispatches</p>
            </div>
            <button
              onClick={fetchSettingsAndLogs}
              className="p-2 rounded-lg text-stone-400 hover:text-stone-700"
              title="Refresh logs"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto max-h-72">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-100 text-stone-400 uppercase font-mono">
                <tr>
                  <th className="py-3 px-6">Timestamp</th>
                  <th className="py-3 px-6">Type</th>
                  <th className="py-3 px-6">Recipient</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6">Excerpt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-medium text-stone-700">
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-6 text-center text-stone-400">No dispatch logs recorded yet.</td>
                  </tr>
                ) : (
                  logs.map(log => (
                    <tr key={log.id} className="hover:bg-stone-50">
                      <td className="py-3 px-6 whitespace-nowrap text-stone-400">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </td>
                      <td className="py-3 px-6 font-mono text-amber-800">
                        {log.type}
                      </td>
                      <td className="py-3 px-6 font-mono">
                        {log.recipient}
                      </td>
                      <td className="py-3 px-6">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          log.success ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {log.success ? 'Success / Ready' : 'Failed'}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-stone-500 truncate max-w-xs">
                        {log.messageExcerpt}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
