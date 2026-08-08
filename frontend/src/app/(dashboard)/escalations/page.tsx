'use client';
import { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Clock } from 'lucide-react';

const PENDING = [
  {
    id: 'ESC-001', agent: 'Invoice Guard', initials: 'IG',
    agentColor: 'bg-indigo-100 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400',
    title: 'Invoice #INV-2244 requires approval',
    desc: 'Invoice from Nexford Logistics for ₦7,800,000 exceeds the ₦500,000 auto-approve limit. Review and approve or reject.',
    time: '35m ago', priority: 'High',
    data: { Vendor: 'Nexford Logistics Ltd', Amount: '₦7,800,000', PO: 'PO-1120', 'Due Date': 'Aug 10, 2026' },
  },
  {
    id: 'ESC-002', agent: 'Support Agent', initials: 'SA',
    agentColor: 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
    title: 'Customer #CUS-0441 requested human agent',
    desc: 'Customer has expressed frustration and explicitly requested a human agent after 3 automated interactions.',
    time: '1h 12m ago', priority: 'Medium',
    data: { Customer: 'Amaka Obi', Channel: 'WhatsApp', Ticket: '#4819', 'Wait Time': '72 minutes' },
  },
];

const RESOLVED = [
  { id: 'ESC-000', agent: 'Finance Ops', initials: 'FO', agentColor: 'bg-amber-100 dark:bg-amber-500/15 text-amber-600 dark:text-amber-500', title: 'Expense #EXP-0049 — ₦220,000 approved', resolution: 'Approved by Tunde A.', time: '2 hours ago' },
  { id: 'ESC-999', agent: 'HR Scout',    initials: 'HS', agentColor: 'bg-violet-100 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400', title: 'Job description required for Ops Manager role', resolution: 'Resolved by Ada O.', time: 'Yesterday' },
];

const PRIORITY_STYLE: Record<string, string> = {
  High:   'bg-rose-100 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20',
  Medium: 'bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20',
};

export default function EscalationsPage() {
  const [resolved, setResolved] = useState(false);
  const [confirm, setConfirm]   = useState<{ id: string; action: 'approve' | 'reject' } | null>(null);
  const [done, setDone]         = useState<string[]>([]);

  const pending = PENDING.filter(e => !done.includes(e.id));

  const handleConfirm = () => {
    if (!confirm) return;
    setDone(d => [...d, confirm.id]);
    setConfirm(null);
  };

  return (
    <div className="max-w-[800px] mx-auto flex flex-col gap-5">
      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 dark:bg-white/[0.04] rounded-xl p-1 w-fit">
        {['Pending', 'Resolved'].map(tab => (
          <button key={tab} onClick={() => setResolved(tab === 'Resolved')}
            className={`px-5 py-1.5 rounded-[10px] text-sm font-medium transition-all ${(tab === 'Resolved') === resolved ? 'bg-white dark:bg-white/[0.08] text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>
            {tab}
            {tab === 'Pending' && pending.length > 0 && (
              <span className="ml-2 bg-rose-500 text-white text-[10px] w-4 h-4 inline-flex items-center justify-center rounded-full font-bold">{pending.length}</span>
            )}
          </button>
        ))}
      </div>

      {!resolved ? (
        <>
          {pending.length === 0 && (
            <div className="text-center py-16 bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] rounded-2xl shadow-sm dark:shadow-none">
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle size={22} className="text-emerald-500" />
              </div>
              <p className="font-semibold text-slate-700 dark:text-slate-300">All clear</p>
              <p className="text-sm text-slate-400 dark:text-slate-600 mt-1">No pending escalations at this time.</p>
            </div>
          )}
          {pending.map(e => (
            <div key={e.id} className="bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] rounded-2xl shadow-sm dark:shadow-none overflow-hidden">
              {/* Card header bar */}
              <div className={`h-1 w-full ${e.priority === 'High' ? 'bg-rose-400' : 'bg-amber-400'}`} />
              <div className="p-5 md:p-6 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl ${e.agentColor.split(' ').slice(0,2).join(' ')} flex items-center justify-center shrink-0`}>
                      <span className={`text-[11px] font-bold ${e.agentColor.split(' ').slice(2).join(' ')}`}>{e.initials}</span>
                    </div>
                    <div>
                      <div className="text-[14px] font-semibold text-slate-900 dark:text-white leading-snug">{e.title}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[12px] text-slate-500 dark:text-slate-500">{e.agent}</span>
                        <span className="text-slate-300 dark:text-slate-700">·</span>
                        <span className="flex items-center gap-1 text-[12px] text-slate-400 dark:text-slate-600">
                          <Clock size={11} /> {e.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${PRIORITY_STYLE[e.priority]}`}>{e.priority}</span>
                </div>

                <p className="text-[13px] text-slate-600 dark:text-slate-400 leading-[1.65]">{e.desc}</p>

                <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.05] rounded-xl p-4">
                  {Object.entries(e.data).map(([k, v]) => (
                    <div key={k}>
                      <div className="text-[10px] text-slate-400 dark:text-slate-600 uppercase tracking-wider font-medium mb-0.5">{k}</div>
                      <div className="text-[13px] font-semibold text-slate-800 dark:text-slate-200">{v}</div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 pt-1">
                  <button onClick={() => setConfirm({ id: e.id, action: 'reject' })}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-rose-200 dark:border-rose-500/25 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-sm font-semibold hover:bg-rose-100 dark:hover:bg-rose-500/15 transition-all">
                    <XCircle size={15} /> Reject
                  </button>
                  <button onClick={() => setConfirm({ id: e.id, action: 'approve' })}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl gradient-bg text-white text-sm font-semibold shadow-[0_2px_12px_rgba(99,102,241,0.2)] hover:-translate-y-px transition-all">
                    <CheckCircle size={15} /> Approve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="flex flex-col gap-3">
          {RESOLVED.map(e => (
            <div key={e.id} className="bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] rounded-2xl px-5 py-4 shadow-sm dark:shadow-none flex items-center gap-4">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${e.agentColor.split(' ').slice(0,2).join(' ')}`}>
                <span className={`text-[11px] font-bold ${e.agentColor.split(' ').slice(2).join(' ')}`}>{e.initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-slate-700 dark:text-slate-300">{e.title}</div>
                <div className="flex items-center gap-1.5 text-[12px] text-slate-400 dark:text-slate-600 mt-0.5">
                  <CheckCircle size={11} className="text-emerald-500" />
                  {e.resolution} · {e.time}
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 shrink-0">Resolved</span>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation modal */}
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm" onClick={() => setConfirm(null)} />
          <div className="relative bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-6 w-full max-w-[360px] shadow-2xl">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${confirm.action === 'approve' ? 'bg-indigo-50 dark:bg-indigo-500/10' : 'bg-rose-50 dark:bg-rose-500/10'}`}>
              {confirm.action === 'approve'
                ? <CheckCircle size={20} className="text-indigo-500 dark:text-indigo-400" />
                : <XCircle size={20} className="text-rose-500 dark:text-rose-400" />}
            </div>
            <h3 className="font-semibold text-[16px] text-slate-900 dark:text-white mb-1 capitalize">
              {confirm.action} this escalation?
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
              This action will be logged in the audit trail and cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setConfirm(null)} className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.07] text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/[0.05] transition-all">Cancel</button>
              <button onClick={handleConfirm} className={`flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all ${confirm.action === 'approve' ? 'gradient-bg shadow-[0_2px_12px_rgba(99,102,241,0.2)]' : 'bg-rose-500 hover:bg-rose-600'}`}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
