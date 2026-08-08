'use client';
import { useState } from 'react';
import { Search, SlidersHorizontal, CheckCircle, AlertTriangle, Info, ChevronDown, ChevronUp } from 'lucide-react';

const LOGS = [
  { id: 'EVT-0041', time: '18:04', agent: 'Invoice Guard',    action: 'AUTO_APPROVE', detail: 'Invoice #INV-8821 approved — ₦120,000 within policy limit', type: 'success' },
  { id: 'EVT-0040', time: '17:58', agent: 'HR Scout',         action: 'SHORTLIST',    detail: '3 candidates shortlisted from 15 screened for Ops Manager role', type: 'info' },
  { id: 'EVT-0039', time: '17:51', agent: 'Support Agent',    action: 'RESOLVE',      detail: 'Ticket #4821 resolved — response sent via email to customer', type: 'success' },
  { id: 'EVT-0038', time: '17:43', agent: 'Invoice Guard',    action: 'ESCALATE',     detail: 'Invoice #INV-2244 escalated — amount ₦7.8M exceeds auto-approve threshold', type: 'warning' },
  { id: 'EVT-0037', time: '17:30', agent: 'Compliance Scout', action: 'REPORT',       detail: 'Q2 Compliance Report generated — NDPC, CBN checklist complete', type: 'success' },
  { id: 'EVT-0036', time: '17:12', agent: 'Finance Ops',      action: 'FLAG',         detail: 'Expense #EXP-0055 flagged — ₦85,000 exceeds category limit', type: 'warning' },
  { id: 'EVT-0035', time: '17:05', agent: 'Support Agent',    action: 'ESCALATE',     detail: 'Ticket #4819 escalated — customer requested human agent', type: 'warning' },
  { id: 'EVT-0034', time: '16:58', agent: 'HR Scout',         action: 'REJECT',       detail: '8 candidates rejected — below minimum experience threshold', type: 'info' },
  { id: 'EVT-0033', time: '16:40', agent: 'Invoice Guard',    action: 'AUTO_APPROVE', detail: 'Invoice #INV-8818 approved — ₦48,500 within policy limit', type: 'success' },
  { id: 'EVT-0032', time: '16:22', agent: 'Onboarding Bot',   action: 'PAUSE',        detail: 'Agent paused by admin — manual override via dashboard', type: 'info' },
];

