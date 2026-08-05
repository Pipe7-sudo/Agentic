'use client';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] bg-slate-50 dark:bg-[#04040c] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[600px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.10)_0%,transparent_65%)] pointer-events-none" />

      {/* Brand */}
      <Link href="/" className="flex items-center gap-2.5 no-underline mb-6 sm:mb-8 group">
        <div className="w-9 h-9 rounded-[10px] gradient-bg flex items-center justify-center text-lg shadow-[0_0_20px_rgba(99,102,241,0.35)] text-white transition-transform group-hover:scale-105">
          ⚡
        </div>
        <span className="font-['Outfit'] text-[20px] font-bold text-slate-900 dark:text-white tracking-tight">
          WorkForce AI
        </span>
      </Link>

      {/* Card — full width on xs, max-w on sm+ */}
      <div className="w-full max-w-[440px] bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] rounded-2xl shadow-xl shadow-slate-200/60 dark:shadow-none p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
        {children}
      </div>

      {/* Footer note */}
      <p className="mt-6 sm:mt-8 text-[13px] text-slate-500 dark:text-slate-600">
        © 2026 WorkForce AI. Africa&apos;s AI workforce platform.
      </p>

    </div>
  );
}
