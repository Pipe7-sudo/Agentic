'use client';
import { useState } from 'react';
import { Sidebar, MobileDrawer } from '@/components/dashboard/Sidebar';
import DashboardTopbar from '@/components/dashboard/DashboardTopbar';
import AuthGuard from '@/components/AuthGuard';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed,  setCollapsed]  = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <AuthGuard>
      <div className="flex h-[100dvh] overflow-hidden bg-slate-50 dark:bg-[#04040c]">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
        <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        <div className="flex flex-col flex-1 overflow-hidden min-w-0">
          <DashboardTopbar onMenuClick={() => setDrawerOpen(true)} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
