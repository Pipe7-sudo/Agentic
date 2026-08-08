import {
  Zap, Bot, AlertCircle, Target,
  TrendingUp, TrendingDown, ArrowRight, CheckCircle, Clock, TriangleAlert,
  Rocket, FileText, Gem,
} from 'lucide-react';

const STATS = [
  { label: 'Tasks Today',       value: '247',   delta: '+12%', up: true,  Icon: Zap,         color: 'text-indigo-600 dark:text-indigo-400',   bg: 'bg-indigo-50 dark:bg-indigo-500/10',   iconBg: 'text-indigo-500' },
  { label: 'Agents Active',     value: '6 / 6', delta: '100%', up: true,  Icon: Bot,         color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10', iconBg: 'text-emerald-500' },
  { label: 'Awaiting Approval', value: '2',     delta: '–1',   up: false, Icon: AlertCircle, color: 'text-amber-600 dark:text-amber-400',    bg: 'bg-amber-50 dark:bg-amber-500/10',    iconBg: 'text-amber-500' },
  { label: 'Accuracy Rate',     value: '99.1%', delta: '+0.3%',up: true,  Icon: Target,      color: 'text-cyan-600 dark:text-cyan-500',      bg: 'bg-cyan-50 dark:bg-cyan-500/10',      iconBg: 'text-cyan-500' },
];

const AGENTS = [
  { name: 'HR Scout',         initials: 'HS', tasks: 34,  status: 'Active',  rate: 98,  bg: 'bg-violet-100 dark:bg-violet-500/15',  text: 'text-violet-600 dark:text-violet-400',  bar: 'bg-violet-500' },
  { name: 'Invoice Guard',    initials: 'IG', tasks: 89,  status: 'Working', rate: 99,  bg: 'bg-indigo-100 dark:bg-indigo-500/15',  text: 'text-indigo-600 dark:text-indigo-400',  bar: 'bg-indigo-500' },
  { name: 'Support Agent',    initials: 'SA', tasks: 124, status: 'Active',  rate: 100, bg: 'bg-emerald-100 dark:bg-emerald-500/15',text: 'text-emerald-600 dark:text-emerald-400',bar: 'bg-emerald-500' },
  { name: 'Compliance Scout', initials: 'CS', tasks: 12,  status: 'Active',  rate: 97,  bg: 'bg-cyan-100 dark:bg-cyan-500/15',      text: 'text-cyan-600 dark:text-cyan-500',      bar: 'bg-cyan-500' },
  { name: 'Finance Ops',      initials: 'FO', tasks: 45,  status: 'Active',  rate: 99,  bg: 'bg-amber-100 dark:bg-amber-500/15',    text: 'text-amber-600 dark:text-amber-500',    bar: 'bg-amber-500' },
  { name: 'Onboarding Bot',   initials: 'OB', tasks: 8,   status: 'Paused',  rate: 95,  bg: 'bg-slate-100 dark:bg-white/[0.07]',    text: 'text-slate-500 dark:text-slate-500',    bar: 'bg-slate-400' },
];

const ACTIVITY = [
  { time: '2m ago',  agent: 'Invoice Guard',    msg: 'Matched and approved 3 invoices totalling ₦4.2M',            type: 'success' },
  { time: '11m ago', agent: 'HR Scout',         msg: 'Screened 12 candidates — 3 shortlisted for ops role',        type: 'info' },
  { time: '23m ago', agent: 'Support Agent',    msg: 'Resolved ticket #4821 — "Unable to access account"',         type: 'success' },
  { time: '35m ago', agent: 'Invoice Guard',    msg: 'Escalation raised: Invoice #INV-2244 needs manual review',   type: 'warning' },
  { time: '1h ago',  agent: 'Compliance Scout', msg: 'Generated Q2 compliance report — 0 violations found',        type: 'success' },
  { time: '1h ago',  agent: 'Finance Ops',      msg: 'Processed 8 expense reports — 1 flagged for excess',         type: 'warning' },
];

const typeDot: Record<string, string> = {
  success: 'bg-emerald-500',
  info:    'bg-indigo-500',
  warning: 'bg-amber-400',
};

const QUICK = [
  { label: 'Deploy Agent',       Icon: Rocket,    href: '/agents',      border: 'hover:border-indigo-300 dark:hover:border-indigo-500/40' },
  { label: 'Review Escalations', Icon: TriangleAlert, href: '/escalations', border: 'hover:border-amber-300 dark:hover:border-amber-500/40' },
  { label: 'View Audit Log',     Icon: FileText,  href: '/audit-log',   border: 'hover:border-slate-300 dark:hover:border-white/20' },
  { label: 'Upgrade Plan',       Icon: Gem,       href: '/usage',       border: 'hover:border-violet-300 dark:hover:border-violet-500/40' },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-5 max-w-[1200px] mx-auto">
      {/* Greeting */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-['Outfit'] text-[20px] md:text-[22px] font-bold text-slate-900 dark:text-white tracking-tight">
            Good morning, Demo
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Here&apos;s what your AI workforce accomplished today.
          </p>
        </div>
        <span className="hidden sm:flex items-center gap-1.5 text-[12px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-500/20">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          All systems operational
        </span>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {STATS.map(s => (
          <div key={s.label} className="bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-4 md:p-5 shadow-sm dark:shadow-none hover:shadow-md dark:hover:border-white/10 transition-all">
            <div className="flex items-start justify-between mb-3 md:mb-4">
              <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center`}>
                <s.Icon size={16} className={s.iconBg} />
              </div>
              <span className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                s.up
                  ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10'
                  : 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10'
              }`}>
                {s.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {s.delta}
              </span>
            </div>
            <div className={`font-['Outfit'] text-[26px] md:text-[28px] font-extrabold tracking-tight ${s.color} leading-none mb-1`}>{s.value}</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-500 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Agents + Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Active Agents */}
        <div className="bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-5 shadow-sm dark:shadow-none">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-[14px] text-slate-900 dark:text-white">Active Agents</h3>
              <p className="text-[11px] text-slate-400 dark:text-slate-600 mt-0.5">Real-time performance</p>
            </div>
            <a href="/agents" className="flex items-center gap-1 text-[12px] text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium no-underline transition-colors">
              Manage <ArrowRight size={12} />
            </a>
          </div>
          <div className="flex flex-col gap-3.5">
            {AGENTS.map(a => (
              <div key={a.name} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg ${a.bg} flex items-center justify-center shrink-0`}>
                  <span className={`text-[11px] font-bold ${a.text}`}>{a.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[13px] font-medium text-slate-800 dark:text-slate-100">{a.name}</span>
                    <span className="text-[12px] text-slate-400 dark:text-slate-500 tabular-nums">{a.tasks} tasks</span>
                  </div>
                  <div className="h-1 rounded-full bg-slate-100 dark:bg-white/[0.07] overflow-hidden">
                    <div className={`h-full rounded-full ${a.bar}`} style={{ width: `${a.rate}%` }} />
                  </div>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                  a.status === 'Active'  ? 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400' :
                  a.status === 'Working' ? 'bg-indigo-100 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-400' :
                  'bg-slate-100 dark:bg-white/[0.07] text-slate-500 dark:text-slate-500'
                }`}>{a.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-5 shadow-sm dark:shadow-none">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-[14px] text-slate-900 dark:text-white">Recent Activity</h3>
              <p className="text-[11px] text-slate-400 dark:text-slate-600 mt-0.5">Last 24 hours</p>
            </div>
            <a href="/audit-log" className="flex items-center gap-1 text-[12px] text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium no-underline transition-colors">
              View all <ArrowRight size={12} />
            </a>
          </div>
          <div className="flex flex-col">
            {ACTIVITY.map((a, i) => (
              <div key={i} className="flex gap-3 py-3 border-b border-slate-50 dark:border-white/[0.03] last:border-0">
                <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
                  <span className={`w-2 h-2 rounded-full ${typeDot[a.type]}`} />
                  {i < ACTIVITY.length - 1 && <div className="w-px flex-1 bg-slate-100 dark:bg-white/[0.05]" />}
                </div>
                <div className="flex-1 min-w-0 pb-0.5">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[12px] font-semibold text-slate-700 dark:text-slate-300">{a.agent}</span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-600 flex items-center gap-0.5">
                      <Clock size={10} />
                      {a.time}
                    </span>
                  </div>
                  <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-[1.5]">{a.msg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-[12px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-600 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {QUICK.map(q => (
            <a
              key={q.label}
              href={q.href}
              className={`bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] ${q.border} rounded-xl p-4 flex items-center gap-3 text-[13px] font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm dark:shadow-none no-underline group`}
            >
              <q.Icon size={16} className="text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors shrink-0" />
              <span className="leading-[1.3]">{q.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
