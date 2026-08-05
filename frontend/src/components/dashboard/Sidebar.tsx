'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const NAV = [
  { label: 'Overview',        icon: '📊', href: '/dashboard' },
  { label: 'Agents',          icon: '🤖', href: '/agents' },
  { label: 'Audit Log',       icon: '📋', href: '/audit-log' },
  { label: 'Escalations',     icon: '⚠️', href: '/escalations', badge: 2 },
  { label: 'Usage & Billing', icon: '💰', href: '/usage' },
  { label: 'Settings',        icon: '⚙️', href: '/settings' },
];

// ─── Desktop / Tablet Sidebar ─────────────────────────────────────────────────
export function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('wf_session');
    router.push('/sign-in');
  };

  return (
    <aside className={`hidden md:flex flex-col h-full bg-white dark:bg-[#080812] border-r border-slate-200 dark:border-white/[0.07] transition-all duration-300 shrink-0 ${collapsed ? 'w-[68px]' : 'w-[220px]'}`}>
      {/* Brand */}
      <div className={`flex items-center gap-2.5 p-4 border-b border-slate-100 dark:border-white/[0.05] shrink-0 ${collapsed ? 'justify-center' : ''}`}>
        <Link href="/" className="flex items-center gap-2.5 no-underline shrink-0">
          <div className="w-8 h-8 rounded-[8px] gradient-bg flex items-center justify-center text-base shadow-[0_0_16px_rgba(99,102,241,0.35)] text-white shrink-0">⚡</div>
          {!collapsed && <span className="font-['Outfit'] text-[16px] font-bold text-slate-900 dark:text-white tracking-tight">WorkForce AI</span>}
        </Link>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="mx-auto mt-3 mb-1 flex items-center justify-center w-7 h-7 rounded-lg border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.03] text-slate-500 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-all text-[11px]"
      >
        {collapsed ? '→' : '←'}
      </button>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 flex flex-col gap-0.5 overflow-y-auto">
        {NAV.map(item => {
          const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-[13px] font-medium transition-all no-underline group relative ${
                active
                  ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/[0.05] hover:text-slate-900 dark:hover:text-slate-100'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <span className="text-base shrink-0">{item.icon}</span>
              {!collapsed && <span className="flex-1">{item.label}</span>}
              {!collapsed && item.badge ? (
                <span className="ml-auto bg-rose-100 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400 text-[10px] px-1.5 py-px rounded-full font-bold">{item.badge}</span>
              ) : null}
              {collapsed && item.badge ? (
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
              ) : null}
              {collapsed && (
                <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap bg-slate-900 dark:bg-slate-700 text-white text-[12px] px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
                  {item.label}{item.badge ? ` (${item.badge})` : ''}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className={`p-3 border-t border-slate-100 dark:border-white/[0.05] shrink-0 ${collapsed ? 'flex justify-center' : ''}`}>
        <button
          onClick={handleLogout}
          className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-[13px] font-medium text-slate-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400 transition-all w-full ${collapsed ? 'justify-center' : ''}`}
        >
          <span className="text-base">🚪</span>
          {!collapsed && <span>Log Out</span>}
        </button>
      </div>
    </aside>
  );
}

// ─── Mobile Bottom Tab Bar ─────────────────────────────────────────────────────
export function MobileBottomNav() {
  const pathname = usePathname();
  // Show only 5 key items in bottom nav (hide Usage)
  const items = NAV.filter(n => n.href !== '/usage');

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-[#080812] border-t border-slate-200 dark:border-white/[0.07] flex items-center safe-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.4)]">
      {items.map(item => {
        const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex-1 flex flex-col items-center justify-center py-2.5 relative no-underline transition-all ${
              active ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-500'
            }`}
          >
            <span className={`text-xl mb-0.5 transition-transform ${active ? 'scale-110' : ''}`}>{item.icon}</span>
            <span className="text-[10px] font-medium leading-none">{item.label.split(' ')[0]}</span>
            {item.badge && (
              <span className="absolute top-1.5 right-[calc(50%-10px)] w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{item.badge}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

// Default export for backward compatibility
export default Sidebar;
