'use client';
import { useState } from 'react';

const PENDING = [
  { id: 'ESC-001', agent: 'Invoice Guard', icon: '🛡️', title: 'Invoice #INV-2244 requires approval', desc: 'Invoice from Nexford Logistics for ₦7,800,000 exceeds the ₦500,000 auto-approve limit. Review and approve or reject.', time: '35m ago', priority: 'High', data: { Vendor: 'Nexford Logistics Ltd', Amount: '₦7,800,000', PO: 'PO-1120', 'Due Date': 'Aug 10, 2026' } },
  { id: 'ESC-002', agent: 'Support Agent', icon: '💬', title: 'Customer #CUS-0441 requested human agent', desc: 'Customer has expressed frustration and explicitly requested a human agent after 3 automated interactions. Recommend immediate response.', time: '1h 12m ago', priority: 'Medium', data: { Customer: 'Amaka Obi', Channel: 'WhatsApp', Ticket: '#4819', 'Wait Time': '72 minutes' } },
];

const RESOLVED = [
  { id: 'ESC-000', agent: 'Finance Ops', icon: '💰', title: 'Expense #EXP-0049 — ₦220,000 approved', resolution: 'Approved by Tunde A. · 2 hours ago' },
  { id: 'ESC-999', agent: 'HR Scout',    icon: '🎯', title: 'Job description required for Ops Manager role', resolution: 'Resolved by Ada O. · Yesterday' },
];

const PRIORITY_STYLE: Record<string, string> = {
  High:   'bg-rose-100 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400',
  Medium: 'bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400',
  Low:    'bg-slate-100 dark:bg-white/[0.07] text-slate-600 dark:text-slate-400',
};

export default function EscalationsPage() {
  const [resolved, setResolved] = useState(false);
  const [confirm, setConfirm] = useState<{ id: string; action: 'approve' | 'reject' } | null>(null);
  const [done, setDone] = useState<string[]>([]);

  const pending = PENDING.filter(e => !done.includes(e.id));

  const handleConfirm = () => {
    if (!confirm) return;
    setDone(d => [...d, confirm.id]);
    setConfirm(null);
  };

  return (
    <div className="max-w-[800px] mx-auto flex flex-col gap-6">
      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 dark:bg-white/[0.04] rounded-xl p-1 w-fit">
        {['Pending', 'Resolved'].map(tab => (
          <button key={tab} onClick={() => setResolved(tab === 'Resolved')}
            className={`px-4 py-1.5 rounded-[10px] text-sm font-medium transition-all ${(tab === 'Resolved') === resolved ? 'bg-white dark:bg-white/[0.08] text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>
            {tab} {tab === 'Pending' && pending.length > 0 && <span className="ml-1 bg-rose-500 text-white text-[10px] px-1.5 py-px rounded-full">{pending.length}</span>}
          </button>
        ))}
      </div>

      {!resolved ? (
        <>
          {pending.length === 0 && (
            <div className="text-center py-16 bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] rounded-2xl shadow-sm dark:shadow-none">
              <div className="text-4xl mb-3">✅</div>
              <p className="font-semibold text-slate-700 dark:text-slate-300">All clear!</p>
              <p className="text-sm text-slate-400 dark:text-slate-600 mt-1">No pending escalations right now.</p>
            </div>
          )}
          {pending.map(e => (
            <div key={e.id} className="bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-6 shadow-sm dark:shadow-none flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{e.icon}</span>
                  <div>
                    <div className="text-[14px] font-semibold text-slate-900 dark:text-white">{e.title}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[12px] text-slate-500 dark:text-slate-500">{e.agent}</span>
                      <span className="text-slate-300 dark:text-slate-700">·</span>
                      <span className="text-[12px] text-slate-400 dark:text-slate-600">{e.time}</span>
                    </div>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${PRIORITY_STYLE[e.priority]}`}>{e.priority}</span>
              </div>

              <p className="text-[13px] text-slate-600 dark:text-slate-400 leading-[1.65]">{e.desc}</p>

              <div className="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-white/[0.03] rounded-xl p-4">
                {Object.entries(e.data).map(([k, v]) => (
                  <div key={k}>
                    <div className="text-[11px] text-slate-400 dark:text-slate-600 uppercase tracking-wider">{k}</div>
                    <div className="text-[13px] font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{v}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setConfirm({ id: e.id, action: 'reject' })}
                  className="flex-1 py-2.5 rounded-xl border border-rose-200 dark:border-rose-500/25 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-sm font-semibold hover:bg-rose-100 dark:hover:bg-rose-500/15 transition-all">
                  Reject
                </button>
                <button onClick={() => setConfirm({ id: e.id, action: 'approve' })}
                  className="flex-1 py-2.5 rounded-xl gradient-bg text-white text-sm font-semibold shadow-[0_2px_12px_rgba(99,102,241,0.2)] hover:-translate-y-px transition-all">
                  Approve
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="flex flex-col gap-3">
          {RESOLVED.map(e => (
            <div key={e.id} className="bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] rounded-2xl px-5 py-4 shadow-sm dark:shadow-none flex items-center gap-4">
              <span className="text-xl">{e.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-slate-700 dark:text-slate-300">{e.title}</div>
                <div className="text-[12px] text-slate-400 dark:text-slate-600 mt-0.5">{e.resolution}</div>
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
            <h3 className="font-semibold text-[16px] text-slate-900 dark:text-white mb-2 capitalize">{confirm.action} this escalation?</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">This action will be logged in the audit trail and cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirm(null)} className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.07] text-sm font-semibold text-slate-700 dark:text-slate-300">Cancel</button>
              <button onClick={handleConfirm} className={`flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all ${confirm.action === 'approve' ? 'gradient-bg shadow-[0_2px_12px_rgba(99,102,241,0.2)]' : 'bg-rose-500 hover:bg-rose-600'}`}>
                Confirm {confirm.action === 'approve' ? 'Approval' : 'Rejection'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
