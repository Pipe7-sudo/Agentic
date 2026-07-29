export default function DashboardPreview() {
  return (
    <section id="features" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-[12px] font-semibold uppercase tracking-[2px] text-indigo-400 block mb-4">Control Center</span>
          <h2 className="font-['Outfit'] text-[clamp(28px,4vw,48px)] font-extrabold tracking-[-1.5px] leading-[1.1] text-slate-100 mb-4">One dashboard.<br />Your entire AI team.</h2>
          <p className="text-[17px] text-slate-400 max-w-[520px] mx-auto leading-[1.65]">See what every agent is doing, review audit logs, approve escalations, and monitor performance — all in one clean view.</p>
        </div>

        <div className="relative bg-[#080812]/90 border border-white/[0.07] rounded-3xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />

          {/* Topbar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>
            <div className="text-[13px] text-slate-600 font-medium">AI Workforce Dashboard — Operations Overview</div>
            <div className="w-[60px]" />
          </div>

          {/* Body */}
          <div className="flex flex-col md:flex-row h-auto md:h-[380px]">
            {/* Sidebar */}
            <div className="w-full md:w-[200px] border-b md:border-b-0 md:border-r border-white/[0.07] p-4 shrink-0">
              {[
                { icon: '📊', label: 'Overview', active: true },
                { icon: '🤖', label: 'Agents', active: false },
                { icon: '📋', label: 'Audit Log', active: false },
                { icon: '⚠️', label: 'Escalations', active: false, badge: '2' },
                { icon: '💰', label: 'Usage & Billing', active: false },
                { icon: '⚙️', label: 'Settings', active: false },
              ].map(item => (
                <div key={item.label} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] mb-1 cursor-pointer transition-all ${item.active ? 'bg-indigo-500/12 text-indigo-400' : 'text-slate-400 hover:bg-white/[0.06] hover:text-slate-100'}`}>
                  {item.icon} {item.label}
                  {item.badge && <span className="ml-auto bg-rose-500/15 text-rose-400 text-[10px] px-1.5 py-px rounded-full">{item.badge}</span>}
                </div>
              ))}
            </div>

            {/* Main */}
            <div className="flex-1 p-6 overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  { val: '247', lbl: 'Tasks Today', color: 'text-indigo-400' },
                  { val: '6/6', lbl: 'Agents Active', color: 'text-emerald-500' },
                  { val: '2', lbl: 'Awaiting Approval', color: 'text-amber-400' },
                  { val: '99.1%', lbl: 'Accuracy Rate', color: 'text-cyan-400' },
                ].map(s => (
                  <div key={s.lbl} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4">
                    <div className={`font-['Outfit'] text-2xl font-bold tracking-[-1px] ${s.color}`}>{s.val}</div>
                    <div className="text-[11px] text-slate-600 mt-1">{s.lbl}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[13px] font-semibold text-slate-400">ACTIVE AGENTS</span>
                <span className="text-[12px] text-indigo-400 cursor-pointer">View All →</span>
              </div>
              <div className="flex flex-col gap-2">
                {[
                  { icon: '🎯', name: 'HR Scout', tasks: '34 CVs screened', badge: 'Active', cls: 'bg-emerald-500/12 text-emerald-400' },
                  { icon: '🛡️', name: 'Invoice Guard', tasks: '89 invoices matched', badge: 'Working', cls: 'bg-indigo-500/12 text-indigo-400' },
                  { icon: '💬', name: 'Support Agent', tasks: '124 tickets resolved', badge: 'Active', cls: 'bg-emerald-500/12 text-emerald-400' },
                ].map(a => (
                  <div key={a.name} className="flex items-center gap-3 px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.07] rounded-[10px] text-[12px]">
                    <span>{a.icon}</span>
                    <span className="flex-1 font-medium">{a.name}</span>
                    <span className="text-slate-400">{a.tasks}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${a.cls}`}>{a.badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