const TYPE_CONFIG: Record<string, { style: string; dot: string; Icon: React.ElementType }> = {
  success: { style: 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400', dot: 'bg-emerald-500', Icon: CheckCircle },
  warning: { style: 'bg-amber-100 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400',         dot: 'bg-amber-400',   Icon: AlertTriangle },
  info:    { style: 'bg-indigo-100 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-400',      dot: 'bg-indigo-500',  Icon: Info },
};

const AGENTS  = ['All Agents',  'Invoice Guard', 'HR Scout', 'Support Agent', 'Compliance Scout', 'Finance Ops', 'Onboarding Bot'];
const ACTIONS = ['All Actions', 'AUTO_APPROVE', 'SHORTLIST', 'RESOLVE', 'ESCALATE', 'REPORT', 'FLAG', 'REJECT', 'PAUSE'];

export default function AuditLogPage() {
  const [agent,    setAgent]    = useState('All Agents');
  const [action,   setAction]   = useState('All Actions');
  const [search,   setSearch]   = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = LOGS.filter(l =>
    (agent  === 'All Agents'  || l.agent  === agent)  &&
    (action === 'All Actions' || l.action === action)  &&
    (search === '' || l.detail.toLowerCase().includes(search.toLowerCase()) || l.agent.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-[1100px] mx-auto flex flex-col gap-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#080812] shadow-sm dark:shadow-none focus-within:ring-2 focus-within:ring-indigo-500/30 transition-all">
          <Search size={14} className="text-slate-400 shrink-0" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search events…"
            className="w-full bg-transparent text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          <select value={agent} onChange={e => setAgent(e.target.value)}
            className="flex-1 sm:flex-none px-3 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#080812] text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 shadow-sm dark:shadow-none">
            {AGENTS.map(a => <option key={a}>{a}</option>)}
          </select>
          <select value={action} onChange={e => setAction(e.target.value)}
            className="flex-1 sm:flex-none px-3 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#080812] text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 shadow-sm dark:shadow-none">
            {ACTIONS.map(a => <option key={a}>{a}</option>)}
          </select>
        </div>
        <span className="flex items-center gap-1.5 text-[12px] text-slate-400 dark:text-slate-600 self-center">
          <SlidersHorizontal size={12} />
          {filtered.length} events
        </span>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden flex flex-col gap-3">
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-slate-400 bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] rounded-2xl">No events match your filters.</div>
        )}
        {filtered.map(l => {
          const cfg = TYPE_CONFIG[l.type];
          return (
            <div key={l.id}
              onClick={() => setExpanded(expanded === l.id ? null : l.id)}
              className="bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-4 shadow-sm dark:shadow-none cursor-pointer">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1 ${cfg.dot}`} />
                  <span className="text-[13px] font-semibold text-slate-800 dark:text-slate-200">{l.agent}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cfg.style}`}>{l.action}</span>
                  <span className="text-[11px] text-slate-400 font-mono">{l.time}</span>
                </div>
              </div>
              <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-[1.5] ml-3.5">{l.detail}</p>
              {expanded === l.id && (
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/[0.05] flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500 ml-3.5">
                  <span>ID: <strong className="text-slate-700 dark:text-slate-300 font-mono">{l.id}</strong></span>
                  <span>Time: <strong className="text-slate-700 dark:text-slate-300">{l.time} today</strong></span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] rounded-2xl shadow-sm dark:shadow-none overflow-hidden">
        {/* Column headers */}
        <div className="grid grid-cols-[90px_64px_160px_120px_1fr_24px] gap-3 px-5 py-3 border-b border-slate-100 dark:border-white/[0.05] text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-600">
          <span>Event ID</span><span>Time</span><span>Agent</span><span>Action</span><span>Detail</span><span></span>
        </div>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-sm text-slate-400 dark:text-slate-600">No events match your filters.</div>
        )}
        {filtered.map(l => {
          const cfg = TYPE_CONFIG[l.type];
          const isOpen = expanded === l.id;
          return (
            <div key={l.id} className="border-b border-slate-50 dark:border-white/[0.03] last:border-0">
              <div
                onClick={() => setExpanded(isOpen ? null : l.id)}
                className="grid grid-cols-[90px_64px_160px_120px_1fr_24px] gap-3 px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-white/[0.02] cursor-pointer items-center"
              >
                <span className="text-[12px] font-mono text-slate-400 dark:text-slate-600">{l.id}</span>
                <span className="text-[12px] text-slate-400 dark:text-slate-600 font-mono">{l.time}</span>
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />
                  <span className="text-[13px] text-slate-700 dark:text-slate-300 font-medium truncate">{l.agent}</span>
                </div>
                <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full w-fit ${cfg.style}`}>
                  <cfg.Icon size={10} />
                  {l.action}
                </span>
                <span className="text-[12px] text-slate-500 dark:text-slate-400 truncate">{l.detail}</span>
                {isOpen ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
              </div>
              {isOpen && (
                <div className="px-5 py-4 bg-slate-50 dark:bg-white/[0.02] border-t border-slate-100 dark:border-white/[0.05]">
                  <p className="text-[13px] text-slate-700 dark:text-slate-300 leading-[1.6] mb-3">{l.detail}</p>
                  <div className="flex flex-wrap gap-6 text-[12px]">
                    <div><span className="text-slate-400 dark:text-slate-600">Agent</span><br/><strong className="text-slate-700 dark:text-slate-300">{l.agent}</strong></div>
                    <div><span className="text-slate-400 dark:text-slate-600">Event ID</span><br/><strong className="text-slate-700 dark:text-slate-300 font-mono">{l.id}</strong></div>
                    <div><span className="text-slate-400 dark:text-slate-600">Time</span><br/><strong className="text-slate-700 dark:text-slate-300">{l.time} today</strong></div>
                    <div><span className="text-slate-400 dark:text-slate-600">Type</span><br/>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${cfg.style}`}>{l.action}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
