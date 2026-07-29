const AGENTS = [
  { id: 'hr', icon: '🎯', iconBg: 'bg-indigo-50 dark:bg-indigo-500/12 border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400', dept: 'HR Department', deptColor: 'text-indigo-600 dark:text-indigo-400', name: 'HR Scout', glow: 'hover:shadow-indigo-500/10', desc: 'Reads incoming job applications, ranks candidates by fit, and schedules interviews — without a recruiter touching a single CV.', caps: ['CV parsing & scoring', 'Automated interview scheduling', 'Candidate communication'], dotColor: 'bg-indigo-500 dark:bg-indigo-400' },
  { id: 'onboard', icon: '🧭', iconBg: 'bg-purple-50 dark:bg-purple-500/12 border-purple-100 dark:border-purple-500/20 text-purple-600 dark:text-purple-400', dept: 'HR Department', deptColor: 'text-purple-600 dark:text-purple-400', name: 'Onboard Pro', glow: 'hover:shadow-purple-500/10', desc: 'Collects all new hire documents, sets up system access, and guides them through every step of company onboarding automatically.', caps: ['Document collection & verification', 'System account provisioning', 'Onboarding checklist management'], dotColor: 'bg-purple-500 dark:bg-purple-400' },
  { id: 'finance', icon: '🛡️', iconBg: 'bg-emerald-50 dark:bg-emerald-500/12 border-emerald-100 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400', dept: 'Finance Department', deptColor: 'text-emerald-600 dark:text-emerald-400', name: 'Invoice Guard', glow: 'hover:shadow-emerald-500/10', desc: 'Cross-checks every incoming bill against purchase orders and receipts. Flags pricing errors before your money leaves the account.', caps: ['Invoice vs. PO matching', 'Automatic discrepancy flagging', 'Payment approval workflow'], dotColor: 'bg-emerald-500 dark:bg-emerald-400' },
  { id: 'recon', icon: '📊', iconBg: 'bg-rose-50 dark:bg-rose-500/12 border-rose-100 dark:border-rose-500/20 text-rose-600 dark:text-rose-400', dept: 'Finance Department', deptColor: 'text-rose-600 dark:text-rose-400', name: 'Reconciler', glow: 'hover:shadow-rose-500/10', desc: 'Matches every payment to customer accounts automatically. Keeps your books clean without a manual reconciliation team.', caps: ['Bank statement matching', 'Customer account reconciliation', 'Exception reporting'], dotColor: 'bg-rose-500 dark:bg-rose-400' },
  { id: 'customer', icon: '💬', iconBg: 'bg-cyan-50 dark:bg-cyan-500/12 border-cyan-100 dark:border-cyan-500/20 text-cyan-600 dark:text-cyan-400', dept: 'Customer Operations', deptColor: 'text-cyan-600 dark:text-cyan-400', name: 'Support Agent', glow: 'hover:shadow-cyan-500/10', desc: 'Reads incoming complaints, checks order and delivery status, resolves the issue, and responds to customers in seconds — 24/7.', caps: ['Multi-channel inbox monitoring', 'Real-time order status lookup', 'Automated customer resolution'], dotColor: 'bg-cyan-500 dark:bg-cyan-400' },
  { id: 'doc', icon: '🔍', iconBg: 'bg-amber-50 dark:bg-amber-500/12 border-amber-100 dark:border-amber-500/20 text-amber-600 dark:text-amber-400', dept: 'Compliance Department', deptColor: 'text-amber-600 dark:text-amber-400', name: 'Doc Verifier', glow: 'hover:shadow-amber-500/10', desc: 'Inspects photos of IDs, invoices, and delivery notes. Extracts key details, verifies against official records, and updates your database.', caps: ['ID & document OCR extraction', 'Official record verification', 'Compliance database updates'], dotColor: 'bg-amber-500 dark:bg-amber-400' },
];

export default function AgentsSection() {
  return (
    <section id="agents" className="py-24 bg-slate-50/50 dark:bg-[#06060f]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14 text-center md:text-left">
          <span className="text-[12px] font-semibold uppercase tracking-[2px] text-indigo-600 dark:text-indigo-400 block mb-4">Agent Library</span>
          <h2 className="font-['Outfit'] text-[clamp(28px,4vw,48px)] font-extrabold tracking-[-1.5px] leading-[1.1] text-slate-900 dark:text-slate-100 mb-4">Six AI employees.<br />Ready to start Monday.</h2>
          <p className="text-[16px] md:text-[17px] text-slate-600 dark:text-slate-400 max-w-[520px] mx-auto md:mx-0 leading-[1.65]">Each agent is pre-built, trained, and tested — purpose-built to replace a specific operational role in your company.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4">
          {AGENTS.map(a => (
            <div key={a.id} className={`group bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.07] rounded-[20px] p-7 cursor-pointer transition-all duration-300 hover:border-indigo-500/40 hover:-translate-y-1 shadow-sm dark:shadow-none hover:shadow-xl hover:shadow-indigo-500/5 dark:hover:shadow-black/40`}>
              <div className={`w-[52px] h-[52px] rounded-[14px] flex items-center justify-center text-2xl mb-5 border ${a.iconBg}`}>{a.icon}</div>
              <div className={`text-[11px] font-semibold uppercase tracking-wider mb-2 ${a.deptColor}`}>{a.dept}</div>
              <div className="font-['Outfit'] text-xl font-bold tracking-[-0.5px] mb-2.5 text-slate-900 dark:text-slate-100">{a.name}</div>
              <div className="text-[13px] text-slate-600 dark:text-slate-400 leading-[1.6] mb-5">{a.desc}</div>
              <div className="flex flex-col gap-1.5">
                {a.caps.map(c => (
                  <div key={c} className="flex items-center gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                    <div className={`w-1 h-1 rounded-full shrink-0 ${a.dotColor}`} />{c}
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/[0.07] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[12px] text-emerald-600 dark:text-emerald-500 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-green" />Available
                </div>
                <div className="text-[12px] font-semibold text-slate-500 dark:text-slate-600 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Deploy Agent →</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
