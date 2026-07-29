'use client';
import { useEffect, useRef } from 'react';

const STATS = [
  { target: 24, suffix: 'h', label: 'Hours to go live — guaranteed' },
  { target: 94, suffix: '%', label: 'Reduction in operational errors' },
  { target: 10, suffix: 'x', label: 'More capacity vs. a human employee' },
  { target: 0, suffix: '', label: 'IT team or engineers required' },
];

export default function StatsSection() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLDivElement;
        const target = parseInt(el.dataset.target || '0');
        const suffix = el.dataset.suffix || '';
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / 1800, 1);
          el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });
    refs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-10 pb-20 bg-white dark:bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x md:divide-y-0 divide-slate-200 dark:divide-white/[0.07] border border-slate-200 dark:border-white/[0.07] rounded-2xl overflow-hidden shadow-sm dark:shadow-none bg-slate-50 dark:bg-transparent">
          {STATS.map((s, i) => (
            <div key={i} className="bg-slate-50 dark:bg-[#080812] py-8 px-5 md:px-7 text-center">
              <div
                ref={el => { refs.current[i] = el; }}
                data-target={s.target}
                data-suffix={s.suffix}
                className="font-['Outfit'] text-[36px] md:text-[42px] font-extrabold tracking-[-2px] gradient-text"
              >0{s.suffix}</div>
              <div className="text-[13px] md:text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-[1.4]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
