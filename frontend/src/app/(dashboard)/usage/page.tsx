import { ArrowUpRight, Zap } from 'lucide-react';

const BARS = [
  { label: 'Support Agent',    initials: 'SA', used: 680, color: 'bg-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-500/15', text: 'text-emerald-600 dark:text-emerald-400' },
  { label: 'Invoice Guard',    initials: 'IG', used: 520, color: 'bg-indigo-500',  bg: 'bg-indigo-100 dark:bg-indigo-500/15',  text: 'text-indigo-600 dark:text-indigo-400'  },
  { label: 'Finance Ops',      initials: 'FO', used: 310, color: 'bg-amber-500',   bg: 'bg-amber-100 dark:bg-amber-500/15',    text: 'text-amber-600 dark:text-amber-500'    },
  { label: 'HR Scout',         initials: 'HS', used: 210, color: 'bg-violet-500',  bg: 'bg-violet-100 dark:bg-violet-500/15',  text: 'text-violet-600 dark:text-violet-400'  },
  { label: 'Compliance Scout', initials: 'CS', used: 95,  color: 'bg-cyan-500',    bg: 'bg-cyan-100 dark:bg-cyan-500/15',      text: 'text-cyan-600 dark:text-cyan-500'      },
  { label: 'Onboarding Bot',   initials: 'OB', used: 58,  color: 'bg-slate-400',   bg: 'bg-slate-100 dark:bg-white/[0.07]',    text: 'text-slate-600 dark:text-slate-400'    },
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
      {/* Plan Banner */}
      <div className="relative bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] rounded-2xl overflow-hidden shadow-sm dark:shadow-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.05),transparent_60%)] pointer-events-none" />
        <div className="relative p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center shadow-[0_4px_16px_rgba(99,102,241,0.3)]">
              <Zap size={18} className="text-white" fill="white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-['Outfit'] text-[18px] md:text-[20px] font-bold text-slate-900 dark:text-white">Growth Plan</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">Active</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">₦450,000 / month · Renews August 31, 2026</p>
            </div>
          </div>
          <a href="#" className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold text-white gradient-bg shadow-[0_4px_16px_rgba(99,102,241,0.25)] hover:-translate-y-px transition-all no-underline">
            Upgrade to Enterprise <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      {/* Credit Usage */}
      <div className="bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-5 md:p-6 shadow-sm dark:shadow-none">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-semibold text-[14px] text-slate-900 dark:text-white">Task Credits — August 2026</h3>
            <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-0.5">
              <span className="font-bold text-slate-800 dark:text-slate-200">{TOTAL_USED.toLocaleString()}</span> of <span className="font-medium">{TOTAL_LIMIT.toLocaleString()}</span> credits used
            </p>
          </div>
          <div className="text-right">
            <span className={`text-[22px] font-bold font-['Outfit'] ${pct > 80 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>{pct}%</span>
            <p className="text-[12px] text-slate-400 dark:text-slate-600">{(TOTAL_LIMIT - TOTAL_USED).toLocaleString()} remaining</p>
          </div>
        </div>
        <div className="h-2 bg-slate-100 dark:bg-white/[0.07] rounded-full overflow-hidden mb-6">
          <div className="h-full gradient-bg rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
        </div>

        {/* Per-agent breakdown */}
        <div className="flex flex-col gap-3">
          {BARS.map(b => (
            <div key={b.label} className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-lg ${b.bg} flex items-center justify-center shrink-0`}>
                <span className={`text-[9px] font-bold ${b.text}`}>{b.initials}</span>
              </div>
              <span className="text-[12px] text-slate-600 dark:text-slate-400 w-[130px] md:w-[150px] shrink-0 truncate">{b.label}</span>
              <div className="flex-1 h-1.5 bg-slate-100 dark:bg-white/[0.07] rounded-full overflow-hidden">
                <div className={`h-full ${b.color} rounded-full`} style={{ width: `${(b.used / max) * 100}%` }} />
              </div>
              <span className="text-[12px] text-slate-500 dark:text-slate-500 w-[40px] text-right tabular-nums shrink-0">{b.used}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] rounded-2xl shadow-sm dark:shadow-none overflow-hidden">
        <div className="px-5 md:px-6 py-4 border-b border-slate-100 dark:border-white/[0.05]">
          <h3 className="font-semibold text-[14px] text-slate-900 dark:text-white">Billing History</h3>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex flex-col divide-y divide-slate-50 dark:divide-white/[0.04]">
          {HISTORY.map(r => (
            <div key={r.period} className="px-5 py-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-[13px] font-semibold text-slate-800 dark:text-slate-200">{r.period}</div>
                <div className="text-[12px] text-slate-400 dark:text-slate-600 mt-0.5">{r.tasks.toLocaleString()} tasks · {r.credits.toLocaleString()} credits</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[13px] font-bold text-slate-800 dark:text-slate-100">{r.amount}</div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">{r.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop */}
        <table className="hidden md:table w-full">
          <thead>
            <tr className="border-b border-slate-100 dark:border-white/[0.05]">
              {['Period', 'Tasks Completed', 'Credits Used', 'Amount', 'Status'].map(h => (
                <th key={h} className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HISTORY.map(r => (
              <tr key={r.period} className="border-b border-slate-50 dark:border-white/[0.03] last:border-0 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4 text-[13px] font-medium text-slate-800 dark:text-slate-200">{r.period}</td>
                <td className="px-6 py-4 text-[13px] text-slate-500 dark:text-slate-400 tabular-nums">{r.tasks.toLocaleString()}</td>
                <td className="px-6 py-4 text-[13px] text-slate-500 dark:text-slate-400 tabular-nums">{r.credits.toLocaleString()}</td>
                <td className="px-6 py-4 text-[13px] font-semibold text-slate-800 dark:text-slate-200">{r.amount}</td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1 text-[11px] font-semibold w-fit px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
