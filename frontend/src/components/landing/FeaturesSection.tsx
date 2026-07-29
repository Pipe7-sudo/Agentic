import Image from 'next/image';

const FEATURES = [
  { icon: '🧠', title: 'Learns Your Business', desc: 'Agents adapt to your specific operations through a guided intake — your approval limits, supplier names, response tone, and workflow rules. No generic behavior.' },
  { icon: '🔐', title: 'Human-in-the-Loop Escalation', desc: 'High-stakes decisions never happen without you. Agents pause and send a simple "Approve / Reject" to a manager before moving on high-risk actions.' },
  { icon: '📜', title: 'Full Audit Trail', desc: 'Every action is logged — what was done, when it was done, and why. You will always be able to see exactly what your AI workforce did on your behalf.' },
  { icon: '🚀', title: 'Zero-Code Deployment', desc: 'No engineers. No IT tickets. No API documentation to read. If you can fill out a form, you can deploy an enterprise AI agent in under a day.' },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-slate-50 dark:bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14 text-center md:text-left">
          <span className="text-[12px] font-semibold uppercase tracking-[2px] text-indigo-600 dark:text-indigo-400 block mb-4">Built for Enterprises</span>
          <h2 className="font-['Outfit'] text-[clamp(28px,4vw,48px)] font-extrabold tracking-[-1.5px] leading-[1.1] text-slate-900 dark:text-slate-100">Everything your operations<br />team needs. Nothing it doesn&apos;t.</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FEATURES.map(f => (
            <div key={f.title} className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.07] rounded-[20px] p-8 shadow-sm dark:shadow-none hover:shadow-md dark:hover:bg-white/[0.06] hover:border-indigo-500/40 hover:-translate-y-0.5 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-center text-[22px] mb-5">{f.icon}</div>
              <h3 className="font-['Outfit'] text-[18px] font-bold mb-2.5 tracking-[-0.3px] text-slate-900 dark:text-white">{f.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-[1.65]">{f.desc}</p>
            </div>
          ))}
          
          {/* African Enterprise Wide Card with Image */}
          <div className="md:col-span-2 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.07] rounded-[20px] p-8 sm:p-10 shadow-sm dark:shadow-none hover:shadow-md dark:hover:bg-white/[0.06] hover:border-indigo-500/40 hover:-translate-y-0.5 transition-all duration-300 flex flex-col lg:flex-row items-center gap-10 overflow-hidden">
            <div className="flex-1">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-center text-[22px] mb-5">🌍</div>
              <h3 className="font-['Outfit'] text-[22px] sm:text-[24px] font-bold mb-4 tracking-[-0.3px] text-slate-900 dark:text-white">Built for African Enterprises First</h3>
              <p className="text-[15px] text-slate-600 dark:text-slate-400 leading-[1.7]">
                Designed from the ground up for how businesses actually operate in Lagos and across Africa — local payment rails, local document types, local compliance requirements, and local business hours. We don&apos;t assume you have a Salesforce subscription or a 10-person IT department. We assume you have a real business to run — and we go from there.
              </p>
            </div>
            <div className="w-full lg:w-[45%] shrink-0">
               <Image 
                  src="/images/features-agents.png"
                  alt="AI Agents ecosystem"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover rounded-xl"
               />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
