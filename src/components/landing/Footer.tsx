const LINKS = {
  Product: ['Agent Library#agents', 'How It Works#how-it-works', 'Pricing#pricing', 'Changelog#'],
  Company: ['About#', 'Blog#', 'Careers#', 'Press#'],
  Legal: ['Privacy Policy#', 'Terms of Service#', 'Data Processing#', 'Security#'],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07] pt-16 pb-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-[10px] gradient-bg flex items-center justify-center text-lg shadow-[0_0_20px_rgba(99,102,241,0.4)]">⚡</div>
              <span className="font-['Outfit'] text-[18px] font-bold text-slate-100 tracking-tight">WorkForce AI</span>
            </div>
            <p className="text-sm text-slate-400 leading-[1.7] max-w-[280px]">Africa&apos;s enterprise AI workforce platform. Pre-built agents that replace operational roles — without an IT team, without a long integration, and without risk.</p>
          </div>
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[13px] font-semibold text-slate-100 mb-4">{title}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map(l => {
                  const [label, hash] = l.split('#');
                  return (
                    <li key={label}>
                      <a href={`#${hash}`} className="text-sm text-slate-400 no-underline hover:text-slate-100 transition-colors">{label}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between pt-7 border-t border-white/[0.07] gap-3">
          <p className="text-[13px] text-slate-600">© 2026 WorkForce AI. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-[13px] text-slate-600">
            🌍 Built in Lagos, Nigeria. Serving Africa.
          </div>
        </div>
      </div>
    </footer>
  );
}
