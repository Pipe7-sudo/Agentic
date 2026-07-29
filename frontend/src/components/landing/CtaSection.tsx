export default function CtaSection() {
  return (
    <section id="cta" className="py-24 md:py-32 text-center relative overflow-hidden bg-slate-50 dark:bg-transparent">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/25 rounded-full text-[12px] md:text-[13px] font-medium text-indigo-700 dark:text-indigo-300 mb-7 shadow-sm dark:shadow-none">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-green shrink-0" />
          Accepting enterprise design partners from Lagos — Q3 2026
        </div>
        <h2 className="font-['Outfit'] text-[clamp(32px,5vw,60px)] font-black tracking-[-2px] mb-5 text-slate-900 dark:text-white">
          Your AI workforce<br />starts <span className="gradient-text">tomorrow</span>.
        </h2>
        <p className="text-[16px] md:text-[17px] text-slate-600 dark:text-slate-400 max-w-[480px] mx-auto leading-[1.65] mb-10">
          Book a 30-minute call. We&apos;ll map your operations, identify which agents replace which roles, and have you live within 24 hours.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
          <a href="mailto:hello@workforceai.africa" id="cta-primary-btn" className="w-full sm:w-auto px-8 py-3.5 rounded-[10px] text-[15px] font-semibold text-white gradient-bg shadow-[0_4px_24px_rgba(99,102,241,0.25)] dark:shadow-[0_4px_24px_rgba(99,102,241,0.35)] hover:-translate-y-px hover:shadow-[0_6px_32px_rgba(99,102,241,0.4)] dark:hover:shadow-[0_6px_32px_rgba(99,102,241,0.5)] transition-all no-underline">
            Book a Demo Call →
          </a>
          <a href="mailto:hello@workforceai.africa" id="cta-secondary-btn" className="w-full sm:w-auto px-8 py-3.5 rounded-[10px] text-[15px] font-semibold text-slate-700 dark:text-slate-100 border border-slate-200 dark:border-white/[0.12] hover:bg-slate-100 dark:hover:bg-white/[0.05] hover:border-slate-300 dark:hover:border-white/20 transition-all no-underline">
            Talk to Sales
          </a>
        </div>
      </div>
    </section>
  );
}
