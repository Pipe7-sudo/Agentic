'use client';
import { useEffect, useRef, useState } from 'react';

const FEED = [
  { color: 'green', icon: '💳', text: 'Invoice Guard matched 12 payments', time: '2s ago' },
  { color: 'blue', icon: '📄', text: 'Doc Verifier cleared 3 IDs', time: '14s ago' },
  { color: 'purple', icon: '📋', text: 'HR Scout screened 8 CVs', time: '1m ago' },
  { color: 'green', icon: '✅', text: 'Support Agent resolved 4 tickets', time: '2m ago' },
  { color: 'blue', icon: '🔗', text: 'Reconciler matched 19 transactions', time: '3m ago' },
  { color: 'purple', icon: '🧭', text: 'Onboard Pro completed a new hire', time: '5m ago' },
  { color: 'green', icon: '🛡️', text: 'Invoice Guard flagged 1 discrepancy', time: '6m ago' },
];

const feedBorder: Record<string, string> = {
  green: 'border-l-emerald-500',
  blue: 'border-l-indigo-500',
  purple: 'border-l-purple-500',
};

export default function HeroSection() {
  const [count, setCount] = useState(1247);
  const [feed, setFeed] = useState(FEED.slice(0, 3));
  const idx = useRef(3);

  useEffect(() => {
    const t1 = setInterval(() => setCount(c => c + Math.floor(Math.random() * 3) + 1), 2200);
    const t2 = setInterval(() => {
      const item = FEED[idx.current++ % FEED.length];
      setFeed(prev => [item, ...prev.slice(0, 2)]);
    }, 4000);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-[120px] pb-20 overflow-hidden">
      {/* Glow */}
      <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.12)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 flex items-center justify-between gap-10">
        {/* Content */}
        <div className="max-w-[680px] animate-fade-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-500/10 border border-indigo-500/25 rounded-full text-[13px] font-medium text-indigo-300 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-green shrink-0" />
            Now deploying in Lagos, Nigeria — Africa&apos;s AI workforce revolution
          </div>

          <h1 className="font-['Outfit'] text-[clamp(40px,6vw,72px)] font-black leading-[1.08] tracking-[-2px] mb-6 animate-fade-up-1">
            Your Next<br />
            <span className="gradient-text">10 Employees</span><br />
            Are AI Agents.
          </h1>

          <p className="text-[18px] text-slate-400 max-w-[560px] mb-10 leading-[1.7] animate-fade-up-2">
            Pre-built AI agents that embed directly into your enterprise operations — replacing HR, Finance, Customer Ops, and Compliance roles. No IT team. No engineers. Live in 24 hours.
          </p>

          <div className="flex items-center gap-4 flex-wrap mb-12 animate-fade-up-3">
            <a href="#cta" id="hero-primary-cta" className="px-8 py-3.5 rounded-[10px] text-[15px] font-semibold text-white gradient-bg shadow-[0_4px_24px_rgba(99,102,241,0.35)] hover:-translate-y-px hover:shadow-[0_6px_32px_rgba(99,102,241,0.5)] transition-all no-underline">
              Deploy Your First Agent →
            </a>
            <a href="#how-it-works" id="hero-secondary-cta" className="px-8 py-3.5 rounded-[10px] text-[15px] font-semibold text-slate-100 border border-white/[0.12] hover:bg-white/[0.05] hover:border-white/20 transition-all no-underline">
              See How It Works
            </a>
          </div>

          <div className="flex items-center gap-5 flex-wrap animate-fade-up-4">
            {['Live in 24 hours', 'No IT team needed', 'Pay per completed task'].map(t => (
              <div key={t} className="flex items-center gap-1.5 text-[13px] text-slate-600">
                <div className="w-4 h-4 rounded-full bg-emerald-500/15 flex items-center justify-center text-[9px] text-emerald-500">✓</div>
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Live Panel */}
        <div className="w-[360px] shrink-0 animate-fade-left hidden lg:block">
          <div className="relative bg-[#080812]/85 backdrop-blur-xl border border-white/[0.07] rounded-[20px] p-7 overflow-hidden">
            <div className="gradient-border-top" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-slate-600">Live Activity</span>
              <div className="flex items-center gap-1.5 text-[12px] text-emerald-500 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-green" />
                Agents Running
              </div>
            </div>
            <div className="font-['Outfit'] text-[36px] font-extrabold text-slate-100 tracking-[-1px]">{count.toLocaleString()}</div>
            <div className="text-[13px] text-slate-400 mt-0.5 mb-4">Tasks completed today</div>
            <div className="border-t border-white/[0.07] pt-4 flex flex-col gap-2">
              {feed.map((item, i) => (
                <div key={i} className={`flex items-center gap-2.5 text-[12px] text-slate-400 px-2.5 py-2 bg-white/[0.03] rounded-lg border-l-2 ${feedBorder[item.color]} animate-slide-in`}>
                  <span className="text-sm">{item.icon}</span>
                  <span className="flex-1">{item.text}</span>
                  <span className="text-slate-600 text-[11px]">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
