'use client';
import { useState } from 'react';
import { Sidebar, MobileBottomNav } from '@/components/dashboard/Sidebar';
import DashboardTopbar from '@/components/dashboard/DashboardTopbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-slate-50 dark:bg-[#04040c]">
      {/* Desktop/Tablet Sidebar */}
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <DashboardTopbar />
        {/* pb-20 on mobile to clear the bottom nav bar */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6">
          {children}
        </main>
      </div>

      {/* Mobile bottom tab bar */}
      <MobileBottomNav />
    </div>
  );
}
