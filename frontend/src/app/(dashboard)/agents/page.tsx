'use client';
import { useState } from 'react';

const AGENTS = [
  { id: 'hr-scout',      name: 'HR Scout',         icon: '🎯', category: 'HR & Talent',     tasks: 34,  success: 98, credits: 210, status: 'active',  desc: 'Screens CVs, ranks candidates, and coordinates interview scheduling automatically.' },
  { id: 'invoice-guard', name: 'Invoice Guard',     icon: '🛡️', category: 'Finance & AP',    tasks: 89,  success: 99, credits: 520, status: 'active',  desc: 'Matches invoices to POs, flags discrepancies, and auto-approves within policy limits.' },
  { id: 'support-agent', name: 'Support Agent',     icon: '💬', category: 'Customer Ops',    tasks: 124, success: 100,credits: 680, status: 'active',  desc: 'Handles inbound support tickets via email and WhatsApp 24/7 with escalation logic.' },
  { id: 'compliance',    name: 'Compliance Scout',  icon: '📋', category: 'Legal & Compliance',tasks: 12, success: 97, credits: 95,  status: 'active',  desc: 'Monitors regulatory feeds and generates compliance reports across business units.' },
  { id: 'finance-ops',   name: 'Finance Ops',       icon: '💰', category: 'Finance & AP',    tasks: 45,  success: 99, credits: 310, status: 'active',  desc: 'Processes expense reports, categorizes spend, and reconciles accounts payable.' },
  { id: 'onboarding',    name: 'Onboarding Bot',    icon: '🚀', category: 'HR & Talent',     tasks: 8,   success: 95, credits: 58,  status: 'paused',  desc: 'Guides new hires through document submission, IT provisioning, and training scheduling.' },
];

const statusStyle: Record<string, string> = {
  active: 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
  paused: 'bg-slate-100 dark:bg-white/[0.07] text-slate-500 dark:text-slate-500',
};

export default function AgentsPage() {
  const [statuses, setStatuses] = useState<Record<string, string>>(
    Object.fromEntries(AGENTS.map(a => [a.id, a.status]))
  );
  const [configOpen, setConfigOpen] = useState<string | null>(null);

  const toggle = (id: string) =>
    setStatuses(s => ({ ...s, [id]: s[id] === 'active' ? 'paused' : 'active' }));

  const agent = AGENTS.find(a => a.id === configOpen);

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">6 agents deployed · 5 active · 1 paused</p>
        </div>
        <button className="px-4 py-2 rounded-xl text-sm font-semibold text-white gradient-bg shadow-[0_4px_16px_rgba(99,102,241,0.25)] hover:-translate-y-px hover:shadow-[0_6px_24px_rgba(99,102,241,0.4)] transition-all">
          + Request Custom Agent
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {AGENTS.map(a => {
          const status = statuses[a.id];
          return (
            <div key={a.id} className="bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-5 shadow-sm dark:shadow-none flex flex-col gap-4 hover:shadow-md hover:border-slate-300 dark:hover:border-white/10 transition-all">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{a.icon}</span>
                  <div>
                    <div className="text-[14px] font-semibold text-slate-900 dark:text-slate-100">{a.name}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-500">{a.category}</div>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${statusStyle[status]}`}>{status}</span>
              </div>

              <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-[1.6]">{a.desc}</p>

              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { label: 'Tasks', val: a.tasks },
                  { label: 'Success', val: `${a.success}%` },
                  { label: 'Credits', val: a.credits },
                ].map(m => (
                  <div key={m.label} className="bg-slate-50 dark:bg-white/[0.03] rounded-xl py-2">
                    <div className="text-[14px] font-bold text-slate-800 dark:text-slate-100">{m.val}</div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-600 uppercase tracking-wider">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setConfigOpen(a.id)}
                  className="flex-1 py-2 rounded-xl text-[12px] font-semibold border border-slate-200 dark:border-white/[0.07] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/[0.05] transition-all"
                >
                  Configure
                </button>
                <button
                  onClick={() => toggle(a.id)}
                  className={`flex-1 py-2 rounded-xl text-[12px] font-semibold transition-all ${
                    status === 'active'
                      ? 'bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400'
                      : 'gradient-bg text-white shadow-[0_2px_12px_rgba(99,102,241,0.2)] hover:-translate-y-px'
                  }`}
                >
                  {status === 'active' ? 'Pause' : 'Resume'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Config slide-over */}
      {configOpen && agent && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/30 dark:bg-black/50 backdrop-blur-sm" onClick={() => setConfigOpen(null)} />
          <div className="w-full max-w-[400px] bg-white dark:bg-[#080812] border-l border-slate-200 dark:border-white/[0.07] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-white/[0.05]">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{agent.icon}</span>
                <div>
                  <div className="font-semibold text-[15px] text-slate-900 dark:text-white">{agent.name}</div>
                  <div className="text-[12px] text-slate-500 dark:text-slate-500">{agent.category}</div>
                </div>
              </div>
              <button onClick={() => setConfigOpen(null)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white text-xl leading-none">×</button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
              <div>
                <label className="block text-[12px] font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-2">Escalation Email</label>
                <input defaultValue="ops@company.com" className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.03] text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-2">Max Auto-Approve Value</label>
                <input defaultValue="₦500,000" className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.03] text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-2">Notification Channel</label>
                <div className="flex gap-2">
                  {['Email', 'WhatsApp', 'Slack'].map(ch => (
                    <button key={ch} className="flex-1 py-2 rounded-xl border border-indigo-200 dark:border-indigo-500/25 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 text-[12px] font-medium">{ch}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-2">Working Hours</label>
                <input defaultValue="24/7 (All hours)" className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.03] text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 dark:border-white/[0.05] flex gap-3">
              <button onClick={() => setConfigOpen(null)} className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.07] text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/[0.05] transition-all">Cancel</button>
              <button onClick={() => setConfigOpen(null)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white gradient-bg shadow-[0_2px_12px_rgba(99,102,241,0.2)] hover:-translate-y-px transition-all">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
