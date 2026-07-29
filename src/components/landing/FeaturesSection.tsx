const FEATURES = [
  { icon: '🧠', title: 'Learns Your Business', desc: 'Agents adapt to your specific operations through a guided intake — your approval limits, supplier names, response tone, and workflow rules. No generic behavior.', wide: false },
  { icon: '🔐', title: 'Human-in-the-Loop Escalation', desc: 'High-stakes decisions never happen without you. Agents pause and send a simple "Approve / Reject" to a manager before moving on high-risk actions.', wide: false },
  { icon: '📜', title: 'Full Audit Trail', desc: 'Every action is logged — what was done, when it was done, and why. You will always be able to see exactly what your AI workforce did on your behalf.', wide: false },
  { icon: '🚀', title: 'Zero-Code Deployment', desc: 'No engineers. No IT tickets. No API documentation to read. If you can fill out a form, you can deploy an enterprise AI agent in under a day.', wide: false },
  { icon: '🌍', title: 'Built for African Enterprises First', desc: "Designed from the ground up for how businesses actually operate in Lagos and across Africa — local payment rails, local document types, local compliance requirements, and local business hours. We don't assume you have a Salesforce subscription or a 10-person IT department. We assume you have a real business to run — and we go from there.", wide: true },
];

export default function FeaturesSection() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <span className="text-[12px] font-semibold uppercase tracking-[2px] text-indigo-400 block mb-4">Built for Enterprises</span>
          <h2 className="font-['Outfit'] text-[clamp(28px,4vw,48px)] font-extrabold tracking-[-1.5px] leading-[1.1] text-slate-100">Everything your operations<br />team needs. Nothing it doesn&apos;t.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FEATURES.map(f => (
            <div key={f.title} className={`bg-white/[0.03] border border-white/[0.07] rounded-[20px] p-8 hover:bg-white/[0.06] hover:border-indigo-500/40 hover:-translate-y-0.5 transition-all duration-300 ${f.wide ? 'md:col-span-2' : ''}`}>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[22px] mb-5">{f.icon}</div>
              <h3 className="font-['Outfit'] text-[18px] font-bold mb-2.5 tracking-[-0.3px]">{f.title}</h3>
              <p className="text-sm text-slate-400 leading-[1.65]">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
