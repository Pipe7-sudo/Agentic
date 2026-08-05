'use client';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import ThemeSwitch from '../ThemeSwitch';

const LINKS = ['How It Works', 'Agents', 'Features', 'Pricing'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-white/90 dark:bg-[#04040c]/85 backdrop-blur-xl border-b border-slate-200 dark:border-white/[0.07] shadow-sm' : 'py-5 bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-2.5 no-underline" onClick={() => setMobileMenuOpen(false)}>
              <div className="w-9 h-9 rounded-[10px] gradient-bg flex items-center justify-center text-lg shadow-[0_0_20px_rgba(99,102,241,0.4)] text-white">⚡</div>
              <span className="font-['Outfit'] text-[18px] font-bold text-slate-900 dark:text-slate-100 tracking-tight">WorkForce AI</span>
            </a>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <ul className="flex items-center gap-8 list-none m-0 p-0">
                {LINKS.map(link => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase().replace(/ /g, '-')}`} className="text-slate-600 dark:text-slate-400 no-underline text-sm font-medium hover:text-indigo-600 dark:hover:text-slate-100 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
              
              <div className="flex items-center gap-4 border-l border-slate-200 dark:border-white/[0.1] pl-6">
                <ThemeSwitch />
                <a href="/sign-in" className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white transition-colors no-underline">Sign In</a>
                <a href="/sign-up" className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white gradient-bg shadow-[0_4px_24px_rgba(99,102,241,0.25)] dark:shadow-[0_4px_24px_rgba(99,102,241,0.35)] hover:-translate-y-px hover:shadow-[0_6px_32px_rgba(99,102,241,0.4)] dark:hover:shadow-[0_6px_32px_rgba(99,102,241,0.5)] transition-all no-underline">
                  Book Demo →
                </a>
              </div>
            </div>

            {/* Mobile Nav Controls */}
            <div className="flex md:hidden items-center gap-4">
              <ThemeSwitch />
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="text-slate-900 dark:text-white p-1 rounded-md hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-white dark:bg-[#04040c] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-white/[0.05]">
              <a href="#" className="flex items-center gap-2.5 no-underline" onClick={() => setMobileMenuOpen(false)}>
                <div className="w-9 h-9 rounded-[10px] gradient-bg flex items-center justify-center text-lg shadow-[0_0_20px_rgba(99,102,241,0.4)] text-white">⚡</div>
                <span className="font-['Outfit'] text-[18px] font-bold text-slate-900 dark:text-slate-100 tracking-tight">WorkForce AI</span>
              </a>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-900 dark:text-white p-2 rounded-full bg-slate-100 dark:bg-white/[0.05]"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-6">
              <ul className="flex flex-col gap-6 list-none m-0 p-0">
                {LINKS.map(link => (
                  <li key={link}>
                    <a 
                      href={`#${link.toLowerCase().replace(/ /g, '-')}`} 
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-slate-800 dark:text-slate-200 text-2xl font-semibold tracking-tight hover:text-indigo-600 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
              
              <div className="mt-auto flex flex-col gap-4 pt-8 border-t border-slate-100 dark:border-white/[0.05]">
                <a 
                  href="/sign-in" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-4 text-center rounded-xl text-lg font-semibold bg-slate-100 dark:bg-white/[0.05] text-slate-900 dark:text-white"
                >
                  Sign In
                </a>
                <a 
                  href="/sign-up" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-4 text-center rounded-xl text-lg font-semibold text-white gradient-bg shadow-[0_4px_24px_rgba(99,102,241,0.35)]"
                >
                  Book Demo →
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
