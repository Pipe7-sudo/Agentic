const STATS = [
  { label: 'Tasks Today',       value: '247',   delta: '+12%', color: 'text-indigo-600 dark:text-indigo-400',  bg: 'bg-indigo-50 dark:bg-indigo-500/10',  icon: '⚡' },
  { label: 'Agents Active',     value: '6/6',   delta: '100%', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10', icon: '🤖' },
  { label: 'Awaiting Approval', value: '2',     delta: '-1',   color: 'text-amber-600 dark:text-amber-400',    bg: 'bg-amber-50 dark:bg-amber-500/10',    icon: '⚠️' },
  { label: 'Accuracy Rate',     value: '99.1%', delta: '+0.3%',color: 'text-cyan-600 dark:text-cyan-500',      bg: 'bg-cyan-50 dark:bg-cyan-500/10',      icon: '🎯' },
];

const AGENTS = [
  { name: 'HR Scout',         icon: '🎯', tasks: 34,  status: 'Active',  rate: 98,  color: 'bg-emerald-500' },
  { name: 'Invoice Guard',    icon: '🛡️', tasks: 89,  status: 'Working', rate: 99,  color: 'bg-indigo-500'  },
  { name: 'Support Agent',    icon: '💬', tasks: 124, status: 'Active',  rate: 100, color: 'bg-emerald-500' },
  { name: 'Compliance Scout', icon: '📋', tasks: 12,  status: 'Active',  rate: 97,  color: 'bg-emerald-500' },
  { name: 'Finance Ops',      icon: '💰', tasks: 45,  status: 'Active',  rate: 99,  color: 'bg-emerald-500' },
  { name: 'Onboarding Bot',   icon: '🚀', tasks: 8,   status: 'Paused',  rate: 95,  color: 'bg-slate-400'   },
];

const ACTIVITY = [
  { time: '2m ago',  agent: 'Invoice Guard',    msg: 'Matched and approved 3 invoices totalling ₦4.2M', type: 'success' },
  { time: '11m ago', agent: 'HR Scout',         msg: 'Screened 12 candidates — 3 shortlisted for ops role', type: 'info' },
  { time: '23m ago', agent: 'Support Agent',    msg: 'Resolved ticket #4821 — "Unable to access account"', type: 'success' },
  { time: '35m ago', agent: 'Invoice Guard',    msg: 'Escalation raised: Invoice #INV-2244 requires manual review', type: 'warning' },
  { time: '1h ago',  agent: 'Compliance Scout', msg: 'Generated Q2 compliance report — 0 violations found', type: 'success' },
  { time: '1h ago',  agent: 'Finance Ops',      msg: 'Processed 8 expense reports — 1 flagged for excess', type: 'warning' },
];

const typeStyle: Record<string, string> = {
  success: 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
  info:    'bg-indigo-100 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-400',
  warning: 'bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400',
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-5 max-w-[1200px] mx-auto">
      {/* Greeting */}
      <div>
        <h2 className="font-['Outfit'] text-[20px] md:text-[22px] font-bold text-slate-900 dark:text-white tracking-tight">Good evening, Demo 👋</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Here&apos;s what your AI workforce accomplished today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(s => (
          <div key={s.label} className="bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-5 shadow-sm dark:shadow-none">
            <div className="flex items-start justify-between mb-3">
              <span className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center text-lg`}>{s.icon}</span>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full">{s.delta}</span>
            </div>
            <div className={`font-['Outfit'] text-[28px] font-extrabold tracking-tight ${s.color} mb-0.5`}>{s.value}</div>
            <div className="text-[12px] text-slate-500 dark:text-slate-500 uppercase tracking-wider font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Agents + Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Active Agents */}
        <div className="bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-5 shadow-sm dark:shadow-none">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[14px] text-slate-800 dark:text-slate-100">Active Agents</h3>
            <a href="/agents" className="text-[12px] text-indigo-600 dark:text-indigo-400 hover:underline">Manage all →</a>
          </div>
          <div className="flex flex-col gap-3">
            {AGENTS.map(a => (
              <div key={a.name} className="flex items-center gap-3">
                <span className="text-xl shrink-0">{a.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[13px] font-medium text-slate-800 dark:text-slate-100">{a.name}</span>
                    <span className="text-[12px] text-slate-500 dark:text-slate-400">{a.tasks} tasks</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.07] overflow-hidden">
                    <div className={`h-full rounded-full ${a.color} transition-all`} style={{ width: `${a.rate}%` }} />
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
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
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[14px] text-slate-800 dark:text-slate-100">Recent Activity</h3>
            <a href="/audit-log" className="text-[12px] text-indigo-600 dark:text-indigo-400 hover:underline">View all →</a>
          </div>
          <div className="flex flex-col gap-3">
            {ACTIVITY.map((a, i) => (
              <div key={i} className="flex gap-3">
                <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${
                  a.type === 'success' ? 'bg-emerald-500' : a.type === 'warning' ? 'bg-amber-400' : 'bg-indigo-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-[10px] font-semibold px-1.5 py-px rounded-full ${typeStyle[a.type]}`}>{a.agent}</span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-600">{a.time}</span>
                  </div>
                  <p className="text-[12px] text-slate-600 dark:text-slate-400 leading-[1.5]">{a.msg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Deploy Agent',       icon: '🚀', href: '/agents',      color: 'border-indigo-200 dark:border-indigo-500/20 hover:border-indigo-400 dark:hover:border-indigo-500/50' },
          { label: 'Review Escalations', icon: '⚠️', href: '/escalations', color: 'border-amber-200 dark:border-amber-500/20 hover:border-amber-400 dark:hover:border-amber-500/50' },
          { label: 'View Audit Log',     icon: '📋', href: '/audit-log',   color: 'border-slate-200 dark:border-white/[0.07] hover:border-slate-300 dark:hover:border-white/20' },
          { label: 'Upgrade Plan',       icon: '💎', href: '/usage',       color: 'border-violet-200 dark:border-violet-500/20 hover:border-violet-400 dark:hover:border-violet-500/50' },
        ].map(q => (
          <a key={q.label} href={q.href} className={`bg-white dark:bg-[#080812] border ${q.color} rounded-xl p-4 flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm dark:shadow-none no-underline group`}>
            <span className="text-xl">{q.icon}</span>
            <span className="leading-[1.3]">{q.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
