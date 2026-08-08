'use client';
import { useState } from 'react';
import { Plus, SlidersHorizontal, X, CheckCircle, PauseCircle } from 'lucide-react';

const AGENT_COLORS: Record<string, { bg: string; text: string }> = {
  'hr-scout':      { bg: 'bg-violet-100 dark:bg-violet-500/15',  text: 'text-violet-600 dark:text-violet-400'  },
  'invoice-guard': { bg: 'bg-indigo-100 dark:bg-indigo-500/15',  text: 'text-indigo-600 dark:text-indigo-400'  },
  'support-agent': { bg: 'bg-emerald-100 dark:bg-emerald-500/15',text: 'text-emerald-600 dark:text-emerald-400' },
  'compliance':    { bg: 'bg-cyan-100 dark:bg-cyan-500/15',      text: 'text-cyan-600 dark:text-cyan-500'      },
  'finance-ops':   { bg: 'bg-amber-100 dark:bg-amber-500/15',    text: 'text-amber-600 dark:text-amber-500'    },
  'onboarding':    { bg: 'bg-slate-100 dark:bg-white/[0.07]',    text: 'text-slate-600 dark:text-slate-400'    },
};

const AGENTS = [
  { id: 'hr-scout',      name: 'HR Scout',        initials: 'HS', category: 'HR & Talent',        tasks: 34,  success: 98,  credits: 210, status: 'active',  desc: 'Screens CVs, ranks candidates, and coordinates interview scheduling automatically.' },
  { id: 'invoice-guard', name: 'Invoice Guard',   initials: 'IG', category: 'Finance & AP',       tasks: 89,  success: 99,  credits: 520, status: 'active',  desc: 'Matches invoices to POs, flags discrepancies, and auto-approves within policy limits.' },
  { id: 'support-agent', name: 'Support Agent',   initials: 'SA', category: 'Customer Ops',       tasks: 124, success: 100, credits: 680, status: 'active',  desc: 'Handles inbound support tickets via email and WhatsApp 24/7 with escalation logic.' },
  { id: 'compliance',    name: 'Compliance Scout',initials: 'CS', category: 'Legal & Compliance',  tasks: 12,  success: 97,  credits: 95,  status: 'active',  desc: 'Monitors regulatory feeds and generates compliance reports across business units.' },
  { id: 'finance-ops',   name: 'Finance Ops',     initials: 'FO', category: 'Finance & AP',       tasks: 45,  success: 99,  credits: 310, status: 'active',  desc: 'Processes expense reports, categorizes spend, and reconciles accounts payable.' },
  { id: 'onboarding',    name: 'Onboarding Bot',  initials: 'OB', category: 'HR & Talent',        tasks: 8,   success: 95,  credits: 58,  status: 'paused',  desc: 'Guides new hires through document submission, IT provisioning, and training scheduling.' },
];

export default function AgentsPage() {
  const [statuses, setStatuses] = useState<Record<string, string>>(
    Object.fromEntries(AGENTS.map(a => [a.id, a.status]))
  );
  const [configOpen, setConfigOpen] = useState<string | null>(null);

  const toggle = (id: string) =>
    setStatuses(s => ({ ...s, [id]: s[id] === 'active' ? 'paused' : 'active' }));

  const agent = AGENTS.find(a => a.id === configOpen);
  const colors = configOpen ? AGENT_COLORS[configOpen] : null;

  return (
    <div className="max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-[13px] text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-slate-700 dark:text-slate-300">6</span> agents deployed ·&nbsp;
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">5 active</span> ·&nbsp;
          <span className="text-slate-400">1 paused</span>
        </p>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white gradient-bg shadow-[0_4px_16px_rgba(99,102,241,0.25)] hover:-translate-y-px hover:shadow-[0_6px_24px_rgba(99,102,241,0.4)] transition-all">
          <Plus size={15} />
          Request Custom Agent
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {AGENTS.map(a => {
          const status = statuses[a.id];
          const color  = AGENT_COLORS[a.id];
          return (
            <div key={a.id} className="bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-5 shadow-sm dark:shadow-none flex flex-col gap-4 hover:shadow-md hover:border-slate-300 dark:hover:border-white/10 transition-all">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${color.bg} flex items-center justify-center shrink-0`}>
                    <span className={`text-[12px] font-bold ${color.text}`}>{a.initials}</span>
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold text-slate-900 dark:text-slate-100">{a.name}</div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{a.category}</div>
                  </div>
                </div>
                <div className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full ${
                  status === 'active'
                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                    : 'bg-slate-100 dark:bg-white/[0.07] text-slate-500 dark:text-slate-500'
                }`}>
                  {status === 'active'
                    ? <CheckCircle size={11} />
                    : <PauseCircle size={11} />}
                  <span className="capitalize">{status}</span>
                </div>
              </div>

              <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-[1.65] flex-1">{a.desc}</p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Tasks',   val: a.tasks },
                  { label: 'Success', val: `${a.success}%` },
                  { label: 'Credits', val: a.credits },
                ].map(m => (
                  <div key={m.label} className="bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.05] rounded-xl py-2.5 text-center">
                    <div className="text-[14px] font-bold text-slate-800 dark:text-slate-100">{m.val}</div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-600 mt-0.5 uppercase tracking-wide">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => setConfigOpen(a.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[12px] font-semibold border border-slate-200 dark:border-white/[0.07] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/[0.05] transition-all"
                >
                  <SlidersHorizontal size={12} />
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
      {configOpen && agent && colors && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/30 dark:bg-black/50 backdrop-blur-sm" onClick={() => setConfigOpen(null)} />
          <div className="w-full max-w-[400px] bg-white dark:bg-[#080812] border-l border-slate-200 dark:border-white/[0.07] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-white/[0.05]">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl ${colors.bg} flex items-center justify-center shrink-0`}>
                  <span className={`text-[11px] font-bold ${colors.text}`}>{agent.initials}</span>
                </div>
                <div>
                  <div className="font-semibold text-[15px] text-slate-900 dark:text-white">{agent.name}</div>
                  <div className="text-[11px] text-slate-400 dark:text-slate-500">{agent.category}</div>
                </div>
              </div>
              <button onClick={() => setConfigOpen(null)} className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-all">
                <X size={15} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
              {[
                { label: 'Escalation Email',       defaultVal: 'ops@company.com'  },
                { label: 'Max Auto-Approve Value', defaultVal: '₦500,000'         },
                { label: 'Working Hours',          defaultVal: '24/7 (All hours)' },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-[12px] font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-1.5">{f.label}</label>
                  <input defaultValue={f.defaultVal} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.03] text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all" />
                </div>
              ))}
              <div>
                <label className="block text-[12px] font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-1.5">Notification Channel</label>
                <div className="flex gap-2">
                  {['Email', 'WhatsApp', 'Slack'].map(ch => (
                    <button key={ch} className="flex-1 py-2 rounded-xl border border-indigo-200 dark:border-indigo-500/25 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 text-[12px] font-medium hover:bg-indigo-100 dark:hover:bg-indigo-500/15 transition-all">{ch}</button>
                  ))}
                </div>
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
