'use client';
import { usePathname } from 'next/navigation';
import ThemeSwitch from '../ThemeSwitch';

const PAGE_TITLES: Record<string, string> = {
  '/dashboard':   'Overview',
  '/agents':      'Agent Library',
  '/audit-log':   'Audit Log',
  '/escalations': 'Escalations',
  '/usage':       'Usage & Billing',
  '/settings':    'Settings',
};

export default function DashboardTopbar() {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] ?? 'Dashboard';

  return (
    <header className="h-[56px] md:h-[60px] bg-white dark:bg-[#080812] border-b border-slate-200 dark:border-white/[0.07] flex items-center px-4 md:px-6 gap-3 shrink-0">
      {/* Brand logo — only visible on mobile (sidebar hidden) */}
      <div className="flex md:hidden items-center gap-2 shrink-0">
        <div className="w-7 h-7 rounded-[7px] gradient-bg flex items-center justify-center text-sm text-white shadow-sm">⚡</div>
      </div>

      {/* Title */}
      <h1 className="font-['Outfit'] text-[16px] md:text-[17px] font-semibold text-slate-900 dark:text-white tracking-tight flex-1 min-w-0 truncate">
        {title}
      </h1>

      {/* Search — tablet+ */}
      <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.07] text-slate-400 w-[200px]">
        <span className="text-[14px]">🔍</span>
        <input
          type="text"
          placeholder="Search…"
          className="bg-transparent outline-none text-slate-700 dark:text-slate-300 placeholder:text-slate-400 dark:placeholder:text-slate-600 text-[13px] w-full"
        />
        <kbd className="text-[10px] bg-slate-200 dark:bg-white/[0.08] text-slate-400 px-1.5 py-px rounded-md font-mono shrink-0">⌘K</kbd>
      </div>

      {/* Notifications */}
      <button className="relative flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.07] text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/[0.09] transition-all">
        🔔
        <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-[#080812]" />
      </button>

      <ThemeSwitch />

      {/* Avatar */}
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full gradient-bg flex items-center justify-center text-xs md:text-sm font-bold text-white shadow-sm">D</div>
        <div className="hidden xl:block">
          <div className="text-[13px] font-semibold text-slate-800 dark:text-slate-100 leading-none">Demo User</div>
          <div className="text-[11px] text-slate-500 leading-none mt-0.5">Growth Plan</div>
        </div>
      </div>
    </header>
  );
}
