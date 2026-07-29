const PLANS = [
  { tier: 'Starter', price: '₦150k', period: '/mo', popular: false, desc: 'For growing businesses ready to automate their first operational role.', features: ['2 Active Agents', '500 Task Credits / month', 'Full Audit Logs', 'Human Escalation', 'Email & WhatsApp support', 'Live in 24 hours'], btnId: 'starter-plan-btn', btnLabel: 'Get Started', outline: true },
  { tier: 'Growth', price: '₦450k', period: '/mo', popular: true, desc: 'For mid-sized companies replacing multiple operational roles at once.', features: ['All 6 Agents', '2,000 Task Credits / month', 'Priority Escalation', 'Custom Agent Behavior', 'Dedicated Account Manager', 'Performance Analytics'], btnId: 'growth-plan-btn', btnLabel: 'Get Started →', outline: false },
  { tier: 'Enterprise', price: 'Custom', period: '', popular: false, desc: 'For large enterprises with high task volumes and compliance requirements.', features: ['Unlimited Agents', 'Unlimited Task Credits', 'Custom Agent Development', 'Data Residency Options', 'SLA Guarantee', 'On-site Integration Support'], btnId: 'enterprise-plan-btn', btnLabel: 'Contact Sales', outline: true },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-slate-50/50 dark:bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-[12px] font-semibold uppercase tracking-[2px] text-indigo-600 dark:text-indigo-400 block mb-4">Pricing</span>
          <h2 className="font-['Outfit'] text-[clamp(28px,4vw,48px)] font-extrabold tracking-[-1.5px] leading-[1.1] text-slate-900 dark:text-slate-100 mb-4">Pay only when<br />work gets done.</h2>
          <p className="text-[16px] md:text-[17px] text-slate-600 dark:text-slate-400 max-w-[520px] mx-auto leading-[1.65]">No seats. No unused features. No monthly surprises. You pay for completed tasks — like paying a contractor, not a salaried employee.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
          {PLANS.map(p => (
            <div key={p.tier} className={`relative rounded-3xl p-8 md:p-9 transition-all duration-300 hover:-translate-y-1 shadow-sm dark:shadow-none hover:shadow-xl hover:shadow-indigo-500/5 ${p.popular ? 'bg-white dark:bg-indigo-500/[0.04] border-2 border-indigo-500 shadow-md dark:border-indigo-500/40' : 'bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.07]'}`}>
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-bg text-white text-[11px] font-bold px-4 py-1 rounded-full tracking-[0.5px] shadow-sm">MOST POPULAR</div>
              )}
              <div className="text-[12px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-600 mb-4">{p.tier}</div>
              <div className="font-['Outfit'] text-[40px] md:text-[48px] font-extrabold tracking-[-2px] mb-1 text-slate-900 dark:text-white">{p.price}<span className="text-[16px] md:text-[18px] font-normal text-slate-500 dark:text-slate-600 tracking-normal">{p.period}</span></div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-7 leading-[1.6]">{p.desc}</p>
              <ul className="flex flex-col gap-2.5 mb-8">
                {p.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                    <div className="w-[18px] h-[18px] rounded-full bg-emerald-100 dark:bg-emerald-500/12 flex items-center justify-center text-[10px] text-emerald-600 dark:text-emerald-500 shrink-0">✓</div>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#cta" id={p.btnId} className={`block w-full text-center py-3 rounded-xl text-sm font-semibold transition-all no-underline ${p.outline ? 'border border-slate-200 dark:border-white/[0.12] text-slate-700 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-white/[0.05]' : 'gradient-bg text-white shadow-[0_4px_24px_rgba(99,102,241,0.25)] dark:shadow-[0_4px_24px_rgba(99,102,241,0.35)] hover:-translate-y-px hover:shadow-[0_6px_32px_rgba(99,102,241,0.4)] dark:hover:shadow-[0_6px_32px_rgba(99,102,241,0.5)]'}`}>{p.btnLabel}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
