'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Zap } from 'lucide-react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [state, setState] = useState<'checking' | 'authenticated'>('checking');

  useEffect(() => {
    const session = localStorage.getItem('wf_session');
    if (!session) {
      router.replace('/sign-in');
    } else {
      setState('authenticated');
    }
  }, [router]);

  if (state === 'checking') {
    return (
      <div className="flex h-[100dvh] items-center justify-center bg-slate-50 dark:bg-[#04040c]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)] animate-pulse">
            <Zap size={18} className="text-white" fill="white" />
          </div>
          <p className="text-[13px] text-slate-400 dark:text-slate-600">Loading your workspace…</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
