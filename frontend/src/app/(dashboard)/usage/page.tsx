const BARS = [
  { label: 'HR Scout',         used: 210, color: 'bg-indigo-400 dark:bg-indigo-500' },
  { label: 'Invoice Guard',    used: 520, color: 'bg-violet-400 dark:bg-violet-500' },
  { label: 'Support Agent',    used: 680, color: 'bg-cyan-400 dark:bg-cyan-500' },
  { label: 'Compliance Scout', used: 95,  color: 'bg-emerald-400 dark:bg-emerald-500' },
  { label: 'Finance Ops',      used: 310, color: 'bg-amber-400 dark:bg-amber-500' },
  { label: 'Onboarding Bot',   used: 58,  color: 'bg-slate-300 dark:bg-slate-600' },
];
const TOTAL_USED  = BARS.reduce((s, b) => s + b.used, 0);
const TOTAL_LIMIT = 2000;

const HISTORY = [
  { period: 'July 2026',  tasks: 1643, credits: 1643, amount: '₦450,000', status: 'Paid' },
  { period: 'June 2026',  tasks: 1580, credits: 1580, amount: '₦450,000', status: 'Paid' },
  { period: 'May 2026',   tasks: 921,  credits: 921,  amount: '₦450,000', status: 'Paid' },
];

export default function UsagePage() {
  const pct = Math.round((TOTAL_USED / TOTAL_LIMIT) * 100);
  const max = Math.max(...BARS.map(b => b.used));

  return (
    <div className="max-w-[900px] mx-auto flex flex-col gap-5">
      {/* Current Plan Banner */}
      <div className="relative bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-5 md:p-6 shadow-sm dark:shadow-none overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-['Outfit'] text-[18px] md:text-[20px] font-bold text-slate-900 dark:text-white">Growth Plan</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-400">Active</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">₦450,000 / month · Renews August 31, 2026</p>
          </div>
          <a href="#" className="w-full sm:w-auto text-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white gradient-bg shadow-[0_4px_16px_rgba(99,102,241,0.25)] hover:-translate-y-px transition-all no-underline">
            Upgrade to Enterprise →
          </a>
        </div>
      </div>

      {/* Credit Usage */}
      <div className="bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-5 md:p-6 shadow-sm dark:shadow-none">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4">
          <div>
            <h3 className="font-semibold text-[14px] text-slate-800 dark:text-slate-100">Task Credits — August 2026</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              <span className="font-bold text-slate-800 dark:text-slate-200">{TOTAL_USED}</span> of {TOTAL_LIMIT} used ({pct}%)
            </p>
          </div>
          <span className={`text-[13px] font-semibold ${pct > 80 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
            {TOTAL_LIMIT - TOTAL_USED} remaining
          </span>
        </div>
        <div className="h-2.5 bg-slate-100 dark:bg-white/[0.07] rounded-full overflow-hidden mb-5">
          <div className="h-full gradient-bg rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex flex-col gap-3">
          {BARS.map(b => (
            <div key={b.label} className="flex items-center gap-3">
              <span className="text-[12px] text-slate-600 dark:text-slate-400 w-[120px] md:w-[140px] shrink-0 truncate">{b.label}</span>
              <div className="flex-1 h-1.5 bg-slate-100 dark:bg-white/[0.07] rounded-full overflow-hidden">
                <div className={`h-full ${b.color} rounded-full transition-all`} style={{ width: `${(b.used / max) * 100}%` }} />
              </div>
              <span className="text-[12px] text-slate-500 w-[36px] text-right shrink-0">{b.used}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Billing History — table on md+, cards on mobile */}
      <div className="bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] rounded-2xl shadow-sm dark:shadow-none overflow-hidden">
        <div className="px-5 md:px-6 py-4 border-b border-slate-100 dark:border-white/[0.05]">
          <h3 className="font-semibold text-[14px] text-slate-800 dark:text-slate-100">Billing History</h3>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden flex flex-col divide-y divide-slate-50 dark:divide-white/[0.04]">
          {HISTORY.map(r => (
            <div key={r.period} className="px-5 py-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-[13px] font-semibold text-slate-800 dark:text-slate-200">{r.period}</div>
                <div className="text-[12px] text-slate-500 dark:text-slate-400 mt-0.5">{r.tasks.toLocaleString()} tasks · {r.credits.toLocaleString()} credits</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[13px] font-bold text-slate-800 dark:text-slate-100">{r.amount}</div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">{r.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop table */}
        <table className="hidden md:table w-full">
          <thead>
            <tr className="border-b border-slate-100 dark:border-white/[0.05]">
              {['Period', 'Tasks Completed', 'Credits Used', 'Amount', 'Status'].map(h => (
                <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HISTORY.map(r => (
              <tr key={r.period} className="border-b border-slate-50 dark:border-white/[0.03] hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-3.5 text-[13px] font-medium text-slate-800 dark:text-slate-200">{r.period}</td>
                <td className="px-5 py-3.5 text-[13px] text-slate-600 dark:text-slate-400">{r.tasks.toLocaleString()}</td>
                <td className="px-5 py-3.5 text-[13px] text-slate-600 dark:text-slate-400">{r.credits.toLocaleString()}</td>
                <td className="px-5 py-3.5 text-[13px] font-semibold text-slate-800 dark:text-slate-200">{r.amount}</td>
                <td className="px-5 py-3.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
