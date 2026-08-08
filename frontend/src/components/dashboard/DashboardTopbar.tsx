'use client';
import { usePathname } from 'next/navigation';
import { Search, Bell, Menu, Zap } from 'lucide-react';
import ThemeSwitch from '../ThemeSwitch';

const PAGE_TITLES: Record<string, { title: string; subtitle: string }> = {
  '/dashboard':   { title: 'Overview',        subtitle: 'Your AI workforce at a glance'      },
  '/agents':      { title: 'Agent Library',   subtitle: 'Manage and configure your agents'   },
  '/audit-log':   { title: 'Audit Log',       subtitle: 'Full record of all agent actions'   },
  '/escalations': { title: 'Escalations',     subtitle: 'Items requiring human review'       },
  '/usage':       { title: 'Usage & Billing', subtitle: 'Credits, plans and billing history' },
  '/settings':    { title: 'Settings',        subtitle: 'Configure your workspace'           },
};

export default function DashboardTopbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();
  const page     = PAGE_TITLES[pathname] ?? { title: 'Dashboard', subtitle: '' };

  return (
    <header className="h-[56px] md:h-[64px] bg-white dark:bg-[#080812] border-b border-slate-200 dark:border-white/[0.07] flex items-center px-4 md:px-6 gap-4 shrink-0">

      {/* Hamburger — mobile only */}
      <button
        onClick={onMenuClick}
        className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.07] transition-all shrink-0"
      >
        <Menu size={18} />
      </button>

      {/* Mobile brand — shown when sidebar is hidden */}
      <div className="md:hidden flex items-center gap-2 shrink-0">
        <div className="w-7 h-7 rounded-[7px] gradient-bg flex items-center justify-center shadow-sm">
          <Zap size={13} className="text-white" fill="white" />
        </div>
      </div>

      {/* Page title */}
      <div className="flex-1 min-w-0 hidden sm:block">
        <h1 className="font-['Outfit'] text-[15px] md:text-[16px] font-semibold text-slate-900 dark:text-white leading-none">
          {page.title}
        </h1>
        <p className="text-[11px] text-slate-400 dark:text-slate-600 mt-0.5 hidden md:block">{page.subtitle}</p>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Search — lg+ */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.07] w-[200px] group focus-within:ring-2 focus-within:ring-indigo-500/30 transition-all">
          <Search size={13} className="text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search…"
            className="bg-transparent outline-none text-slate-700 dark:text-slate-300 placeholder:text-slate-400 dark:placeholder:text-slate-600 text-[13px] w-full"
          />
          <kbd className="text-[10px] bg-slate-200 dark:bg-white/[0.08] text-slate-400 px-1.5 py-0.5 rounded font-mono shrink-0">⌘K</kbd>
        </div>

        {/* Notifications */}
        <button className="relative flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.07] text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/[0.09] transition-all">
          <Bell size={15} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full" />
        </button>

        <ThemeSwitch />

        {/* Avatar */}
        <div className="flex items-center gap-2.5 cursor-pointer pl-1">
          <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-[13px] font-bold text-white shadow-sm shrink-0">D</div>
          <div className="hidden xl:block">
            <div className="text-[13px] font-semibold text-slate-800 dark:text-slate-100 leading-none">Demo User</div>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 leading-none mt-0.5">Growth Plan</div>
          </div>
        </div>
      </div>
    </header>
  );
}
