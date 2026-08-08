'use client';
import { ArrowUpRight, Zap } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, PieChart, Pie, Legend,
} from 'recharts';
import { useEffect, useState } from 'react';

// ── Data ──────────────────────────────────────────────────────────────────────
const AGENT_USAGE = [
  { name: 'Support',   initials: 'SA', used: 680, color: '#10b981', fill: '#10b981' },
  { name: 'Invoice',   initials: 'IG', used: 520, color: '#6366f1', fill: '#6366f1' },
  { name: 'Finance',   initials: 'FO', used: 310, color: '#f59e0b', fill: '#f59e0b' },
  { name: 'HR Scout',  initials: 'HS', used: 210, color: '#8b5cf6', fill: '#8b5cf6' },
  { name: 'Compliance',initials: 'CS', used: 95,  color: '#06b6d4', fill: '#06b6d4' },
  { name: 'Onboarding',initials: 'OB', used: 58,  color: '#94a3b8', fill: '#94a3b8' },
];

const DAILY_TASKS = [
  { day: 'Mon', tasks: 182 },
  { day: 'Tue', tasks: 241 },
  { day: 'Wed', tasks: 198 },
  { day: 'Thu', tasks: 310 },
  { day: 'Fri', tasks: 275 },
  { day: 'Sat', tasks: 89  },
  { day: 'Sun', tasks: 52  },
];

const HISTORY = [
  { period: 'July 2026',  tasks: 1643, credits: 1643, amount: '₦450,000', status: 'Paid' },
  { period: 'June 2026',  tasks: 1580, credits: 1580, amount: '₦450,000', status: 'Paid' },
  { period: 'May 2026',   tasks: 921,  credits: 921,  amount: '₦450,000', status: 'Paid' },
];

const TOTAL_USED  = AGENT_USAGE.reduce((s, b) => s + b.used, 0);
const TOTAL_LIMIT = 2000;

// ── Custom Tooltip ────────────────────────────────────────────────────────────
const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-[#13131f] border border-slate-200 dark:border-white/[0.1] rounded-xl px-3 py-2.5 shadow-xl text-[12px]">
      <p className="font-semibold text-slate-700 dark:text-slate-300 mb-0.5">{label}</p>
      <p className="text-indigo-600 dark:text-indigo-400 font-bold">{payload[0].value} tasks</p>
    </div>
  );
};

const CustomPieTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-[#13131f] border border-slate-200 dark:border-white/[0.1] rounded-xl px-3 py-2.5 shadow-xl text-[12px]">
      <p className="font-semibold text-slate-700 dark:text-slate-300">{payload[0].name}</p>
      <p className="font-bold mt-0.5" style={{ color: payload[0].payload.color }}>{payload[0].value} credits</p>
    </div>
  );
};

// ── Page ─────────────────────────────────────────────────────────────────────
export default function UsagePage() {
  const pct = Math.round((TOTAL_USED / TOTAL_LIMIT) * 100);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="max-w-[960px] mx-auto flex flex-col gap-5">

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

      {/* Overall Credit Usage */}
      <div className="bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-5 md:p-6 shadow-sm dark:shadow-none">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-semibold text-[14px] text-slate-900 dark:text-white">Task Credits — August 2026</h3>
            <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-0.5">
              <span className="font-bold text-slate-800 dark:text-slate-200">{TOTAL_USED.toLocaleString()}</span> of{' '}
              <span className="font-medium">{TOTAL_LIMIT.toLocaleString()}</span> credits used
            </p>
          </div>
          <div className="text-right">
            <span className={`text-[22px] font-bold font-['Outfit'] ${pct > 80 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>{pct}%</span>
            <p className="text-[12px] text-slate-400 dark:text-slate-600">{(TOTAL_LIMIT - TOTAL_USED).toLocaleString()} remaining</p>
          </div>
        </div>
        <div className="h-2 bg-slate-100 dark:bg-white/[0.07] rounded-full overflow-hidden">
          <div className="h-full gradient-bg rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Daily tasks bar chart */}
        <div className="bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-5 shadow-sm dark:shadow-none">
          <div className="mb-4">
            <h3 className="font-semibold text-[14px] text-slate-900 dark:text-white">Tasks This Week</h3>
            <p className="text-[11px] text-slate-400 dark:text-slate-600 mt-0.5">Daily task execution across all agents</p>
          </div>
          {mounted && (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={DAILY_TASKS} barCategoryGap="35%">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'rgb(148 163 184)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'rgb(148 163 184)' }} axisLine={false} tickLine={false} width={30} />
                <Tooltip content={<CustomBarTooltip />} cursor={{ fill: 'rgba(99,102,241,0.06)', radius: 8 }} />
                <Bar dataKey="tasks" radius={[6, 6, 0, 0]}>
                  {DAILY_TASKS.map((_, i) => (
                    <Cell key={i} fill={i === 3 ? '#6366f1' : 'url(#barGrad)'} />
                  ))}
                </Bar>
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Agent credit breakdown — donut */}
        <div className="bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-5 shadow-sm dark:shadow-none">
          <div className="mb-2">
            <h3 className="font-semibold text-[14px] text-slate-900 dark:text-white">Credit Breakdown</h3>
            <p className="text-[11px] text-slate-400 dark:text-slate-600 mt-0.5">By agent — August 2026</p>
          </div>
          {mounted && (
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie data={AGENT_USAGE} dataKey="used" nameKey="name" cx="50%" cy="50%"
                    innerRadius={44} outerRadius={72} paddingAngle={3} stroke="none">
                    {AGENT_USAGE.map((a, i) => <Cell key={i} fill={a.color} />)}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-2 flex-1 w-full">
                {AGENT_USAGE.map(a => (
                  <div key={a.name} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: a.color }} />
                    <span className="text-[12px] text-slate-600 dark:text-slate-400 flex-1 truncate">{a.name}</span>
                    <span className="text-[12px] font-semibold text-slate-700 dark:text-slate-300 tabular-nums">{a.used}</span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-600 w-[36px] text-right tabular-nums">{Math.round((a.used / TOTAL_USED) * 100)}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
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
