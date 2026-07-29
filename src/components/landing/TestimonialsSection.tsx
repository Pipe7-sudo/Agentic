const TESTIMONIALS = [
  { initials: 'AO', quote: '"We shut down our entire AP team for invoice processing. The Invoice Guard agent handles everything — 3x faster, zero errors. The ROI was visible in the first week."', name: 'Adeyemi Okonkwo', role: 'CFO, Nexford Manufacturing — Lagos' },
  { initials: 'CF', quote: '"We were processing 300 applications a month manually. HR Scout handles all of it now. My team went from drowning in CVs to only speaking with pre-qualified candidates."', name: 'Chioma Fashola', role: 'Head of People, Brightline Group — Abuja' },
  { initials: 'KA', quote: '"I was skeptical because we don\'t have an IT team. But we were genuinely live in 18 hours. The Support Agent handles all our customer emails 24/7 — including weekends."', name: 'Kunle Adesanya', role: 'COO, TradeBridge Logistics — Lagos' },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-[12px] font-semibold uppercase tracking-[2px] text-indigo-400 block mb-4">Early Adopters</span>
          <h2 className="font-['Outfit'] text-[clamp(28px,4vw,48px)] font-extrabold tracking-[-1.5px] leading-[1.1] text-slate-100">What operations leaders<br />are saying.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="bg-white/[0.03] border border-white/[0.07] rounded-[20px] p-7">
              <div className="text-amber-400 text-[13px] mb-4">★★★★★</div>
              <p className="text-[15px] text-slate-400 leading-[1.7] mb-6 italic">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-sm font-bold shrink-0">{t.initials}</div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-[12px] text-slate-600 mt-0.5">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
