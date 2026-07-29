'use client';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[100svh] flex items-center pt-[120px] pb-20 overflow-hidden">
      {/* Glow */}
      <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.15)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-10 w-full">
        {/* Content */}
        <div className="w-full lg:max-w-[600px] animate-fade-up text-center lg:text-left flex flex-col items-center lg:items-start">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/25 rounded-full text-[13px] font-medium text-indigo-700 dark:text-indigo-300 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-green shrink-0" />
            Now deploying in Lagos, Nigeria — Africa&apos;s AI workforce revolution
          </div>

          <h1 className="font-['Outfit'] text-[clamp(36px,5vw,72px)] font-black leading-[1.08] tracking-[-2px] mb-6 animate-fade-up-1 text-slate-900 dark:text-white">
            Your Next<br />
            <span className="gradient-text">10 Employees</span><br />
            Are AI Agents.
          </h1>

          <p className="text-[16px] md:text-[18px] text-slate-600 dark:text-slate-400 max-w-[560px] mb-10 leading-[1.7] animate-fade-up-2">
            Pre-built AI agents that embed directly into your enterprise operations — replacing HR, Finance, Customer Ops, and Compliance roles. No IT team. No engineers. Live in 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12 animate-fade-up-3">
            <a href="#cta" id="hero-primary-cta" className="w-full sm:w-auto text-center px-8 py-3.5 rounded-[10px] text-[15px] font-semibold text-white gradient-bg shadow-[0_4px_24px_rgba(99,102,241,0.25)] dark:shadow-[0_4px_24px_rgba(99,102,241,0.35)] hover:-translate-y-px hover:shadow-[0_6px_32px_rgba(99,102,241,0.4)] dark:hover:shadow-[0_6px_32px_rgba(99,102,241,0.5)] transition-all no-underline">
              Deploy Your First Agent →
            </a>
            <a href="#how-it-works" id="hero-secondary-cta" className="w-full sm:w-auto text-center px-8 py-3.5 rounded-[10px] text-[15px] font-semibold text-slate-700 dark:text-slate-100 border border-slate-200 dark:border-white/[0.12] hover:bg-slate-50 dark:hover:bg-white/[0.05] transition-all no-underline">
              See How It Works
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-5 animate-fade-up-4">
            {['Live in 24 hours', 'No IT team needed', 'Pay per completed task'].map(t => (
              <div key={t} className="flex items-center gap-1.5 text-[12px] sm:text-[13px] text-slate-600 dark:text-slate-400 font-medium">
                <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-500/15 flex items-center justify-center text-[9px] text-emerald-600 dark:text-emerald-500">✓</div>
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Mockup Image */}
        <div className="w-full lg:w-[500px] xl:w-[600px] shrink-0 animate-fade-left">
          <div className="relative rounded-[20px] overflow-hidden border border-slate-200 dark:border-white/[0.07] shadow-2xl shadow-indigo-500/10 dark:shadow-none bg-white dark:bg-[#080812]">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent dark:from-white/5 z-10 pointer-events-none mix-blend-overlay"></div>
            <Image 
              src="/images/hero-dashboard.png" 
              alt="AI Dashboard Mockup" 
              width={800} 
              height={600}
              className="w-full h-auto object-cover relative z-0"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
