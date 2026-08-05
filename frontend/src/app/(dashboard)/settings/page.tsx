'use client';
import { useState } from 'react';

const INTEGRATIONS = [
  { name: 'WhatsApp Business', icon: '💬', desc: 'Route customer messages and escalations via WhatsApp.',  status: 'connected' },
  { name: 'Gmail / Email',     icon: '📧', desc: 'Send and receive emails from your agents.',             status: 'connected' },
  { name: 'Slack',             icon: '🔔', desc: 'Receive escalation alerts and activity in Slack.',       status: 'disconnected' },
  { name: 'QuickBooks',        icon: '📒', desc: 'Sync invoice and finance data with QuickBooks.',         status: 'disconnected' },
  { name: 'Zoho CRM',          icon: '📊', desc: 'Push customer interactions and records to Zoho.',        status: 'disconnected' },
  { name: 'Google Drive',      icon: '📁', desc: 'Store and retrieve agent-generated reports and files.',  status: 'disconnected' },
];

export default function SettingsPage() {
  const [profile, setProfile] = useState({ name: 'Demo User', email: 'demo@company.com', company: 'Acme Ltd.' });
  const [notif, setNotif] = useState({ email: true, whatsapp: true, escalations: true, weeklyReport: false });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-[760px] mx-auto flex flex-col gap-6">
      {/* Profile */}
      <div className="bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-6 shadow-sm dark:shadow-none">
        <h3 className="font-semibold text-[15px] text-slate-900 dark:text-white mb-5">Profile</h3>
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center text-2xl font-bold text-white shadow-md">
              {profile.name.charAt(0)}
            </div>
            <div>
              <button type="button" className="text-[13px] font-medium text-indigo-600 dark:text-indigo-400 hover:underline">Change avatar</button>
              <p className="text-[12px] text-slate-400 dark:text-slate-600 mt-0.5">JPG or PNG, max 2MB</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-1.5">Full Name</label>
              <input value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.03] text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all" />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-1.5">Company</label>
              <input value={profile.company} onChange={e => setProfile(p => ({ ...p, company: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.03] text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all" />
            </div>
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-1.5">Work Email</label>
            <input type="email" value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.03] text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all" />
          </div>
          <div className="flex items-center gap-3">
            <button type="submit"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white gradient-bg shadow-[0_4px_16px_rgba(99,102,241,0.2)] hover:-translate-y-px transition-all">
              Save Profile
            </button>
            {saved && <span className="text-[13px] text-emerald-600 dark:text-emerald-400 font-medium animate-fade-up">✓ Changes saved</span>}
          </div>
        </form>
      </div>

      {/* Notifications */}
      <div className="bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-6 shadow-sm dark:shadow-none">
        <h3 className="font-semibold text-[15px] text-slate-900 dark:text-white mb-5">Notifications</h3>
        <div className="flex flex-col gap-4">
          {([
            { key: 'email',        label: 'Email Alerts',         desc: 'Receive escalation and activity emails' },
            { key: 'whatsapp',     label: 'WhatsApp Alerts',      desc: 'Get instant WhatsApp notifications' },
            { key: 'escalations',  label: 'Escalation Alerts',    desc: 'Notify me immediately when an agent escalates' },
            { key: 'weeklyReport', label: 'Weekly Summary Report', desc: 'Receive a weekly digest every Monday morning' },
          ] as const).map(n => (
            <div key={n.key} className="flex items-center justify-between">
              <div>
                <div className="text-[13px] font-medium text-slate-800 dark:text-slate-200">{n.label}</div>
                <div className="text-[12px] text-slate-400 dark:text-slate-600">{n.desc}</div>
              </div>
              <button
                onClick={() => setNotif(prev => ({ ...prev, [n.key]: !prev[n.key] }))}
                className={`relative w-11 h-6 rounded-full transition-all duration-200 ${notif[n.key] ? 'gradient-bg' : 'bg-slate-200 dark:bg-white/[0.12]'}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${notif[n.key] ? 'left-[22px]' : 'left-0.5'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Integrations */}
      <div className="bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-6 shadow-sm dark:shadow-none">
        <h3 className="font-semibold text-[15px] text-slate-900 dark:text-white mb-5">Integrations</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {INTEGRATIONS.map(intg => (
            <div key={intg.name} className="flex items-center gap-3 p-4 border border-slate-100 dark:border-white/[0.05] rounded-xl hover:border-slate-200 dark:hover:border-white/[0.1] transition-all">
              <span className="text-xl shrink-0">{intg.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-slate-800 dark:text-slate-200">{intg.name}</div>
                <div className="text-[11px] text-slate-400 dark:text-slate-600 truncate">{intg.desc}</div>
              </div>
              <button className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg shrink-0 transition-all ${
                intg.status === 'connected'
                  ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400'
                  : 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/15'
              }`}>
                {intg.status === 'connected' ? 'Connected' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white dark:bg-[#080812] border border-rose-200 dark:border-rose-500/20 rounded-2xl p-6 shadow-sm dark:shadow-none">
        <h3 className="font-semibold text-[15px] text-rose-600 dark:text-rose-400 mb-1">Danger Zone</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">These actions are permanent and cannot be undone.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="px-5 py-2.5 rounded-xl border border-rose-200 dark:border-rose-500/25 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-sm font-semibold hover:bg-rose-100 dark:hover:bg-rose-500/15 transition-all">
            Pause All Agents
          </button>
          <button className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold transition-all">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
