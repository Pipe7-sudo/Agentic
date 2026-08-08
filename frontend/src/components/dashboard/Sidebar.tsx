'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  LayoutDashboard, Bot, ClipboardList, AlertTriangle,
  CreditCard, Settings, LogOut, ChevronLeft, ChevronRight,
  Zap, X, Menu,
} from 'lucide-react';

const NAV = [
  { label: 'Overview',        Icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Agents',          Icon: Bot,             href: '/agents' },
  { label: 'Audit Log',       Icon: ClipboardList,   href: '/audit-log' },
  { label: 'Escalations',     Icon: AlertTriangle,   href: '/escalations', badge: 2 },
  { label: 'Usage & Billing', Icon: CreditCard,      href: '/usage' },
  { label: 'Settings',        Icon: Settings,        href: '/settings' },
];

// ─── Shared Nav Items (used by both desktop + mobile drawer) ──────────────────
function NavItems({ collapsed, onNavigate }: { collapsed?: boolean; onNavigate?: () => void }) {
  const pathname = usePathname();
  const router   = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('wf_session');
    router.push('/sign-in');
  };

  return (
    <>
      <nav className="flex-1 px-2 py-3 flex flex-col gap-0.5 overflow-y-auto">
        {NAV.map(({ label, Icon, href, badge }) => {
          const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all no-underline group relative ${
                active
                  ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/[0.05] hover:text-slate-900 dark:hover:text-slate-100'
              } ${collapsed ? 'justify-center px-2' : ''}`}
            >
              <Icon size={16} className="shrink-0" />
              {!collapsed && <span className="flex-1">{label}</span>}
              {!collapsed && badge ? (
                <span className="ml-auto bg-rose-100 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400 text-[10px] px-1.5 py-px rounded-full font-bold tabular-nums">{badge}</span>
              ) : null}
              {collapsed && badge ? (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full" />
              ) : null}
              {collapsed && (
                <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap bg-slate-900 dark:bg-slate-700 text-white text-[12px] px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">
                  {label}{badge ? ` (${badge})` : ''}
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
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-slate-500 dark:text-slate-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400 transition-all w-full ${collapsed ? 'justify-center px-2' : ''}`}
        >
          <LogOut size={16} className="shrink-0" />
          {!collapsed && <span>Log Out</span>}
        </button>
      </div>
    </>
  );
}

// ─── Brand Mark ───────────────────────────────────────────────────────────────
function Brand({ collapsed }: { collapsed?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 no-underline shrink-0">
      <div className="w-8 h-8 rounded-[8px] gradient-bg flex items-center justify-center shadow-[0_0_16px_rgba(99,102,241,0.4)] shrink-0">
        <Zap size={15} className="text-white" fill="white" />
      </div>
      {!collapsed && (
        <span className="font-['Outfit'] text-[15px] font-bold text-slate-900 dark:text-white tracking-tight">
          WorkForce <span className="text-indigo-600 dark:text-indigo-400">AI</span>
        </span>
      )}
    </Link>
  );
}

// ─── Desktop Sidebar ──────────────────────────────────────────────────────────
export function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  return (
    <aside className={`hidden md:flex flex-col h-full bg-white dark:bg-[#080812] border-r border-slate-200 dark:border-white/[0.07] transition-all duration-300 shrink-0 ${collapsed ? 'w-[60px]' : 'w-[220px]'}`}>
      {/* Brand */}
      <div className={`flex items-center justify-between px-4 h-[60px] border-b border-slate-100 dark:border-white/[0.05] shrink-0 ${collapsed ? 'justify-center px-2' : ''}`}>
        <Brand collapsed={collapsed} />
        {!collapsed && (
          <button
            onClick={onToggle}
            className="w-6 h-6 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-all"
          >
            <ChevronLeft size={14} />
          </button>
        )}
      </div>
      {collapsed && (
        <button
          onClick={onToggle}
          className="mx-auto mt-3 w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-all border border-slate-200 dark:border-white/[0.07]"
        >
          <ChevronRight size={13} />
        </button>
      )}
      <NavItems collapsed={collapsed} />
    </aside>
  );
}

// ─── Mobile Drawer Sidebar ────────────────────────────────────────────────────
export function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />
      {/* Drawer */}
      <aside className={`md:hidden fixed top-0 left-0 bottom-0 z-50 w-[260px] bg-white dark:bg-[#080812] border-r border-slate-200 dark:border-white/[0.07] flex flex-col shadow-2xl transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-4 h-[56px] border-b border-slate-100 dark:border-white/[0.05] shrink-0">
          <Brand />
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-all"
          >
            <X size={15} />
          </button>
        </div>
        <NavItems onNavigate={onClose} />
      </aside>
    </>
  );
}

export { Menu };
export default Sidebar;
