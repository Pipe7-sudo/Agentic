'use client';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${scrolled ? 'bg-[#04040c]/85 backdrop-blur-xl border-b border-white/[0.07]' : ''}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 no-underline" id="nav-logo-link">
            <div className="w-9 h-9 rounded-[10px] gradient-bg flex items-center justify-center text-lg shadow-[0_0_20px_rgba(99,102,241,0.4)]">⚡</div>
            <span className="font-['Outfit'] text-[18px] font-bold text-slate-100 tracking-tight">WorkForce AI</span>
          </a>
          <ul className="hidden md:flex items-center gap-8 list-none">
            {['How It Works', 'Agents', 'Features', 'Pricing'].map(link => (
              <li key={link}>
                <a href={`#${link.toLowerCase().replace(/ /g, '-')}`} className="text-slate-400 no-underline text-sm font-medium hover:text-slate-100 transition-colors">{link}</a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <a href="#pricing" id="nav-signin-btn" className="px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-400 border border-white/[0.07] hover:bg-white/[0.06] hover:text-slate-100 transition-all no-underline">Sign In</a>
            <a href="#cta" id="nav-demo-btn" className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white gradient-bg shadow-[0_4px_24px_rgba(99,102,241,0.35)] hover:-translate-y-px hover:shadow-[0_6px_32px_rgba(99,102,241,0.5)] transition-all no-underline">Book Demo →</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
