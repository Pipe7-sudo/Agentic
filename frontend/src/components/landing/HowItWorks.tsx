const STEPS = [
  { n: '01', color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/15 border-indigo-200 dark:border-indigo-500/30', tag: 'Guided Setup', tagColor: 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400', title: 'Connect Your Operations', desc: 'Answer plain-English questions about how your business works — your suppliers, approval limits, email tone, and existing tools. No technical setup required.' },
  { n: '02', color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/15 border-purple-200 dark:border-purple-500/30', tag: 'Customization', tagColor: 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400', title: 'Agents Learn Your Business', desc: 'Our pre-built agents read your operations profile and adapt their behavior specifically to your company — your language, your rules, your workflow.' },
  { n: '03', color: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/15 border-cyan-200 dark:border-cyan-500/30', tag: 'Live in 24hrs', tagColor: 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400', title: 'Deploy & Monitor', desc: 'Activate agents from your dashboard. Watch them work in real-time. Approve escalations with a single tap. Review complete audit logs at any time.' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white dark:bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-[12px] font-semibold uppercase tracking-[2px] text-indigo-600 dark:text-indigo-400 block mb-4">Process</span>
          <h2 className="font-['Outfit'] text-[clamp(28px,4vw,48px)] font-extrabold tracking-[-1.5px] leading-[1.1] text-slate-900 dark:text-slate-100 mb-4">From zero to operating<br />in 24 hours flat.</h2>
          <p className="text-[16px] md:text-[17px] text-slate-600 dark:text-slate-400 max-w-[520px] mx-auto leading-[1.65]">No developer. No integration project. No six-month rollout. Just answer a few questions and your AI workforce is live.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 relative">
          <div className="hidden md:block absolute top-[52px] left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-indigo-500/30 to-transparent" />
          {STEPS.map(s => (
            <div key={s.n} className="bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.07] rounded-[20px] p-8 md:p-9 shadow-sm dark:shadow-none hover:shadow-md dark:hover:bg-white/[0.06] hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-['Outfit'] text-lg font-extrabold mb-6 border ${s.color}`}>{s.n}</div>
              <h3 className="font-['Outfit'] text-xl font-bold mb-2.5 tracking-[-0.5px] text-slate-900 dark:text-white">{s.title}</h3>
              <p className="text-[14px] md:text-sm text-slate-600 dark:text-slate-400 leading-[1.65]">{s.desc}</p>
              <span className={`inline-block mt-5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-[0.5px] ${s.tagColor}`}>{s.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
